'use strict';

let csv = require("csvtojson");

let collectorsDeck = "collectors-cards";
let languages = ["en", "se"];
/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.rooms = {};
}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({ checkType: true })
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function () {
  console.log("Starting to build data tables");
  for (let i in languages) {
    this.initializeTable(collectorsDeck);
  }
}

Data.prototype.getUILabels = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let lang = room.lang;
    var ui = require("./data/collectors-" + lang + ".json");
    return ui;
  }
  else return {};
}

Data.prototype.createRoom = function (roomId, playerCount, lang) {
  let room = {};
  room.players = {};
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.actingPlayer = null;
  room.playerCount = playerCount;
  room.round = 1;
  room.playOrder = [];
  room.playOrderNextRound = [];
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  room.boughtAuction = [];
  room.market = [];
  this.resetPlacements(room);
  room.buyPlacement = [{ cost: 1, playerId: null },
  { cost: 1, playerId: null },
  { cost: 2, playerId: null },
  { cost: 2, playerId: null },
  { cost: 3, playerId: null }];
  room.skillPlacement = [{ cost: 0, playerId: null },
  { cost: 0, playerId: null },
  { cost: 0, playerId: null },
  { cost: 1, playerId: null },
  { cost: 1, playerId: null }];
  room.auctionPlacement = [{ cost: -2, playerId: null },
  { cost: -1, playerId: null },
  { cost: 0, playerId: null },
  { cost: 0, playerId: null }];
  room.marketPlacement = [{ cost: 0, playerId: null },
  { cost: 2, playerId: null },
  { cost: 1, playerId: null }];
  room.workPlacement = [{ cost:  0, playerId: null, cards: 0, index: 1 },
                        { cost: -1, playerId: null, cards: 0, index: 2 },
                        { cost: -2, playerId: null, cards: 0, index: 3 },
                        { cost: -3, playerId: null, cards: 0, index: 4 },
                        { cost: -1, playerId: null, cards: 0, index: 5 },
                        { cost:  1, playerId: null, cards: 2, index: 6 },
                        { cost:  0, playerId: null, cards: 1, index: 7 },
                        { cost:  0, playerId: null, cards: 1, index: 8 },];
  this.rooms[roomId] = room;
}
Data.prototype.resetPlacements = function(room) {
  room.buyPlacement =     [ {cost:1,  playerId: null, id: 0},
                            {cost:1,  playerId: null, id: 1},
                            {cost:2,  playerId: null, id: 2},
                            {cost:2,  playerId: null, id: 3},
                            {cost:3,  playerId: null, id: 4} ];
  room.skillPlacement =   [ {cost:0,  playerId: null, id: 0},
                            {cost:0,  playerId: null, id: 1},
                            {cost:0,  playerId: null, id: 2},
                            {cost:1,  playerId: null, id: 3},
                            {cost:1,  playerId: null, id: 4} ];
  room.auctionPlacement = [ {cost:-2, playerId: null, id: 0},
                            {cost:-1, playerId: null, id: 1},
                            {cost:0,  playerId: null, id: 2},
                            {cost:0,  playerId: null, id: 3} ];
  room.marketPlacement =  [ {cost:0,  playerId: null, id: 0},
                            {cost:-2, playerId: null, id: 1},
                            {cost:0,  playerId: null, id: 2} ];
  room.workPlacement =    [ {cost:0,  playerId: null, id: 0},
                            {cost:-1, playerId: null, id: 1},
                            {cost:-2, playerId: null, id: 2},
                            {cost:-3, playerId: null, id: 3},
                            {cost:-1, playerId: null, id: 4},
                            {cost:1,  playerId: null, id: 5},
                            {cost:0,  playerId: null, id: 6},
                            {cost:0,  playerId: null, id: 7} ];
} 

Data.prototype.createDeck = function () {
  // we want a copy of the deck array, not a reference to it so we use the
  // spread operator (...) to copy the items. Note that this is a shallow copy
  // so it is not generalizable to all copy problems
  let deck = [...this.data[collectorsDeck]];
  return shuffle(deck);
}

Data.prototype.joinGame = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    if (typeof room.players[playerId] !== 'undefined') {
      console.log("Player", playerId, "joined again with info", room.players[playerId]);
      return true;
    }
    else if (Object.keys(room.players).length < room.playerCount) {
      console.log("Player", playerId, "joined for the first time");
      room.players[playerId] = {
        hand: room.deck.splice(0, 3),
        money: 2,
        points: 0,
        skills: [],
        items: [],
        income: [],
        incomeN: 3,
        cardIncome: 1,
        secret: [],
        bottles: 2,
        amountBottles: 2,
        bottleSlots: new Set(),
      };
      room.playOrder.push(playerId);
      if (Object.keys(room.players).length === room.playerCount) {
        shuffle(room.playOrder);
        let i = 0;
        for (let playerId of room.playOrder) {
          room.players[playerId].money += i;
          room.players[playerId].bottleSlots.add(0)
          room.players[playerId].bottleSlots.add(1)
          i += 1;
        }
        room.playOrderNextRound = [...room.playOrder];
        room.actingPlayer = 0;
      }
      return true;
    }
    console.log("Player", playerId, "was declined due to player limit");
  }
  return false;
}

Data.prototype.getPlayers = function (id) {
  let room = this.rooms[id]
  if (typeof room !== 'undefined') {
    return room.players;
  }
  else return {};
}

Data.prototype.updatePoints = function (roomId, player, points) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    room.points[player] += points;
    return room.points;
  }
  else return {};
}

/* returns players after a new card is drawn */
Data.prototype.drawCard = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let card = room.deck.pop();
    room.players[playerId].hand.push(card);
    return room.players;
  }
  else return [];
}

/* moves card from itemsOnSale to a player's hand */
Data.prototype.buyCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.itemsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.itemsOnSale[i].x === card.x &&
        room.itemsOnSale[i].y === card.y) {
        c = room.itemsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].items.push(...c);
    room.players[playerId].money -= cost;
    room.players[playerId].bottles -= 1;
    this.nextPlayer(roomId);

  }
}
Data.prototype.buyWork = function (roomId, playerId, cost, index) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let cardOne = null;
    let cardTwo = null;
    if (index <= 3) {
      cardOne = room.players[playerId].hand.splice(0, 1);
      cardTwo = room.players[playerId].hand.splice(0, 1);
      room.players[playerId].income.push(...cardOne);
      room.players[playerId].income.push(...cardTwo);
      room.players[playerId].incomeN += (2*room.players[playerId].cardIncome);
    }
    if (index <= 5) {
      room.players[playerId].amountBottles -= 1;
    }
    if (index == 6) {
      for (let i = 0; i <= 1; i += 1) {
        let card = room.deck.pop();
        room.players[playerId].hand.push(card);
      }
    }
    if (index == 7) {
      let card = room.deck.pop();
      room.players[playerId].hand.push(card);
      for (let i in room.playOrder) {
        if (room.playOrder[i] === playerId) {
          room.playOrderNextRound.unshift(...room.playOrderNextRound.splice(i,1));
          break;
        }
      }
    }
    if (index == 8) {
      cardOne = room.players[playerId].hand.splice(0, 1);
      room.players[playerId].income.push(...cardOne);
      room.players[playerId].incomeN += room.players[playerId].cardIncome;
      let card = room.deck.pop();
      room.players[playerId].hand.push(card);
    }
    room.players[playerId].money -= cost;
    room.players[playerId].bottles -= 1;
    let sv= this.getSkillValue(roomId, playerId);
    room.players[playerId].money+=2*sv.workerIncome;
      for (let index = 0; index< sv.workerCard; index++) {
        this.drawCard(roomId,playerId) 
      }
    }
}
Data.prototype.buySkill = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.skillsOnSale[i].x === card.x &&
        room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].skills.push(...c);
    room.players[playerId].money -= cost;
    room.players[playerId].bottles -= 1;
    this.getSkillValue(room, playerId);

  }
}

Data.prototype.buyAuction = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.auctionCards[i].x === card.x &&
        room.auctionCards[i].y === card.y) {
        c = room.auctionCards.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }

    room.boughtAuction.push(...c);  // titta mer på detta sen!!!!
    room.players[playerId].money -= cost;
    room.players[playerId].bottles -= 1;

  }
}

Data.prototype.auctionBid = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.boughtAuction.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.boughtAuction[i].x === card.x &&
        room.boughtAuction[i].y === card.y) {
        c = room.boughtAuction.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].hand.push(...c);  // titta mer på detta sen!!!!
    room.players[playerId].money -= cost;

  }
}
Data.prototype.buyMarket = function (roomId, playerId, card, cost, typeAction, secondAction) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    if (typeAction == 1) {
      for (let i = 0; i < room.skillsOnSale.length; i += 1) {
        // since card comes from the client, it is NOT the same object (reference)
        // so we need to compare properties for determining equality      
        if (room.skillsOnSale[i].x === card.x &&
          room.skillsOnSale[i].y === card.y) {
          c = room.skillsOnSale.splice(i, 1, {});
          break;
        }
      }
    }
    if (typeAction == 2) {
      for (let i = 0; i < room.auctionCards.length; i += 1) {
        // since card comes from the client, it is NOT the same object (reference)
        // so we need to compare properties for determining equality      
        if (room.auctionCards[i].x === card.x &&
          room.auctionCards[i].y === card.y) {
          c = room.auctionCards.splice(i, 1, {});
          break;
        }
      }
    }

    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    if(!secondAction){
      room.players[playerId].bottles -= 1;
    }
    room.market.push(...c);
    room.players[playerId].money -= cost;
    this.getMarketValues(room);

  }
}

Data.prototype.placeBottle = function (roomId, playerId, action, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let activePlacement = [];
    if (action === "buy") {
      activePlacement = room.buyPlacement;
    }
    else if (action === "skill") {
      activePlacement = room.skillPlacement;
    }
    else if (action === "auction") {
      activePlacement = room.auctionPlacement;
    }
    else if (action === "market") {
      activePlacement = room.marketPlacement;
    }
    else if (action === "work") {
      activePlacement = room.workPlacement;
    }
    for (let i = 0; i < activePlacement.length; i += 1) {
      if (activePlacement[i].cost === cost &&
        activePlacement[i].playerId === null) {
        activePlacement[i].playerId = playerId;
        break;
      }
    }
  }
}
Data.prototype.returnBottle = function(roomId, playerId, slot) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].bottleSlots.push(slot);
    return room.players[playerId].bottleSlots;
  }
  return [];
}
Data.prototype.getPlayOrder = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.playOrder;
  }
  return [];
}
Data.prototype.nextPlayer = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.actingPlayer = (room.actingPlayer + 1) % room.playerCount;
    console.log("next Player", room.actingPlayer)
    return room.actingPlayer;
  }
  return null;
}
Data.prototype.getActingPlayer = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.actingPlayer;
  }
  return null;
}
Data.prototype.nextRound = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.round += 1;
    room.playOrder = room.playOrderNextRound;
    this.resetPlacements(room);
    for (let player of room.players) {
      for (let i = 0; i < player.bottleIncome; i += 1) {
        player.bottleSlots.add(i);
      }
    }
  }
}
Data.prototype.adjustBottle = function (roomId, playerId, oldPos, newPos) {
  player.bottleSlots.delete(oldPos);
  player.bottleSlots.add(newPos);
}
Data.prototype.getRound = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.round;
  }
  return [];
}
/* returns the hand of the player */
Data.prototype.getCards = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.players[playerId].hand;
  }
  return [];
}

Data.prototype.getPlacements = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return {
      buyPlacement: room.buyPlacement,
      skillPlacement: room.skillPlacement,
      auctionPlacement: room.auctionPlacement,
      marketPlacement: room.marketPlacement,
      workPlacement: room.workPlacement
    }
  }
  return {};
}

Data.prototype.getItemsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.itemsOnSale;
  }
  return [];
}

Data.prototype.getMarketValues = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let mv = {
      fastaval: 0,
      movie: 0,
      technology: 0,
      figures: 0,
      music: 0
    };

    for (let cardIndex in room.market) {
      mv[room.market[cardIndex].market] += 1;
    }
    return mv;
  }
  return [];
}
Data.prototype.getSkillValue = function (roomId, playerId) {
  let room = this.rooms[roomId];
  
  if (typeof room !== 'undefined') {
    let sv = {
      bottle: 0,
      workerIncome: 0,
      workerCard: 0,
      auctionIncome: 0,
      VPall: 0,
      VPfastaval: 0,
      VPmovie: 0,
      VPtechnology: 0,
      VPfigures: 0,
      VPmusic: 0,
    };
    for (let cardIndex in room.players[playerId].skills) {
      sv[room.players[playerId].skills[cardIndex].skill] += 1;
    }
    return sv;
  }
   return [];
}
Data.prototype.SkillEffectWork=function(roomId, playerId){
  let room = this.rooms[roomId];

}
Data.prototype.getSkillsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.skillsOnSale;
  }
  return [];
}

Data.prototype.getAuctionCards = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.auctionCards;
  }
  else return [];
}
Data.prototype.getBoughtAuction = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.boughtAuction;
  }
  else return [];
}
Data.prototype.getMarket = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.market;
  }
  else return [];
}
module.exports = Data;




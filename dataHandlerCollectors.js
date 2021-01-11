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
  this.rooms[roomId] = room;
  this.resetPlacements(room);
}

Data.prototype.resetPlacements = function (room) {
  console.log("gör något för guds skull");
  room.buyPlacement = 
  [{ cost: 1, playerId: null },
    { cost: 1, playerId: null },
    { cost: 2, playerId: null },
    { cost: 2, playerId: null },
    { cost: 3, playerId: null }];
    room.skillPlacement = 
    [{ cost: 0, playerId: null },
    { cost: 0, playerId: null },
    { cost: 0, playerId: null },
    { cost: 1, playerId: null },
    { cost: 1, playerId: null }];
    room.auctionPlacement = 
    [{ cost: -2, playerId: null },
    { cost: -1, playerId: null },
    { cost: 0, playerId: null },
    { cost: 0, playerId: null }];
    room.marketPlacement = 
    [{ cost: 0, playerId: null },
    { cost: 2, playerId: null },
    { cost: 1, playerId: null }];
    room.workPlacement = 
    [{ cost: 0, playerId: null, cards: 0, index: 1 },
    { cost: -1, playerId: null, cards: 0, index: 2 },
    { cost: -2, playerId: null, cards: 0, index: 3 },
    { cost: -3, playerId: null, cards: 0, index: 4 },
    { cost: -1, playerId: null, cards: 0, index: 5 },
    { cost: 1, playerId: null, cards: 2, index: 6 },
    { cost: 0, playerId: null, cards: 1, index: 7 },
    { cost: 0, playerId: null, cards: 1, index: 8 },];
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
      console.log("playerCount: ", room.playerCount);
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
        bottleActions: -1,
        timetoPlaceBB: new Boolean,
        winner: false,
      };

      room.playOrder.push(playerId);
      console.log("playOrder: ", room.playOrder);
      console.log("player length: ", Object.keys(room.players).length);
      console.log("playerCount: ", room.playerCount);
      if (Object.keys(room.players).length == room.playerCount) {
        shuffle(room.playOrder);
        console.log("playOrder shuffle: ", room.playOrder);
        let i = 0;
        for (let playerId of room.playOrder) {
          room.players[playerId].money += i;
          room.players[playerId].bottleSlots.add(0)
          room.players[playerId].bottleSlots.add(1)
          i += 1;
          console.log("what order: ", room.playOrder);
        }
        room.playOrderNextRound = [...room.playOrder];
        room.actingPlayer = 0;
        console.log("actingPlayer: ", room.actingPlayer);
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
Data.prototype.buyCard = function (roomId, playerId, card, cost, hand) {
  console.log("buyCard datahandler");
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
    if(!hand){
      room.players[playerId].bottles -= 1;
    }
    this.getAmountOfItems(roomId, playerId);
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
      room.players[playerId].incomeN += (2 * room.players[playerId].cardIncome);
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
          room.playOrderNextRound.unshift(...room.playOrderNextRound.splice(i, 1));
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
    console.log("player: ", playerId);
    room.players[playerId].money -= cost;
    room.players[playerId].bottles -= 1;
    let sv = this.getSkillValue(roomId, playerId);
    if(sv.workerIncome>0){
    room.players[playerId].money += 2 * sv.workerIncome;
  }
    for (let index = 0; index < sv.workerCard; index++) {
      this.drawCard(roomId, playerId)
    }
  }
}
Data.prototype.buySkill = function (roomId, playerId, card, cost, hand) {
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
    let sv = this.getSkillValue(roomId, playerId);
    let beforeBottle = sv.bottle;
    room.players[playerId].skills.push(...c);
    room.players[playerId].money -= cost;
    if(!hand){
      room.players[playerId].bottles -= 1;
    }
    this.getSkillValue(room, playerId);
    sv = this.getSkillValue(roomId, playerId);
    let afterBottle = sv.bottle;
    if (afterBottle - beforeBottle == 1) {
      room.players[playerId].bottles += 1;
      room.players[playerId].amountBottles += 1;
    }


  }
}

Data.prototype.buyAuction = function (roomId, playerId, card, cost, hand) {
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
    room.boughtAuction.splice(0, room.boughtAuction.length);
    room.boughtAuction.push(...c);  // titta mer på detta sen!!!!
    room.players[playerId].money -= cost;
    if(!hand){
      room.players[playerId].bottles -= 1;
    }
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
    if (!secondAction) {
      room.players[playerId].bottles -= 1;
    }
    room.market.push(...c);
    room.players[playerId].money -= cost;
    let mv = this.getMarketValues(roomId);
    console.log("this is mv: ",mv);
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
      for (let playerId in room.players) {
        let sv = this.getSkillValue(roomId, playerId);
        room.players[playerId].money += 1 * sv.auctionIncome;
      }
    }
    else if (action === "market") {
      activePlacement = room.marketPlacement;
    }
    else if (action === "work") {
      activePlacement = room.workPlacement;
    }
    for (let i = 0; i < activePlacement.length; i += 1) {
      console.log("almost there")
      if (activePlacement[i].cost === cost &&
        activePlacement[i].playerId === null) {
        console.log("in for loop & if")  
        activePlacement[i].playerId = playerId;
        break;
      }
    }
  }
}
Data.prototype.returnBottle = function (roomId, playerId, slot) {
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
Data.prototype.nextPlayer = function (roomId, playerIdN) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let bottlesLeft = false;
    for (let playerId in room.players) {
      if(room.players[playerId].bottles>0 && room.players[playerId].bottleActions<0){
        bottlesLeft=true;
        console.log("there is a player with bottles");
        break;
      }}
      if(!bottlesLeft){
        console.log("there are no more bottles");
        this.bottleEffect(roomId);
        for (let playerI in room.players){
          room.players[playerI].timetoPlaceBB=true;
        }
        return room.actingPlayer;
      }
      else{
        for(let playerId in room.players){
          console.log("the boyes", room.playOrder[(room.actingPlayer + 1) % room.playerCount], "hhhhhh: ", playerId);
          if(playerId == room.playOrder[(room.actingPlayer + 1)% room.playerCount]){
            console.log("not all the way throu")
            if(room.players[playerId].bottles>0){
             room.actingPlayer = (room.actingPlayer + 1) % room.playerCount;
             console.log("next Player", room.actingPlayer)
             break;
            }
            else{
            console.log("time to start again"); 
             room.actingPlayer = (room.actingPlayer + 1) % room.playerCount;
             this.nextPlayer(roomId);
            }
          }
        }
      }
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
    for (let playerId in room.players) {
      for (let i = 0; i < room.players[playerId].bottleIncome; i += 1) {
        room.players[playerId].bottleSlots.add(i);
      }
    }

  }
}

Data.prototype.refillCards = function (roomId) {
  let room = this.rooms[roomId];
  let itemsArray = room.itemsOnSale;
  let skillsArray = room.skillsOnSale;
  let auctionArray = room.auctionCards;

  for (let index = 0; index < skillsArray.length; index++) {
    if (skillsArray[index].skill == undefined) {
      console.log("found empty card");
      let nextFound = false;
        for (let jndex = index + 1; jndex < skillsArray.length; jndex++) {
          if (skillsArray[jndex].skill != undefined) {
            nextFound = true;
            console.log("found next card in skillsArray");
            skillsArray[index] = skillsArray[jndex];
            skillsArray[jndex] = {};
            break;
          }
        }
        if (nextFound == false) {
          for (let jndex = 0; jndex < itemsArray.length; jndex++) {
            if (itemsArray[jndex].skill != undefined) {
              nextFound = true;
              console.log("found next card in itemsArray");
              skillsArray[index] = itemsArray[jndex];
              itemsArray[jndex] = {};
              break;
            }
          }
        }
        
      
    }
  };

  //sorting itemsarray
  for (let index = 0; index < itemsArray.length; index++) {
    if (itemsArray[index].item == undefined) {
      for (let jndex = index + 1; jndex < itemsArray.length; jndex++) {
        if (itemsArray[jndex].item != undefined) {
          itemsArray[index] = itemsArray[jndex];
          itemsArray[jndex] = {};
          break;
        }
      }
    }
  };

  //adding cards to itemsarray
  for (let index = 0; index < itemsArray.length; index++) {
    console.log("checking card no.: " + index);
    console.log(itemsArray[index].item);
    if (itemsArray[index].item == undefined) {
      console.log("refilled Array");
      itemsArray[index] = room.deck.pop();
    }
  };

  //sorting auctionarray
  for (let index = 0; index < auctionArray.length; index++) {
    console.log("sorting auction card no.: " + index);
    if (auctionArray[index].item == undefined) {
      console.log("found empty")
      for (let jndex = index + 1; jndex < auctionArray.length; jndex++) {
        if (auctionArray[jndex].item != undefined) {
          auctionArray[index] = auctionArray[jndex];
          console.log("switched");
          auctionArray[jndex] = {};
          break;
        }
      }
    }
  };

  for (let index = 0; index < auctionArray.length; index++) {
    console.log("checking auction card no.: " + index);
    console.log(auctionArray[index].item);
    if (auctionArray[index].item == undefined) {
      console.log("refilled auctionArray");
      auctionArray[index] = room.deck.pop();
    }
  };


  console.log("we finished")
  room.itemsOnSale = itemsArray;
  room.skillsOnSale = skillsArray;
  room.auctionCards = auctionArray;
  console.log(room.auctionCards);
  for(let playerId in room.players){
    room.players[playerId].money += room.players[playerId].income.length;
    room.players[playerId].bottles = room.players[playerId].amountBottles;
    room.players[playerId].bottleActions = -1;
    room.players[playerId].timetoPlaceBB=false;
  }
  if(room.round>2){
    this.countVP(roomId);   
  }
  else{
    room.round += 1;
    console.log("New round");
    this.resetPlacements(room);
  }

}
Data.prototype.checkEnd = function (roomId){
  let room = this.rooms[roomId];
  for(let playerId in room.players){
    if(room.players[playerId].winner){
      return(true)
    }
  }
  return(false);
}
Data.prototype.countVP = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    console.log("time to count the points");
    for(let playerId in room.players){
      let moneyPoints = 0;
      for(let i = 1; i<=room.players[playerId].money; i+=1){
        if(i%3==0){
          moneyPoints +=1;
        }
      }
      let skillPoints = this.skillItemVP(playerId, roomId);
      let marketPoints = this.marketItemVP(playerId, roomId);
      room.players[playerId].points = marketPoints + skillPoints + moneyPoints;
      console.log("this player: ", playerId, " has pointsToT: ", room.players[playerId].points, " marketPoints: ",marketPoints, " skillPoints: ",skillPoints, " moneyPoints: ", moneyPoints);
    }
    let winnerPoints = 0;
    let sharedWinners = [];
    for(let playerI in room.players){
      if(room.players[playerI].points>winnerPoints){
        sharedWinners = [];
        winnerPoints = room.players[playerI].points;
        sharedWinners.push(playerI);
      }
      else if(room.players[playerI].points==winnerPoints){
        sharedWinners.push(playerI);
      }
    }
    
      console.log("the winners are: ", sharedWinners);
      for(let index in sharedWinners){
        room.players[sharedWinners[index]].winner = true;
        console.log("is this the winner: ",room.players[sharedWinners[index]]);
      }
  }
  for(let player in room.players){
    console.log("alla spelare, spelare: ", player, "winner: ", room.players[player].winner);
  }
}
Data.prototype.skillItemVP = function (playerId, roomId){
  let sv = this.getSkillValue(roomId,playerId);
  let iv = this.getAmountOfItems(roomId, playerId);
  let skillPoints = 0;
  skillPoints += sv.VPmusic*iv.music;
  skillPoints += sv.VPtechnology*iv.technology;
  skillPoints += sv.VPmovie*iv.movie;
  skillPoints += sv.VPfastaval*iv.fastaval;
  skillPoints += sv.VPfigures*iv.figures;
  if(iv.music>0 && iv.technology>0 && iv.movie>0 && iv.fastaval>0 && iv.figures>0){
    skillPoints += 5*sv.VPall;
  }
  return(skillPoints);
}
Data.prototype.marketItemVP = function (playerId, roomId){
  let mv = this.getMarketValues(roomId);
  let iv = this.getAmountOfItems(roomId, playerId);
  let marketPoints = 0;
  marketPoints += mv.music*iv.music;
  marketPoints += mv.technology*iv.technology;
  marketPoints += mv.movie*iv.movie;
  marketPoints += mv.fastaval*iv.fastaval;
  marketPoints += mv.figures*iv.figures;
  
  return(marketPoints);
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
Data.prototype.getNumActions = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].bottleActions -=1;
  }
  return [];
}
Data.prototype.checkRound = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let bottleA=false;
    for(let playerN in room.players){
      console.log("collectors player: ", playerN, "has: ", room.players[playerN].bottleActions, " bottleActions in handler");
        if(room.players[playerN].bottleActions>0){
           bottleA=true;
          break;
        }
    }
    if(!bottleA){
      console.log("reset now");
      return(true);
    }
    else{
      return(false);
    }
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
Data.prototype.getAmountOfItems = function (roomId,playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let iv = {
      fastaval: 0,
      movie: 0,
      technology: 0,
      figures: 0,
      music: 0
    };

    for (let cardIndex in room.players[playerId].items) {
      iv[room.players[playerId].items[cardIndex].item] += 1;
    }
    return iv;
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
Data.prototype.SkillEffectWork = function (roomId, playerId) {
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
Data.prototype.bottleEffect = function (roomId) {
  let room = this.rooms[roomId];
  console.log("bottleEffect");
  if (typeof room !== 'undefined') {
  for(let playerIdN in room.players){
    if(room.players[playerIdN].amountBottles<=2 && room.players[playerIdN].bottleActions<0){
      room.players[playerIdN].amountBottles=2;
      console.log("only two bottles");
      room.players[playerIdN].bottleActions=0;
    }
   else if(room.players[playerIdN].amountBottles>2 && room.players[playerIdN].bottleActions<0){
    console.log("bottles: ", room.players[playerIdN].amountBottles, " bottleAction: ", room.players[playerIdN].bottleActions, "playerId: ", playerIdN); 
    room.players[playerIdN].bottleActions = room.players[playerIdN].amountBottles-2;
   }
   console.log("bottles1: ", room.players[playerIdN].amountBottles, " bottleAction1: ", room.players[playerIdN].bottleActions); 
  }
  }
}
Data.prototype.getMoney = function (roomId, playerId, extraMoney) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].money += extraMoney;
  }
}
module.exports = Data;




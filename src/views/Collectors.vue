<template>
  <div>
    <main>
      <div class="layout">
        <div class="topPage">
          <h1>info info info {{Object.keys(this.players).length}}</h1>
                  <h1> {{ Object.keys(this.players)[0] }}</h1>
          <h1>{{ this.players[Object.keys(this.players)[0]].money }}</h1>
        </div>
        <div class="empty1"></div>

        <div v-if="this.$store.state.playerCount>=2 || Object.keys(this.players).length>=2">
          <div>
          <div class="opboard1">
            <OpponentBoard />
          <div class="piecesOp11">
            <BlackPieces />
          </div>
           <div class="piecesOp12">
            <BlackPieces />
          </div>
          </div>
          </div>
          <br /><br />
        </div>

        <div class="gboard">
          <CollectorsGameboard />
        <br /><br />
        <div v-if="this.$store.state.playerCount==4||Object.keys(this.players).length == 4">
          <div class="opboard3">
            <OpponentBoard />
               <div class="piecesOp31">
            <PurplePieces />
          </div>
           <div class="piecesOp32">
            <PurplePieces />
          </div>
          </div>
          <div class="backsideCard3"> <img src="/images/backsideCard.png" height= "100%" width= "30%" class="opac">
        <div v-if="this.$store.state.playerId==Object.keys(this.players)[0]">
        <div class="numberOCards">{{ this.players[Object.keys(this.players)[3]].hand.length }} </div>
         <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[3]].money}}</div>
          
         
        </div>
        
        <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[1] && Object.keys(this.players).length>=2"> 
         <div class="numberOCards"> {{ this.players[Object.keys(this.players)[3]].hand.length }}</div>
          <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[3]].money }}</div>
          

        </div>
        
         <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[2] && Object.keys(this.players).length>=3"> 
           <div class="numberOCards"> {{ this.players[Object.keys(this.players)[3]].hand.length }}</div>
            <br /><br />
          
             <div class="moneyOp">${{ this.players[Object.keys(this.players)[3]].money }}</div>
          

           </div>
         <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[3] && Object.keys(this.players).length==4">
            <div class="numberOCards"> {{ this.players[Object.keys(this.players)[2]].hand.length }}</div>
              <br /><br />
          
             <div class="moneyOp">${{ this.players[Object.keys(this.players)[2]].money }}</div>
          
            </div>
           
        </div>
        </div>
        </div>

         <div class="pBoard">
          <div class="pboard">
            <PlayerBoard />
            <button class="pieces1" v-on:click="PiecesA()">
            <BluePieces />
            </button>
           <button class="pieces2" v-on:click="PiecesA()">
            <BluePieces />
           </button>
           
           <div class="form-popup" id="myForm">
          <form class="form-container">
          <h1 class="PopUpText">Actions</h1>

          <button type="button" class="buyItem" v-on:click="buyItem();">Buy Item</button>
          <button type="button" class="gainSkill" v-on:click="gainSkill()">Gain Skill</button>
          <button type="button" class="auction" v-on:click="auction()">Auction</button>
          <button type="button" class="raiseValue" v-on:click="raiseValue()">Raise Value</button>
          <br>
          <button type="button" class="cancel" v-on:click="closeForm()">Close</button>
          </form></div>

          </div>
          <br /><br />
          <div>
            <button class="shape">${{ players[playerId].money }}</button>
          </div>
            Hand
          <div class="cardslots" v-if="players[playerId]">
            <CollectorsCard
              v-for="(card, index) in players[playerId].hand"
              :card="card"
              :availableAction="card.available"
              @doAction="buyCard(card)"
              :key="index"
            />
          </div>
        </div>

        <div class="backsideCard1"> <img src="/images/backsideCard.png" height= "100%" width= "30%" class="opac">
        <div v-if="this.$store.state.playerId==Object.keys(this.players)[0]">
        <div class="numberOCards">{{ this.players[Object.keys(this.players)[1]].hand.length }} </div>
        <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[1]].money}}</div>
         
        </div>
        
        <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[1] && Object.keys(this.players).length>=2"> 
         <div class="numberOCards"> {{ this.players[Object.keys(this.players)[0]].hand.length }}</div>
         <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[0]].money}}</div>

        </div>
        
         <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[2] && Object.keys(this.players).length>=3"> 
           <div class="numberOCards"> {{ this.players[Object.keys(this.players)[0]].hand.length }}</div>
           <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[0]].money}}</div>
           </div>
         <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[3] && Object.keys(this.players).length==4">
            <div class="numberOCards"> {{ this.players[Object.keys(this.players)[0]].hand.length }}</div>
            <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[0]].money}}</div>
            </div>
        
      
      
      </div>
        <div v-if="this.$store.state.playerCount>=3||Object.keys(this.players).length >= 3">
          <div class="opboard2">
            <OpponentBoard />
             <div class="piecesOp21">
            <BrownPieces />
          </div>
           <div class="piecesOp22">
            <BrownPieces />
          </div>
          </div>
         <div class="backsideCard2"> <img src="/images/backsideCard.png" height= "100%" width= "30%" class="opac">
        <div v-if="this.$store.state.playerId==Object.keys(this.players)[0]">
        <div class="numberOCards">{{ this.players[Object.keys(this.players)[2]].hand.length }} </div>
         <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[2]].money}}</div>
        </div>
        
        <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[1] && Object.keys(this.players).length>=2"> 
         <div class="numberOCards"> {{ this.players[Object.keys(this.players)[2]].hand.length }}</div>
<br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[2]].money}}</div>
        </div>
        
         <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[2] && Object.keys(this.players).length>=3"> 
           <div class="numberOCards"> {{ this.players[Object.keys(this.players)[1]].hand.length }}</div>
           <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[1]].money}}</div>
           </div>
         <div v-else-if="this.$store.state.playerId==Object.keys(this.players)[3] && Object.keys(this.players).length==4">
            <div class="numberOCards"> {{ this.players[Object.keys(this.players)[1]].hand.length }}</div>
            <br /><br />
            <div class="moneyOp">${{ this.players[Object.keys(this.players)[1]].money}}</div>
            </div>
        </div>
        </div>

       
       

       
        
        
        {{ buyPlacement }} {{ chosenPlacementCost }}
        <div class="buyCard">
          <CollectorsBuyActions
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :itemsOnSale="itemsOnSale"
            :marketValues="marketValues"
            :placement="buyPlacement"
            @buyCard="buyCard($event)"
            @placeBottle="placeBottle('buy', $event)"
          />
          <div class="buttons">
            <button @click="drawCard">
              {{ labels.draw }}
            </button>
          </div>
        </div>
        <div class="skills">
          Skills
          <div class="cardslots">
            <CollectorsCard
              v-for="(card, index) in skillsOnSale"
              :card="card"
              :key="index"
            />
          </div>
        </div>
        <div class="auction">
          Auction
          <div class="cardslots">
            <CollectorsCard
              v-for="(card, index) in auctionCards"
              :card="card"
              :key="index"
            />
          </div>
        </div>
        

        <div class="item">
          Items
          <div class="cardslots" v-if="players[playerId]">
            <CollectorsCard
              v-for="(card, index) in players[playerId].items"
              :card="card"
              :key="index"
            />
          </div>
        </div>

        <div class="pPieces">
          Pieces
          <div class="pieces">
            <BlackPieces />
          </div>
        </div>
      </div>
    </main>
    <!--
    {{players}}
    {{marketValues}}
    -->
    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>
    <footer>
      <p>
        {{ labels.invite }}
        <input
          type="text"
          :value="publicPath + $route.path"
          @click="selectAll"
          readonly="readonly"
        />
      </p>
    </footer>
  </div>
</template>

<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsBuyActions from "@/components/CollectorsBuyActions.vue";
import CollectorsGameboard from "@/components/CollectorsGameboard.vue";
import BlackPieces from "@/components/BlackPieces.vue";
import BluePieces from "@/components/BluePieces.vue";
import BrownPieces from "@/components/BrownPieces.vue";
import PurplePieces from "@/components/PurplePieces.vue";
import PlayerBoard from "@/components/PlayerBoard.vue";
import OpponentBoard from "@/components/OpponentBoard.vue";

export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsGameboard,
    BlackPieces,
    BluePieces,
    PurplePieces,
    BrownPieces,
    PlayerBoard,
    OpponentBoard,
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0, y: 0 },
      labels: {},
      players: {},
      // playerId: {
      //   hand: [],
      //   money: 1,
      //   points: 0,
      //   skills: [],
      //   items: [],
      //   income: [],
      //   secret: []
      // }
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],
      chosenPlacementCost: null,
      marketValues: {
        fastaval: 0,
        movie: 0,
        technology: 0,
        figures: 0,
        music: 0,
      },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],
      playerid: 0,
    };
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
  watch: {
    players: function (newP, oldP) {
      console.log(newP, oldP);
      for (let p in this.players) {
        for (let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
            this.$set(this.players[p].hand[c], "available", false);
        }
      }
    },
  },
  created: function () {
    this.$store.commit("SET_PLAYER_ID", this.$route.query.id);
    //TODO! Fix this ugly hack
    //background: https://github.com/quasarframework/quasar/issues/5672
    const newRoute = this.$route.params.id + "?id=" + this.playerId;
    if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
      this.$router.push(newRoute);

    this.$store.state.socket.emit("collectorsLoaded", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
    });

    this.$store.state.socket.on(
      "collectorsInitialize",
      function (d) {
        this.labels = d.labels;
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        this.marketValues = d.marketValues;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsBottlePlaced",
      function (d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsPointsUpdated",
      (d) => (this.points = d)
    );

    this.$store.state.socket.on(
      "collectorsCardDrawn",
      function (d) {
        //this has been refactored to not single out one player's cards
        //better to update the state of all cards
        this.players = d;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsCardBought",
      function (d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
      }.bind(this)
    );
  },
  methods: {
    selectAll: function (n) {
      n.target.select();
    },
    placeBottle: function (action, cost) {
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        cost: cost,
      });
    },
    drawCard: function () {
      this.$store.state.socket.emit("collectorsDrawCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    buyCard: function (card) {
      console.log("buyCard", card);
      this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
    },
    PiecesA: function (){
      document.getElementById("myForm").style.display = "block";
    },
    closeForm: function() {
  document.getElementById("myForm").style.display = "none";
  },
  },
};
</script>
<style scoped>
header {
  user-select: none;
  position: fixed;
  width: 100%;
  pointer-events: none;
}
main {
  user-select: none;
}

footer {
  margin-top: 5em auto;
}
footer a {
  text-decoration: none;
  border-bottom: 2px dotted ivory;
}
footer a:visited {
  color: ivory;
}
.layout {
  display: grid;
  background: radial-gradient(rgb(116, 22, 22), black);
  border-radius: 5px;
  padding: 20px;
  grid-template-columns: auto auto auto;
}
.topPage {
  grid-column: 1 / span 3;
  grid-row: 1;
}
.gboard {
  grid-column: 2;
  grid-row: 3;
  user-select: none;
}
.pBoard {
  grid-column: 1;
  grid-row: 3;
  transform: scale(0.8) translate(-15%, -15%);
  position: relative;
}
.empty1 {
  grid-row: 2;
  grid-column: 1;
}
.empty2 {
  grid-row: 2;
  grid-column: 3;
}
.opboard1 {
  
  grid-row: 2;
  grid-column: 2;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.backsideCard1{
  grid-row: 2;
  grid-column: 3;
  transform: scale(0.6) translate(-40%, -50%);
  
  position:relative;
}
.opac{
  opacity:0.5;
}
.opboard2 {
  
  grid-row: 3;
  grid-column: 3;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  position: relative;
  
}
.backsideCard2{
transform: scale(0.6) translate(-8%, -30%);
}
.opboard3 {
  
  width: 80%;
  position: relative;
  
}
.backsideCard3{
transform: scale(0.6) translate(110%, -120%);
}
.numberOCards{
  top: 1em;
  left: 0.5em;
  font-size: 40px;
  color: white;
  position:absolute;

}
.buyCard {
  grid-row: 4;
  grid-column: 1;
}
.skills {
  grid-row: 5;
  grid-column: 1;
}
.auction {
  grid-row: 6;
  grid-column: 1;
}
.item {
  grid-row: 8;
  grid-column: 1;
}
.pPieces {
  grid-row: 9;
  grid-column: 3;
}
.piecesOp11{
  position: absolute;
  transform: scale(0.5);
  top: 10%;
  left: 8%;
}
.piecesOp12{
  position: absolute;
  transform: scale(0.5);
  top: 10%;
  left: 24%;

}
.pieces1{
  position: absolute;
  transform: scale(0.7);
  top: 5%;
  left: 12%;
}
.pieces2{
  position: absolute;
  transform: scale(0.7);
  top: 5%;
  left: 27%;
}
.piecesOp21{
  position: absolute;
  transform: scale(0.5);
  bottom: 6%;
  left: 9%;
  
}
.piecesOp22{
  position: absolute;
  transform: scale(0.5);
  bottom: 6%;
  left: 25%;
}
.piecesOp31{
  position: absolute;
  transform: scale(0.5);
  top: 10%;
  left: 9%;
}
.piecesOp32{
position: absolute;
transform: scale(0.5);
top: 10%;
left: 25%;
}
.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.cardslots div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
.shape {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
}
.moneyOp{
  background-color: blue; 
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
}
.form-popup {
  display: none;
  position: fixed;
  position: center;
  border: 3px solid #f1f1f1;
  z-index: 9;
}
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}
.PopUpText{
  color: black;
}
.form-container .cancel {
  background-color: red;
}

@media screen and (max-width: 800px) {
  main {
    width: 90vw;
  }
}
</style>

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

          <button type="button" class="buyItem" v-on:click="buyItemBottle();">Buy Item</button>
          <button type="button" class="gainSkill" v-on:click="gainSkillBottle()">Gain Skill</button>
          <button type="button" class="auction" v-on:click="auctionBottle()">Auction</button>
          <button type="button" class="raiseValue" v-on:click="raiseValueBottle()">Raise Value</button>
          <button type="button" class="work" v-on:click="workBottle()">work</button>
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
              @doAction="selectOp(card)"
              :key="index"
            />
          </div>
          <div class="form-popup" id="formHand">
          <form class="form-container">
          <h1 class="PopUpText">Actions from Hand</h1>

          <button type="button" class="buyItem" v-on:click="buyItem()">Buy Item</button>
          <button type="button" class="gainSkill" v-on:click="gainSkill()">Gain Skill</button>
          <button type="button" class="auction" v-on:click="putAuction()">Auction</button>
          <button type="button" class="raiseValue" v-on:click="raiseValue()">Raise Value</button>
          <br>
          <button type="button" class="cancel" v-on:click="closeFormHand()">Close</button>
          </form></div>
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
        <div class="actions" v-if="this.currentAction=='buyItem'">
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
        <br>
       

      
           <div class="actions" v-if="this.currentAction=='buySkill'">
          <CollectorsSkillAction
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :skillsOnSale="skillsOnSale"
            :marketValues="marketValues"
            :placement="skillPlacement"
            @buySkill="buySkill($event)"
            @placeBottle="placeBottle('skill', $event)"
          />
        </div>

        <div class="actions" v-if="this.currentAction=='buyAuction'">
          <CollectorsAuction
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :auctionCards="auctionCards"
            :marketValues="marketValues"
            :placement="auctionPlacement"
            @placeBottle="placeBottle('auction', $event)"
            @buyAuction="buyAuction($event)"
          />
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
        <div class="boughtSkills">
          boughtSkills
          <div class="cardslots" v-if="players[playerId]">
            <CollectorsCard
              v-for="(card, index) in players[playerId].skills"
              :card="card"
              :key="index"
            />
          </div>
        </div>
         <div class="auctionCard">
          Auction Cards
          <br>
          <div class="cardslots" v-if="boughtAuction">
            <CollectorsCard
              v-for="(card, index) in boughtAuction"
              :card="card"
              :key="index"
              :availableAction="card.available"
              @doAction="getAuction(card)"
            />
          </div>
          <div class="form-auction" id="formAuction">
          <form class="form-container">
          <h1 class="PopUpText">Auction</h1>

          <label for="Auction price"><b class="PopUpText">Auction price</b></label>
          <input type="number" placeholder="Enter price" name="price" id="price" required>
          <button type="button" class="btn" v-on:click="bid(players[playerId].money);">Bid</button>
          <button type="button" class="btn cancel" v-on:click="bidClose()">Close</button>
          
          </form>
          </div>
         
        </div>
      <div class="actions" v-if="this.currentAction=='buyMarket'">
      <CollectorsMarket
        v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :market="market"
            :skillsOnSale="skillsOnSale"
            :auctionCards="auctionCards"
            :marketValues="marketValues"
            :placement="marketPlacement"
            @buyMarket="buyMarket($event)"
            @placeBottle="placeBottle('market', $event)"
            />   
      </div>
      <div class="actions" v-if="this.currentAction=='buyWork'">
        <CollectorsWork
        v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :placement="workPlacement"
        @placeBottle="placeBottle('work', $event)"
        @buyWork="buyWork($event)"
        /> <!-- hur tar man emot two input i buyWork? från CollectorWork-->
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
import CollectorsSkillAction from "@/components/CollectorsSkillAction.vue";
import CollectorsAuction from "@/components/CollectorsAuction.vue";
import CollectorsMarket from "@/components/CollectorsMarket.vue";
import CollectorsWork from "@/components/CollectorsWork.vue";

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
    CollectorsSkillAction,
    CollectorsAuction,
    CollectorsMarket,
    CollectorsWork,
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
      workPlacement: [],
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
      boughtAuction: [],
      market: [],
      isMarket: false,
      twoCards: true,
      costMarket:-1,
      marketAction:"",
      currentAction:""
      
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
        this.boughtAuction = d.boughtAuction;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
        this.workPlacement = d.placements.workPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsBottlePlaced",
      function (d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
        this.workPlacement = d.workPlacement;
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
    this.$store.state.socket.on(
      "collectorsWorkBought",
      function (d) {
        console.log(d.playerId, "bought a work");
        this.players = d.players;
      }.bind(this)
    );
   
     this.$store.state.socket.on(
      "collectorsSkillBought",
      function (d) {
        console.log(d.playerId, "bought a skill");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsAuctionBought",
      function (d) {
        console.log(d.playerId, "bought a auction card");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.boughtAuction = d.boughtAuction;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsAuctionBid",
      function (d) {
        console.log(d.playerId, "bought a auction card through bid");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.boughtAuction = d.boughtAuction;
      }.bind(this)
    );
     this.$store.state.socket.on(
      "collectorsMarketBought",
      function (d) {
        console.log(d.playerId, "bought a card from market");
        this.players = d.players;
        this.market = d.market;
        this.auctionCards  = d.auctionCards;
        this.skillsOnSale = d.skillsOnSale;
        this.marketValues = d.marketValues;
        if(this.costMarket==1){
            this.twoCards=false;
        }
        if(this.twoCards){
          this.twoCards=false;
          console.log("return", this.marketAction, this.costMarket);
          if(this.costMarket==0){
            console.log("twoCards",this.marketPlacement[0]);
            this.placeBottle(this.marketPlacement[0]);
          }
          else{
            this.placeBottle(this.marketPlacement[1]);
          }
          
          this.placeBottle(this.marketAction,this.costMarket);
        }
      }.bind(this)
      
    );
  },
  methods: {
    selectAll: function (n) {
      n.target.select();
    },
    placeBottle: function (action, cost) {
      console.log("placeBottle in Collectors");
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        cost: cost,
      });
      console.log(action, "the Action");
        if(action=='market'){
          this.isMarket=true;
          this.costMarket=cost;
          this.marketAction=action;
        }
        else{
          this.isMarket=false;
        }
    },
    drawCard: function () {
      this.$store.state.socket.emit("collectorsDrawCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    selectOp: function(card){
      this.handCard = card;
      document.getElementById("formHand").style.display = "block";
    },
    buyItem: function(){
      this.buyCard(this.handCard);
       document.getElementById("formHand").style.display = "none";
    },
    buyItemBottle: function(){
      this.currentAction='buyItem';
      document.getElementById("myForm").style.display = "none";
    },
    gainSkillBottle: function(){
      this.currentAction='buySkill';
      document.getElementById("myForm").style.display = "none";
    },
    auctionBottle: function(){
      this.currentAction='buyAuction';
      document.getElementById("myForm").style.display = "none";
    },
    raiseValueBottle: function(){
      this.currentAction='buyMarket';
      document.getElementById("myForm").style.display = "none";  
    },
    workBottle: function(){
      this.currentAction='buyWork';
      document.getElementById("myForm").style.display = "none"; 
    },
    gainSkill: function(){
      this.buySkill(this.handCard);
       document.getElementById("formHand").style.display = "none";
    },
    putAuction: function(){
      this.buyAuction(this.handCard);
      document.getElementById("formHand").style.display = "none";
    },
    raiseValue: function(){
      this.buyMarket(this.handCard);
      document.getElementById("formHand").style.display = "none";
    },
    buyCard: function (card) {
      if(!this.isMarket){
      console.log("buyCard", card);
      this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
      }
       else{
        this.$store.state.socket.emit("collectorsMarket", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      }); 
      }
    },
    buySkill: function (card) { // sista saken den går igenom!
      if(!this.isMarket){
      console.log("buySkill", card);
      this.$store.state.socket.emit("collectorsSkillCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
      }
      else{
        this.$store.state.socket.emit("collectorsMarket", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
        typeAction: 1,
      }); 
      }
    },
     buyAuction: function (card) { 
      if(!this.isMarket){ 
      console.log("buyAuction", card);
      this.$store.state.socket.emit("collectorsAuction", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
      }
      else{
        this.$store.state.socket.emit("collectorsMarket", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
        typeAction: 2,
      }); 
      }
    },
    buyMarket: function (card) {
      console.log("buyMarket", card);
      this.$store.state.socket.emit("collectorsMarket", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
        typeAction: 3,
      });
      console.log(card);
    },
    buyWork: function(event){
      console.log("Collectors p", event);
      console.log("Collectors index", event.index);
      console.log("Collectors cost", event.cost);
      this.$store.state.socket.emit("collectorsWork", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        cost: event.cost,
        index: event.index,
      });
    },
  
    getAuction: function (card) { 
      this.auctionPrice = -1,
      this.auctionCard = card;
      console.log(this.auctionPrice, "hej")
      document.getElementById("formAuction").style.display = "block";
    },
    PiecesA: function (){
      document.getElementById("myForm").style.display = "block";
    },
    closeForm: function() {
  document.getElementById("myForm").style.display = "none";
  },
  closeFormHand: function(){
    document.getElementById("formHand").style.display = "none";
  },
  bid: function(pMoney){
  this.auctionPrice = document.getElementById("price").value;
  console.log(this.auctionPrice, "bid");
  document.getElementById("formAuction").style.display = "none";
    if (this.auctionPrice>=0 && pMoney>=this.auctionPrice){
      this.$store.state.socket.emit("collectorsGetAuction", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: this.auctionCard,
        cost: this.auctionPrice
      });
    }
    this.auctionCard={};
  },
  bidClose: function() {
  document.getElementById("formAuction").style.display = "none";
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
.actions{
  grid-row: 4;
  grid-column: 1;
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
.boughtSkills{
  grid-row: 9;
  grid-column: 1;
}
.auctionCard{
  grid-row: 5;
  grid-column: 2;
}
.work{
grid-row: 10;
grid-column: 1;
}
.pPieces {
  grid-row: 10;
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
.form-auction {
  display: none;
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

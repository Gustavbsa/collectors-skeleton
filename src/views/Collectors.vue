<template>
<!--Group 4 Jakob Gimbringer, Gustav Boström, Thomas Parker, Fredrik Fleron -->
  <div>
    <main>
      <div class="layout">
        <div class="topPage">
          <h3>Round: {{ round }} Play order: {{ playOrder }}</h3>
          <h3 v-if="actingPlayer !== null">
            You are: {{ this.playerId }}, Current player is
            {{ playOrder[actingPlayer] }}
          </h3>
        </div>
        <div class="form-popup-end" id="theEnd">
          <form class="form-container-end">
          <h1 class="PopUpText">The winner: {{ winner }} </h1>
          <a href="http://localhost:8080/#/"><button type="button" class="newGame">New game</button></a>
          </form>
          </div>

        <div class="empty1"></div>

        <div class="allOpponents">
          <div
            class="opboardContainer"
            style="grid-area: opponent1"
            v-if="
              this.$store.state.playerCount >= 2 ||
              Object.keys(this.players).length >= 2
            "
          >
            <div class="opboard">
              <div
                v-if="
                  this.$store.state.playerId == Object.keys(this.players)[0]
                "
              >
              <p style="float:left">{{ Object.keys(this.players)[1] }}</p>
                <div class="moneyOp">
                  ${{ this.players[Object.keys(this.players)[1]].money }}
                </div>              
                <span class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[1]].hand.length }}</text>
                  </svg>
                </span>

              </div>
              
              <div
                v-else-if="
                  this.$store.state.playerId == Object.keys(this.players)[1] &&
                  Object.keys(this.players).length >= 2
                "
              >
              <p style="float:left">{{ Object.keys(this.players)[0] }}</p>
                <div class="moneyOp">
                  ${{ this.players[Object.keys(this.players)[0]].money }}
                </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[0]].hand.length }}</text>
                  </svg>
                </div>

                
              </div>

              <div
                v-else-if="
                  this.$store.state.playerId == Object.keys(this.players)[2] &&
                  Object.keys(this.players).length >= 3
                "
              >
              <p style="float:left">{{ Object.keys(this.players)[0] }}</p>
              <div class="moneyOp">
                  ${{ this.players[Object.keys(this.players)[0]].money }}
                </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[0]].hand.length }}</text>
                  </svg>
                </div>

                
              </div>
              <div
                v-else-if="
                  this.$store.state.playerId == Object.keys(this.players)[3] &&
                  Object.keys(this.players).length == 4
                "
              >
              <p style="float:left">{{ Object.keys(this.players)[0] }}</p>
              <div class="moneyOp">
                  ${{ this.players[Object.keys(this.players)[0]].money }}
                </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[0]].hand.length }}</text>
                  </svg>
                </div>

                
              </div>
              <v-container class="opboardimage">
                <OpponentBoard />
              </v-container>

            </div>
          </div>

          <div
            class="opboardContainer"
            style="grid-area: opponent2"
            v-if="
              this.$store.state.playerCount >= 3 ||
              Object.keys(this.players).length >= 3
            "
          >
            <div class="opboard">
                <div
                  v-if="
                    this.$store.state.playerId == Object.keys(this.players)[0]
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[2] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[2]].money }}
                  </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[2]].hand.length }}</text>
                  </svg>
                </div>
                  
                </div>

                <div
                  v-else-if="
                    this.$store.state.playerId ==
                      Object.keys(this.players)[1] &&
                    Object.keys(this.players).length >= 2
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[2] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[2]].money }}
                  </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[2]].hand.length }}</text>
                  </svg>
                </div>
                  
                </div>

                <div
                  v-else-if="
                    this.$store.state.playerId ==
                      Object.keys(this.players)[2] &&
                    Object.keys(this.players).length >= 3
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[1] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[1]].money }}
                  </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[1]].hand.length }}</text>
                  </svg>
                </div>


                </div>
                <div
                  v-else-if="
                    this.$store.state.playerId ==
                      Object.keys(this.players)[3] &&
                    Object.keys(this.players).length == 4
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[1] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[1]].money }}
                  </div>
                <div class="numberOfCardsContainer">
                  <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[1]].hand.length }}</text>
                  </svg>
                </div>

                  
                </div>
              </div>
              <v-container class="opboardimage">
                <OpponentBoard />
              </v-container>
            
          </div>

          <div
            class="opboardContainer"
            style="grid-area: opponent3"
            v-if="
              this.$store.state.playerCount == 4 ||
              Object.keys(this.players).length == 4
            "
          >
            <div class="opboard">

                <div
                  v-if="
                    this.$store.state.playerId == Object.keys(this.players)[0]
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[3] }}</p>
                  <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[3]].money }}
                  </div>
              <div class="numberOfCardsContainer">
                <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[3]].hand.length }}</text>
                  </svg>
              </div>

                </div>

                <div
                  v-else-if="
                    this.$store.state.playerId ==
                      Object.keys(this.players)[1] &&
                    Object.keys(this.players).length >= 2
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[3] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[3]].money }}
                  </div>
                  <div class="numberOfCardsContainer">
                <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[3]].hand.length }}</text>
                  </svg>
              </div>

                  
                </div>

                <div
                  v-else-if="
                    this.$store.state.playerId ==
                      Object.keys(this.players)[2] &&
                    Object.keys(this.players).length >= 3
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[3] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[3]].money }}
                  </div>
                  <div class="numberOfCardsContainer">
                <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[3]].hand.length }}</text>
                  </svg>
              </div>

                  
                </div>
                <div
                  v-else-if="
                    this.$store.state.playerId ==
                      Object.keys(this.players)[3] &&
                    Object.keys(this.players).length == 4
                  "
                >
                <p style="float:left">{{ Object.keys(this.players)[2] }}</p>
                <div class="moneyOp">
                    ${{ this.players[Object.keys(this.players)[2]].money }}
                  </div>
                  <div class="numberOfCardsContainer">
                <img src="/images/backsideCard.png" class="imageCard" />
                  <svg class="numberOCards" viewBox="0 0 40 20">
                    <text x="0" y="15" >{{ this.players[Object.keys(this.players)[2]].hand.length }}</text>
                  </svg>
              </div>

                  
                </div>
              </div>
              <v-container class="opboardimage">
                <OpponentBoard />
              </v-container>
            </div>
          
        </div>

<div class="pBoard">
          <v-container class="pboard">
            <PlayerBoard />
          <div class="form-popup-bottle" id="bottlebuttons">
            <form class="form-container-bottle">
              <button type="button" class="bottleB" v-on:click="drawCardBottle();" :disabled="drawCardBottleDone()">1: don't get a card</button>
              <button type="button" class="bottleB" v-on:click="getMoneyOne();" :disabled="drawCardBottleDone1()">2: don't get 1$</button>
              <button type="button" class="bottleB" v-on:click="getMoneyTwo();" :disabled="drawCardBottleDone2()">3: don't get 2$</button>
            </form>
          </div>
          
           
          <div class="form-popup" id="myForm">
          <form class="form-container">
          <h1 class="PopUpText">Actions available {{players[playerId].bottles}}</h1>

          <button type="button" class="buyItem" v-on:click="buyItemBottle();">Buy Item</button>
          <button type="button" class="gainSkill" v-on:click="gainSkillBottle()">Gain Skill</button>
          <button type="button" class="auction" v-on:click="auctionBottle()">Auction</button>
          <button type="button" class="raiseValue" v-on:click="raiseValueBottle()">Raise Value</button>
          <button type="button" class="work" v-on:click="workBottle()">work</button>
          <br>
          <button type="button" class="cancel" v-on:click="closeForm()">Close</button>
          </form></div>

          </v-container>
          <br /><br />
          <div>
            <button class="shape">${{ players[playerId].money }}</button> 
            <button class="pieces1" v-on:click="PiecesA()">
            <BluePieces />
            </button>
          </div>
          <div class="form-popup" id="bottlePlace">
            <form class="form-containerBottle">
            <h1 class="PopUpText">Place your bottles on your playerboard</h1>
            <button type="button" class="cancel" v-on:click="closeBottlePlace()">Close</button>
            </form>
          </div>
            {{labels.hand}}
          <div class="cardslots" v-if="players[playerId]">
          <div  v-for="(card, index) in players[playerId].hand" :key="index">
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="selectOp(card)"
            />
          </div>
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

        <div class="actions" v-if="this.currentAction == 'buyItem'">
          <CollectorsBuyActions
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :itemsOnSale="itemsOnSale"
            :marketValues="marketValues"
            :placement="buyPlacement"
            :playOrder="playOrder"
            :actingPlayer="actingPlayer"
            :playerId="playerId"
            @buyCard="buyCard($event)"
            @placeBottle="placeBottle('buy', $event)"
          />
          <div class="buttons" v-if="actingPlayer !== null">
            <button
              :disabled="this.playOrder[actingPlayer] !== playerId"
              @click="drawCard"
            >
              {{ labels.draw }}
            </button>
          </div>
        </div>

        <div class="actions" v-if="this.currentAction == 'buySkill'">
          <CollectorsSkillAction
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :skillsOnSale="skillsOnSale"
            :marketValues="marketValues"
            :placement="skillPlacement"
            :playOrder="playOrder"
            :actingPlayer="actingPlayer"
            :playerId="playerId"
            @buySkill="buySkill($event)"
            @placeBottle="placeBottle('skill', $event)"
          />
        </div>

        <div class="actions" v-if="this.currentAction == 'buyAuction'">
          <CollectorsAuction
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :auctionCards="auctionCards"
            :marketValues="marketValues"
            :placement="auctionPlacement"
            :playOrder="playOrder"
            :actingPlayer="actingPlayer"
            :playerId="playerId"
            @placeBottle="placeBottle('auction', $event)"
            @buyAuction="buyAuction($event)"
          />
        </div>
        <div class="inventory">
          <div class="itemCards">
            {{ labels.items }}
            <div class="cardslots" v-if="players[playerId]">
              <div
                v-for="(card, index) in players[playerId].items"
                :key="index"
              >
                <CollectorsCard :card="card" />
              </div>
            </div>
          </div>
          <div class="boughtSkills">
             {{ labels.boughtSkills }}
            <div class="cardslots" v-if="players[playerId]">
              <div
                v-for="(card, index) in players[playerId].skills"
                :key="index"
              >
                <CollectorsCard :card="card" />
              </div>
            </div>
          </div>
        </div>
        <div class="auctionCard">
          {{ labels.currentAuction }}

          <div class="auctionArea">
            <div style="margin: 0 auto 0 auto; width: 130px">
              <div class="cardslots" v-if="boughtAuction">
                <div v-for="(card, index) in boughtAuction" :key="index">
                  <CollectorsCard
                    :card="card"
                    :availableAction="card.available"
                    @doAction="getAuction(card)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-auction" id="formAuction">
            <form class="form-container">
              <h1 class="PopUpText">Auction</h1>

              <label for="Auction price"
                ><b class="PopUpText">Auction price</b></label
              >
              <input
                type="number"
                placeholder="Enter price"
                name="price"
                id="price"
                required
              />
              <button
                type="button"
                class="btn"
                v-on:click="bid(players[playerId].money)"
              >
                Bid
              </button>
              <button type="button" class="btn cancel" v-on:click="bidClose()">
                Close
              </button>
            </form>
          </div>
        </div>
        <div class="actions" v-if="this.currentAction == 'buyMarket'">
          <CollectorsMarket
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :market="market"
            :skillsOnSale="skillsOnSale"
            :auctionCards="auctionCards"
            :marketValues="marketValues"
            :placement="marketPlacement"
            :secondAction="secondAction"
            :playOrder="playOrder"
            :actingPlayer="actingPlayer"
            :playerId="playerId"
            @buySkill="buySkill($event)"
            @buyAuction="buyAuction($event)"
            @placeBottle="placeBottle('market', $event)"
          />
        </div>
        <div class="actions" v-if="this.currentAction == 'buyWork'">
          <CollectorsWork
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="workPlacement"
            :playOrder="playOrder"
            :actingPlayer="actingPlayer"
            :playerId="playerId"
            @placeBottle="placeBottle('work', $event)"
            @buyWork="buyWork($event)"
          />
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
    <button @click="toggleTutorial()">
      Tutorial
    </button>
    <a href="http://localhost:8080/#/"><button type="button" >{{labels.leave}}</button></a>
      
    
    
      
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
    <embed id="tutorial" style="display: none" src="/7._Rules_-_Collectors_0.4.pdf" width="1000px" height="1000px"/>
  </div>
</template>

<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsBuyActions from "@/components/CollectorsBuyActions.vue";
import BluePieces from "@/components/BluePieces.vue";
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
    BluePieces,
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
      playOrder: [],
      round: 0,
      actingPlayer: null,
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
      skillValue: {
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
      },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],
      boughtAuction: [],
      market: [],
      isMarket: false,
      twoCards: false,
      costMarket: -1,
      marketAction: "",
      currentAction: "",
      secondAction: false,
      nextPhase: Boolean,
      playerFinished: [],
      newCard: true,
      marketTwoCards: Boolean,
      numButtons: 0,
      drawCardB: false,
      getMoney1: false,
      getMoney2: false,
      bottlesA: false,
      winner: [],
      duplicate: false,
      hand: false,


    };
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
  watch: {
    players: function () {
      for (let p in this.players) {
        for (let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
            this.$set(this.players[p].hand[c], "available", false);
        }
      }
    },
    marketTwoCards: function () {
      console.log("marketTwo");
      this.players();
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
        this.skillValue = d.skillValue;
        this.round = d.round;
        this.playOrder = d.playOrder;
        this.actingPlayer = d.actingPlayer;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsUpdatePlayers",
      function (players) {
        this.players = players;
        
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
      "collectorsCardBought",
      function (d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        this.actingPlayer = d.actingPlayer;
        for (let playerI in this.players) {
          console.log(
            "this player: ",
            playerI,
            " has: ",
            this.players[playerI].bottleActions,
            " bottleActions"
          );
        }
        this.checkPhase();
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsWorkBought",
      function (d) {
        console.log(d.playerId, "bought a work");
        this.players = d.players;
        this.actingPlayer = d.actingPlayer;
        for (let playerI in this.players) {
          console.log(
            "this player: ",
            playerI,
            " has: ",
            this.players[playerI].bottleActions,
            " bottleActions"
          );
        }
        this.checkPhase();
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsSkillBought",
      function (d) {
        console.log(d.playerId, "bought a skill");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
        this.skillValue = d.skillValue;
        this.actingPlayer = d.actingPlayer;
        for (let playerI in this.players) {
          console.log(
            "this player: ",
            playerI,
            " has: ",
            this.players[playerI].bottleActions,
            " bottleActions"
          );
        }
        this.checkPhase();
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsAuctionBought",
      function (d) {
        console.log(d.playerId, "bought a auction card");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.boughtAuction = d.boughtAuction;
        this.actingPlayer = d.actingPlayer;
        for (let playerI in this.players) {
          console.log(
            "this player: ",
            playerI,
            " has: ",
            this.players[playerI].bottleActions,
            " bottleActions"
          );
        }
        this.checkPhase();
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
      "collectorsLostAction",
      function (d) {
        console.log(d.playerId, "lost a action");
        this.players = d.players;
        for (let playerId in this.players) {
          console.log(
            "This player ",
            playerId,
            " has this many actions left: ",
            this.players[playerId].bottleActions
          );
        }
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsMarketBought",
      function (d) {
        console.log(d.playerId, "bought a card from market");
        this.players = d.players;
        this.market = d.market;
        this.auctionCards = d.auctionCards;
        this.skillsOnSale = d.skillsOnSale;
        this.marketValues = d.marketValues;
        this.actingPlayer = d.actingPlayer;
        this.isMarket = false;

        if (this.costMarket == 0 && this.newCard == true) {
          this.newCard = false;
          this.secondAction = true;
          console.log("return", this.marketAction, this.costMarket);
          this.placeBottle(this.marketAction, this.costMarket);
        } else {
          for (let playerI in this.players) {
            console.log(
              "this player: ",
              playerI,
              " has: ",
              this.players[playerI].bottleActions,
              " bottleActions"
            );
          }
          this.checkPhase();
        }
        if (this.costMarket == 0 && this.newCard == false) {
          this.twoCards = false;
          this.marketTwoCards = true; // hur kan man få den att titta
          for (let playerI in this.players) {
            console.log(
              "this player: ",
              playerI,
              " has: ",
              this.players[playerI].bottleActions,
              " bottleActions"
            );
          }
          this.checkPhase();
        }
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsGotMoney",
      function (d) {
        console.log(d.playerId, "You got money, bee");
        this.players = d.players;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsCheck",
      function (d) {
        console.log(d.playerId, "New round");
        this.players = d.players;
        this.nextRound = d.nextRound;
        if (this.nextRound) {
          this.refillCards();
        }
      }.bind(this)
    );
      this.$store.state.socket.on(
        "collectorsCardsRefilled",
        function (d) {
          this.itemsOnSale = d.itemsOnSale;
          this.skillsOnSale = d.skillsOnSale;
          this.auctionCards = d.auctionCards;
          this.players = d.players;
          this.round= d.round;
          this.$store.state.socket.emit("collectorsResetPlacement", {roomId: this.$route.params.id});
          this.drawCardB = false;
          this.getMoney1 = false;
          this.getMoney2 = false;
          this.secondAction = false;
          if(d.checkEnd){
            console.log("the winner has been decided");
            for(let playerId in this.players){
              if(this.players[playerId].winner){
                console.log("the winner is: ", playerId);
              }
            }
            this.endGame();
          }
        }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsPlacementReset",
      function (d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
        this.workPlacement = d.workPlacement;
      }.bind(this)
    );
    
  },
  methods: {
    toggleTutorial: function () {
      var x = document.getElementById("tutorial");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
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
      if (action == "market") {
        this.isMarket = true;
        this.costMarket = cost;
        if (this.costMarket == 0) {
          this.twoCards = true;
        }
        this.marketAction = action;
      } else {
        this.isMarket = false;
      }
    },
    drawCard: function () {
      this.$store.state.socket.emit("collectorsDrawCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    selectOp: function (card) {
      this.handCard = card;
      document.getElementById("formHand").style.display = "block";
    },
    buyItem: function () {
      this.hand = true;
      this.buyCard(this.handCard);
      document.getElementById("formHand").style.display = "none";
    },
    buyItemBottle: function () {
      this.currentAction = "buyItem";
      document.getElementById("myForm").style.display = "none";
    },
    gainSkillBottle: function () {
      this.currentAction = "buySkill";
      document.getElementById("myForm").style.display = "none";
    },
    auctionBottle: function () {
      this.currentAction = "buyAuction";
      document.getElementById("myForm").style.display = "none";
    },
    raiseValueBottle: function () {
      this.currentAction = "buyMarket";
      document.getElementById("myForm").style.display = "none";
    },
    workBottle: function () {
      this.currentAction = "buyWork";
      document.getElementById("myForm").style.display = "none";
    },
    gainSkill: function () {
      this.hand = true;
      this.buySkill(this.handCard);
      document.getElementById("formHand").style.display = "none";
    },
    putAuction: function () {
      this.hand = true;
      this.buyAuction(this.handCard);
      document.getElementById("formHand").style.display = "none";
    },
    raiseValue: function () {
      if (this.isMarket) {
        console.log("action", this.marketAction);
        this.buyAuction(this.handCard);
        this.isMarket = false;
        document.getElementById("formHand").style.display = "none";
      }
    },
    //funktioner kopplat till datahandlerCollectors
    buyCard: function (card) {
      console.log("buyCard", card);
      if(this.hand){
        this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: 1,
        hand: this.hand,
      });
      this.hand=false;
      }
      else{
        this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
        hand: this.hand,
      }); 
      } 
    },
    buySkill: function (card) {
      console.log("buySkill", card);
      if (!this.isMarket) {
        if(this.hand){
          this.$store.state.socket.emit("collectorsSkillCard", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: 1,
          hand: this.hand,
        });
        this.hand = false;
        }
        else{
          this.$store.state.socket.emit("collectorsSkillCard", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost,
          hand: this.hand,
        });
        }
        
      } else {
        this.$store.state.socket.emit("collectorsMarket", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost,
          typeAction: 1,
          secondAction: this.secondAction,
        });
      }
    },
    buyAuction: function (card) {
      console.log("buyAuction", card);
      if (!this.isMarket) {
        if(this.hand){
          this.$store.state.socket.emit("collectorsAuction", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: 1,
          hand: this.hand,
        });
        this.hand = false;
        }
        else{
          this.$store.state.socket.emit("collectorsAuction", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost,
          hand: this.hand,
        });
        }
      } else {
        this.$store.state.socket.emit("collectorsMarket", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost,
          typeAction: 2,
          secondAction: this.secondAction,
        });
      }
    },

    refillCards: function () {
      console.log("RefillCards");
      this.$store.state.socket.emit("collectorsRefillCards", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },

    buyWork: function (event) {
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
      (this.auctionPrice = -1), (this.auctionCard = card);
      console.log(this.auctionPrice, "hej");
      document.getElementById("formAuction").style.display = "block";
    },
    PiecesA: function () {
      document.getElementById("myForm").style.display = "block";
    },
    closeForm: function () {
      document.getElementById("myForm").style.display = "none";
    },
    closeFormHand: function () {
      document.getElementById("formHand").style.display = "none";
    },
    bottlesPlace: function () {
      document.getElementById("bottlePlace").style.display = "block";
    },
    closeBottlePlace: function () {
      document.getElementById("bottlePlace").style.display = "none";
    },
    bid: function (pMoney) {
      this.auctionPrice = document.getElementById("price").value;
      console.log(this.auctionPrice, "bid");
      document.getElementById("formAuction").style.display = "none";
      if (this.auctionPrice >= 0 && pMoney >= this.auctionPrice) {
        this.$store.state.socket.emit("collectorsGetAuction", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: this.auctionCard,
          cost: this.auctionPrice,
        });
      }
      this.auctionCard = {};
    },
    bidClose: function () {
      document.getElementById("formAuction").style.display = "none";
    },
    effectOfBottles: function (playerId, bottleActions) {
      if (bottleActions > 0) {
        document.getElementById("bottlebuttons").style.display = "block";
        this.numButtons = bottleActions;
      }
    },
    drawCardBottle: function () {
      if (this.numButtons > 0) {
        this.numButtons -= 1;
        this.drawCardB = true;
        console.log(
          "player: ",
          this.playerId,
          " has this many actions: ",
          this.players[this.playerId].bottleActions
        );
        this.$store.state.socket.emit("collectorsNumButtons", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
        });
        console.log(
          "player: ",
          this.playerId,
          " has this many actions: ",
          this.players[this.playerId].bottleActions
        );

        if (this.numButtons <= 0) {
          console.log("it's time");
          document.getElementById("bottlebuttons").style.display = "none";
          console.log("getMoney1: ", this.getMoney1);
          if (this.getMoney1 == false) {
            this.$store.state.socket.emit("collectorsgetMoney", {
              roomId: this.$route.params.id,
              playerId: this.playerId,
              extraMoney: 1,
            });
          }
          console.log("getMoney2: ", this.getMoney2);
          if (this.getMoney2 == false) {
            this.$store.state.socket.emit("collectorsgetMoney", {
              roomId: this.$route.params.id,
              playerId: this.playerId,
              extraMoney: 2,
            });
          }
        }
        this.doneOr();
      }
    },
    getMoneyOne: function () {
      if (this.numButtons > 0) {
        this.getMoney1 = true;
        this.numButtons -= 1;
        console.log(
          "player: ",
          this.playerId,
          " has this many actions: ",
          this.players[this.playerId].bottleActions
        );
        this.$store.state.socket.emit("collectorsNumButtons", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
        });
        console.log(
          "player: ",
          this.playerId,
          " has this many actions: ",
          this.players[this.playerId].bottleActions
        );
        if (this.numButtons <= 0) {
          console.log("it's time");
          document.getElementById("bottlebuttons").style.display = "none";
          console.log("getMOney 2: ", this.getMoney2);
          if (this.getMoney2 == false) {
            this.$store.state.socket.emit("collectorsgetMoney", {
              roomId: this.$route.params.id,
              playerId: this.playerId,
              extraMoney: 2,
            });
          }
          console.log("drawCard: ", this.drawCardB);
          if (this.drawCardB == false) {
            this.$store.state.socket.emit("collectorsDrawCard", {
              roomId: this.$route.params.id,
              playerId: this.playerId,
            });
          }
        }
        this.doneOr();
      }
    },
    getMoneyTwo: function () {
      if (this.numButtons > 0) {
        this.getMoney2 = true;
        this.numButtons -= 1;
        console.log(
          "player: ",
          this.playerId,
          " has this many actions: ",
          this.players[this.playerId].bottleActions
        );
        this.$store.state.socket.emit("collectorsNumButtons", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
        });
        console.log(
          "player: ",
          this.playerId,
          " has this many actions: ",
          this.players[this.playerId].bottleActions
        );
        if (this.numButtons <= 0) {
          console.log(
            "After player: ",
            this.playerId,
            " has this many actions: ",
            this.players[this.playerId].bottleActions
          );
          console.log("it's time");
          document.getElementById("bottlebuttons").style.display = "none";
          console.log("getMoney1: ", this.getMoney1);
          if (this.getMoney1 == false) {
            this.$store.state.socket.emit("collectorsgetMoney", {
              roomId: this.$route.params.id,
              playerId: this.playerId,
              extraMoney: 1,
            });
          }
          console.log("getCard: ", this.drawCardB);
          if (this.drawCardB == false) {
            this.$store.state.socket.emit("collectorsDrawCard", {
              roomId: this.$route.params.id,
              playerId: this.playerId,
            });
          }
        }
        this.doneOr();
      }
    },
    doneOr: function () {
      console.log("has entered");
      this.$store.state.socket.emit("collectorsNewRound", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    drawCardBottleDone: function () {
      return this.drawCardB;
    },
    drawCardBottleDone1: function () {
      return this.getMoney1;
    },
    drawCardBottleDone2: function () {
      return this.getMoney2;
    },
    checkPhase: function () {
      console.log(
        "this player: ",
        this.playerId,
        ": has this many ",
        this.players[this.playerId].bottleActions,
        " timeToPlaceBB: ", this.players[this.playerId].timetoPlaceBB
      );
      if (this.players[this.playerId].timetoPlaceBB) {
        this.bottlesPlace();
        console.log(
          "this player: ",
          this.playerId,
          ": has this many ",
          this.players[this.playerId].bottleActions
        );
        if (this.players[this.playerId].bottleActions > 0) {
          console.log(
            "this player1: ",
            this.playerId,
            " has: ",
            this.players[this.playerId].bottleActions,
            " bottleActions1"
          );
          this.effectOfBottles(
            this.playerId,
            this.players[this.playerId].bottleActions
          );
        }
        if (this.players[this.playerId].bottleActions <= 0) {
          console.log("Another player might have a card");
          this.$store.state.socket.emit("collectorsgetMoney", {
            roomId: this.$route.params.id,
            playerId: this.playerId,
            extraMoney: 3,
          });
          this.$store.state.socket.emit("collectorsDrawCard", {
            roomId: this.$route.params.id,
            playerId: this.playerId,
          });
        }
      
      for (let playerI in this.players) {
        if (this.players[playerI].bottleActions > 0) {
            this.bottlesA = true;
            break;
            }
          }
      if(!this.bottlesA){
        console.log("fyller på då bottlesA är falsk")
        this.refillCards();
      } 
      }
    },
  endGame: function(){
    for(let playerId in this.players){
      if(this.players[playerId].winner){
        for(let win in this.winner){
          if(this.winner[win]==playerId){
            this.duplicate = true;
            break;
          }
        }
        if(!this.duplicate){
          this.winner.push(playerId);
        }
      }
    }
    document.getElementById("theEnd").style.display = "block";
  },
  }
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
  grid-template-columns: 1fr 0.5fr 1fr;
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
  grid-row: 2;
  /*transform: scale(0.8) translate(-15%, -15%);*/
  position: relative;
}
.pboard {
  width: 60%;
  margin: 0;
}
.allOpponents {
  margin: 5vh 0 0 0;
  display: grid;
  grid-row: 1 / 3;
  grid-column: 3;
  grid-template-rows: min-content min-content min-content;
  grid-template-areas:
    "opponent1"
    "opponent2"
    "opponent3";
}
.inventory {
  grid-column: 1;
  grid-row: 3;
}
.empty1 {
  grid-row: 2;
  grid-column: 1;
}
.empty2 {
  grid-row: 2;
  grid-column: 3;
}
.opboardContainer {
  max-height: max-content;
  margin-bottom: 2%;
}
.opboard {
  margin-bottom: 2%;
}
.backsideCard1 {
  grid-row: 2;
  grid-column: 3;
  position: relative;
  height: 100%;
}
.opac {
  opacity: 0.5;
}
.auctionArea {
  background-image: url("/images/auctionBG.PNG");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  padding: 20% 0 0 0;
}

.opboardimage {
  float: left;
  width: 50%;
  height: auto;
}
.backsideCard3 {
  transform: scale(0.6) translate(110%, -120%);
}
.imageCard {
  opacity: 0.5;
  height: auto;
  width: 100%;
}
.numberOCards {
  top: 0.3em;
  left: 0.3em;
  fill: white;
  position: absolute;
}
.numberOfCardsContainer {
  position: relative;
  width: 10%;
  height: auto;
  float: left;
}
.actions {
  grid-row: 3;
  grid-column: 3;
}
.boughtSkills {
  grid-row: 3;
  grid-column: 1;
}
.auctionCard {
  text-align: center;
  align-content: center;
  display: block;
  grid-row: 2;
  grid-column: 2;
}
.pPieces {
  grid-row: 10;
  grid-column: 3;
}
.piecesOp11 {
  position: absolute;
  transform: scale(0.5);
  top: 10%;
  left: 8%;
}
.piecesOp12 {
  position: absolute;
  transform: scale(0.5);
  top: 10%;
  left: 24%;
}
.pieces1 {
  transform: scale(0.7);
  top: 23%;
  left: 12%;
}
.pieces2 {
  position: absolute;
  transform: scale(0.7);
  top: 5%;
  left: 27%;
}
.piecesOp21 {
  position: absolute;
  transform: scale(0.5);
  bottom: 6%;
  left: 9%;
}
.piecesOp22 {
  position: absolute;
  transform: scale(0.5);
  bottom: 6%;
  left: 25%;
}
.piecesOp31 {
  position: absolute;
  transform: scale(0.5);
  top: 10%;
  left: 9%;
}
.piecesOp32 {
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
  transform: scale(0.7) translate(-20%, -20%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(1) translate(-10%, -10%);
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
.moneyOp {
  float: left;
  background-color: blue;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: block;
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
.form-popup-bottle {
  max-width: max-content;
  position: absolute;
  display: none;
  position: fixed;
  border: 3px solid #f1f1f1;
  z-index: 9;
  top: 28%;
  left: 15%;
}
.form-popup-end{
  display: none;
  position: fixed;
  border: 3px solid #f1f1f1;
  z-index: 9;
  top: 12%;
  left: 42%;
}
.form-auction {
  display: none;
  z-index: 9;
}
.form-container {
  max-width: 200px;
  padding: 10px;
  background-color: white;
}
.form-container-end{
  width: 150%;
  padding: 10px;
  background-color: white;
}
.form-container-bottle{
  
  padding: 10px;
  background-color: white;
}
.newGame{
  width: 25%;
}
.bottleB{
  width: 25%;
}
.form-containerBottle {
  max-width: 600px;
  padding: 10px;
  background-color: white;
}

.PopUpText {
  color: black;
}
.form-container .cancel {
  background-color: red;
}
.itemCards {
  grid-column: 2;
  grid-row: 2;
}
#playerimage {
  margin-right: 0;
}
@media screen and (max-width: 800px) {
.layout{
  grid-template-rows: repeat(auto-fill,1fr);
  grid-template-columns: auto;
  display: grid;
  background: radial-gradient(rgb(116, 22, 22), black);
  border-radius: 5px;
  padding: 20px;
}
.topPage{
  grid-row: 1;
  grid-column: 1;
}
.pBoard{
  grid-row: 2;
  grid-column: 1;
}
.itemCards{
  grid-row: 3;
  grid-column: 1;
}
.boughtSkills{
  grid-row: 4;
  grid-column: 1;
}
.allOpponents{
  grid-row: 7;
  grid-column: 1;
}
.auctionCard{
  grid-row: 5;
  grid-column: 1;
}
.actions{
  grid-row: 6;
  grid-column: 1;
}
.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20vw);
  height:25vh; /* height needs to be proportional to width */
}

.card div:hover {
  transform: scale(0.3)translate(-10%,10%);
  z-index: 1;
}
  .card div {
  transform: scale(0.3)translate(-20%,-25%);
  transition:0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}

}
</style>
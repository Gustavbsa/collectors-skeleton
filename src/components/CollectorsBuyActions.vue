<template>
    <div>
      <h1>{{ labels.buyCard }}</h1>
      <div class="buy-cards">
        <div v-for="(card, index) in itemsOnSale" :key="index">
          <CollectorsCard 
            :card="card" 
            :availableAction="card.available" 
            @doAction="buyCard(card)"/>
          {{ cardCost(card) }}
        </div>
      </div>
      <div>
        <!-- -->
        
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          
          <button
            v-if="p.playerId===null"
            :disabled="cannotAfford(p.cost)" 
            @click="placeBottle(p)">
            ${{p.cost}}
          </button>
          
          
          <div v-if="p.playerId !== null" >
            {{p.playerId}}
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsBuyActions',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    itemsOnSale: Array,
    marketValues: Object,
    placement: Array,
    playOrder: [],
    actingPlayer: null,
    playerId: null,
  },
  methods: {
      playerOrder: function(){
      if(this.playOrder[this.actingPlayer] !== this.playerId){
        return(this.opTurn=true);
      }
      else{
        return(this.opTurn=false);
      }
    },
    cannotAfford: function (cost) {
      let minCost = 100;
      for(let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key]
      }
      this.opTurn = this.playerOrder(); 
      if(this.opTurn){
        return(true);
      }
      else{
        console.log("player money: ", this.player.money < minCost);
        return(this.player.money < minCost || this.player.bottles<1);
      }
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);
    },
   
    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        if (this.marketValues[this.itemsOnSale[i].item] <= this.player.money - cost) {
          this.$set(this.itemsOnSale[i], "available", true);
        }
        else {
          this.$set(this.itemsOnSale[i], "available", false);
        }
        this.chosenPlacementCost = cost; 
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (this.marketValues[this.player.hand[i].item] <= this.player.money - cost) {
          this.$set(this.player.hand[i], "available", true);
          this.chosenPlacementCost = cost;
        }
        else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost; 
        }
      }
    },
    buyCard: function (card) {
      if (card.available) {
        this.$emit('buyCard', card)
        this.highlightAvailableCards()
      }
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-cards, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
  }
  .buy-cards div {
    transform: scale(0.7)translate(-20%,-0%);
    transition:0.2s;
    transition-timing-function: ease-out;
    z-index: 0;
  }
  .buy-cards div:hover {
    transform: scale(1)translate(-10%,10%);
    z-index: 1;
  }
</style>

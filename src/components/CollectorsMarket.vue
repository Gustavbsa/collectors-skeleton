<template>
    <div>
      <h1>{{ labels.market }}</h1>
      <div class="buy-cards">
        <div v-for="(card, index) in market" :key="index">
          <CollectorsCard 
            :card="card" 
            /> 
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
      <h1>{{ labels.buySkill }}</h1>
      <div class="buy-cards">
        <div v-for="(card, index) in skillsOnSale" :key="index">
          <CollectorsCard 
            :card="card" 
            :availableAction="card.available" 
            @doAction="buySkill(card)"/> 
          {{ cardCost(card) }}
        </div>
      </div>
       <h1>{{ labels.auction }}</h1>
      <div class="buy-cards">
        <div v-for="(card, index) in auctionCards" :key="index">
          <CollectorsCard 
            :card="card" 
            :availableAction="card.available" 
            @doAction="buyAuction(card)"/> 
          {{ cardCost(card) }}
        </div>
      </div>


    </div>
   
</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsMarket',
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    market: Array,
    marketValues: Object,
    placement: Array,
    skillsOnSale: Array,
    auctionCards: Array,
    secondAction: Boolean,
  },
  watch:{
    secondAction: function(){
      this.highlightAvailableCards(0);
    }
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      for(let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key]
      }
      return (this.player.money < minCost || this.player.bottles<1);
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);
    },
    checkAvailable: function(card, cost){
      if (this.marketValues[card.item] <= this.player.money - cost){ 
        this.$set(card, "available", true);
      }
      else{
        this.$set(card, "available", false);
      }
    },
   
    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.market.length; i+=1){
        this.checkAvailable(this.market[i], cost);
      }
      console.log("checkAvailable");
    this.checkAvailable(this.skillsOnSale[0],cost);
    this.checkAvailable(this.auctionCards[0],cost);
      for (let i = 0; i < this.player.hand.length; i += 1){
        this.checkAvailable(this.player.hand[i],cost);
      }
    },

    
    buySkill: function (card) {
      if (card.available) {
        this.$emit('buySkill', card)
        this.highlightAvailableCards()
      }
    },
    buyAuction: function (card) {
      if (card.available) {
        this.$emit('buyAuction', card)
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

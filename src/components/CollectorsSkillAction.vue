<template>
    <div>
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
  name: 'CollectorsSkillActions',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
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
    checkAvailable: function(card, cost){
      if (this.marketValues[card.item] <= this.player.money - cost){ // kan behöva ändras, kanske skapa en ny marketvalue för skills i dataHandler
        this.$set(card, "available", true);
      }
      else{
        this.$set(card, "available", false);
      }
    },
   
    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.skillsOnSale.length; i+=1){
        this.checkAvailable(this.skillsOnSale[i], cost);
      }
      for (let i = 0; i < this.player.hand.length; i += 1){
        this.checkAvailable(this.player.hand[i],cost);
      }
    },

    buySkill: function (card) {
      if (card.available) {
        this.$emit('buySkill', card)
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

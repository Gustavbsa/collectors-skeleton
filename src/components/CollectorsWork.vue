<template>
    <div>
      <h1>{{ labels.work }}</h1>
       <div class="buttons" v-for="(p, index) in placement" :key="index">
          
          <button
            v-if="p.playerId===null"
            :disabled="cannotAfford(p.cost,p.cards)" 
            @click="placeBottle(p),buyWork(p)">
            ${{p.cost}}
          </button>
          
          
          <div v-if="p.playerId !== null" >
            {{p.playerId}}
          </div>
          
        
        </div>
      <br><!--
      <p>
      <input type="radio" id="work1" name="allWork" value="1">increase income with two<br>
      <input type="radio" id="work2" name="allWork" value="2">recive a coin<br>
      <input type="radio" id="work3" name="allWork" value="3">cost one coin, draw two new cards<br>
      <input type="radio" id="work4" name="allWork" value="4">draw one card and become the first player<br>
      <input type="radio" id="work5" name="allWork" value="5">draw one card and increase income with one 
      </p>-->
      
    </div>
   
</template>

<script>


export default {
name: 'CollectorsWork',
  components: {
  },
  props: {
    labels: Object,
    player: Object,
    placement: Array,
    hand: Array,
  },
  methods: {

    cannotAfford: function (cost, numOfCards) {
      this.tooFewCards(numOfCards);  
      return (this.player.money < cost);
    },
    tooFewCards: function(numOfCards){
        return(this.player.hand.length < numOfCards);
    },
    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
    
    },
    buyWork: function (p){
      console.log("CollectorsWork index",p.index);
      console.log("CollectorsWork p ", p);
      this.$emit('buyWork',p);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>

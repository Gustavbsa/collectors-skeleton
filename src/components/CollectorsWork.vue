<template>
    <div>
      <h1>{{ labels.work }}</h1>
       <div class="buttons" v-for="(p, index) in placement" :key="index">
          
          <button
            v-if="p.playerId===null"
            :disabled="cannotAfford(p.cost, p.cards)" 
            @click="placeBottle(p),buyWork(p)">
            ${{p.cost}}
          </button>
          
          
          <div v-if="p.playerId !== null" >
            {{p.playerId}}
          </div>
          
        
        </div>
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
     cannotAfford: function (cost, numOfCards) {
      this.opTurn = this.playerOrder(); 
      if(this.opTurn){
        return(true);
      }
      else{
        return(this.player.money < cost || this.player.bottles<1 || this.player.hand.length < numOfCards);
      }
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

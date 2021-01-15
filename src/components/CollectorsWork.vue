<template>
    <div>
      <h1>{{ labels.work }}</h1>
       
          
      <button :disabled="cannotAfford(placement[0].cost,placement[0].cards)" v-if="player.round==1 && placement[0].playerId===null" @click="placeBottle(placement[0],buyWork(placement[0]))">
        {{ labels.workoption1 }}
      </button><br>
      <button :disabled="cannotAfford(placement[1].cost,placement[1].cards)" v-if="player.round==2 && placement[1].playerId===null" @click="placeBottle(placement[1],buyWork(placement[1]))">
        {{ labels.workoption2 }}
      </button><br>
      <button :disabled="cannotAfford(placement[2].cost,placement[2].cards)" v-if="player.round==3 && placement[2].playerId===null" @click="placeBottle(placement[2],buyWork(placement[2]))">
        {{ labels.workoption3 }}
      </button><br>
      <button :disabled="cannotAfford(placement[3].cost,placement[3].cards)" v-if="player.round==4 && placement[3].playerId===null" @click="placeBottle(placement[3],buyWork(placement[3]))">
        {{ labels.workoption4 }}
      </button><br>


      <button :disabled="cannotAfford(placement[4].cost,placement[4].cards)" @click="placeBottle(placement[4],buyWork(placement[4]))">
        {{ labels.workoption5 }}
      </button><br>
      <button :disabled="cannotAfford(placement[5].cost,placement[5].cards)" v-if="placement[5] && placement[5].playerId===null" @click="placeBottle(placement[5],buyWork(placement[5]))">
        {{ labels.workoption6 }}
      </button><br>
      <button :disabled="cannotAfford(placement[6].cost,placement[6].cards)" v-if="placement[6] && placement[6].playerId===null" @click="placeBottle(placement[6],buyWork(placement[6]))">
        {{ labels.workoption7 }}
      </button><br>
      <button :disabled="cannotAfford(placement[7].cost,placement[7].cards)" v-if="placement[7] && placement[7].playerId===null" @click="placeBottle(placement[7],buyWork(placement[7]))">
        {{ labels.workoption8 }}
      </button>


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

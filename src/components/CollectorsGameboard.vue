
<template>
<div :class="['board', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction" >
  <div :class="['uselessCorner', {'available-to-choose': availableAction}]"  @click="doAction" >
    
      
  </div>

      <div :class="['gainSkills', {'available-to-choose': availableAction}]"  @click="doAction" >

      
    </div>
    <div :class="['buyItem', {'available-to-choose': availableAction}]"  @click="doAction" >

      
    </div>
    <div :class="['raiseValue', {'available-to-choose': availableAction}]"  @click="doAction" >

      
    </div>
    <div :class="['work', {'available-to-choose': availableAction}]"  @click="doAction" >

      
    </div>
    <div :class="['auction', {'available-to-choose': availableAction}]"  @click="doAction" >

      
    </div>
     

    </div>


</template>

<script>

export default {
  name: 'CollectorsGameboard',
  props: {
    board: Object,
    availableAction: Boolean
  },
  methods: {
    doAction: function() {
      this.$emit('doAction');
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .board{
    color:red;
    user-select: none;
    width:600px;
    height:800px;
    background-image: url('/images/collectors-gameboard.png');
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
  grid-template-areas:
  "c e e e e e"
  "s w a a a a"
  "s w a a a a"
  "s w a a a a"
  "s w a a a a"
  "s v v v v v";
  
    
  }
  .uselessCorner{
    grid-area:c;
  }
.gainSkills {
  grid-area: s;
      
  
}
.buyItem {
  grid-area: e;
  
}
.raiseValue {
  grid-area: v;
  
}
.work {
  grid-area: w;
  
}
.auction {
  grid-area: a;
  
}
  .available-to-choose {
    animation: jiggle 1s ease-in-out;
    animation-iteration-count:infinite;
    box-shadow: 0 0 10px yellow;
  }

  @keyframes jiggle {
    0% {transform:rotate(0.5deg);}
    50% {transform:rotate(-0.5deg);}
    100% {transform:rotate(0.5deg);}
  }


</style>
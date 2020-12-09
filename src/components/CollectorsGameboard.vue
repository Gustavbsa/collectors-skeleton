
<template>
<div :class="['board', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">
  <p>
  <img src="/images/collectors-gameboard.png" usemap="#mapname" 
    v-on:click="showCoords($event)" width="531" height="641" />
  
    <map name="mapname" >
      <area shape="rect" coords="102,300,140,200"  alt="bs1" >
      <area shape="rect" coords="102,300,140,200"  alt="bs1" >
      
      

    </map>
</p>




<p id="demo"></p>



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
    <div :class="['bottlesWork', {'available-to-choose': availableAction}]"  @click="doAction" >
    
      
    </div>
    <div :class="['auction', {'available-to-choose': availableAction}]"  @click="doAction" >
     
      
    </div>
     <div :class="['auctionCards', {'available-to-choose': availableAction}]"  @click="doAction" >
     
      
    </div>
    <div :class="['auctionBottles', {'available-to-choose': availableAction}]"  @click="doAction" >
     
      
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
    },
    showCoords: function(event) {
        var x = event.clientX;
        var y = event.clientY;
        var coords = "X coords: " + x + ", Y coords: " + y;
        document.getElementById("demo").innerHTML = coords;
        console.log(coords);
        
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
    height:700px;
    /*
    
    background-image: url('/images/collectors-gameboard.png');
    
    background-repeat: no-repeat;
    background-position:cover;
    
    border-radius: 10px;
    display: grid;
    background-size: 100%;
    
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
  
    
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
   
  grid-template-areas:
  "c e e e e e"
  "s bw w ab a ad"
  "s bw w ab ac ac"
  "s bw w ab ac ac"
  "s bw w acr ac ac"
  "s v v v v v";
  */
    
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
.bottlesWork{
  grid-area: bw;
  
}

.auction {
  grid-area: a;
  
}
.auctionCards {
  grid-area: ac;
  
}
.auctionCardRaiseValue {
  grid-area: acr;
  
}
.auctionDeck {
  grid-area: ad;
  
}
.auctionBottles {
  grid-area: ab;
  
  
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
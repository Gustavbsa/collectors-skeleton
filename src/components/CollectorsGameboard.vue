
<template>
<div :class="['board', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">
  <p>
  <img src="/images/collectors-gameboard.png" usemap="#mapname" 
    v-on:click="showCoords($event)" width="531" height="641" />
  
    <map name="mapname" >
<<<<<<< HEAD
      <area shape="rect" coords="102,300,140,200"  alt="bs1" target="_blank" href="https://www.google.com">
=======
      <area target="" alt="bs1" title="bs1" href="" coords="38,300,80,339" shape="rect">
    <area target="" alt="bs2" title="bs2" href="" coords="38,356,80,396" shape="rect">
    <area target="" alt="bs3" title="bs3" href="" coords="39,410,82,453" shape="rect">
    <area target="" alt="bs4" title="bs4" href="" coords="38,465,80,507" shape="rect">
    <area target="" alt="bs5" title="bs5" href="" coords="39,522,79,565" shape="rect">
    <area target="" alt="qt" title="qt" href="" coords="121,221,163,262" shape="rect">
    <area target="" alt="bw1" title="bw1" href="" coords="120,279,162,321" shape="rect">
    <area target="" alt="bw2" title="bw2" href="" coords="120,337,163,378" shape="rect">
    <area target="" alt="bw3" title="bw3" href="" coords="121,390,161,428" shape="rect">
    <area target="" alt="bw4" title="bw4" href="" coords="121,444,159,481" shape="rect">
    <area target="" alt="ba1" title="ba1" href="" coords="276,135,317,176" shape="rect">
    <area target="" alt="ba2" title="ba2" href="" coords="275,196,317,238" shape="rect">
    <area target="" alt="ba3" title="ba3" href="" coords="274,256,317,297" shape="rect">
    <area target="" alt="ba4" title="ba4" href="" coords="275,320,318,359" shape="rect">
    <area target="" alt="bv1" title="bv1" href="" coords="272,545,314,581" shape="rect">
    <area target="" alt="bv2" title="bv2" href="" coords="341,542,384,583" shape="rect">
    <area target="" alt="bv3" title="bv3" href="" coords="413,544,452,583" shape="rect">
    <area target="" alt="bi1" title="bi1" href="" coords="114,38,157,77" shape="rect">
    <area target="" alt="bi2" title="bi2" href="" coords="170,39,209,81" shape="rect">
    <area target="" alt="bi3" title="bi3" href="" coords="226,38,268,78" shape="rect">
    <area target="" alt="bi4" title="bi4" href="" coords="283,40,321,78" shape="rect">
    <area target="" alt="bi5" title="bi5" href="" coords="339,40,377,79" shape="rect">
    <area target="" alt="aDeck" title="aDeck" href="" coords="450,119,526,228" shape="rect">
    <area target="" alt="aCards1" title="aCards1" href="" coords="450,260,528,374" shape="rect">
    <area target="" alt="aCards2" title="aCards2" href="" coords="449,384,529,498" shape="rect">
    <area target="" alt="aCards3" title="aCards3" href="" coords="357,386,439,499" shape="rect">
    <area target="" alt="aCards4RV" title="aCards4RV" href="" coords="264,386,344,499" shape="rect">
    <area target="" alt="aCardSA" title="aCardSA" href="" coords="337,162,420,282" shape="rect">
    <area target="" alt="sSlot1" title="sSlot1" href="" coords="1,40,33,157" shape="rect">
    <area target="" alt="sSlot2" title="sSlot2" href="" coords="1,160,32,275" shape="rect">
    <area target="" alt="sSlot3" title="sSlot3" href="" coords="3,281,32,393" shape="rect">
    <area target="" alt="sSlot4" title="sSlot4" href="" coords="1,398,32,515" shape="rect">
    <area target="" alt="sSlot5" title="sSlot5" href="" coords="1,520,33,636" shape="rect">
    <area target="" alt="vSlot1" title="vSlot1" href="" coords="107,599,189,639" shape="rect">
    <area target="" alt="vSlot2" title="vSlot2" href="" coords="194,599,276,639" shape="rect">
    <area target="" alt="vSlot3" title="vSlot3" href="" coords="280,599,362,639" shape="rect">
    <area target="" alt="vSlot4" title="vSlot4" href="" coords="367,597,448,639" shape="rect">
    <area target="" alt="vSlot5" title="vSlot5" href="" coords="452,599,536,638" shape="rect">
    <area target="" alt="iSlot1" title="iSlot1" href="" coords="24,1,106,30" shape="rect">
    <area target="" alt="iSlot2" title="iSlot2" href="" coords="112,0,191,30" shape="rect">
    <area target="" alt="iSlot3" title="iSlot3" href="" coords="198,1,278,31" shape="rect">
    <area target="" alt="iSlot4" title="iSlot4" href="" coords="283,1,365,31" shape="rect">
    <area target="" alt="iSlot5" title="iSlot5" href="" coords="370,0,451,31" shape="rect">
      
      
      
>>>>>>> 9eaec264a85dc829358ab77fe91d3a41f55edeb6

    </map>
</p>




<p id="demo"></p>



  
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

<template>
<div :class="['pboard', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">
<img src="/images/PlayerBoard.PNG" usemap="#pBoard" 
     width="900" height="100%" />
<map name="pBoard">
    <area target="" alt="pB1" title="pB1" href="" coords="123,67,222,157" shape="rect">
    <area target="" alt="pB2" title="pB2" href="" coords="265,65,362,155" shape="rect">
    <area target="" alt="pB3" title="pB3" href="" coords="405,64,505,153" shape="rect">
    <area target="" alt="pB4" title="pB4" href="" coords="546,64,644,153" shape="rect">
    <area target="" alt="pB5" title="pB5" href="" coords="689,65,785,157" shape="rect">
    <area target="" alt="pS" title="pS" href="" coords="1,47,77,193" shape="rect">
    <area target="" alt="pH" title="pH" href="" coords="822,46,909,191" shape="rect">
    <area target="" alt="pC" title="pC" href="" coords="355,182,554,236" shape="rect">
</map>
      
    </div>
    

</template>

<script>

export default {
  name: 'PlayerBoard',
  props: {
    pieces: Object,
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
  .pboard{
    color: blue;
    user-select: none;
    /*
    width:900px;
    height:300px;
    background-image: url('/images/PlayerBoard.PNG');
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 5px;
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

<template>
<div :class="['pboard', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">

      
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
    width:900px;
    height:300px;
    background-image: url('/images/PlayerBoard.PNG');
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 5px;
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
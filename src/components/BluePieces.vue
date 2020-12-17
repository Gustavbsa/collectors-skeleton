
<template>
<div :class="['pieces', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">

      
    </div>
    

</template>

<script>

export default {
  name: 'BluePieces',
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
  .pieces{
    color: blue;
    user-select: none;
    width:100px;
    height:100px;
    background-image: url('/images/BottleBlue.PNG');
    background-size: 80%;
    background-repeat: no-repeat;
    border-radius: 4px;
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
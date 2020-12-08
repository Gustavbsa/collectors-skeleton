
<template>
<div :class="['board', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">

      
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
  .board {
    color:red;
    user-select: none;
    width:600px;
    height:800px;
    background-image: url('/images/collectors-gameboard.png');
    background-repeat: no-repeat;
    border-radius: 10px;
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
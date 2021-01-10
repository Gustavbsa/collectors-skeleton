
<template>

<img src="/images/PlayerBoard.PNG" usemap="#pBoard" 
     width="80%" />      

    

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
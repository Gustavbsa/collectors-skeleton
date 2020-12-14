<template>
<div>
    <img src="/images/PlayerBoard.PNG"
     width="100%" height="100%" />
</div>

</template>

<script>

export default {
  name: 'OpponentBoard',
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

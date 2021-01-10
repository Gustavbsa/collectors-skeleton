<template>
    <img src="/images/PlayerBoard.PNG"
       width="100%" margin="0" />
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

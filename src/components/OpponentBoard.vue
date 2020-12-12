<template>
<div :class="['pboard', {'available-to-choose': availableAction}]" :style="{'background-position': width + height}" @click="doAction">
    <img src="/images/PlayerBoard.PNG"
     width="900" height="100%" />
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

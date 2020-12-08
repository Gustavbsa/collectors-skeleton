<template>
  <div class="center">
    <div>
      <h1>Collectors</h1>
      <label for="players">Select number of players</label><br>
      <select id="Number_of_Players" name="players">
        <option v-for="i in 3" :key="i">
          <a value="">{{i+1}}</a>
        </option>
      </select>
      <button v-on:click="start('en');">Start game</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created: function () {
    this.$store.commit('SET_ROOM_ID');
  },
  methods: {
    start: function (lang='en') {
      this.name = document.getElementById("Number_of_Players").value;
      this.$store.commit('SETUP_GAME', {roomId: this.$store.state.roomId, 
        playerCount: this.name,
        lang: lang });
      this.$router.push("/room/" + this.$store.state.roomId);
    }
  }
}
</script>
<style scoped>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1em;
  }
</style>

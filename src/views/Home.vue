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
      <button v-on:click="start()">Start game</button>
    </div>
    <div class="form-popup" id="myForm">
    <form class="form-container">
    
    <h1 class="PopUpText">Game setup</h1>

    <label for="Username"><b class="PopUpText">Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required>

    <label for="Link"><b class="PopUpText">Link</b></label>
    <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">

    <button type="button" class="btn" v-on:click="gameStart('en');">Start Game</button>
    <button type="button" class="btn cancel" v-on:click="closeForm()">Close</button>
  </form></div>
  <div class="picture"><BakgroundImg/></div>
  </div>
</template>

<script>
import BakgroundImg from '@/components/BakgroundImg.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components:{
    BakgroundImg
  },
  created: function () {
    this.$store.commit('SET_ROOM_ID');
  },
  methods: {
    start: function () {
      document.getElementById("myForm").style.display = "block";
    },
  closeForm: function() {
  document.getElementById("myForm").style.display = "none";
  },
  gameStart: function(lang='en'){
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
  .form-popup {
  display: none;
  position: fixed;
  position: center;
  border: 3px solid #f1f1f1;
  z-index: 9;
}
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
.form-container .cancel {
  background-color: red;
}

.form-container input[type=text] {
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}
.PopUpText{
  color: black;
}


</style>

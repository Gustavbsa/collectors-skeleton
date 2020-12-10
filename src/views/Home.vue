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
      <button v-on:click="startInfo()">Game Rules</button>
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

  <div class="info-popup" id="infopop">
    <form class="info-container">
    
    <h1 class="InfoText">Game Rules</h1>

    <input type="page" id="number" value="0"/>
    <div id="pages"> 
    </div>


    <button type="button" class="btn conitnue" v-on:click="nextInfo()">Continue</button>
    <button type="button" class="btn back" v-on:click="backInfo()">Back</button>
    <button type="button" class="btn end" v-on:click="closeInfo()">Close</button>
  </form>

  </div>
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
  },
startInfo: function(){
  document.getElementById("infopop").style.display = "block";
   var value = parseInt(document.getElementById('number').value);
   value=1;
   document.getElementById('number').value = value;
   document.getElementById("pages").innerHTML = "Detta är sida 1"

  

  },
  nextInfo: function(){
    var value = parseInt(document.getElementById('number').value);
    if (value<10){
      value++;
    }
    document.getElementById('number').value = value;
    if(value==2){
      document.getElementById("pages").innerHTML = "Detta är sida 2"
    }else if(value==3){document.getElementById("pages").innerHTML = "Detta är sida 3"}
    else if(value==4){document.getElementById("pages").innerHTML = "Detta är sida 4"}
    else if(value==5){document.getElementById("pages").innerHTML = "Detta är sida 5"}
    else if(value==6){document.getElementById("pages").innerHTML = "Detta är sida 6"}
    else if(value==7){document.getElementById("pages").innerHTML = "Detta är sida 7"}
    else if(value==8){document.getElementById("pages").innerHTML = "Detta är sida 8"}
    else if(value==9){document.getElementById("pages").innerHTML = "Detta är sida 9"}
    else if(value==10){document.getElementById("pages").innerHTML = "Detta är sida 10"}

  },
  backInfo: function(){
    var value = parseInt(document.getElementById('number').value);
    if (value>1){
      value--;
    }
    document.getElementById('number').value = value;
    if(value==1){
      document.getElementById("pages").innerHTML = "Detta är sida 1"
    }
    else if(value==2){document.getElementById("pages").innerHTML = "Detta är sida 2"}
    else if(value==3){document.getElementById("pages").innerHTML = "Detta är sida 3"}
    else if(value==4){document.getElementById("pages").innerHTML = "Detta är sida 4"}
    else if(value==5){document.getElementById("pages").innerHTML = "Detta är sida 5"}
    else if(value==6){document.getElementById("pages").innerHTML = "Detta är sida 6"}
    else if(value==7){document.getElementById("pages").innerHTML = "Detta är sida 7"}
    else if(value==8){document.getElementById("pages").innerHTML = "Detta är sida 8"}
    else if(value==9){document.getElementById("pages").innerHTML = "Detta är sida 9"}
    else if(value==10){document.getElementById("pages").innerHTML = "Detta är sida 10"}

  },
  closeInfo: function(){
    document.getElementById("infopop").style.display = "none";
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
  .info-popup {
  display: none;
  position: fixed;
  position: center;
  border: 3px solid #f1f1f1;
  z-index: 9;
}
.info-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}
.info-container .end {
  background-color: red;
}
.info-container {
  max-width: 600px;
  padding: 10px;
  background-color: blue;
}

.InfoText{
  color:black;
}
.firstpage{
  color: #4CAF50;
}


</style>

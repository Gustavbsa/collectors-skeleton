<template>
  <div class="center">
    <div>
      <h1>Collectors</h1>
      <label for="players">Select number of players</label><br />
      <select id="Number_of_Players" name="players">
        <option v-for="i in 3" :key="i">
          <a>{{ i + 1 }}</a>
        </option>
      </select>
      <label for="lang">Select language</label><br />
      <select id="gameLanguage" name="lang">
        <option>English</option>
        <option>Svenska</option></select
      ><br /><br />
      <button v-on:click="startInfo()">Game Info</button>
      <button v-on:click="start(selectLanguage())">Start game</button>
    </div>
    <div class="form-popup" id="myForm">
      <form class="form-container">
        <h1 class="PopUpText">Game setup</h1>

        
        <label for="Username"><b class="PopUpText">Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" />
        
        <label for="Link"><b class="PopUpText">Link</b></label>

        <div>
          <input
            class="linkText"
            type="text"
            id="roomLink"
            :value="'localhost:8080/#/room/' + room"
          />
          <div v-on:click="copyLink()" id="copyButton">
            <img id="clipboardimg" src="/images/copyclipboard.png" />
            <span id="copyButtonText">Copy</span>
          </div>
        </div>

        <button type="button" class="btn" v-on:click="gameStart()">
          Start Game
        </button>
        <button type="button" class="btn cancel" v-on:click="closeForm()">
          Close
        </button>
      </form>
    </div>

    <div class="info-popup" id="infopop">
      <form class="info-container">
        <h1 class="InfoText">Game Info</h1>

        <div id="pages"></div>

        <button type="button" class="btn conitnue" v-on:click="nextInfo()">
          Continue
        </button>
        <button type="button" class="btn back" v-on:click="backInfo()">
          Back
        </button>
        <button type="button" class="btn end" v-on:click="closeInfo()">
          Close
        </button>
        <h5 class="Pagenumber" id="number">Page: {{ value }} out of 7</h5>
      </form>
    </div>
    <div class="picture"><BakgroundImg /></div>
  </div>
</template>

<script>
import BakgroundImg from "@/components/BakgroundImg.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    BakgroundImg,
  },

  data: function () {
    return {
      room: "",
      value: "",
    };
  },
  created: function () {
    this.$store.commit("SET_ROOM_ID");
  },
  methods: {
    start: function (lang) {
      document.getElementById("myForm").style.display = "block";
      this.number = document.getElementById("Number_of_Players").value;
      this.$store.commit("SETUP_GAME", {
        roomId: this.$store.state.roomId,
        playerCount: this.number,
        lang: lang,
      });
      this.room = this.$store.state.roomId;
      console.log(this.room);
    },
    closeForm: function () {
      document.getElementById("myForm").style.display = "none";
    },
    startInfo: function () {
      document.getElementById("infopop").style.display = "block";

      this.value = 1;
      //document.getElementById('number').value = value;
      document.getElementById("pages").innerHTML =
        "Collectors is a 20-40 minutes worker placement game for 2-4 players where every choice matters. The winning player is the one with the most valuable collection of rare collectables by the end of the game. Beware though, you have a limited number of actions and turns - make sure that you use them wisely.";
    },
    selectLanguage: function () {
      this.lang = document.getElementById("gameLanguage").value;
      if (this.lang == "English") {
        return "en";
      } else if (this.lang == "Svenska") {
        return "se";
      }
    },
    nextInfo: function () {
      if (this.value < 7) {
        this.value++;
      }
      // document.getElementById('number').value = value;
      if (this.value == 2) {
        document.getElementById("pages").innerHTML =
          "In Collectors, players assume the roles of a collector trying to create the most valuable collection of exotic collectables to show off at a geek con by the end of the year. Throughout the game, you will compete for rare items, learn new hoarding skills and create a hype around your collection.";
      } else if (this.value == 3) {
        document.getElementById("pages").innerHTML =
          "HOW TO WIN THE GAME: Players buy items and acquire skills over the course of the game. By the end of the game, each item gives their owner one point per market card in the market pool sharing the item symbol with the item. In addition some of the abilities give extra points at the end of the game.";
      } else if (this.value == 4) {
        document.getElementById("pages").innerHTML =
          "GAMEPLAY: In Collectors, you play four quarters. Each quarter is divided into five phases. The phases are: Phase 1. Spend bottles: spend bottles from your player board to make actions. Phase 2. Fill pools: place new cards in the various card pools. Phase 3. Retrieve bottles: Take the spent bottles back to your player board.Phase 4. Get income Phase 5. Remove a quarter tile and start the next round After four quarters each player scores points according to their acquired collections and skills.";
      } else if (this.value == 5) {
        document.getElementById("pages").innerHTML =
          "ACTIONS: There are five different kinds of actions: buy items, raise value, get a new skill, start auction, or work. Each kind of action has associated action spaces. Whenever you place a bottle on an action space you choose one of the action types. Once the action space is paid for, you perform the action as described in the following sections.";
      } else if (this.value == 6) {
        document.getElementById("pages").innerHTML =
          "SCORING: At the end of the game, you total your points. All players reveal their hidden items in their treasure chest and tuck it with the rest of their collected items. Count your number of points as follows: ● Each item gives their owner one point per market card in the market pool sharing the item symbol with the item. If there are no matching cards in the market pool to an item it is worth zero points. ● Every third $1 gives their owner one point. ● Some skill cards give further points (see the section on Special skills). The player with the most points is the winner of the game. In the case of a tie, the player with the most cards in their hand wins. If there’s still a tie, the victory is shared.";
      } else if (this.value == 7) {
        document.getElementById("pages").innerHTML = "Detta är sida 7";
      }
    },
    backInfo: function () {
      // var value = parseInt(document.getElementById('number').value);
      if (this.value > 1) {
        this.value--;
      }
      // document.getElementById('number').value = value;
      if (this.value == 1) {
        document.getElementById("pages").innerHTML =
          "Collectors is a 20-40 minutes worker placement game for 2-4 players where every choice matters. The winning player is the one with the most valuable collection of rare collectables by the end of the game. Beware though, you have a limited number of actions and turns - make sure that you use them wisely.";
      } else if (this.value == 2) {
        document.getElementById("pages").innerHTML =
          "In Collectors, players assume the roles of a collector trying to create the most valuable collection of exotic collectables to show off at a geek con by the end of the year. Throughout the game, you will compete for rare items, learn new hoarding skills and create a hype around your collection.";
      } else if (this.value == 3) {
        document.getElementById("pages").innerHTML =
          "HOW TO WIN THE GAME: Players buy items and acquire skills over the course of the game. By the end of the game, each item gives their owner one point per market card in the market pool sharing the item symbol with the item. In addition some of the abilities give extra points at the end of the game.";
      } else if (this.value == 4) {
        document.getElementById("pages").innerHTML =
          "GAMEPLAY: In Collectors, you play four quarters. Each quarter is divided into five phases. The phases are: Phase 1. Spend bottles: spend bottles from your player board to make actions. Phase 2. Fill pools: place new cards in the various card pools. Phase 3. Retrieve bottles: Take the spent bottles back to your player board.Phase 4. Get income Phase 5. Remove a quarter tile and start the next round After four quarters each player scores points according to their acquired collections and skills.";
      } else if (this.value == 5) {
        document.getElementById("pages").innerHTML =
          "ACTIONS: There are five different kinds of actions: buy items, raise value, get a new skill, start auction, or work. Each kind of action has associated action spaces. Whenever you place a bottle on an action space you choose one of the action types. Once the action space is paid for, you perform the action as described in the following sections.";
      } else if (this.value == 6) {
        document.getElementById("pages").innerHTML =
          "SCORING: At the end of the game, you total your points. All players reveal their hidden items in their treasure chest and tuck it with the rest of their collected items. Count your number of points as follows: ● Each item gives their owner one point per market card in the market pool sharing the item symbol with the item. If there are no matching cards in the market pool to an item it is worth zero points. ● Every third $1 gives their owner one point. ● Some skill cards give further points (see the section on Special skills). The player with the most points is the winner of the game. In the case of a tie, the player with the most cards in their hand wins. If there’s still a tie, the victory is shared.";
      } else if (this.value == 7) {
        document.getElementById("pages").innerHTML = "Detta är sida 7";
      }
    },
    closeInfo: function () {
      document.getElementById("infopop").style.display = "none";
    },
    gameStart: function () {
      this.$router.push("/room/" + this.$store.state.roomId);
    },
    copyLink: function () {
      //console.log("kommer in")
      var copyText = document.getElementById("roomLink");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
    },
  },
};
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
  background-color: #4caf50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  opacity: 0.8;
}
.form-container .btn:hover,
.open-button:hover {
  opacity: 1;
}
.form-container .cancel {
  background-color: red;
}

.form-container input[type="text"] {
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
.PopUpText {
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
  background-color: #4caf50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
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

.InfoText {
  color: black;
}
.linkText {
  color: black;
}

.Pagenumber {
  position: bottom center;
}

#roomLink {
  float: left;
  width: 68%;
  padding: 10px;
  height: 28px;
}

#copyButton {
  color: black;
  width: auto;
  text-align: center;
  float: left;
  padding: 10px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  cursor:pointer;
}

#copyButtonText {
  vertical-align: super;
}

#clipboardimg {
  width: 18px;
  height: 24px;
}

@media screen and (max-width: 800px) {
    #roomLink{
      width: 93%;
    }
}

</style>

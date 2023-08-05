<template>
  <header class="header">
    <div class="row-items">

      <div class="icon">
        <img alt="Avatar" src="../../assets/img/avatar.png"
             class="img " width="90"
             height="50"/>
        <span>
          <div class="container">
            <div class="row-items space-drop ">
                ROLE:
                <h4 style="color: #F9B319" class="font-role">
                  {{ role }}
                </h4>

            </div>
            <div style="border: 1px solid gainsboro"/>
              <div class="row-items cursor space-drop " @click="showDialog = true">
                        LogOut
                        <img alt="exit" src="../../assets/icon/Icon1.png"
                             class="icon menu_links dropdown-button" width="40"
                             height="40"/>
              </div>
            </div>
      </span>
      </div>


      <h1>{{ username || '---' }}</h1>
      <div v-if="showDialog" class="dialog-overlay">
        <div class="dialog">
          <h2 class="font-word">
            Are you sure you want to exit ?
          </h2>
          <div class="row-center">
            <button class="space-item btn" @click="showDialog = false"><h3 class="font-word">Cancel</h3></button>
            <div class="space-item"/>
            <button class="space-item btn" @click="logOut"><h3 class="font-word">Yes</h3></button>
          </div>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    dialog: {type: String, default: ''},
  },
  data() {
    return {
      username: undefined,
      showDialog: false,
      role: ""
    }

  },


  methods: {
    getData() {
      let userData = JSON.parse(localStorage.getItem('userData'))
      if (userData) {
        this.username = userData.username
        this.role = userData.role
      }
    },
    //==================================================================================================================
    logOut() {
      localStorage.removeItem("userData");
      this.showDialog = false
      window.location.reload();
    }
    //==================================================================================================================
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.icon {
  position: relative;
  display: flex;
  cursor: pointer;

  span {
    width: 150px;
    height: 90px;
    position: absolute;
    top: 60%;
    padding: .55rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    color: #000;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07);
    background-color: #F6FEFF;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    span {
      top: 100%;
      opacity: 1;
    }
  }
}


.font-role {
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
}

.img {

  margin-left: -30px;
}

.space-drop {
  margin: 5px;
}

.icon {
  margin-top: -8px;
  margin-left: 20px;
}

.header {
  height: 65px;
  background-color: #ccfaf0;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-left: -10px;
}
</style>
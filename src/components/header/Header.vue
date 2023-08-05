<template>
  <header class="header">
    <div class="row-items">
      <div class="icon">
        <img @click="showDialog=true" alt="Exit" src="../../assets/icon/exit.jpg"   class="cursor icon-exit" width="45" height="45"/>
        <span>

        </span>
      </div>

      <div class="container">
        <h1 class="font-header" style="margin-top: -10px;">{{ username || '---' }}</h1>
        <div  style="margin-left: -8px;margin-top: -5px" class="font-header row-items">
          Role :
          <h4 style="color: #F9B319;" class="font-header" >
            {{role }}
          </h4>
        </div>
      </div>


      <div v-if="showDialog" class="dialog-overlay">
        <div class="dialog">
          <h2 class="font-word">
            Are you sure you want to exit?
          </h2>
          <div class="row-center">
            <button class="space-item btn" @click="showDialog = false">
              <h3 class="font-word">Cancel</h3>
            </button>
            <div class="space-item"></div>
            <button class="space-item btn" @click="logOut">
              <h3 class="font-word">Yes</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showDialog: false,
      role: "",
    };
  },
  methods: {
    getData() {
      let userData = JSON.parse(localStorage.getItem('userData'))
      if (userData) {
        this.username = userData.username
        this.role = userData.role
      }
    },
    logOut() {
      localStorage.removeItem("userData");
      this.showDialog = false;
      window.location.href = "/login"
    },
  },
  created() {
    this.getData()
  },
};
</script>

<style lang="scss">
.font-header{
  font-weight: bold;font-size: 15px;

}
.container {
  display: flex;
  flex-direction: column;
}


.icon-exit {
  border-radius: 80px;margin-top: -10px;margin-left: 10px;margin-right: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.20);
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
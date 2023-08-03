<template>

  <header class="header">

    <div class="row-items">
      <div class="dropdown">
        <img @click="toggleDropdown" alt="Avatar" src="../../assets/img/avatar.png"
             class="img menu_links dropdown-button" width="90"
             height="50"/>
        <ul v-if="isOpen" class="dropdown-menu r">
          <li class="row-items" @click="showDialog = true;isOpen=false">
            LogOut
            <img alt="Avatar" src="../../assets/icon/Icon1.png"
                 class="icon menu_links dropdown-button" width="40"
                 height="40"/>
          </li>
        </ul>
      </div>
      <h1>{{ username ||'---' }}</h1>
      <div v-if="showDialog" class="dialog-overlay">
        <div class="dialog">
          <h2 class="font-word" >
            Are you sure you want to exit ?
          </h2>
          <div class="row-center">
            <button class="space-item" @click="showDialog = false"><h3 class="font-word">Cancel</h3></button>
            <div class="space-item"/>
            <button class="space-item" @click="logOut"><h3 class="font-word">Yes</h3></button>
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
      username:undefined,
      isOpen: false,
      showDialog: false
    }

  },
  methods: {
    getUsername() {
      let userData = JSON.parse(localStorage.getItem('userData'))
      if(userData) {
        this.username = userData.username
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    logOut() {
      localStorage.removeItem("userData");
      this.showDialog = false
      window.location.reload();
    }
  },
  created() {
    this.getUsername()
  }
}
</script>

<style lang="scss">
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  width: 350px;
  height: 160px;
  background-color: #f6feff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.dialog h2 {
  margin-top: 0;
  margin-bottom: 30px;

}


.dropdown {
  position: relative;
  display: inline-block;
}


.dropdown-menu {
  position: absolute;
  left: 0;
  border-radius: 8px;
  margin-top: -10px;
  background-color: #f6feff;
  padding: 8px;
  height: 65px;
  list-style: none;
  width: 150px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

}

.dropdown-menu li {
  padding: 8px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #ddd;
}

.menu_links {
  cursor: pointer;
}


.img {
  margin-top: -13px;
  margin-left: -25px;
}

.icon {
  margin-top: -8px;
  margin-left: 20px;
}

.header {
  height: 65px;
  background-color: #ccfaf0;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-left: -10px;
}
</style>
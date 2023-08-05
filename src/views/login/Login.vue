<template>


  <div class="responsive-container ">
    <div class="login-container">
      <img alt="Avatar" src="../../assets/img/avatar.png" class="c-img" style="" width="210" height="120"/>
      <h2 class="font">Login</h2>
      <form @submit.prevent="login">
        <label>
          <input type="text" placeholder="Username" v-model="username" required>
        </label>
        <label>
          <input type="password" placeholder="Password" v-model="password" required>
        </label>
        <button type="submit">
          <span>Login</span>
        </button>
      </form>
    </div>
  </div>
  <img class="responsive-image" alt="login" src="../../assets/img/login.png" width="850" height="950"/>


</template>

<script>
// import {ADMIN} from "../../globalVaribles";

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    //==================================================================================================================
    login() {
      let objUserData = {
        "username": this.username[0].toUpperCase() + this.username.slice(1),
        "password": this.password,
        "role": this.username[0].toUpperCase() + this.username.slice(1) === "Admin" && this.password === "@dmin" ? "admin" : "user"
      };
     // console.log('ADMIN')
     // console.log(ADMIN)

      localStorage.setItem("userData", JSON.stringify(objUserData));
      // window.location.href = "/"
    },
  },
};
</script>

<style lang="scss">

.font {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 25px;
  line-height: 1.3;
}

.c-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1380px) {
  .responsive-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    height: 100vh;
  }
}

@media (min-width: 1380px) {
  .responsive-container {
    position: absolute;
    top: 50%;
    right: 0;
    padding: 50px;
    margin-right: 100px;
    transform: translate(0, -50%);
  }
}

@media (min-width: 1380px) {
  .responsive-image {
    position: absolute;
    top: 50%;
    margin-left: 100px;
    left: 0;
    padding: 80px;
    transform: translate(0, -50%);
  }
}

@media (max-width: 1380px) {
  .responsive-image {
    display: none;
  }
}

.login-container {
  width: 400px;
  padding: 40px;
  height: 550px;
  background: rgba(255, 255, 255, 0.32);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.9px);
  -webkit-backdrop-filter: blur(7.9px);
  border: 1px solid rgba(255, 255, 255, 0.23);
}

.login-container:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

form input {
  display: block;
  width: 100%;
  padding: 10px;
  height: 45px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  width: 100%;
  height: 45px;
  padding: 10px;
  margin-top: 50px;
  color: white;
  border: none;
  background-color: #F9B319;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #F9B319;
}
</style>

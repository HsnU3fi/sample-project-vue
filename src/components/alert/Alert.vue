<template>
  <div class="ctrl" v-if="show">
    <span :style="color" class="notification animateOpen">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    text: {type: String, default: ''},
    show: {type: Boolean, default: false},
    color: {type: String, default: ''},
  },
}
</script>

<style scoped>

.ctrl {
  width: 100%;
  position: relative;
}

.notification {
  display: block;
  font-size: 14px;
  width: 250px;
  padding: 5px ;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -90px;
  box-sizing: border-box;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.2);
}

.animateOpen {
  -webkit-animation: moveOpen 4s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-fill-mode: forwards;
}

/* Safari and Chrome */
@-webkit-keyframes moveOpen {
  from {
    -webkit-transform: translate(0, -100px);
  }
  10% {
    -webkit-transform: translate(0, 20px);
  }
  12% {
    -webkit-transform: translate(0, 22px);
  }
  16% {
    -webkit-transform: translate(0, 20px);
  }
  80% {
    -webkit-transform: translate(0, 20px);
  }
  85% {
    -webkit-transform: translate(0, 25px);
  }
  to {
    -webkit-transform: translate(0, -100px);
  }
}
</style>
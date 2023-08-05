<template>
  <footer class="footer">
    <div class="container">
      <p class="footer-text">&copy; {{ currentYear }} </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background-color: #f3c6ff;
  padding: 20px 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-text {
  color: #666;
  margin-top: -15px;
  font-size: 14px;
}</style>
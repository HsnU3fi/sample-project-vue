<template>
  <footer>
    <p>&copy; {{ currentYear }} </p>
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
footer {
  background-color: #f5d4fc;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.30);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
}
</style>
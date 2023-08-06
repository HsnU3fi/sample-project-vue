<template class="bg">
  <div>
      <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";

export default {
  name: 'App',
  components: { Footer },
}
</script>

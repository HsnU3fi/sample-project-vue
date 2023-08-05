<template>
  <v-app class="bg">
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";

export default {
  name: 'App',
  components: { Footer },

  data: () => ({
    //
  }),
}
</script>

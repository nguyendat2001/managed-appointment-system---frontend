<template>
    <Slider></Slider>
    <Feature_2></Feature_2>
    <!-- <About></About> -->
    <!-- <Cta></Cta> -->
    <Service_Home></Service_Home>
    <!-- <About_2></About_2> -->
    <!-- <Testimonial_2></Testimonial_2> -->
    <!-- <Clients></Clients> -->
</template>
<script>

import Slider from "../components/slider.vue";
import Feature_2 from "../components/feature-2.vue";
import About from "../components/about.vue";
import Cta from "../components/about-2.vue";
import Service_Home from "../components/service-home.vue";
import About_2 from "../components/about-2.vue";
import Testimonial_2 from "../components/testimonial-2.vue";
import Clients from "../components/clients.vue";

export default {
  components: {
    Feature_2,
    About,
    Service_Home,
    About_2,
    Testimonial_2,
    Clients,
    Cta,
    Slider,
  },
  data() {
    return {};
  },

  watch: {},
  computed: {},
  methods: {},
  mounted() {
  },
};
</script>
<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
<template>
    <Page_Title :title="'What We Do'" :description="'Our services'"/>
    <Service_2/>
    <Cta_block/>

</template>
<script>

import Page_Title from "../components/page-title.vue";
import Service_2 from "../components/service-2.vue";
import Cta_block from "../components/cta-block.vue";

export default {
  components: {
    Page_Title,
    Service_2,
    Cta_block,
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

<template>
    <Page_Title :title="'bác sĩ'" :description="'Tất cả'"/>
    <Doctor/>
    <Cta_block/>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import Doctor from "../components/doctor.vue";
import Cta_block from "../components/cta-block.vue";

export default {
  components: {
    Page_Title,
    Cta_block,
    Doctor,
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
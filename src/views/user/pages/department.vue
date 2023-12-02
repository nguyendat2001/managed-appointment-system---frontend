<template>
    <Page_Title :title="'Phòng ban'" :description="'Tất cả phòng ban'"/>
    <Department/>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import Department from "../components/department.vue";

export default {
  components: {
    Page_Title,
    Department,
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

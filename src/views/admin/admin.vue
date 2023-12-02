<template>
  <div class="g-sidenav-show bg-gray-100">
    <SideNav class="" style="width: 300px"></SideNav>

    <main
      class="main-content position-absolute max-height-vh-100 h-100 border-radius-lg"
      style="top: 0px; left: 0px; width: 82%; height: 100%"
    >
      <!-- Navbar -->
      <NavBar></NavBar>
      <!-- End Navbar -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <UiConfig></UiConfig>
  </div>
  <!--Main layout-->

  <!--Main layout-->
</template>
<script>
import SideNav from "./components/sideNav.vue";
import UiConfig from "./components/uiConfig.vue";
import NavBar from "./components/navBar.vue";
export default {
  components: {
    SideNav,
    UiConfig,
    NavBar,
  },
  data() {
    return {};
  },

  watch: {},
  computed: {},
  methods: {},
  mounted() {
    const scripts = [
      
      "/admin/js/jquery.js",

      "https://api.nepcha.com/js/nepcha-analytics.js",
      "/admin/js/core/bootstrap.min.js",
      "/admin/js/plugins/perfect-scrollbar.min.js",
      "/admin/js/plugins/smooth-scrollbar.min.js",
      "/admin/js/core/popper.min.js",
      "https://buttons.github.io/buttons.js",
      "/admin/js/soft-ui-dashboard.min.js",
      "/admin/js/soft-ui-dashboard.js",      
    ];
    scripts.forEach((script) => {
      let tag = document.head.querySelector(`[src="${script}"`);
      if (!tag) {
        tag = document.createElement("script");
        tag.setAttribute("src", script);
        tag.setAttribute("type", "text/javascript");
        document.head.appendChild(tag);
      }
    });
  },
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);

@import "@/assets/admin/css/nucleo-svg.css";
@import "@/assets/admin/css/wizard.css";
@import "@/assets/admin/css/soft-ui-dashboard.css";
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>

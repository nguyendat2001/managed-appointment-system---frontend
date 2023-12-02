<template>
<div class="container-fluid" style="width: 1600px;margin-left: -165px;">
    <div class="body ">
    <Navigation></Navigation>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
    <Footer></Footer>
    </div>
</div>
</template>
<script>
import Footer from "./layouts/footer.vue";
import Navigation from "./layouts/navigation.vue";
import jQuery from 'jquery'
export default {
  components: {
    Footer,
    Navigation,
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
      
      // "/user/plugins/bootstrap/bootstrap.min.js",  
      "/user/plugins/slick-carousel/slick/slick.min.js",     
      "/user/plugins/shuffle/shuffle.min.js",  
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkeLMlsiwzp6b3Gnaxd86lvakimwGA6UA",  
      "/user/plugins/google-map/gmap.js",  
      "/user/js/script.js",  
      "/admin/js/core/bootstrap.min.js",
       
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

@import "@/assets/user/plugins/bootstrap/bootstrap.min.css";
@import "@/assets/user/plugins/icofont/icofont.min.css";
@import "@/assets/user/plugins/slick-carousel/slick/slick.css";
@import "@/assets/user/plugins/slick-carousel/slick/slick-theme.css";
@import "@/assets/user/css/style.css";

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>

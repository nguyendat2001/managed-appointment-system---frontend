<template>
    <Page_Title :title="'Dự đoán với mô hình phân lớp trí tuệ nhân tạo'" :description="'Các mô hình máy học'"/>
    <section class="section service-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6" v-for="item in this.models" :key="item.id">
            <div class="service-block mb-5">
              <img src="@/assets/user/images/classification_icon.png" alt="" class="img-fluid">
              <div class="content">
                <h4 class="mt-4 mb-2 title-color">{{item.name}}</h4>
                <p class="mb-1">phân loại các bệnh: {{item.labels}}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import ModelService from "@/services/model.service";

export default {
  components: {
    Page_Title,
    ModelService,
  },
  data() {
    return {
      models:[],
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getAllModel(){
      try{
        this.models = await ModelService.getAllClassification()
        console.log(this.models)
      }catch(err){
        console.log(err)
      }
    }
  },
  mounted() {
  },
  async created(){
    await this.getAllModel();
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

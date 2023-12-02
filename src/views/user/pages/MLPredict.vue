<template>
    <Page_Title :title="'Dự đoán với mô hình trí tuệ nhân tạo'" :description="'Các mô hình máy học'"/>
    <section class="section service-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="service-block mb-5">
              <img src="images/service/service-1.jpg" alt="" class="img-fluid">
              <div class="content">
                <h4 class="mt-4 mb-2 title-color">Phân loại bệnh</h4>
                <p class="mb-4">Khi đưa một ảnh(ví dụ: ảnh x-ray, ảnh tế bào) vào thì hệ thống sẻ trả lại thông tin bệnh cho người dùng</p>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="service-block mb-5">
              <img src="images/service/service-2.jpg" alt="" class="img-fluid">
              <div class="content">
                <h4 class="mt-4 mb-2 title-color">Phân vùng bệnh</h4>
                <p class="mb-4">Người dùng chọn ảnh có chứa vùng bệnh từ đó hệ thống sẽ đưa ra kết quả là vùng bệnh mà hệ thống dự đoán được cho người dùng.</p>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </section>
</template>
<script>

import Page_Title from "../components/page-title.vue";

export default {
  components: {
    Page_Title,
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

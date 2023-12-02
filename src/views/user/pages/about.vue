<template>

  <Page_Title :title="'Thông tin'" :description="'Thông tin của chúng tôi'"/>
  <section class="section about-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <h2 class="title-color">Chăm sóc sức khỏe cho bệnh nhân</h2>
        </div>
        <div class="col-lg-8">
          <p> Ngay từ khi mới bắt đầu đi vào hoạt động, bệnh viện đã chú trọng việc xây dựng đội ngũ chuyên gia bác sĩ giỏi về chuyên môn, nhiều kinh nghiệm, bệnh viện đã quy tụ được đội ngũ chuyên gia hàng đầu từ nhiều lĩnh vực như nam khoa tiết niệu, sản phụ khoa, nhi khoa, hô hấp, cơ xương khớp, hỗ trợ sinh sản, tai mũi họng, thần kinh…</p>
          <img src="images/about/sign.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>
  </section>

  <section class="fetaure-page ">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="about-block-item mb-5 mb-lg-0">
            <img src="images/about/about-1.jpg" alt="" class="img-fluid w-100">
            <h4 class="mt-3">Sức khỏe cho trẻ</h4>
            <p>Luôn luôn tậng tâm và tậng tuy với các dịch vục chăm sóc sức khỏe cho trẻ.</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="about-block-item mb-5 mb-lg-0">
            <img src="images/about/about-2.jpg" alt="" class="img-fluid w-100">
            <h4 class="mt-3">Tư vấn y tế</h4>
            <p>Luôn luôn có mặt 24/24 để tư vấn cho người dùng về dịch vụ được cung cấp.</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="about-block-item mb-5 mb-lg-0">
            <img src="images/about/about-3.jpg" alt="" class="img-fluid w-100">
            <h4 class="mt-3">Trang thiết bị hiện đại</h4>
            <p>Các thiết bị y tế được sử dụng là các thiết bị hiện đại và tối tân trong khu vực.</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="about-block-item">
            <img src="images/about/about-4.jpg" alt="" class="img-fluid w-100">
            <h4 class="mt-3">Chất lượng y bác sỉ</h4>
            <p>Các bác sỉ tại đây là các bác sỉ đi đầu trong nghành.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Award/>
  <!-- <Team/> -->
  <Testimonial/>

</template>
<script>

import Award from "../components/award.vue";
import Team from "../components/team.vue";
import Testimonial from "../components/testimonial.vue";
import Page_Title from "../components/page-title.vue";

export default {
  components: {
    Page_Title,
    Award,
    Team,
    Testimonial,
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
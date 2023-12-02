<template>

  <!-- <Page_Title :title="'About Us'" :description="'About Us'"/> -->

  <section class="contact-form-wrap section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2 class="text-md mb-2">Thông tin cá nhân</h2>
              <div class="divider mx-auto my-4"></div>
              <p class="mb-5">Thông tin tài khoản và thông tin người dùng được lưu trữ trên hệ thống.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <form id="contact-form" class="contact__form " method="post" action="mail.php">
              <!-- form message -->
              <div class="row">
                <div class="col-12">
                  <div class="alert alert-success contact__msg" style="display: none" role="alert">
                    Your message was sent successfully.
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 justify-">
                    <p class="mt-3">Họ và tên: </p>
                  </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <input name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" v-model="this.patient.fullname" disabled>
                  </div>
                </div>

                <div class="col-lg-2 justify-">
                    <p class="mt-3" >Giới tính: </p>
                    <!-- <p class="mt-3" v-else>Giới tính: Nữ</p> -->
                  </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <input v-if="this.patient.gender" name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" :value="'Nam'" disabled>
                    <input v-else name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" :value="'Nữ'" disabled>

                  </div>
                </div>
                <div class="col-lg-2 justify-">
                    <p class="mt-3">Sđt: </p>
                  </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <input name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" v-model="this.patient.phone" disabled>
                  </div>
                </div>

                <div class="col-lg-2 justify-">
                    <p class="mt-3">Địa chỉ: </p>
                  </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <input name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" v-model="this.patient.address" disabled>
                  </div>
                </div>
                <div class="col-lg-2 justify-">
                    <p class="mt-3">User name: </p>
                  </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <input name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" v-model="this.account.username" disabled>
                  </div>
                </div>

                <div class="col-lg-2 justify-">
                    <p class="mt-3">Email: </p>
                  </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <input name="name" id="name" type="text" class="form-control" placeholder="Your Full Name" v-model="this.account.email" disabled>
                  </div>
                </div>
              </div>

              <!-- <div>
                <button class="btn btn-main btn-round-full" name="submit" type="submit" value="Send Messege"></button>
              </div> -->
            </form>
          </div>
        </div>
      </div>
  </section>

  <section class="section contact-info pb-0 mb-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="contact-block mb-4 mb-lg-0">
            <i class="icofont-live-support"></i>
            <h5>Liên hệ</h5>
            +823-4565-13456
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="contact-block mb-4 mb-lg-0">
            <i class="icofont-support-faq"></i>
            <h5>Email</h5>
            contact@mail.com
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="contact-block mb-4 mb-lg-0">
            <i class="icofont-location-pin"></i>
            <h5>Địa chỉ</h5>
            Xuân khánh, Ninh kiều, Cần thơ
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
    return {
      patient:{},
      account:{},
    };
  },

  watch: {},
  computed: {},
  methods: {
    getInfor(){
      this.patient = JSON.parse(localStorage.getItem("patient"))
      this.account = JSON.parse(localStorage.getItem("user"))
      console.log(this.account)
    },
  },
  async created() {
    await this.getInfor()
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

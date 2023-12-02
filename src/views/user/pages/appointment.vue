<template>
    

    <section class="contact-form-wrap section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2 class="text-md mb-2">Thông tin Lịch hẹn</h2>
              <div class="divider mx-auto my-4"></div>
              <p class="mb-5">Thông tin lịch hẹn của người dùng được lưu trữ trên hệ thống.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <table class="table">
                        <thead>
                            <tr>
                            <!-- <th scope="col">#</th> -->
                                <th scope="col">bác sĩ</th>
                                <th scope="col">Ngày</th>
                                <th scope="col">Giờ</th>
                                <th scope="col">Ngân hàng</th>
                                <th scope="col">Mã thẻ ngân hàng</th>
                                <th scope="col">giá tiền</th>
                                <th scope="col">tin nhắn</th>
                                <th scope="col">Minh chứng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in this.appointments" :key="item.id">
                            <!-- <th scope="row">1</th> -->
                                <td>{{item.doctor.fullname}}</td>
                                <td>{{item.worktime.workday.day}}</td>
                                <td>{{item.worktime.time}}</td>
                                <td>{{item.bankName}}</td>
                                <td>{{item.creditNumber}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.message}}</td>
                                <td>
                                    <a v-if="item.proofImage" :href="
                                    'http://localhost:9004/api/loads/proofs_get/'+item.proofImage 
                                    "
                                    class="btn btn-link text-dark text-sm mb-0 px-0 ms-4 me-3"
                                    >Xem>> <i class="fas fa-image text-sm me-1"></i></a>
                                    <a v-else 
                                    class="btn btn-link text-dark text-sm mb-0 px-0 ms-4 me-3" data-toggle="modal" data-target="#exampleModal" @click="this.proofAppointmentId = item.id"
                                    >Thêm</a>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
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

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="card card-plain">
              <div class="card-header pb-0 text-left">
                <h3 class="font-weight-bolder text-info text-gradient">Minh chứng chuyển khoản</h3>
                <p class="mb-0">thêm hình ảnh minh chứng chuyển khoản</p>
              </div>
              <div class="card-body">
                <form role="form text-left" @submit.prevent="submitProofAppointment()">
                  <div class="row">

                    <div class="row-12 fileUploadInput">
                        <label>✨ chọn file</label>
                        <input   ref="file" @change="onFileChange" type="file" />
                        <button>+</button>
                    </div>
                  </div>
                  <!-- <label>Mã thẻ Tài khoản ngân hàng</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="1234 - **** - **** - ****" aria-label="Password" aria-describedby="password-addon"  v-model="this.newAppointment.creditNumber" required>
                  </div> -->

                  <div class="text-center">
                    <button type="submit" class="btn btn-main btn-round-full w-100 mt-4 mb-0">Submit</button>
                  </div>
                </form>
              </div>
              <div class="card-footer text-center pt-0 px-lg-2 px-1">
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import AppointmentService from "@/services/appoitment.service"  

export default {
  components: {
    Page_Title,
    AppointmentService,
  },
  data() {
    return {
        doctorId:null,
        workdayId:null,
        worktimeId:null,
        appointments:[],
        proofAppointmentId:null,
        url:null,
    };
  },

  watch: {
    
  },
  computed: {
    
  },
  methods: {
    async onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            
        },
    async submitProofAppointment(){
        try{
            const formData = new FormData();
            formData.append('file',this.$refs.file.files[0]);
            await AppointmentService.uploadProof(this.proofAppointmentId,formData)
            alert("nộp minh chứng thành công")
            this.getAppointment()
        }catch(err){
            console.log(err)
        }
    },
    async getAppointment(){
        try{
            this.appointments = await AppointmentService.getByUser(JSON.parse(localStorage.patient).id)
            console.log(this.appointments)
        }catch(err){
            console.log(err)
        }
    }
  },
  mounted() {
  },
  async created(){
    await this.getAppointment()
  }
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
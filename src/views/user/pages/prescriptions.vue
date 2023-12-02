<template>
    

      <section class="contact-form-wrap section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2 class="text-md mb-2">Thông tin Đơn thuốc</h2>
              <div class="divider mx-auto my-4"></div>
              <p class="mb-5">Thông tin đơn thuốc của người dùng được lưu trữ trên hệ thống.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <table class="table">
                          <thead>
                              <tr>
                              <!-- <th scope="col">#</th> -->
                                  <th scope="col">Tên chuẩn đoán</th>
                                  <th scope="col">Mô tả</th>
                                  <th scope="col">lời khuyên</th>
                                  <th scope="col">bác sĩ</th>
                                  <th scope="col">thời gian tạo</th>
                                  <th scope="col">Chi tiết</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in this.prescriptions" :key="item.id">
                              <!-- <th scope="row">1</th> -->
                                  <td>{{item.diagnostic}}</td>
                                  <td :title="item.description">{{getLimitedPassage(item.description)}}</td>
                                  <td :title="item.advice">{{getLimitedPassage(item.advice)}}</td>
                                  <td>{{item.doctor.fullname}}</td>
                                  <td>{{dateToString(item.createAt)}}</td>
                                  <td><button type="button" class="btn btn-outline-primary"  data-toggle="modal" data-target="#prescription-detail"  @click="getPrescriptionDetail(item.id)"> <i class="fa fa-eye text-dark" ></i></button></td>
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


    <div class="modal fade" id="prescription-detail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="card card-plain">
              <div class="card-header pb-0 text-left">
                <h3 class="font-weight-bolder text-info text-gradient">Chi tiết Đơn thuốc </h3>
                <p class="mb-0">Thông tin chi tiết các thành phần trong đơn thuốc</p>
              </div>
              <div class="card-body">
                <div class="table-responsive p-0">
                  <table class="table align-items-left mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên thuốc</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Số lượng</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Mô tả</th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phòng</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thành phần</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sử dụng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.clickedMedicines"
                          :key="item.id">
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.medicine.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.number}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <!-- <p class="text-xs font-weight-bold  mt-1 ">{{item.description}}</p> -->
                          <p :title="item.medicine.description" class=" mt-1 ">{{getLimitedPassage(item.medicine.description)}}</p>

                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p :title="item.medicine.ingredient" class=" mt-1 ">{{getLimitedPassage(item.medicine.ingredient)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p :title="item.medicine.uses" class=" mt-1 ">{{getLimitedPassage(item.medicine.uses)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer text-center pt-0 px-lg-2 px-1">
                <!-- <p class="mb-4 text-sm mx-auto">
                  Don't have an account?
                  <a href="javascript:;" class="text-info text-gradient font-weight-bold">Thanh toán</a>
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import PrescriptionService from "@/services/prescription.service"  
import PrescriptionDetailService from "@/services/prescriptionDetail.service";

export default {
  components: {
    Page_Title,
    PrescriptionService,
    PrescriptionDetailService,
  },
  data() {
    return {
        prescriptions:[],
        clickedMedicines: [],
    };
  },

  watch: {},
  computed: {
    
  },
  methods: {
    async getPrescriptionDetail(id){
        try{
          this.clickedMedicines = await PrescriptionDetailService.getByPrescription(id);
          console.log(this.clickedMedicines)
        }catch(err){
          console.log(err)
        }
      },
    dateToString(datetime){
        const value = new Date(datetime)
        let stringdate = value.getFullYear().toString() + "-"+value.getMonth().toString() + "-"+value.getDay().toString() + " "+ value.getHours().toString()  + ":"+ value.getMinutes().toString()
        return stringdate  
    },
    getLimitedPassage(groupPassage){
            const MAX_PASSAGE_LENGTH = 30; // Set the maximum number of characters you want to display
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        },
    async getPrescription(){
        try{
            this.prescriptions = await PrescriptionService.getByUser(JSON.parse(localStorage.patient).id)
        }catch(err){
            console.log(err)
        }
    }
  },
  mounted() {
  },
  async created(){
    await this.getPrescription()
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
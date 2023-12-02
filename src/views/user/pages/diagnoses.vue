<template>
    
    <section class="contact-form-wrap section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2 class="text-md mb-2">Thông tin phiếu chẩn đoán</h2>
              <div class="divider mx-auto my-4"></div>
              <p class="mb-5">Thông tin phiếu chẩn đoán của người dùng được lưu trữ trên hệ thống.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <table class="table">
                        <thead>
                            <tr>
                            <!-- <th scope="col">#</th> -->
                                <th scope="col">Kết quả chuẩn đoán</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Kỹ thuật</th>
                                <th scope="col">bác sĩ</th>
                                <th scope="col">thời gian tạo</th>
                                <th scope="col">Ảnh bệnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in this.diagnoses" :key="item.id">
                            <!-- <th scope="row">1</th> -->
                                <td>{{item.result}}</td>
                                <td :title="item.describe">{{getLimitedPassage(item.describe)}}</td>
                                <td :title="item.technique">{{getLimitedPassage(item.technique)}}</td>
                                <td>{{item.doctor.fullname}}</td>
                                <td>{{dateToString(item.createAt)}}</td>
                                <td><button type="button" class="btn btn-outline-primary"  data-toggle="modal" data-target="#prescription-detail"  @click="getDiagnosesImage(item.id)"> <i class="fa fa-eye text-dark" ></i></button></td>
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
                <h3 class="font-weight-bolder text-info text-gradient">Tất cả ảnh bệnh </h3>
                <p class="mb-0">Tất cả các ảnh bệnh của phiếu chuẩn đoán</p>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2" v-for="item in this.DiagnosesImages"  :key="item.id">
                    <div class="card" >
                    <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                      <a href="javascript:;" class="d-block">
                        <img style="height: 120px;width: 120px;" :src="'http://127.0.0.1:9004/api/loads/diagnoses_get/'+item.path" class="img-fluid border-radius-lg">
                      </a>
                      <div>
                        <a :href="'http://127.0.0.1:9004/api/loads/diagnoses/'+item.path" type="button" class="mt-2 mb-2 btn btn-outline-success btn-lg btn-block" data-mdb-color="dark"> tải về</a>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-center pt-0 px-lg-2 px-1">
              </div>
            </div>
          </div>
          <div class="modal-footer">
                <!-- <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button> -->
                <!-- <button type="button" class="btn bg-gradient-primary">Save changes</button> -->
              </div>
        </div>
      </div>
  </div>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import Diagnoseservice from "@/services/diagnoses.service"  
import DiagnoseImageservice from "@/services/diagnosesImage.service"  

export default {
  components: {
    Page_Title,
    Diagnoseservice,
    DiagnoseImageservice,
  },
  data() {
    return {
        diagnoses:[],
        DiagnosesImages: [],
    };
  },

  watch: {},
  computed: {
    
  },
  methods: {
    async getDiagnosesImage(id){
      try{
        this.DiagnosesImages = await DiagnoseImageservice.getByDiagnoses(id)
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
            this.diagnoses = await Diagnoseservice.getByUser(JSON.parse(localStorage.patient).id)
            console.log(this.diagnoses )
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
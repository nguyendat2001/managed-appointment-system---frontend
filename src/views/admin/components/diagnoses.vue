<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <h4>Phiếu Chuẩn Đoán</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newDiagnoses={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Phiếu Chuẩn Đoán</h3>
                              <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultReser=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Phiếu Chuẩn Đoán mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="createDiagnoses">
                                
                                <!-- <label>Giường</label> -->
                                <div class="input-group mb-3 row">
                                  
                                  <div class="col-6"> 
                                    <label>bác sĩ</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.newDiagnoses.doctor">
                                        <option v-for="item in this.doctors" :key="item.id" :value="item.id">{{item.fullname}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Bệnh Nhân</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.newDiagnoses.user">
                                         <option v-for="item in this.users" :key="item.id" :value="item.id">{{item.fullname}}</option>
                                      </select>
                                    </div>
                                  </div>

                                </div>
                                <label>Bệnh chuẩn đoán</label>
                                <div class="input-group mb-3">
                                  <select class="form-control form-control-sm col-4" v-model="this.newDiagnoses.disease">
                                      <option v-for="item in this.diseases" :key="item.id" :value="item.id">{{item.name}}</option>
                                  </select>
                                </div>
                                <label>Chuẩn Đoán</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newDiagnoses.result">
                                </div>

                                <label>Mô tả chuẩn đoán</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newDiagnoses.describe">
                                </div>

                                <label>Kỹ thuật chuẩn đoán</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newDiagnoses.technique">
                                </div>
                                
                                <div class="text-center">
                                  <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
                                </div>
                              </form>
                            </div>
                            <!-- <div class="card-footer text-center pt-0 px-lg-2 px-1">
                              <p class="mb-4 text-sm mx-auto">
                                Don't have an account?
                                <a href="javascript:;" class="text-info text-gradient font-weight-bold">Sign up</a>
                              </p>
                            </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-left mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">bác sĩ</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Bệnh nhân</th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phòng</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">chuẩn đoán</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Mô tả chuẩn đoán</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Kỹ thuật</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">thời gian tạo</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Xem ảnh</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="Diagnoses in this.filteredDiagnosess"
                          :key="Diagnoses.id">
                        <td>
                          <div class="d-flex px-2 py-1">
                            
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{Diagnoses.doctor.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">id: {{Diagnoses.doctor.id}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{Diagnoses.user.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">id: {{Diagnoses.user.id}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{Diagnoses.result}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p :title="Diagnoses.describe" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(Diagnoses.describe)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        <td>
                          <p :title="Diagnoses.technique" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(Diagnoses.technique)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{Diagnoses.createAt}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModalLong" @click="this.getDiagnosesImages(Diagnoses.id)"> <i class="fa fa-eye text-dark" ></i></button>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <button v-if="!Diagnoses.isActive" type="button" class="btn btn-outline-secondary" @click="activeDiagnoses(Diagnoses.id)">inactive</button>
                          <button v-else type="button" class="btn btn-outline-success" @click="inactiveDiagnoses(Diagnoses.id)">active</button>
                        </td>
                        
                        <td>
                          <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-image-form"  @click="this.FormDiagnose.diagnoses = Diagnoses.id"> <i class="fa fa-images text-dark"></i></button>
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newDiagnoses=Diagnoses"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteDiagnoses(Diagnoses.id)"><i class="far fa-trash-alt" ></i></button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Hình ảnh</h5>
                <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                
                <div class="row">
                  <div class="col-3" v-for="item in this.DiagnosesImages"  :key="item.id">
                    <div class="card" >
                    <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                      <a href="javascript:;" class="d-block">
                        <img style="height: 140px;width: 140px;" :src="'http://127.0.0.1:9004/api/loads/diagnoses_get/'+item.path" class="img-fluid border-radius-lg">
                      </a>
                    </div>

                    <div class="card-body pt-2">
                      
                      <div class="author align-items-center">
                        <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <a type="button" class="btn btn-outline-secondary" :href="'http://127.0.0.1:9004/api/loads/diagnoses/'+item.path" data-mdb-color="dark" > <i class="fa fa-download text-dark"></i></a>
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteDiagnosesImages(item.id,item.diagnoses.id)"><i class="far fa-trash-alt" ></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn bg-gradient-primary">Save changes</button> -->
              </div>
            </div>
          </div>
        </div>
      
        <div class="modal fade" id="modal-image-form" tabindex="-1" role="dialog" aria-labelledby="modal-image-form" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="card card-plain">
                  <div class="card-header pb-0 text-left">
                    <h3 class="font-weight-bolder text-info text-gradient">Thêm hình ảnh Phiếu Chuẩn Đoán</h3>
                    <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                        <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                        <button type="button" class="btn-close" @click="this.resultReser=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <p class="mb-0">Hình ảnh Phiếu Chuẩn Đoán mới</p>
                  </div>
                  <div class="card-body">
                    <form role="form text-left" enctype="multipart/form-data">
                      
                      <!-- <label>Giường</label> -->
                      
                      <label>Chuẩn Đoán</label>
                      <div class="input-group mb-3">
                        <input required class="form-control" ref="file" type="file" id="example-date-input" @onchange="this.onChangeFile">
                      </div>

                      <div class="text-center">
                        <button type="button" @click="this.createDiagnosesImage" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">Submit</button>
                      </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>

import DiagnosesService from "@/services/diagnoses.service";
import DiagnosesImageService from "@/services/diagnosesImage.service";
import UserService from "@/services/user.service";
import DoctorService from "@/services/doctor.service";
import VueHorizontal from "vue-horizontal";
import DiseaseService from "@/services/disease.service";
import FooterComponent from "./footer.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    components: {
      DiagnosesService,
      DiagnosesImageService,
      VueHorizontal,
      DoctorService,
      UserService,
      DiseaseService,
      FooterComponent,
    },
    data() {
        return {
          doctors: [],
          users: [],
          resultReser: false,
          selectedItem: [],
          FormDiagnose:{},
          Diagnosess:[],
          DiagnosesImages:[],
          diseases:[],
          newDiagnoses:{},
          message:"",
          activeIndex: -1,
          searchText:'',
        };
    },
    
    watch: {
      'searchText' : function(v) {
            this.searchText = v.toLowerCase().trim();
        },
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        Diagnosesstrings() {
            return this. Diagnosess.map(( item) => {
                return [item.doctor.fullname, item.user.fullname,item.result,item.technique,item.describe].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filteredDiagnosess() {
            if (!this.searchText) return this. Diagnosess;
                return this. Diagnosess.filter((_doctor, index) =>
                this. Diagnosesstrings[index].includes(this.searchText.toLocaleLowerCase())
            );
        },

        activedoctor() {
            if (this.activeIndex < 0) return null;
            return this.filteredDiagnosess[this.activeIndex];
        },

        filteredDiagnosessCount() {
            return this.filteredDiagnosess.length;
        },
    },
    methods: {
      async getAlldisease() {
        try {
          // console.log("get disease");
          this.diseases = await DiseaseService.getAllActive();
        } catch (err) {
          console.log(err);
        }
      },
      async activeDiagnoses(id){
        try{
          await DiagnosesService.active(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
          toast.success("kịch hoạt thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async inactiveDiagnoses(id){
        try{
          await DiagnosesService.inactive(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
          toast.success("ngưng kích hoạt thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      getLimitedPassage(groupPassage){
          const MAX_PASSAGE_LENGTH = 25; // Set the maximum number of characters you want to display
          if (groupPassage.length > MAX_PASSAGE_LENGTH) {
              return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
          } else {
              return groupPassage;
          }
      },
      async deleteDiagnoses(id){
        try{
          await DiagnosesService.delete(id);
          this.getAllDiagnoses();
          // alert("xóa thông tin phiếu chẩn đoán thành công")
          toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async deleteDiagnosesImages(id,diagnoseId){
        try{
          await DiagnosesImageService.delete(id);
          this.getDiagnosesImages(diagnoseId);
          toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async getDiagnosesImages(id){
        try{
          this.DiagnosesImages = await DiagnosesImageService.getByDiagnoses(id);
          console.log(this.DiagnosesImages)
        }catch(err){
            console.log(err);
        }
      },
      onChangeFile(e) {
            const selectedFile = e.target.files[0];
            this.FormDiagnose.file = selectedFile;
      },
      async createDiagnosesImage(){
        // const file = this.$refs.file.files[0]
        // file.name = "new.jpg"
        // console.log(file.name)
        const formData = new FormData();
        formData.append('file',this.$refs.file.files[0]);
        formData.append('diagnoses',this.FormDiagnose.diagnoses);
        console.log("show data");
        console.log(this.$refs.file.files[0]);
        console.log(this.FormDiagnose);
        try{
              
              const result = await DiagnosesImageService.create(this.FormDiagnose);
              await DiagnosesImageService.uploadFile(result.id,formData);
              this.FormDiagnose = {}
              this.resultReser = true
              toast.success("thêm thông tin thành công", {
                    autoClose: 1000
                });
              // this.getAllProducts();
              // console.log(result);
          } catch(err) {
              console.log(err);
          }
      },
      async createDiagnoses(){
        try{
          console.log(this.newDiagnoses);
          if(this.newDiagnoses.id != null){
            const result = await DiagnosesService.update(this.newDiagnoses.id,this.newDiagnoses)
          }else{
            const result = await DiagnosesService.create(this.newDiagnoses)
          }
          toast.success("thêm thông tin thành công", {
                    autoClose: 1000
                });
          this.newDiagnoses = {}
          this.resultReser=true
          this.getAllDiagnoses();
        }catch(err){
          console.log(err);
        }
      },
      async getAllDiagnoses(){
        try{
          this.Diagnosess = await DiagnosesService.getAll();
          console.log(this.Diagnosess)
        }catch(err){
          console.log(err)
        }
      },
      
      async getAllUser(){
        try{
          this.users = await UserService.getAllActive();
          // console.log(this.Diagnosess)
        }catch(err){
          console.log(err)
        }
      },
      async getAllDoctor() {
        try {
          // console.log("get disease");
          this.doctors = await DoctorService.getAllActive();
        } catch (err) {
          console.log(err);
        }
      },
      async getAllUser() {
        try {
          console.log("get Users");
          this.users = await UserService.getAllActive();
          // for(let i = 0; i < this.Doctors.length; i++){
          //     // console.log(i)
          //     const result = await UserService.getByDoctor(this.Doctors[i].id);
          //     this.Users.push({"Doctor":this.Doctors[i],"Users":result});
          // }
          // console.log( this.Users)
        } catch (err) {
          console.log(err);
        }
      },
      refreshList() {
            
            this.getAlldisease();
            this.getAllDiagnoses();
            this.activeIndex = -1;
        },
    },
    async created() {

        await this.refreshList();
        await this.getAllDoctor();
        await this.getAllUser();
    },
};
</script>
<style scoped>


</style>
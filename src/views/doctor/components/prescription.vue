<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <h4 class="ms-2">Đơn thuốc</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newPrescription={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Đơn thuốc</h3>
                              <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultReser=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Đơn thuốc mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="submitPrescription">
                                
                                <!-- <label>Giường</label> -->
                                <label>Bệnh Nhân</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.newPrescription.user">
                                         <option v-for="item in this.users" :key="item.id" :value="item.id">{{item.fullname}}</option>
                                      </select>
                                    </div>
                                <label>Chuẩn Đoán</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newPrescription.diagnostic">
                                </div>

                                <label>Mô tả </label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newPrescription.description">
                                </div>

                                <label>Cách dùng</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newPrescription.advice">
                                </div>
                                
                                <label>thuốc đã chọn   <span class="font-weight-bolder "> làm mới: <i class="fa fa-refresh fa-spin" @click="this.reFreshMedichine()"></i></span></label>
                                <div class="input-group mb-3 row">
                                    <div class="col-4" v-for="index in this.listMedicineName.length" :key="index">
                                      {{this.listMedicineName[index-1]}} <input placeholder="Nhập số lượng thuốc" class="form-control" type="number" v-model="this.listNumOfMedicine[index-1]"/>
                                    </div>
                                </div>
                                <vue-horizontal snap="center " >
                                    <component-example class="m-1 p-2 card" v-for="item in this.medicines" :key="item.id">
                                        <button type="button" class="btn btn-outline-secondary" @click="this.addMedichine(item)">{{item.name}}</button>
                                    </component-example>
                                </vue-horizontal>

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
                <div class="table-responsive p-2">
                  <table class="table align-items-left mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">bác sĩ</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Bệnh nhân</th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phòng</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Đơn thuốc</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Mô tả</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lời khuyên</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">thời gian tạo</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thuốc</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.filteredPrescription"
                          :key="item.id">
                        <td>
                          <div class="d-flex px-2 py-1">
                            
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{item.doctor.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">id: {{item.doctor.id}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{item.user.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">id: {{item.user.id}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.diagnostic}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p :title="item.description" class="text-xs font-weight-bold  mt-1 ">{{this.getLimitedPassage(item.description)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        <td>
                          <p :title="item.advice" class="text-xs font-weight-bold  mt-1 ">{{this.getLimitedPassage(item.advice)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.createAt}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModalLong" @click="getPrescriptionDetail(item.id)"> <i class="fa fa-eye text-dark" ></i></button>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        <td>
                          <button v-if="!item.isActive" type="button" class="btn btn-outline-secondary" @click="activePrescription(item.id)">inactive</button>
                          <button v-else type="button" class="btn btn-outline-success" @click="inactivePrescription(item.id)">active</button>
                        </td>

                        <td>
                          <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newPrescription=item"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deletePrescription(item.id)"><i class="far fa-trash-alt" ></i></button>
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
                <h5 class="modal-title" id="exampleModalLongTitle">Chi tiết Đơn thuốc</h5>
                <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-left mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Số lượng</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên thuốc</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Mô tả</th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phòng</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thành phần</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sử dụng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.clickedMedicines"
                          :key="item.medicine.id">
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ms-2">{{item.number}} viên</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.medicine.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <!-- <p class="text-xs font-weight-bold  mt-1 ">{{item.description}}</p> -->
                          <p :title="item.medicine.description" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(item.medicine.description)}}</p>

                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p :title="item.medicine.ingredient" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(item.medicine.ingredient)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p :title="item.medicine.uses" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(item.medicine.uses)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn bg-gradient-primary">Save changes</button> -->
              </div>
            </div>
          </div>
        </div>
      
      </div>
</template>
<script>
import PrescriptionService from "@/services/prescription.service";
import PrescriptionDetailService from "@/services/prescriptionDetail.service";
import MedicineService from "@/services/medicine.service";
import UserService from "@/services/user.service";
import DoctorService from "@/services/doctor.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
export default {
    components: {
      PrescriptionService,
      PrescriptionDetailService,
      MedicineService,
      VueHorizontal,
      DoctorService,
      UserService,
      FooterComponent,
    },
    data() {
        return {
          listNumOfMedicine:[],
          users: [],
          listMedicineName:[],
          listMedicineId:[],
          medicines: [],
          clickedMedicines:[],
          resultReser: false,
          selectedItem: [],
          Prescription:[],
          newPrescription:{},
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
        Prescriptiontrings() {
            return this. Prescription.map(( item) => {
                
                return [item.doctor.id,item.doctor.fullname,item.user.id,item.user.fullname,item.user.fullname,item.diagnostic,item.createAt].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filteredPrescription() {
            if (!this.searchText) return this. Prescription;
                return this. Prescription.filter((_doctor, index) =>
                this. Prescriptiontrings[index].includes(this.searchText)
            );
        },

        activedoctor() {
            if (this.activeIndex < 0) return null;
            return this.filteredPrescription[this.activeIndex];
        },

        filteredPrescriptionCount() {
            return this.filteredPrescription.length;
        },
    },
    methods: {
      async getPrescriptionDetail(id){
        try{
          this.clickedMedicines = await PrescriptionDetailService.getByPrescription(id);
        }catch(err){
          console.log(err)
        }
      },
      async activePrescription(id){
        try{
          await PrescriptionService.active(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      async inactivePrescription(id){
        try{
          await PrescriptionService.inactive(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
        getLimitedPassage(groupPassage){
            const MAX_PASSAGE_LENGTH = 30; // Set the maximum number of characters you want to display
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        },
      reFreshMedichine(){
        this.listMedicineName = []
        this.listMedicineId = []
      },
      addMedichine(item){
        this.listMedicineName.push(item.name)
        this.listMedicineId.push(item.id)
      },
      async deletePrescription(id){
        try{
          await PrescriptionService.delete(id);
          this.refreshList()
          alert("Xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      
      async submitPrescription(){
        try{
          this.newPrescription.doctor = JSON.parse(localStorage.doctor).id
          this.newPrescription.medicines = this.listMedicineId
          this.newPrescription.medicinesNumber = this.listNumOfMedicine
            
          console.log(this.newPrescription);
          if(this.newPrescription.id != null){
            const result = await PrescriptionService.update(this.newPrescription.id,this.newPrescription)
          }else{
            const result = await PrescriptionService.create(this.newPrescription)
          }
          
          this.newPrescription = {}
          this.listMedicineId = []
          this.resultReser=true
          this.getAllPresceiption();
          this.reFreshMedichine()
        }catch(err){
          console.log(err);
        }
      },
      async getAllPresceiption(){
        try{
          this.Prescription = await PrescriptionService.getByDoctor(JSON.parse(localStorage.doctor).id);
          console.log(this.Prescription)
        }catch(err){
          console.log(err)
        }
      },
      
      async getAllUser(){
        try{
          this.users = await UserService.getAllActive();
          
        }catch(err){
          console.log(err)
        }
      },

      async getAllMedicine() {
        try {
          this.medicines = await MedicineService.getAllActive();
          
        } catch (err) {
          console.log(err);
        }
      },
      refreshList() {
            this.getAllMedicine()
            this.getAllUser();
            this.getAllPresceiption();
            this.activeIndex = -1;
        },
    },
    async created() {
        await this.refreshList();

    },
};
</script>
<style scoped>


</style>
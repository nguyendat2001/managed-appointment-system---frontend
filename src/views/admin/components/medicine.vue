<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <h4 class="ms-2">Thuốc</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newMedicine={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Thuốc</h3>
                              <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultReser=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Thuốc mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="submitMedicine">
                                
                                <!-- <label>Giường</label> -->
                                
                                <label>Tên thuốc</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newMedicine.name">
                                </div>

                                <label>Mô tả</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newMedicine.description">
                                </div>

                                <label>thành phần</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newMedicine.ingredient">
                                </div>

                                <label>Hướng đẫn dùng</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newMedicine.uses">
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
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên thuốc</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Mô tả</th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phòng</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thành phần</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sử dụng</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Kích hoạt</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.filteredMedicine"
                          :key="item.id">
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <!-- <p class="text-xs font-weight-bold  mt-1 ">{{item.description}}</p> -->
                          <p :title="item.description" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(item.description)}}</p>

                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p :title="item.ingredient" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(item.ingredient)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <p :title="item.uses" class="text-xs font-weight-bold  mt-1 ">{{getLimitedPassage(item.uses)}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        <td>
                          <!-- <p class="text-xs font-weight-bold  mt-1 ">{{item.isActive}}</p> -->
                          <button v-if="!item.isActive" type="button" class="btn btn-outline-secondary" @click="activeMedicine(item.id)">inactive</button>
                          <button v-else type="button" class="btn btn-outline-success" @click="inactiveMedicine(item.id)">active</button>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        
                        <td>
                          <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newMedicine=item"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteMedicine(item.id)"><i class="far fa-trash-alt" ></i></button>
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
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
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
                            <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" > <i class="fa fa-pencil-alt text-dark"></i></button> -->
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
                    <h3 class="font-weight-bolder text-info text-gradient">Thêm hình ảnh Thuốc</h3>
                    <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                        <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                        <button type="button" class="btn-close" @click="this.resultReser=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <p class="mb-0">Hình ảnh Thuốc mới</p>
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

import MedicineService from "@/services/medicine.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
export default {
    components: {
      VueHorizontal,
      MedicineService,
      FooterComponent,
    },
    data() {
        return {
          medicines: [],
          users: [],
          resultReser: false,
          selectedItem: [],
          newMedicine:{},
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
        Medicinetrings() {
            return this.medicines.map(( item) => {
                
                return [item.name, item.description, item.ingredient,item.uses].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filteredMedicine() {
            if (!this.searchText) return this.medicines;
                return this.medicines.filter((_doctor, index) =>
                this.Medicinetrings[index].includes(this.searchText)
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
      getLimitedPassage(groupPassage){
            const MAX_PASSAGE_LENGTH = 30; // Set the maximum number of characters you want to display
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        },
      async activeMedicine(id){
        try{
          await MedicineService.active(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      async inactiveMedicine(id){
        try{
          await MedicineService.inactive(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      async deleteMedicine(id){
        try{
          await MedicineService.delete(id);
          this.refreshList();
          alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      
      async submitMedicine(){
        try{
          console.log(this.newMedicine);
          if(this.newMedicine.id != null){
            const result = await MedicineService.update(this.newMedicine.id,this.newMedicine)
          }else{
            const result = await MedicineService.create(this.newMedicine)
          }
          
          this.newMedicine = {}
          this.resultReser=true
          this.refreshList();
        }catch(err){
          console.log(err);
        }
      },
      
      async getAllMedicine() {
        try {
          // console.log("get disease");
          this.medicines = await MedicineService.getAll();
        } catch (err) {
          console.log(err);
        }
      },
      
      refreshList() {
            
            // this.getAllUser();
            this.getAllMedicine();
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
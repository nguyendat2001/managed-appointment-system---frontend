<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              
              <div class="card-header pb-0 d-flex justify-content-between">
                <h4 >Phòng ban</h4>
                
                <div class="m-1 ">
                  <!-- <button type="button" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button> -->
                  <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newDepartment={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Phòng Ban</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Phòng Ban mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="summitDepartment">
                                <label>Tên Phòng Ban</label>
                                <div class="input-group mb-3">
                                  <input required type="text" class="form-control" placeholder="ABC Phòng Ban" aria-label="Email" aria-describedby="email-addon" v-model="this.newDepartment.name">
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
                
              </div>
              <div class="card-body mt-3 px-0 pt-0 pb-2 p-2">
                <vue-horizontal snap="center">
                  <component-example class="m-1 p-2 card" v-for="department in this.departments" :key="department.id">
                    <a>
                      <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                          <span class="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">{{department.name}}</span>
                          <div class="row">
                            <div class="col-6">
                              <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newDepartment = department"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            </div>
                            <div class="col-6">
                              <button type="button" class="btn btn-outline-danger" data-mdb-color="dark"><i class="far fa-trash-alt"></i></button>
                            </div>
                          </div>
                      </div>
                    </a>
                  </component-example>
                </vue-horizontal>
              </div>
            </div>
            <div class="card mb-4">
              <h4 class="ms-3">Bác sỉ</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <router-link :to="{
                    name: 'Doctor  /  AddDoctor',
                }"><button type="button" class="btn btn-primary">thêm mới</button></router-link>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Doctor</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Department</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Degree</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Birthday</th>
                        <th class="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="doctor in this.filtereddoctors"
                          :key="doctor._id">
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img  v-if="doctor.avatar != null" :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/'+doctor.avatar" class="avatar avatar-sm me-3" alt="user1">
                              <img v-else src="@/assets/admin/img/avatar.jpg" class="avatar avatar-sm me-3" alt="user1">

                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{doctor.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">{{doctor.account[0].email}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{doctor.department.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-success">{{doctor.degree}}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{doctor.birthday}}</span>
                        </td>
                        <td class="align-middle">
                          <div class="btn-group shadow-0 mt-2" role="group" aria-label="Basic example">
                            <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"><i class="fa fa-user fa-sm" style="font-size:14px;"></i></button> -->
                            <router-link
                              :to="{
                                  name: 'Doctor/Detail',
                                  params: { id: doctor.id },
                              }"
                              ><button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"><i class="fa fa-user fa-sm" style="font-size:14px;"></i></button>
                            </router-link>
                            <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"><i class="far fa-trash-alt fa-sm" style="font-size:10px;"></i></button> -->
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
      </div>
</template>
<script>

import DoctorService from "@/services/doctor.service";
import DepartmentService from "@/services/department.service"  
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
export default {
    components: {
      DoctorService,
      DepartmentService,
      VueHorizontal,
      FooterComponent,
    },
    data() {
        return {
          resultDepart: false,
          doctors:[],
          departments: [],
          newDepartment:{},
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
        
        doctorStrings() {
            return this.doctors.map(( doctor) => {
               
                return [doctor.id, doctor.fullname,doctor.birthday,doctor.address,doctor.gender,doctor.degree,doctor.experience,doctor.department.name,doctor.account[0].username,doctor.account[0].email].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filtereddoctors() {
            if (!this.searchText) return this.doctors;
                return this. doctors.filter((_doctor, index) =>
                this.doctorStrings[index].includes(this.searchText)
            );
        },

        activedoctor() {
            if (this.activeIndex < 0) return null;
            return this.filtereddoctors[this.activeIndex];
        },

        filtereddoctorsCount() {
            return this.filtereddoctors.length;
        },
    },
    methods: {
      async summitDepartment(){
        try{
          // console.log(this.newDepartment.id)
          if(this.newDepartment.id == null){
            const result = await DepartmentService.create(this.newDepartment)
            this.resultDepart=true
          }else{
            const result = await DepartmentService.update(this.newDepartment.id,this.newDepartment)
            this.resultDepart=true
          }
          this.getAllDepartment();
        }catch(err){
          console.log(err);
        }
      },
      async getAllDoctor(){
        try{
          this.doctors = await DoctorService.getAll();
        }catch(err){
          console.log(err)
        }
      },
      async getAllDepartment(){
        try{
          this.departments = await DepartmentService.getAllActive();
        }catch(err){
          console.log(err)
        }
      },
      async deleteDoctor(id){
        try{
          await DoctorService.delete(id);
          getAllDoctor();
        }catch(err){
          console.log(err)
        }
      },
      refreshList() {
            this.getAllDoctor();
            this.getAllDepartment();
            this.activeIndex = -1;
        },
    },
    async created(){
      await this.refreshList();
    }
};
</script>
<style scoped>


</style>
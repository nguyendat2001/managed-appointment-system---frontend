<template>
<div class="container py-4" style="width:700px;">
    <div class="modal-content">
      <div class="modal-body p-0">
        <div class="card card-plain">
          <div class="card-header pb-0 text-left">
            <h3 class="font-weight-bolder text-info text-gradient">Cập nhật thông tin bác sĩ</h3>
            <div v-if="this.success" class="alert alert-success alert-dismissible fade show" role="alert">
              <span class="alert-icon"><i class="ni ni-like-2"></i></span>
              <span class="alert-text"><strong>Success!</strong> Cập nhật bác sĩ thành công!</span>
              <button type="button" class="btn-close" >
                  <span aria-hidden="true" @click="this.success=false">&times;</span>
              </button>
          </div>
            <p class="mb-0">Nhập thông tin bác sĩ</p>
            <td class="align-center text-left">
              
            </td>
          </div>
          <div class="card-body">
            <form role="form text-left" @submit.prevent="this.submitUpdateDoctor()">
              <div class="row">
                <div class="col-6">
                  <img  width="300" height="200"  class="rounded"  v-if="this.url" :src="this.url" />
                  <img  width="300" height="200"  class="rounded"  v-else-if="this.updateDoctor.avatar != null" :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/'+this.updateDoctor.avatar" />
                  
                  <img width="300" height="200"  class="rounded" v-else src="@/assets/admin/img/upload icon.jpg" />
                </div>
                <div class="col-6 mt-3">
                  <label>Ảnh đại diện</label>
                  <div class="fileUploadInput">
                      <!-- <label>✨ chọn file</label> -->
                      <input ref="file" type="file" class="" @change="onFileChange" />
                      <button>+</button>
                  </div>
                  <label>Giới tính</label>
                  <div class="input-group mb-3">
                    <select class="select form-control" v-model="this.newDoctor.gender">
                      <!-- <option value="4" disabled>Gender</option> -->
                      <option value=false>Nữ</option>
                      <option value=true>Nam</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <label>Họ tên</label>
                  <div class="input-group mb-3">
                    <input required
                      type="text"
                      class="form-control"
                      placeholder="ABC dataset"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      v-model="this.newDoctor.fullname"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <label>Năm sinh</label>
                  <div class="input-group mb-3">
                    <input required
                      type="date"
                      class="form-control"
                      placeholder="ABC dataset"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      v-model="this.newDoctor.birthday"
                    />
                  </div>                
                </div>
                <div class="col-6">
                  <label>Địa chỉ</label>
                  <div class="input-group mb-3">
                    <input required
                      type="text"
                      class="form-control"
                      placeholder="ABC dataset"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      v-model="this.newDoctor.address"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <label>Chuyên khoa</label>
                  <div class="input-group mb-3">
                    <select class="select form-control" v-model="this.newDoctor.department" >
                      <!-- <option value="4" disabled>Gender</option> -->
                      <!-- <option :value="0">Female</option> -->
                      <option  v-for="item in this.departments" :key="item._id" :value="item.id">{{item.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <label>Số điện thoại</label>
                  <div class="input-group mb-3">
                    <input required
                      type="text"
                      class="form-control"
                      placeholder="ABC dataset"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      v-model="this.newDoctor.phone"
                    />
                  </div>                
                </div>
                <div class="col-6">
                  <label for="example-date-input" class="form-control-label" >Bằng cấp</label>
                    <select class="select form-control" v-model="this.newDoctor.degree" >
                      <!-- <option value="4" disabled>Gender</option> -->
                      <!-- <option :value="0">Female</option> -->
                      <option  v-for="item in this.degrees" :key="item._id" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="col-8">
                  <label>Kinh nghiệm làm việc</label>
                  <div class="input-group mb-3">
                    <input required
                      type="text"
                      class="form-control"
                      placeholder="ABC dataset"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      v-model="this.newDoctor.experience"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <label>Giá tiền cho lịch hẹn</label>
                  <div class="input-group mb-3">
                    <input required
                      type="number"
                      class="form-control"
                      placeholder="ABC dataset"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      v-model="this.newDoctor.appointmentPrice"
                    />
                  </div>
                </div>
              </div>

              <!-- <label class="form-label select-label">Example label</label> -->
              <div class="text-center">
                <button variant="info" 
                  type="submit"
                  class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                >
                  Hoàn thành
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';   
import DepartmentService from "@/services/department.service"  
import AccountService from "@/services/auth.service"  
import DoctorService from "@/services/doctor.service"  
import DegreeService from "@/services/degree.service"  
import {useUserStore} from "@/stores/user";


export default {
  components: {
    DepartmentService,
    AccountService,
    DoctorService,
    DegreeService
  },
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      updateDoctor:{},
      newDoctor:{},
      doctor:{},
      departments: [],
      degrees:[],
      choiseDegree:{},
      url:null,
      success:false,
    };
  },
  props: {
      id: { type: String, required: true },
    },
  watch: {},
  computed: {
    
  },
  methods: {
    async onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            
        },
    async getDepartment(){
      try{
          this.departments = await DepartmentService.getAllActive();
        }catch(err){
          console.log(err)
        }
    },
    async getDegree(){
      try{
          this.degrees = await DegreeService.getAllActive();
        }catch(err){
          console.log(err)
        }
    },
    async getDoctor(){
      try{
          this.updateDoctor = await DoctorService.get(this.id);
          this.newDoctor.fullname = this.updateDoctor.fullname
          this.newDoctor.birthday = this.updateDoctor.birthday
          this.newDoctor.address = this.updateDoctor.address
          this.newDoctor.phone = this.updateDoctor.phone
          this.newDoctor.experience = this.updateDoctor.experience
          this.newDoctor.appointmentPrice = this.updateDoctor.appointmentPrice
          
          console.log("updateDoctor")
          // console.log( this.updateDoctor)
        }catch(err){
          console.log(err)
        }
    },
    async submitUpdateDoctor(){
      try{
          if(this.url){
            const formData = new FormData();
            formData.append('file',this.$refs.file.files[0]);
            if(this.updateDoctor.avatar){
              await DoctorService.updateAvatar(this.id,formData);
            }else{
              await DoctorService.uploadAvatar(this.id,formData);
            }
          }
          
          console.log(this.newDoctor)
          await DoctorService.update(this.id,this.newDoctor);
          this.success=true
        }catch(err){
          console.log(err)
          // console.log("err")
          // console.log(err.response.data.message)
          // alert(err.response.data.message)
        }
    }
  },
  async created(){
    await this.getDepartment();
    await this.getDegree();
    await this.getDoctor()
  },
  async mounted() {
  
  },

  
};
</script>
<style>

</style>
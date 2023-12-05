<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <h4 class="ms-2">tất cả lịch hẹn</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newAppointment={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật lịch hẹn</h3>
                              <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultReser=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin lịch hẹn mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="submitAppointment">
                                
                                <div class="input-group mb-3 row">
                                  
                                  <div class="col-6"> 
                                    <label>bác sĩ</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.clickedDoctorid">
                                        <option v-for="item in this.doctors" :key="item.id" :value="item.id">{{item.fullname}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Bệnh Nhân</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.newAppointment.user">
                                         <option v-for="item in this.users" :key="item.id" :value="item.id">{{item.fullname}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Ngày</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.clickedWorkDayid">
                                        <option v-for="item in this.workdays" :key="item.id" :value="item.id">{{item.day}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Giờ (Lưu ý: thời gian cho mỗi lịch hẹn là 20p)</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.newAppointment.worktime">
                                         <option v-for="item in this.worktimes" :key="item.id" :value="item.id">{{ this.standantlize(item.time) }} - {{ this.addMinutes(item.time) }}</option>
                                      </select>
                                    </div>
                                  </div>

                                </div>
                                <label>tin nhắn</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newAppointment.message">
                                </div>

                                <label>Tài khoản ngân hàng</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newAppointment.bankName">
                                </div>

                                <label>Mã thẻ ngân hàng</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="text" id="example-date-input" v-model="this.newAppointment.creditNumber">
                                </div>

                                <div class="text-center">
                                  <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
                                </div>
                              </form>
                            </div>
                            
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
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">giờ</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tin nhắn</th> 
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ngân hàng</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">minh chứng chuyển khoản</th> 
                        <!-- <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thuốc</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.Appointment"
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
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.worktime.workday.day}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{item.worktime.time}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>

                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{item.bankName}}</h6>
                              <p class="text-xs text-secondary mb-0">number: {{item.creditNumber}}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td>
                          <p :title="item.advice" class="text-xs font-weight-bold  mt-1 ">{{this.getLimitedPassage(item.message)}}</p>
                        </td>
                        <td class="text-center  mt-1 ">
                          <a v-if="item.proofImage" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#updateProof" @click="this.appointment = item"
                            class="btn btn-outline-success me-3"
                            ><i class="fas fa-image text-sm me-1"></i></a>
                          <button v-else 
                            class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="this.clickedAppointment = item.id">Thêm
                          </button>
                        </td>
                        <td>
                          <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newAppointment=item"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteAppointment(item.id)"><i class="far fa-trash-alt" ></i></button>
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
    <div class="modal fade" id="updateProof" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="card card-plain">
                <div class="card-header pb-0 text-left">
                  <h3 class="font-weight-bolder text-info text-gradient">Minh chứng chuyển khoản</h3>
                  <p class="mb-0">cập nhật hình ảnh minh chứng chuyển khoản</p>
                </div>
                <div class="card-body">
                  <form role="form text-left" @submit.prevent="updateProofOfAppointment()">
                    <div class="row">
                      <!-- <img v-if="this.url" style="height:200px; width:250px;" :src="this.url"> -->
                      <img style="height:200px; width:250px;" :src="
                            'http://localhost:9004/api/loads/proofs_get/'+this.appointment.proofImage 
                            ">
                      <div class="row-12 fileUploadInput">
                          <label>✨ chọn file</label>
                          <input  ref="file1" @change="this.onFileChange()" type="file" />
                          <button>+</button>
                      </div>
                    </div>
                    <!-- <label>Mã thẻ Tài khoản ngân hàng</label>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="1234 - **** - **** - ****" aria-label="Password" aria-describedby="password-addon"  v-model="this.newAppointment.creditNumber" required>
                    </div> -->

                    <div class="text-center">
                      <button type="submit" class="btn btn-main btn-round-full w-100 mt-4 mb-0">Cập nhật</button>
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
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="card card-plain">
                <div class="card-header pb-0 text-left">
                  <h3 class="font-weight-bolder text-info text-gradient">Minh chứng chuyển khoản</h3>
                  <p class="mb-0">thêm hình ảnh minh chứng chuyển khoản</p>
                </div>
                <div class="card-body">
                  <form role="form text-left" @submit.prevent="uploadProofOfAppointment()">
                    <div class="row">

                      <div class="row-12 fileUploadInput">
                          <label>✨ chọn file</label>
                          <input  ref="file" @change="onFileChange" type="file" />
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
import AppointmentService from "@/services/appoitment.service";
import WorkdayService from "@/services/workday.service";
import WorktimeService from "@/services/worktime.service";
import UserService from "@/services/user.service";
import DoctorService from "@/services/doctor.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    components: {
      AppointmentService,
      WorktimeService,
      WorkdayService,
      VueHorizontal,
      DoctorService,
      UserService,
      FooterComponent,
    },
    data() {
        return {
          clickedDoctorid:null,
          clickedWorkDayid:null,
          clickedWorkTimeid:null,
          workdays:[],
          worktimes:[],
          doctors: [],
          users: [],
          url:null,
          appointment:{},
          clickedAppointment:null,
          resultReser: false,
          selectedItem: [],
          Appointment:[],
          newAppointment:{},
          message:"",
          activeIndex: -1,
          searchText:'',
        };
    },
    
    watch: {
        clickedDoctorid: function (v) {
          this.getworkday(v);
        },
        clickedWorkDayid: function (v) {
            this.getworktime(v);
        },
      'searchText' : function(v) {
            this.searchText = v.toLowerCase().trim();
        },
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        Appointmenttrings() {
            return this. Appointment.map(( item) => {
                
                return [item.doctor.id,item.doctor.fullname,item.user.id,item.user.fullname,item.user.fullname,item.diagnostic,item.createAt].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filteredAppointment() {
            if (!this.searchText) return this. Appointment;
                return this. Appointment.filter((_doctor, index) =>
                this. Appointmenttrings[index].includes(this.searchText)
            );
        },

        activedoctor() {
            if (this.activeIndex < 0) return null;
            return this.filteredAppointment[this.activeIndex];
        },

        filteredAppointmentCount() {
            return this.filteredAppointment.length;
        },
    },
    methods: {
      standantlize(date) {
      // console.log(date.split(':'))
      const data = date.split(":");
      let time = data[0].toString() + ":" + parseInt(data[1]).toString();
      return time;
    },
    addMinutes(date) {
      // console.log(date.split(':'))
      const data = date.split(":");
      let time = data[0].toString() + ":" + (parseInt(data[1]) + 20).toString();
      if (parseInt(data[1]) + 20 == 60) {
        time = (parseInt(data[0]) + 1).toString() + ":" + "00";
      } else {
        time = data[0].toString() + ":" + (parseInt(data[1]) + 20).toString();
      }
      return time;
    },
      async getworkday(id){
        try{
          this.workdays = [];
          const data = await WorkdayService.getAllByDoctor(id);

          const today = Date.now();
          for (let i = 0; i < data.length; i++) {
            const day = new Date(data[i].day);
            console.log(day);
            if (day >= today) {
              // const worktimes = await WorktimeService.getAllByWorkdate(workdays[i].id);
              this.workdays.push(data[i]);
            }
          }
        }catch(err){
          console.log(err)
        }
      },
      async getworktime(id){
        try{
          this.worktimes = [];
          this.worktimes = await WorktimeService.getAllByWorkdateAndIsAvailable(id);
        }catch(err){
          console.log(err)
        }
      },
      onFileChange(e) {
            const selectedFile = e.target.files[0];
            this.url = URL.createObjectURL(selectedFile);
      },
      async updateProofOfAppointment(){
        try{
          const formData = new FormData();
          formData.append('file',this.$refs.file1.files[0]);
          await AppointmentService.updateProof(this.appointment.id, formData);
          this.getAllAppointment()
          // alert("cập nhật minh chứng chuyển khoản thành công!")
          toast.success("cập nhật minh chứng chuyển khoản thành công!", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async uploadProofOfAppointment(){
        try{
          const formData = new FormData();
          formData.append('file',this.$refs.file.files[0]);
          await AppointmentService.uploadProof(this.clickedAppointment, formData);
          this.getAllAppointment()
          this.url = null
        }catch(err){
          console.log(err)
        }
      },
      async activeAppointment(id){
        try{
          await AppointmentService.active(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
          toast.success("kích hoạt thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async inactiveAppointment(id){
        try{
          await AppointmentService.inactive(id);
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
        this.listNumOfMedicine = []
      },
      addMedichine(item){
        this.listMedicineName.push(item.name)
        this.listMedicineId.push(item.id)
      },
      async deleteAppointment(id){
        try{
          await AppointmentService.delete(id);
          this.refreshList()
          // alert("Xóa thông tin thành công")
          toast.success("Xóa thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      
      async submitAppointment(){
        try{
            this.newAppointment.medicines = this.listMedicineId
            this.newAppointment.medicinesNumber = this.listNumOfMedicine
          console.log(this.newAppointment);
          if(this.newAppointment.id != null){
            const result = await AppointmentService.update(this.newAppointment.id,this.newAppointment)
          }else{
            const result = await AppointmentService.create(this.newAppointment)
          }
          toast.success("thêm thông tin thành công", {
                    autoClose: 1000
                });
          this.newAppointment = {}
          this.listMedicineId = []
          this.resultReser=true
          this.getAllAppointment();
          this.reFreshMedichine();
        }catch(err){
          console.log(err);
        }
      },
      async getAllAppointment(){
        try{
          this.Appointment = await AppointmentService.getAll();
          
        }catch(err){
          console.log(err)
        }
      },
      
      async getAllUser(){
        try{
          this.users = await UserService.getAllActive();
          // console.log(this.Appointment)
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
      async getAllMedicine() {
        try {
          this.medicines = await MedicineService.getAllActive();
          
        } catch (err) {
          console.log(err);
        }
      },
      refreshList() {
            this.getAllDoctor()
            this.getAllUser();
            this.getAllAppointment();
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
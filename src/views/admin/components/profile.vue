<template>
  <div class="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
    <!-- Navbar -->
    <nav
      class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2"
    ></nav>
    <!-- End Navbar -->
    <div class="container-fluid">
      <div
        class="page-header min-height-300 border-radius-xl mt-4"
        style="
          background-image: url('/admin/img/curved-images/curved0.jpg');
          background-position-y: 50%;
        "
      >
        <span class="mask bg-gradient-primary opacity-6"></span>
      </div>
      <div class="modal fade" id="modal-form-workday" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm Ngày nhận lịch hẹn</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Thêm Ngày nhận lịch hẹn</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" >
                                <label>chọn ngày làm việc</label>
                                <div class="input-group mb-3">
                                  <input required type="date" class="form-control" aria-label="Email" aria-describedby="email-addon" v-model="this.newWorkday.day">
                                </div>
                                
                                <div class="text-center">
                                  <button type="button" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" @click="this.summitWorkday()">Submit</button>
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
      <div class="card card-body blur shadow-blur mx-4 mt-n12 overflow-hidden">
        <div class="row gx-4">
          <div class="col-2">
            
            <div class="position-relative">
              <!-- <img src="../assets/img/bruce-mars.jpg" alt="profile_image" class="w-100 border-radius-lg shadow-sm"> -->
              <img
                v-if="doctor.avatar != null"
                :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/' + doctor.avatar"
                alt="profile_image"
                class="border-radius-lg shadow-sm"
                style="height: 190px; width: 190px"
              />
              <img
                v-else
                src="@/assets/admin/img/avatar.jpg"
                alt="profile_image"
                class="border-radius-lg shadow-sm"
                style="height: 190px; width: 190px"
              />
            </div>
          </div>
          <div class="col-5 my-auto m-2">
            <div class="h-100 mt-8">
              <h5 class="mb-1">
                {{ this.doctor.fullname }}
              </h5>
              <p class="mb-0 font-weight-bold text-sm">
                {{ this.doctorDegree.name }}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-md-8 d-flex align-items-center">
                  <h6 class="mb-0">Thông Tin Cá Nhân</h6>
                </div>
                <div class="col-md-4 text-end">
                  <a href="javascript:;">
                    <i
                      class="fas fa-user-edit text-secondary text-sm"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit Profile"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body p-3">
              <p class="text-sm">
                Xin Chào, Tôi Tên là {{ this.doctor.fullname }}, tôi hiện tại là bác sĩ
                tại bệnh viện và ở Khoa {{ this.doctorDepartment.name }}, tôi có
                {{ this.doctor.experience }} trong nghề.
                <!-- Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality). -->
              </p>
              <hr class="horizontal gray-light my-4" />
              <ul class="list-group">
                <li class="list-group-item border-0 ps-0 pt-0 text-sm">
                  <strong class="text-dark">Họ Và Tên:</strong> &nbsp;
                  {{ this.doctor.fullname }}
                </li>
                
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Ngày Sinh:</strong> &nbsp;
                  {{ this.doctor.birthday }}
                </li>
                <li  v-if="this.doctor.gender == true" class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark"
                    >Giới Tính:</strong> &nbsp; Nam 
                </li>
                <li  v-else class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark"
                    >Giới Tính:</strong> &nbsp; Nữ 
                </li>
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Địa Chỉ:</strong> &nbsp;
                  {{ this.doctor.address }}
                </li>
                <li class="list-group-item border-0 ps-0 pb-0">
                  <strong class="text-dark text-sm">Mạng xã hội:</strong> &nbsp;
                  <a
                    class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                    href="javascript:;"
                  >
                    <i class="fab fa-facebook fa-lg"></i>
                  </a>
                  <a
                    class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                    href="javascript:;"
                  >
                    <i class="fab fa-twitter fa-lg"></i>
                  </a>
                  <a
                    class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                    href="javascript:;"
                  >
                    <i class="fab fa-instagram fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Ngày Mở lịch hẹn</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-outline-primary btn-sm mb-0" data-bs-toggle="modal" data-bs-target="#modal-form-workday">thêm mới</button>
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0 scrollbox">
              <ul class="list-group">
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                  v-for="workday in this.workdays"
                  :key="workday.id"
                >
                  <div class="d-flex flex-column">
                    <h6 class="text-dark font-weight-bold text-sm">
                      {{ workday.day }}
                    </h6>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    <!-- {{ certificate.name }} -->
                    
                    <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                      <!-- <a  data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#"><i class="fa fa-pencil-alt text-dark m-1 ms-2"></i></a> -->
                      <a  data-mdb-color="dark" @click="this.deleteWorkday(workday.id)"><i class="far fa-trash-alt text-dark m-1"></i></a>
                      <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= certificate"> <i class="fa fa-pencil-alt text-dark"></i></button>
                      
                      <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCertificate(certificate.id)"><i class="far fa-trash-alt" ></i></button> -->
                    </div>
                      

                  </div>
                </li>
                
                
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Bằng Cấp</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-outline-primary btn-sm mb-0" data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= {}">thêm mới</button>
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0 scrollbox">
              <ul class="list-group">
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                  v-for="certificate in this.certificates"
                  :key="certificate.id"
                >
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark font-weight-bold text-sm">
                      {{ certificate.validFrom }}
                    </h6>
                    <span class="text-xs">{{ certificate.certificationUnit }}</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    {{ certificate.name }}
                    <a
                      :href="
                        'http://localhost:9004/api/loads/certificates_get/' +
                        certificate.path
                      "
                      class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i  class="fas fa-file-pdf text-lg me-1"></i> PDF</a>
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <a  data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= certificate"><i class="fa fa-pencil-alt text-dark m-1 ms-2"></i></a>
                        <a  data-mdb-color="dark"  @click="this.deleteCertificate(certificate.id)"><i class="far fa-trash-alt text-dark m-1"></i></a>
                        <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= certificate"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCertificate(certificate.id)"><i class="far fa-trash-alt" ></i></button> -->
                      </div>
                      

                  </div>
                </li>
                
                
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="card mb-4">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-1">Lịch hẹn của bác sĩ</h6>
              <p class="text-sm">Tất cả lịch hẹn</p>
            </div>
            <div class="card-body p-3">
              <div class="row">
                <ejs-schedule
                  v-if="this.loaded"
                  :height="height"
                  :selectedDate="selectedData"
                  :eventSettings="eventSettings"
                ></ejs-schedule>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent/>
        <div class="modal fade" id="modal-form-certificate" tabindex="-1" aria-labelledby="modal-form-certificate" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body p-0">
                      <div class="card card-plain">
                        <div class="card-header pb-0 text-left">
                          <h3 class="font-weight-bolder text-info text-gradient">Thêm/Chỉnh sửa Bằng Cấp</h3>
                          <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                          <p class="mb-0">Nhập thông tin về Bằng Cấp</p>
                        </div>
                        <div class="card-body">
                          <form role="form text-left" @submit.prevent="this.submitCertificate()">
                            <label>Tên Bằng Cấp</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Bằng Cấp ####" aria-label="Toiec ..." aria-describedby="email-addon"
                               v-model="this.newCertificates.name">
                            </div>
                            <label>Đơn vị cấp</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Mô tả ..." aria-label="Đơn vị cấp" aria-describedby="password-addon"
                               v-model="this.newCertificates.certificationUnit">
                            </div>
                            <label>Ngày cấp</label>
                            <div class="input-group mb-3">
                              <input required type="date" class="form-control" placeholder="triệu chứng ..." aria-label="Ngày cấp" aria-describedby="email-addon" 
                              v-model="this.newCertificates.validFrom">
                            </div>

                            <label>File</label>
                            <div class="input-group mb-3">
                              <input required type="file" ref="file" class="form-control" placeholder="triệu chứng ..." aria-label="Ngày cấp" aria-describedby="email-addon" >
                            </div>
                            
                            <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Chọn tỉnh/thành phố</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.curentProvince">
                                        <option v-for="province in this.provinces" :key="province.id" :value="province.id">{{province.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Chọn quận/huyện</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.curentDistrict">
                                        <option v-for="district in this.districts" :key="district.id" :value="district.id">{{district.name}}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-6"> 
                                    <label>Chọn xã/phường</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.newCertificates.ward">
                                        <option v-for="ward in this.wards" :key="ward.id" :value="ward.id">{{ward.name}}</option>
                                      </select>
                                    </div>
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
  
</template>

<script>
import { Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-vue-schedule";

import DoctorService from "@/services/doctor.service";
import AppointmentService from "@/services/appoitment.service";
import CertificateService from "@/services/certificate.service";
import FooterComponent from "./footer.vue";
import ProvinceService from "@/services/province.service";
import DistrictService from "@/services/district.service";
import WardService from "@/services/ward.service";
import WorkdayService from "@/services/workday.service";
import WorktimeService from "@/services/worktime.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    WorkdayService,
    WorktimeService,
    ProvinceService,
    DistrictService,
    WardService,
    DoctorService,
    AppointmentService,
    CertificateService,
    FooterComponent,
  },
  data() {
    return {
      doctor: {},
      doctorDegree:{},
      curentProvince:null,
      curentDistrict:null,
      newCertificates:{},
      certificates: [],
      workdays: [],
      newWorkday:{},
      scheduleData: [],
      doctorDepartment: {},
      doctorAccount: {},
      appointment_data: [],
      message: "",
      loaded: false,
      height: "550px",
      resultDepart:false,
      eventSettings: {
        // dataSource:
      },
      selectedData: new Date(2023, 10, 10),
    };
  },
  props: {
    id: { type: String, required: true },
  },
  watch: {
    curentProvince: function (v) {
        this.getAllDistrict(v);
    },
    curentDistrict: function (v) {
        this.getAllWard(v);
    },
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda],
  },
  computed: {
    // sortWorkday(){
      // return this.workdays.sort(function(a, b) {
      //     var c = new Date(a.day);
      //     var d = new Date(b.day);
      //     return c-d;
      // });
    // },
  },
  methods: {
    async summitWorkday(){
      try{
        this.newWorkday.doctor = this.id;
        // console.log(this.newWorkday)
        await WorkdayService.create(this.newWorkday)
        this.resultDepart = true
        this.getworkdays()
      }catch(err){
        console.log(err)
      }
    },
    async getworkdays(){
      try{
        this.workdays = await WorkdayService.getAllByDoctor(this.id);
        this.workdays.sort(function(a, b) {
          var c = new Date(a.day);
          var d = new Date(b.day);
          return d-c;
        });
      }catch(err){
        console.log(err)
      }
    },
    async submitCertificate(){
        try{

            this.newCertificates.doctor = this.id;
            console.log(this.newCertificates)
            const formData = new FormData();
            formData.append('file',this.$refs.file.files[0]);
            if(this.newCertificates.id == null){
                const result = await CertificateService.create(this.newCertificates);
                await CertificateService.uploadfile(result.id,formData)
            }else{
                const result = await CertificateService.update(this.newCertificates.id,this.newCertificates);
                await CertificateService.updatefile(result.id,formData)
            }
            toast.success("thêm thông tin thành công", {
                    autoClose: 1000
                });
            this.resultDepart = true
            this.newCertificate = {}
            this.getCertificate();
        }catch(err){
            console.log(err)
        }
    },
    async deleteWorkday(id){
        try {
            await WorkdayService.delete(id);
            this.getworkdays()
            // alert("xóa ngày nhận lịch hẹn thành công")
            toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
            console.log(err)
        }
    },
    async deleteCertificate(id){
        try {
            console.log(id)
            await CertificateService.delete(id);
            this.getCertificate();
            toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
            console.log(err)
        }
    },
    async getAllprovince(){
        try {
            console.log("get province")
            this.provinces = await  ProvinceService.getAllActiveProvince();
            console.log(this.provinces)
        }catch(err){
            console.log(err)
        }
    },
    async getAllWard(id){
        try {
            this.wards = await WardService.getAllByDistrict(id);
        }catch(err){
            console.log(err)
        }
    },
    async getAllDistrict(id){
        try {
            this.districts = await DistrictService.getAllByProvince(id);
        }catch(err){
            console.log(err)
        }
    },
    async getCertificate() {
      try {
        this.certificates = await CertificateService.getAllByDoctor(this.id);
        console.log("get certificates info sucessfull!");
      } catch (err) {
        console.log(err);
      }
    },
    async getDoctor() {
      try {
        this.doctor = await DoctorService.get(this.id);
        this.doctorDepartment = this.doctor.department;
        this.doctorAccount = this.doctor.account;
        this.doctorDegree = this.doctor.degree
        console.log(this.doctorAccount);
        console.log("get doctor info sucessfull!");
      } catch (err) {
        console.log(err);
      }
    },
    async getAppointment() {
      this.scheduleData = [
        // {
        //     Id: 1,
        //     Subject: 'Blue Moon Eclipse',
        //     StartTime: new Date(2023, 10, 13, 9, 30),
        //     EndTime: new Date(2023, 10, 13, 11, 0)
        // }
      ];
      this.appointment_data = await AppointmentService.getByDoctor(this.doctor.id);
      for (let i = 0; i < this.appointment_data.length; i++) {
        console.log(this.appointment_data[i].worktime);
        // const dayArray =  await this.appointment_data[i].worktime.workday.day.split("-");
        // const timeArray =  await this.appointment_data[i].worktime.time.split(":");
        const timeline = new Date(
          this.appointment_data[i].worktime.workday.day +
            " " +
            this.appointment_data[i].worktime.time
        );
        // console.log("log date time")
        // console.log(dayArray)
        // console.log(timeArray)
        const timeend = new Date(timeline);
        timeend.setMinutes(timeline.getMinutes() + 20);
        await this.scheduleData.push({
          Id: i,
          Subject: "Lich hen voi " + this.appointment_data[i].user.fullname,
          StartTime: new Date(timeline),
          EndTime: new Date(timeend),
        });
      }
      console.log("appointment data !!");
      console.log(this.scheduleData);
      this.eventSettings.dataSource = this.scheduleData;
    },
    refreshList() {
      this.getAllprovince();
      this.getAllDoctor();
      this.activeIndex = -1;
    },
  },
  // async mounted() {
  //   await this.getDoctor();
  //   this.loaded = false;
  //   await this.getAppointment();
  //   this.loaded = true;
  // },
  async created() {
    await this.getAllprovince();
    await this.getDoctor(this.id);
    this.loaded = false;
    await this.getAppointment();
    await this.getCertificate();
    await this.getworkdays();
    this.loaded = true;
    this.message = "";
  },
};
</script>

<style>
@import "@/../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-schedule/styles/material.css";

.scrollbox {
  overflow: auto;
  max-height: 400px;
}

.scrollbox-content,
.scrollbox:hover,
.scrollbox:focus {
  visibility: visible;
}

.scrollbox_delayed {
  transition: visibility 0.2s;
}

.scrollbox_delayed:hover {
  transition: visibility 0s 0.2s;
}
</style>

<template>
<div class="container-fluid" id="grad1">
    <div class="row justify-content-center mt-0">
        <div class="col-11 col-sm-9 col-md-7 col-lg-8 text-center p-0 mt-3 mb-2">
            <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                <h2><strong>Đăng Ký tài khoản bác sĩ</strong></h2>
                <p>Điền đầy đủ thông tin và chọn bước kế tiếp</p>
                <div class="row">
                    <div class="col-md-12 mx-0">
                        <form id="msform">
                            <!-- progressbar -->
                            <ul id="progressbar">
                                <li class="active" id="account"><strong>Tài khoản</strong></li>
                                <li id="personal"><strong>bác sĩ</strong></li>
                                <li id="payment"><strong>Check</strong></li>
                                <!-- <li id="confirm"><strong>Hoàn Thành</strong></li> -->
                            </ul>
                            <!-- fieldsets -->
                            <fieldset>
                                <div class="form-card">
                                    <!-- <h2 class="fs-title">Thông tin tài khoản</h2> -->
                                    <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Dang ky tai khoan</p>
                                    <!-- <input type="email" name="email" placeholder="email@gmail.com" v-model="this.account.email"/>
                                    <input type="text" name="uname" placeholder="UserName" v-model="this.account.username"/>
                                    <input type="password" name="pwd" placeholder="Password" v-model="this.account.password"/>
                                    <input type="password" name="cpwd" placeholder="Confirm Password" /> -->
                                    <form class="mx-1 mx-md-4">

                                    <div class="d-flex flex-row align-items-center mb-4">
                                      <i class="mb-5 fas fa-user fa-lg me-3 fa-fw"></i>
                                      <div class="form-outline flex-fill mb-0">
                                        <input required type="text" id="form3Example1c" class="form-control"  v-model="this.account.username"/>
                                        <label class="form-label" for="form3Example1c">User name</label>
                                      </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-4">
                                      <i class="mb-5 fas fa-envelope fa-lg me-3 fa-fw"></i>
                                      <div class="form-outline flex-fill mb-0">
                                        <input required type="email" id="form3Example3c" class="form-control"  v-model="this.account.email" />
                                        <label class="form-label" for="form3Example3c">Email</label>
                                      </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-4">
                                      <i class="mb-5 fa fa-lock fa-lg me-3 fa-fw"></i>
                                      <div class="form-outline flex-fill mb-0">
                                        <input required type="password" id="form3Example4c" class="form-control" v-model="this.account.password"/>
                                        <label class="form-label" for="form3Example4c">Password</label>
                                      </div>
                                    </div>

                                    <!-- <div class="d-flex flex-row align-items-center mb-4">
                                      <i class="mb-5 fa fa-key fa-lg me-3 fa-fw"></i>
                                      <div class="form-outline flex-fill mb-0">
                                        <input type="password" id="form3Example4cd" class="form-control" />
                                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                      </div>
                                    </div> -->
                                  </form>
                                </div>
                                <input type="button" name="next" class="next action-button" value="Next Step"/>
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <!-- <h2 class="fs-title"></h2> -->
                                    <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Thông tin Bac si</p>
                                    <div class="row">
                                      <div class="form-group col-8">
                                        <label for="example-date-input" class="form-control-label" >họ và tên</label>
                                        <input required type="text" id="firstName" class="form-control"  placeholder="Nguyen Van A" v-model="this.doctor.fullname"/>
                                      </div>
                                      <div class="form-group col-4">
                                          <label for="example-date-input" class="form-control-label">năm sinh</label>
                                          <input required class="form-control" type="date"  v-model="this.doctor.birthday"/>
                                      </div>
                                      <div class="form-outline col-8">
                                        <label for="example-date-input" class="form-control-label">Địa chỉ</label>
                                        <input required  type="text" id="firstName" class="form-control" placeholder="address"  v-model="this.doctor.address"/>
                                      </div>
                                      <div class="col-4 form-outline " >
                                         <label for="example-date-input" class="form-control-label" >Phòng ban</label>
                                        <select class="select form-control" v-model="this.doctor.department" >
                                          <!-- <option value="4" disabled>Gender</option> -->
                                          <!-- <option :value="0">Female</option> -->
                                          <option  v-for="department in this.departments" :key="department._id" :value="department.id">{{department.name}}</option>
                                        </select>

                                      </div>
                                      <div class="form-outline col-4">
                                        <label for="example-date-input" class="form-control-label">Giá tiền cho lịch hẹn</label>
                                        <input required  type="number" step="0.01" id="firstName" class="form-control" placeholder="900000"  v-model="this.doctor.appointmentPrice"/>
                                      </div>
                                      <div class="form-outline col-4">
                                        <label for="example-date-input" class="form-control-label">SDT</label>
                                        <input required  type="text"  class="form-control" placeholder="09*******"  v-model="this.doctor.phone"/>
                                      </div>
                                      <div class="col-2 form-outline ">
                                        <label for="example-date-input" class="form-control-label">Giới tính</label>
                                        <select class="select form-control" v-model="this.doctor.gender">
                                          <!-- <option value="4" disabled>Gender</option> -->
                                          <option value=false>Nữ</option>
                                          <option value=true>Nam</option>
                                        </select>

                                      </div>
                                      <div class="form-outline col-6" >
                                        <label for="example-date-input" class="form-control-label" >Bằng cấp</label>
                                        <select class="select form-control" v-model="this.choiseDegree" >
                                          <!-- <option value="4" disabled>Gender</option> -->
                                          <!-- <option :value="0">Female</option> -->
                                          <option  v-for="item in this.degrees" :key="item._id" :value="item">{{item.name}}</option>
                                        </select>

                                      </div>
                                      <div class="form-outline col-6">
                                        <label for="example-date-input" class="form-control-label">Kinh Nghiem</label>
                                        <input required type="text" id="firstName" class="form-control" placeholder="experience" v-model="this.doctor.experience"/>
                                      </div>
                                    </div>
                                    
                                    
                                    
                                </div>
                                <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
                                <input type="button" name="next" class="next action-button" value="Next Step"/>
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <p class="text-center h3 fw-bold mb-2 mx-1 mx-md-4 mt-1">Kiem tra thong tin</p>
                                    <p class="text-center h4 fw-bold mb-1 mx-1 mx-md-4 mt-1">account</p>
                                    <!-- <div class="row">
                                        <p class="col-4"><strong>This line rendered as bold text.</strong></p>
                                        <p class="col-6">This line rendered</p>
                                        <p class="col-4"><strong>This line rendered as bold text.</strong></p>
                                        <p class="col-6">This line rendered</p>
                                        <p class="col-4"><strong>This line rendered as bold text.</strong></p>
                                        <p class="col-6">This line rendered</p>
                                        <p class="col-4"><strong>This line rendered as bold text.</strong></p>
                                        <p class="col-6">This line rendered</p>
                                    </div> -->
                                    <ul class="list-group list-group-light mb-3">
                                        <li class="list-group-item ">
                                          <h6 class="fw-bold ">User name : {{this.account.username}}</h6>
                                          
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">Email : {{this.account.email}}</h6>
                                          
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">Password : {{this.account.password}}</h6>
                                        </li>
                                      </ul>

                                    <p class="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">Doctor Information</p>
                                    <ul class="list-group list-group-light mb-3">
                                        <li class="list-group-item ">
                                          <h6 class="fw-bold ">Họ và tên :  {{this.doctor.fullname}}</h6>
                                          
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">năm sinh :  {{this.doctor.birthday}}</h6>
                                          
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">địa chỉ : {{this.doctor.address}}</h6>
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">SDT : {{this.doctor.phone}}</h6>
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">giá tiên lịch hẹn : {{this.doctor.appointmentPrice}}</h6>
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold" v-if="this.doctor.gender==1">giới tính : nam</h6>
                                          <h6 class="fw-bold" v-else>giới tính : nữ</h6>
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">bằng cắp : {{this.choiseDegree.name}}</h6>
                                        </li>
                                        <li class="list-group-item">
                                          <h6 class="fw-bold">Kinh nghiệm : {{this.doctor.experience}}</h6>
                                        </li>
                                        <!-- <li class="list-group-item">
                                          <h6 class="fw-bold" >department : {{}}</h6>
                                        </li> -->
                                      </ul>
                                </div>
                                <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
                                <div>
                                <button type="button"  class="btn btn-success" @click="createDoctor()">Đăng ký</button>
                                </div>
                            </fieldset>
                            <!-- <fieldset>
                                <div class="form-card">
                                    <h2 class="fs-title text-center">Success !</h2>
                                    <br><br>
                                    <div class="row justify-content-center">
                                        <div class="col-3">
                                            <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image">
                                        </div>
                                    </div>
                                    <br><br>
                                    <div class="row justify-content-center">
                                        <div class="col-7 text-center">
                                            <h6>You Have Successfully Signed Up</h6>
                                        </div>
                                    </div>
                                </div>
                            </fieldset> -->
                        </form>
                    </div>
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
      account:{},
      doctor:{},
      departments: [],
      degrees:[],
      choiseDegree:{},
    };
  },

  watch: {},
  computed: {
    
  },
  methods: {
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
    async createDoctor(){
      try{
          this.account.role = ["doctor"]
          this.doctor.degree = this.choiseDegree.id
          console.log(this.account);
          console.log(this.doctor);
          const accountResult = await AccountService.signup(this.account);
          const accountInfor = await AccountService.getByUsername(this.account);
          this.doctor.account = accountInfor.id;
          // this.doctor.account = 7;
          this.doctorResult = await DoctorService.create(this.doctor);
          let sendmailData = {}
          sendmailData.username = this.account.username
          sendmailData.email = this.account.email
          sendmailData.fullname = this.doctor.fullname
          sendmailData.password = this.account.password
          await DoctorService.sendmail(sendmailData);
          this.$router.push({ path: '/admin/doctor/addnew/success' })
        }catch(err){
          console.log(err)
          console.log("err")
          console.log(err.response.data.message)
          // alert(err.response.data.message)
          toast.error(err.response.data.message, {
                    autoClose: 3000
                });
        }
    }
  },
  async created(){
    await this.getDepartment();
    await this.getDegree();
  },
  async mounted() {
    $(document).ready(function() {

        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;

        $(".next").click(function() {

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function(now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        });

        $(".previous").click(function() {

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function(now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        });

        $('.radio-group .radio').click(function() {
            $(this).parent().find('.radio').removeClass('selected');
            $(this).addClass('selected');
        });

        $(".submit").click(function() {
            return false;
        })

    });

    
  },

  
};
</script>
<style>

#grad1 {
    background-color: #ffffff;
}

/*form styles*/
#msform {
    text-align: center;
    position: relative;
    margin-top: 20px;
}

#msform fieldset .form-card {
    background: white;
    border: 0 none;
    border-radius: 0px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 30px 40px;
    box-sizing: border-box;
    width: 94%;
    margin: 0 3% 20px 3%;

    /*stacking fieldsets above each other*/
    position: relative;
}

#msform fieldset {
    background: white;
    border: 0 none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-bottom: 20px;

    /*stacking fieldsets above each other*/
    position: relative;
}

/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
    display: none;
}

#msform fieldset .form-card {
    text-align: left;
    color: #9E9E9E;
}



#msform input:focus, #msform textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none;
    font-weight: bold;
    border-bottom: 2px solid skyblue;
    outline-width: 0;
}

/*Blue Buttons*/
#msform .action-button {
    width: 100px;
    background: skyblue;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px;
}

#msform .action-button:hover, #msform .action-button:focus {
    box-shadow: 0 0 0 2px white, 0 0 0 3px skyblue;
}

/*Previous Buttons*/
#msform .action-button-previous {
    width: 100px;
    background: #616161;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px;
}

#msform .action-button-previous:hover, #msform .action-button-previous:focus {
    box-shadow: 0 0 0 2px white, 0 0 0 3px #616161;
}

/*Dropdown List Exp Date*/
select.list-dt {
    border: none;
    outline: 0;
    border-bottom: 1px solid #ccc;
    padding: 2px 5px 3px 5px;
    margin: 2px;
}

select.list-dt:focus {
    border-bottom: 2px solid skyblue;
}

/*The background card*/
.card {
    z-index: 0;
    border: none;
    border-radius: 0.5rem;
    position: relative;
}

/*FieldSet headings*/
.fs-title {
    font-size: 25px;
    color: #2C3E50;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
}

/*progressbar*/
#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey;
}

#progressbar .active {
    color: #000000;
}

#progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 33%;
    float: left;
    position: relative;
}

/*Icons in the ProgressBar*/
#progressbar #account:before {
    font-family: FontAwesome;
    content: "\f023";
}

#progressbar #personal:before {
    font-family: FontAwesome;
    content: "\f007";
}

#progressbar #payment:before {
    font-family: FontAwesome;
    content: "\f09d";
}

#progressbar #confirm:before {
    font-family: FontAwesome;
    content: "\f00c";
}

/*ProgressBar before any progress*/
#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 18px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px;
}

/*ProgressBar connectors*/
#progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 25px;
    z-index: -1;
}

/*Color number of the step and the connector before it*/
#progressbar li.active:before, #progressbar li.active:after {
    background: skyblue;
}

/*Imaged Radio Buttons*/
.radio-group {
    position: relative;
    margin-bottom: 25px;
}

.radio {
    display:inline-block;
    width: 204;
    height: 104;
    border-radius: 0;
    background: lightblue;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    cursor:pointer;
    margin: 8px 2px; 
}

.radio:hover {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.radio.selected {
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
}

/*Fit image in bootstrap div*/
.fit-image{
    width: 100%;
    object-fit: cover;
}
</style>
<template>
        <div class="container position-absolute z-index-sticky top-0" style="left:110px; top:0px;">
        <div class="row">
          <div class="col-12">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div class="container-fluid pe-0">
                <a class="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="">
                  Hệ thống chăm sóc sức khỏe
                </a>
                <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon mt-2">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div class="collapse navbar-collapse" id="navigation">
                  <ul class="navbar-nav mx-auto ms-xl-auto me-xl-7">
                    <li class="nav-item">
                      <a class="nav-link d-flex align-items-center me-2 active" aria-current="page" href="">
                        <i class="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                        quản lý
                      </a>
                    </li>
                    <!-- <li class="nav-item">
                      <a class="nav-link me-2" href="">
                        <i class="fa fa-user opacity-6 text-dark me-1"></i>
                        Profile
                      </a>
                    </li> -->
                    <!-- <li class="nav-item">
                      <a class="nav-link me-2" href="">
                        <i class="fas fa-user-circle opacity-6 text-dark me-1"></i>
                        
                      </a>
                    </li> -->
                    <li class="nav-item">
                      <a class="nav-link me-2" href="">
                        <i class="fas fa-key opacity-6 text-dark me-1"></i>
                        đăng nhập
                      </a>
                    </li>
                  </ul>
                  <li class="nav-item d-flex align-items-center">
                    <a class="btn btn-round btn-sm mb-0 btn-outline-primary me-2" target="_blank" href="">đăng nhập</a>
                  </li>
                  <ul class="navbar-nav d-lg-block d-none">
                    <li class="nav-item">
                      <a href="d" class="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark">quản lý</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <!-- End Navbar -->
          </div>
        </div>
    </div>
    <main class="main-content position-absolute mt-0" style="width:1350px; top:-40px; right: 0px;">
        <section>
          <div class="page-header min-vh-75">
            <div class="container">
              <div class="row" >
                <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div class="card card-plain mt-10">
                    <div class="card-header pb-0 text-left bg-transparent">
                      <h3 class="font-weight-bolder text-info text-gradient">Chào mừng đến với hệ thống chăm sóc sức khỏe</h3>
                      <p class="mb-0">nhập vào username và passwork để đăng nhập</p>
                    </div>
                    <div class="card-body">
                      <form role="form">
                        <label>Username</label>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="User name" v-model="this.user.username" aria-label="" aria-describedby="">
                        </div>
                        <label>Password</label>
                        <div class="mb-3">
                          <input type="password" class="form-control" placeholder="Password" aria-label="Password" v-model="this.user.password" aria-describedby="password-addon">
                        </div>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="rememberMe" checked="">
                          <label class="form-check-label" for="rememberMe">Nhớ tài khoản</label>
                        </div>
                        <div class="form-check form-switch" v-if="this.message!=''">
                          <p3 class="text-danger" for="rememberMe">{{this.message}}</p3>
                        </div>
                        <div class="text-center">
                          <button type="button" class="btn bg-gradient-info w-100 mt-4 mb-0" @click="signin(this.user)">đăng nhập</button>
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
                <div class="col-md-6">
                  <div class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style="background-image:url('/admin/img/curved-images/curved6.jpg')"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    <!-- <footer class="footer py-5" style="width:100%;">
    <div class="container">
        <div class="row">
        <div class="col-lg-8 mb-4 mx-auto text-center">
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            Company
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            About Us
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            Team
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            Products
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            Blog
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            Pricing
            </a>
        </div>
        <div class="col-lg-8 mx-auto text-center mb-4 mt-2">
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-dribbble"></span>
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-twitter"></span>
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-instagram"></span>
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-pinterest"></span>
            </a>
            <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-github"></span>
            </a>
        </div>
        </div>
        <div class="row">
        <div class="col-8 mx-auto text-center mt-1">
            <p class="mb-0 text-secondary">
            Copyright © 2023, Soft by Creative Tim.
            </p>
        </div>
        </div>
    </div>
    </footer> -->
</template>
<script>
import AuthService from "@/services/auth.service";
import DoctorService from "@/services/doctor.service";
import {useUserStore} from "@/stores/doctor";
export default {
    components: {
      AuthService,
      DoctorService,
    },
    data() {
        const userStore = useUserStore();
        return {
          user:{},
          result: {},
          message: "",
          userStore,
        };
    },
    
    watch: {
    },
    computed: {

    },
    methods: {
      async signin(data){
        try{
          this.result = await AuthService.signin(data);
          console.log("localStorage info!!");
          let checkAdmin = 0;
          const doctorList = await DoctorService.getByAccount(this.result.id)
          const doctor = doctorList[0]
          console.log(doctor)
          for ( let i = 0; i < this.result.roles.length; i++ ){
            // console.log(this.userStore.user.roles[i])
            if(this.result.roles[i] != "ROLE_DOCTOR"){
              checkAdmin = 1;
            }
          }
          if(doctor != null ){
            if(doctor.active == false){
              checkAdmin = 2;
            }
          }else{
            checkAdmin = 10;
          }

         switch (checkAdmin) {
          default:
            this.message = "lỗi đăng nhập chưa xác định"
            break;
          case 0:
            console.log("đăng nhập thành công");
            localStorage.setItem('user',JSON.stringify(this.result))
            localStorage.setItem('doctor',JSON.stringify(doctor))
            this.$router.push({
              name: "doctor.home",
            });
            break;
          case 1:
            console.log("không đủ quyền truy cập");
            this.message = "không đủ quyền truy cập"
            break;
          case 2:
            console.log("tài khoản đã ngừng kích hoạt");
             this.message ="tài khoản đã ngừng kích hoạt"
            break;
          case 10:
            console.log("chưa có tài khoản bác sĩ");
            this.message = "chưa có tài khoản bác sĩ"
            break;
        }

          // if( checkAdmin == 1){
          //   this.$router.push({
          //     name: "doctor.home",
          //   });
          // }else {
          //   this.message = "không đủ quyền truy cập!"
          // }

          
        }catch(err){
          console.log(err);
          console.log(err.response.data.message)
          // alert(err.response.data.message)
          this.message = "sai thông tin tài khoản hoặc mật khẩu"
        }
      }
    },
    mounted() {
        
      },
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
@import '@/assets/admin/css/nucleo-icons.css';
@import '@/assets/admin/css/nucleo-svg.css';
@import '@/assets/admin/css/soft-ui-dashboard.css';
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease-out;
}
</style>
<template>

<div class="container-fluid" style="width: 1600px;margin-left: -165px;">
    <div class="body ">
        <section class="section appoinment">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 ">
                        <div class="appoinment-content">
                            <img src="images/about/img-3.jpg" alt="" class="img-fluid">
                            <div class="emergency">
                                <h2 class="text-lg"><i class="icofont-phone-circle text-lg"></i>Đăng nhập tài khoản</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-10 ">
                        <div class="appoinment-wrap mt-5 mt-lg-0">
                            <h2 class="mb-2 title-color">Đăng nhập</h2>
                            <p class="mb-4">Nhập thông tin tài khoản mật khẩu để đăng nhập. Nếu chưa có tài khoản click chọn đăng ký tài khoản.</p>
                                <form id="#" class="appoinment-form" @submit.prevent="this.submitSignin()">
                                    
                                    <div class="form-group-2 mb-4">
                                        <input name="date" id="date" type="text" class="form-control" placeholder="User name" v-model="this.account.username" required>
                                    </div>
                                    <div class="form-group-2 mb-4">
                                        <input name="date" id="date" type="password" class="form-control" placeholder="*******" v-model="this.account.password" required>
                                    </div>
                                    <ul class="list-inline footer-socials mt-4">
                                        <li class="list-inline-item">
                                            <a href="https://www.facebook.com/themefisher"><i class="icofont-facebook"></i></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="https://twitter.com/themefisher"><i class="icofont-twitter"></i></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="https://www.pinterest.com/themefisher/"><i class="icofont-linkedin"></i></a>
                                        </li>
                                    </ul>
                                    <p v-if="this.message" class="text-danger">{{this.message}}</p>
                                    <button type="submit" class="mt-2 btn btn-main btn-round-full" href="appoinment.html">Đăng nhập</button>
                                    <div class="mt-2"><router-link :to="{
                                      name: 'user.signup',
                                    }"><a class="mt-2">chưa có tài khoản ...>>></a></router-link></div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    <!-- <Footer></Footer> -->
    </div>
</div>
    
</template>
<script>
import {useUserStore} from "@/stores/patient";
import AuthService from "@/services/auth.service" 
import UserService from "@/services/user.service" 
export default {
  components: {
    AuthService,
    UserService,
  },
  data() {
    const userStore = useUserStore();
    return {
        account:{},
        userStore,
        result:null,
        message:null,
    };
  },

  watch: {},
  computed: {},
  methods: {
    async submitSignin(){
        try{
          this.result = await AuthService.signin(this.account);
          console.log("localStorage info!!");
          let checkAdmin = 0;
          const userList = await UserService.getByAccount(this.result.id)
          const user = userList[0]
          console.log(user)
          for ( let i = 0; i < this.result.roles.length; i++ ){
            // console.log(this.userStore.user.roles[i])
            if(this.result.roles[i] != "ROLE_USER"){
              checkAdmin = 1;
            }
          }
          if(user != null ){
            if(user.active == false){
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
            localStorage.setItem('patient',JSON.stringify(user))
            this.$router.push({
              name: "user.home",
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
            this.message = "chưa có tài khoản người dùng"
            break;
        }

        } catch(err){
          console.log(err);
          this.message = "đăng nhập thất bại!!!"
        }
        
    },
    // async submitSignin(){
    //     try{
    //         console.log(this.account)
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
  },
  mounted() {
    const scripts = [
      "/user/plugins/jquery/jquery.js",  
      "/user/plugins/bootstrap/bootstrap.min.js",  
      "/user/plugins/slick-carousel/slick/slick.min.js",     
      "/user/plugins/shuffle/shuffle.min.js",  
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkeLMlsiwzp6b3Gnaxd86lvakimwGA6UA",  
      "/user/plugins/google-map/gmap.js",  
      "/user/js/script.js",  
    ];
    scripts.forEach((script) => {
      let tag = document.head.querySelector(`[src="${script}"`);
      if (!tag) {
        tag = document.createElement("script");
        tag.setAttribute("src", script);
        tag.setAttribute("type", "text/javascript");
        document.head.appendChild(tag);
      }
    });
  },
};
</script>
<style>

@import "@/assets/user/plugins/bootstrap/bootstrap.min.css";
@import "@/assets/user/plugins/icofont/icofont.min.css";
@import "@/assets/user/plugins/slick-carousel/slick/slick.css";
@import "@/assets/user/plugins/slick-carousel/slick/slick-theme.css";
@import "@/assets/user/css/style.css";
    .cascading-right {
    margin-right: -50px;
    }

    @media (max-width: 991.98px) {
    .cascading-right {
        margin-right: 0;
    }
    }
</style>
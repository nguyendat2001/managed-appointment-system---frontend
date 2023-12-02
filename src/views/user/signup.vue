<template>

<div class="container-fluid" style="width: 1600px;margin-left: -165px;">
    <div class="body ">
        <section class="section appoinment">
            <div class="container">
                <form class="row align-items-center" @submit.prevent="this.createUser()">
                    <div class="col-12">
                        <center>
                            <h2 class="mb-2 title-color">Đăng ký tài khoản</h2>
                        </center>
                    </div>
                    <div class="col-lg-6 col-md-10 ">
                        <div class="appoinment-wrap mt-5 mt-lg-0">
                            <!-- <h2 class="mb-2 title-color"></h2> -->
                            <p class="mb-4">Nhập thông tin cá nhân bệnh nhân.</p>
                                <div id="#" class="appoinment-form">
                                    
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input name="time" id="time" type="text" class="form-control" placeholder="Họ và tên" v-model="this.user.fullname" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input name="date" id="date" type="date" class="form-control" placeholder="Ngày/tháng/năm sinh" v-model="this.user.birthday">
                                            </div>
                                        </div>

                                        
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input name="name" id="name" type="text" class="form-control" placeholder="SĐT" v-model="this.user.phone" required>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group row">
                                                <input name="gender" id="phone" type="radio" class="col-3 form-control" placeholder="Giới tính" value=true style="height:35px; width:35px;" v-model="this.user.gender">: Nam 
                                                <input name="gender" id="phone" type="radio" class="col-3 form-control" placeholder="Giới tính" value=false style="height:35px; width:35px;" v-model="this.user.gender">: Nữ
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group-2 mb-4">
                                        <input name="message" id="message" type="text" class="form-control"  placeholder="Địa chỉ" v-model="this.user.address" required>
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-10 ">
                        <div class="appoinment-wrap mt-5 mt-lg-0">
                            <!-- <h2 class="mb-2 title-color">Đăng nhập</h2> -->
                            <p class="mb-4">Nhập thông tin tài khoản mật khẩu để đăng nhập.</p>
                                <div class="appoinment-form" method="post" action="#">
                                    
                                    <div class="form-group-2 mb-4">
                                        <input name="date" id="date" type="text" class="form-control" placeholder="User name" v-model="this.account.username" required >
                                    </div>
                                    <div class="form-group-2 mb-4">
                                        <input name="date" id="date" type="text" class="form-control" placeholder="Email" v-model="this.account.email"  required>
                                    </div>
                                    
                                    <div class="form-group-2 mb-4">
                                        <input name="date" id="date" type="password" class="form-control" placeholder="mật khẩu" v-model="this.account.password"  required>
                                    </div>
                                    <div class="form-group-2 mb-4">
                                        <input name="date" id="date" type="password" class="form-control" placeholder="Nhập lại mật khẩu" required>
                                    </div>
                                   
                                    
                                </div>
                                
                        </div>
                        
                    </div>
                    <div class="col-12">
                    <center><button type="submit" class="mt-2 btn btn-main btn-round-full" >Đăng ký</button>
                                <div class="mt-2"><router-link :to="{
                                      name: 'user.signin',
                                    }"><a class="mt-2">đã có tài khoản ...>>></a></router-link></div></center>
                    </div>
                </form>
                
            </div>
        </section>
    <!-- <Footer></Footer> -->
    </div>
</div>
    
</template>
<script>
import AccountService from "@/services/auth.service"  
import UserService from "@/services/user.service"  

export default {
  components: {
    UserService,
    AccountService,
  },
  data() {
    return {
        user:{},
        account:{},
        userResult:{},
    };
  },

  watch: {},
  computed: {},
  methods: {
    async createUser(){
      try{
            this.account.role = ["user"]
            console.log(this.account)
            console.log(this.user)
            const accountResult = await AccountService.signup(this.account);
            const accountInfor = await AccountService.getByUsername(this.account);
            this.user.account = accountInfor.id;
            this.userResult = await UserService.create(this.user);
            alert("Đăng ký tài khoản thành công!!!")
            console.log('signup successfull')
            this.user = {}
            this.account = {}
        }catch(err){
          console.log(err)
        }
    }
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
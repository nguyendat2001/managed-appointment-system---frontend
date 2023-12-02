<template>
<header>
	<!-- <div class="header-top-bar">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6">
					<ul class="top-bar-info list-inline-item pl-0 mb-0">
						<li class="list-inline-item"><a ><i class="icofont-support-faq mr-2"></i>support@novena.com</a></li>
						<li class="list-inline-item"><i class="icofont-location-pin mr-2"></i>Address Ta-134/A, New York, USA </li>
					</ul>
				</div>
				<div class="col-lg-6">
					<div class="text-lg-right top-right-bar mt-2 mt-lg-0">
						<a >
							<span>Call Now : </span>
							<span class="h4">823-4565-13456</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	<nav class="navbar navbar-expand-lg navigation" id="navbar">
		<div class="container">
			<a class="navbar-brand" >
				<img src="@/assets/user/images/logo.png" height="60" width="120" alt="" class="img-fluid">
			</a>

			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarmain"
				aria-controls="navbarmain" aria-expanded="false" aria-label="Toggle navigation">
				<span class="icofont-navigation-menu"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarmain">
				<ul class="navbar-nav ml-auto">
					<router-link class="nav-item " class-active="active" style="padding:0px 0px 0px 0px; "
						:to="{
							name: 'user.home',
						}"
					> 
						<li class="nav-item"><a class="nav-link">Trang chủ</a></li>
					</router-link>
					<!-- <router-link class="nav-item " class-active="active" style="padding:0px 0px 0px 0px; "
						:to="{
							name: 'user.about',
						}"
					> 
					<li class="nav-item"><a class="nav-link" >About</a></li>
					</router-link> -->
					<router-link class="nav-item " class-active="active" style="padding:0px 0px 0px 0px; "
						:to="{
							name: 'user.department',

						}" 
					> 
					<li class="nav-item"><a class="nav-link">Phòng ban</a></li>
					</router-link>
					<router-link class="nav-item " class-active="active" style="padding:0px 0px 0px 0px; "
						:to="{
							name: 'user.doctor',

						}" 
					> 
					<li class="nav-item"><a class="nav-link">Bác sỉ</a></li>
					</router-link>
					
					
					<!-- <li class="nav-item"><a class="nav-link"></a></li> -->
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" id="dropdown03" data-toggle="dropdown"
							aria-haspopup="true" aria-expanded="false">Danh mục <i class="icofont-thin-down"></i></a>
						<ul class="dropdown-menu" aria-labelledby="dropdown03">
							<router-link style="padding:0px 0px 0px 0px; "
								:to="{
									name: 'user.disease',
								}"
							> 
							<li><a class="dropdown-item" >thông tin các bệnh</a></li>
							</router-link>
							<router-link style="padding:0px 0px 0px 0px; "
								:to="{
									name: 'user.prescription',
								}"
							> 
							<li><a class="dropdown-item" >Dơn thuốc</a></li>
							</router-link>
							<router-link style="padding:0px 0px 0px 0px; "
								:to="{
									name: 'user.appointment',
								}"
							> 
							<li><a class="dropdown-item" >Lịch hẹn</a></li>
							</router-link>
							<router-link style="padding:0px 0px 0px 0px; "
								:to="{
									name: 'user.diagnoses',
								}"
							> 
							<li><a class="dropdown-item" >Phiếu chẩn đoán</a></li>
							</router-link>
							
						</ul>
					</li>
					<router-link class="nav-item " class-active="active" style="padding:0px 0px 0px 0px; "
						:to="{
							name: 'user.profile',
						}"
					> 
					<li class="nav-item"><a class="nav-link" >Tài khoản</a></li>
					</router-link>
					<li class="nav-item"><a class="nav-link" @click="logout()">Đăng xuất</a></li>
				</ul>
			</div>
		</div>
	</nav>
</header>

</template>
<script>

import Page_Title from "../components/page-title.vue";

export default {
  components: {
    Page_Title,
  },
  data() {
    return {
      patient:{},
      account:{},
    };
  },

  watch: {},
  computed: {},
  methods: {
    logout(){
      localStorage.clear("user");
	  localStorage.clear("patient");
	  this.$router.push({
              name: "user.signin",
            });
    },
  },
  async created() {
    // await this.getInfor()
  },
};
</script>

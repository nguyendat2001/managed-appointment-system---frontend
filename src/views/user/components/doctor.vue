<template>
	<!-- portfolio -->
<section class="section doctors">
  <div class="container">
  	  <div class="row justify-content-center">
             <div class="col-lg-6 text-center">
                <div class="section-title">
                    <h2>bác sĩ</h2>
                    <div class="divider mx-auto my-4"></div>
                    <p>Chúng tôi có những bác sĩ giỏi nhất trong khu vực với trình độ chuyên môn cao luôn sẵn sàng phục vụ 24/7.</p>
                    <div class="subscribe">
                        <input type="text" class="form-control" placeholder="Tìm kiếm theo tên" v-model="this.searchText">
                        <button  class="btn btn-primary btn-round-full">Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>

      <div class="col-12 text-center  mb-5">
	        <div class="btn-group btn-group-toggle " data-toggle="buttons">
	          <label class="btn active " @click="this.getAllDoctor()">
	            <input type="radio" name="shuffle-filter" value="all" checked="checked" />Tất cả phòng ban
	          </label>
	          <label class="btn btn-outline-secondary " @click="this.getAllDoctorByDepartment(department.id)" v-for="department in this.departments" :key="department.id">
	            <input type="radio" name="shuffle-filter" value="cat1" />{{department.name}}
	          </label>
	          
	        </div>
      </div>

    <div class="row shuffle-wrapper portfolio-gallery">
      	<div class="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item" v-for="doctor in this.filtereddoctors" :key="doctor.id" data-groups="[&quot;cat1&quot;,&quot;cat2&quot;]">
	      	<div class="position-relative doctor-inner-box">
            <router-link
                  :to="{
                      name: 'user.doctor.detail',
                      params: { id: doctor.id },
                  }"
                  >
		        <div class="doctor-profile">
	               <div class="doctor-img">
	               		<img style="height:300px;width:200px;" v-if="doctor.avatar!=null" :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/'+doctor.avatar" alt="doctor-image" class="img-fluid w-100 h-150">
						        <img style="height:300px;width:200px;" v-else src="@/assets/admin/img/avatar.jpg"  alt="doctor-image" class="img-fluid">
	               </div>
	            </div>
                <div class="content mt-3">
                	<h4 class="mb-0"><a href="">{{doctor.fullname}}</a></h4>
                	<p>{{doctor.department.name}}</p>
                </div>

            </router-link> 
	      	</div>
      	</div>


    </div>
  </div>
</section>
<!-- /portfolio -->
</template>
<script>

import DoctorService from "@/services/doctor.service";
import DepartmentService from "@/services/department.service"  
export default {
    components: {
      DoctorService,
      DepartmentService,

    },
    data() {
        return {
          resultDepart: false,
          doctors:[],
          departments: [],
          newDepartment:{},
		  isActive:false,
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
                return [ doctor.fullname].join("").toLowerCase();
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
      async getAllDoctorByDepartment(id){
        try{
          this.doctors = await DoctorService.getByDepartment(id);
		  console.log(this.doctors)
        }catch(err){
          console.log(err)
        }
      },
      async getAllDoctor(){
        try{
          this.doctors = await DoctorService.getAll();
		  console.log(this.doctors)
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
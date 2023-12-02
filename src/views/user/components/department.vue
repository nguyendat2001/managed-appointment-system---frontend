<template>
	<section class="section service-2">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-7 text-center">
				<div class="section-title">
					<h2>phòng ban được cung cấp bởi hệ thống</h2>
					<div class="divider mx-auto my-4"></div>
					<!-- <p>Tất cả phòng ban</p> -->
				</div>
			</div>
		</div>

		<div class="row ">
			<div class="col-lg-4 col-md-6 border border-5 rounded" v-for="department in this.departments" :key="department.id">
				<div class="department-block m-1 mb-5 ">
					<!-- <img src="images/service/service-1.jpg" alt="" class="img-fluid w-100"> -->
					<div class="content">
						<h4 class="mt-4 mb-2 title-color">{{department.name}}</h4>
						<p class="mb-4">{{department.describeDepartment}}</p>
						<div class="mt-2"><router-link :to="{
                                      name: 'user.department.detail',
                                  params: { id: department.id },
                              }"><a class="mt-2">chi tiết >>></a></router-link></div>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>
</template>
<script>

import DepartmentService from "@/services/department.service"  
export default {
    components: {
      DepartmentService,
    },
    data() {
        return {
          resultDepart: false,
          departments: [],
          message:"",
          activeIndex: -1,
          searchText:'',
        };
    },
    
    watch: {
    },
    methods: {
      async getAllDepartment(){
        try{
          this.departments = await DepartmentService.getAllActive();
        }catch(err){
          console.log(err)
        }
      },
      refreshList() {
            this.getAllDepartment();
            this.activeIndex = -1;
        },
    },
    async created(){
      await this.refreshList();
    }
};
</script>

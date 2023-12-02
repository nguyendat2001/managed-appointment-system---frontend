<template>
	<section class="section department-single">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="department-img">
					<img src="images/service/bg-1.jpg" alt="" class="img-fluid">
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-8">
				<div class="department-content mt-5">
					<h3 class="text-md">{{this.department.name}}</h3>
					<div class="divider my-4"></div>
					<p class="lead"> {{this.department.describeDepartment}}</p>


					<h3 class="mt-5 mb-4">Dịch vụ</h3>
					<div class="divider my-4"></div>
					<ul class="list-unstyled department-service">
						<li><i class="icofont-check mr-2"></i>Chẩn đoán bệnh thông qua Trí Tuệ Nhân Tạo</li>
						<li><i class="icofont-check mr-2"></i>Lưu Thông tin bệnh án</li>
						<li><i class="icofont-check mr-2"></i>Lưu thông tin đơn thuốc</li>
						<!-- <li><i class="icofont-check mr-2"></i>Cholesterol and lipid tests</li> -->
						<li><i class="icofont-check mr-2"></i>Lên lịch hẹn với bác sĩ</li>
						<li><i class="icofont-check mr-2"></i>Hỗ trợ khẩn cấp</li>
					</ul>

					<h3 class="mt-5 mb-4">bác sĩ</h3>
					<div class="divider my-4"></div>
					<div class="p-1 row"> 
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
										<img v-if="doctor.avatar!=null" :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/'+doctor.avatar" alt="doctor-image" class="img-fluid w-100 h-150">
										<img v-else src="@/assets/admin/img/avatar.jpg"  alt="doctor-image" class="img-fluid w-100 h-150">
								</div>
								</div>
								<div class="content mt-3">
									<h4 class="mb-0"><a href="">{{doctor.fullname}}</a></h4>
									<p>Giá tiền lịch hen: {{doctor.appointmentPrice}}</p>
								</div>

							</router-link> 
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-4">
				<div class="sidebar-widget  gray-bg p-4">
					<h5 class="mb-4">Đặt lịch hẹn</h5>

					<ul class="list-unstyled lh-35">
						<li class="d-flex justify-content-between align-items-center">
							<span>Monday - Friday</span>
							<span>10:00 - 17:00</span>
						</li>
						<!-- <li class="d-flex justify-content-between align-items-center">
							<span>Saturday</span>
							<span>9:00 - 16:00</span>
						</li>
						<li class="d-flex justify-content-between align-items-center">
							<span>Sunday</span>
							<span>Closed</span>
						</li> -->
					</ul>

					<!-- <div class="sidebar-contatct-info mt-4">
						<p class="mb-0">Yêu cầu khẩn cấp?</p>
						<h3 class="text-color-2">+23-4565-65768</h3>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</section>
</template>
<script>


export default {
  components: {
  },
  props: ["department","doctors"],
  data() {
    return {
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
    

};
</script>
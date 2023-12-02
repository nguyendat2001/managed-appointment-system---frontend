<template>
	<section class="features">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="feature-block d-lg-flex">
					<div class="feature-item mb-5 mb-lg-0">
						<div class="feature-icon mb-4">
							<i class="icofont-surgeon-alt"></i>
						</div>
						<span>Dịch vụ 24/7</span>
						<h4 class="mb-3">Đặt lịch hẹn online</h4>
						<p class="mb-4">Hỗ trợ cho tất cả trường hợp khẩn cấp với dịch vụ tư vấn.</p>
						<a  class="btn btn-main btn-round-full" @click="this.$router.push({
						name: 'user.doctor',
						})">Đặt lịch hẹn</a>
					</div>
				
					<div class="feature-item mb-5 mb-lg-0">
						<div class="feature-icon mb-4">
							<i class="icofont-ui-clock"></i>
						</div>
						<span>Thời gian lên lịch</span>
						<h4 class="mb-3">Giờ làm việc cho lịch hẹn</h4>
						<ul class="w-hours list-unstyled">
							<li class="d-flex justify-content-between">7 ngày/tuần : <span>10:00 - 17:00</span></li>
							<!-- <li class="d-flex justify-content-between">Thu - Fri : <span>9:00 - 17:00</span></li>
							<li class="d-flex justify-content-between">Sat - sun : <span>10:00 - 17:00</span></li> -->
						</ul>
					</div>
				
					<div class="feature-item mb-5 mb-lg-0">
						<div class="feature-icon mb-4">
							<i class="icofont-support"></i>
						</div>
						<span>Trường hợp khẩn câp</span>
						<h4 class="mb-3">0999-900-999</h4>
						<p>Nhận hỗ trợ cho tất cả trường hợp khẩn cấp với dịch vụ 24/24</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


</template>
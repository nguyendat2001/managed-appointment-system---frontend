<template>
  <section class="section doctor-single">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="doctor-img-block">
            <!-- <img src="images/team/1.jpg" alt="" class="img-fluid w-100"> -->
            <img
              v-if="doctor.avatar != null"
              :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/' + doctor.avatar"
              alt="doctor-image"
              class="img-fluid w-100 h-150"
            />
            <img
              v-else
              src="@/assets/admin/img/avatar.jpg"
              alt="doctor-image"
              class="img-fluid w-100 h-150"
            />

            <div class="info-block mt-4">
              <h4 class="mb-0">{{ this.doctor.fullname }}</h4>
              <!-- <p>{{this.doctor.department.name}}</p> -->

              <ul class="list-inline mt-4 doctor-social-links">
                <li class="list-inline-item">
                  <a href="#!"><i class="icofont-facebook"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#!"><i class="icofont-twitter"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#!"><i class="icofont-skype"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#!"><i class="icofont-linkedin"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#!"><i class="icofont-pinterest"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-8 row col-md-6">
          <div class="doctor-details mt-4 mt-lg-0 col-8">
            <h2 class="text-md">Giới thiệu chi tiết về bác sĩ</h2>
            <div class="divider my-4"></div>
            <p>
              Bác sĩ {{ this.doctor.fullname }} với nhiều năm kinh nghiệm khám chữa bệnh.
              Có nhiều công trình nghiên cứu. Hiện tại bác sỉ có trình độ {{this.doctor.degree.name}}. Bác sĩ cũng
              đang là 1 trong những báo cáo viên được giới chuyên môn quan tâm đánh giá
              cao tại các hội thảo khoa học, tọa đàm và đào tạo chia sẻ kinh nghiệm tại
              các bệnh viện tuyến quận, huyện, tỉnh.
            </p>

          </div>
          <div class="col-4">
            <div class="sidebar-widget gray-bg p-4">
                  <h5 class="mb-4">Đặt lịch hẹn</h5>

                  <ul class="list-unstyled lh-35">
                    <li class="d-flex justify-content-between align-items-center">
                      <span>Tất cả các ngày mở lịch</span>
                      <span>10:00 - 17:00</span>
                    </li>
                    <!-- <li class="d-flex justify-content-between align-items-center">
                    <span>Saturday</span>
                    <span>9:00 - 16:00</span>
                  </li> -->
                    <li class="d-flex justify-content-between align-items-center">
                      <span>Giá tiền cho lịch hẹn</span>
                      <span>{{ this.doctor.appointmentPrice }}</span>
                    </li>
                  </ul>

                  <div class="sidebar-contatct-info mt-4">
                    <p class="mb-0">Liên hệ với bác sĩ</p>
                    <h3 class="text-color-2">{{ this.doctor.phone }}</h3>
                  </div>
                </div>
          </div>
        </div>
         <div class="col-lg-8 col-md-6">
          <div class="row">
            <div class="divider my-4 col-6">

            </div>
            <div class="divider my-4 col-6">
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section doctor-qualification gray-bg">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-title">
            <h3>Chứng chỉ học thuật & Bằng cấp</h3>
            <div class="divider my-4"></div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          class="col-lg-4 mb-4 mb-lg-0"
          v-for="certificate in this.certifications"
          :key="certificate.id"
        >
          <div class="edu-block mb-5">
            <span class="h6 text-muted">Ngày cấp: {{ certificate.validFrom }}</span>
            <h4 class="mb-3 title-color">
              <a
                :href="
                  'http://localhost:9004/api/loads/certificates_get/' + certificate.path
                "
                class="btn btn-link text-dark text-sm mb-0 px-0 ms-4 me-3"
                >Xem>> <i class="fas fa-file-pdf text-sm me-1"></i> PDF</a
              >: {{ certificate.certificationUnit }}
            </h4>
            <p></p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section class="section doctor-qualification">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-title">
            <h3>Tất cả lịch hẹn ||</h3>
            <div class="divider my-4"></div>
            <p class="" style="text-decoration: underline">
              chú ý <span style="background-color:red;">màu đỏ</span> tức là lịch đã được đặt, <span style="background-color:blue;">màu xanh</span> là lịch trống
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <p class="ml-3" v-if="this.workTimes.length ==0 ">bác sĩ chưa có thông tin mở lịch hẹn sấp tới</p>
        <div v-else class="accordion accordion-borderless" id="accordionFlushExampleX">
          <div
            class="accordion-item"
            v-for="item in this.workTimes"
            :key="item.workdays.id"
          >
            <h2 class="accordion-header" id="flush-headingOneX">
              <button
                class="accordion-button"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseOneX"
                aria-expanded="true"
                aria-controls="flush-collapseOneX"
              >
                Ngày :{{ item.workdays.day }} || chú ý thời gian bắt đầu trong khoản (10h
                - 17h)
              </button>
            </h2>
            <div
              id="flush-collapseOneX"
              class="accordion-collapse collapse show"
              aria-labelledby="flush-headingOneX"
              data-mdb-parent="#accordionFlushExampleX"
            >
              <div class="accordion-body p-3">
                <a v-for="worktime in item.worktimes" :key="worktime.id">
                  <button
                    v-if="worktime.isAvailable"
                    class="btn btn-main btn-round-full m-1"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    @click="this.setworktime(worktime)"
                  >
                    {{ this.standantlize(worktime.time) }} - {{ this.addMinutes(worktime.time) }}
                  </button>
                  <button v-else class="btn btn-main-2 btn-round-full m-1" disabled>
                    {{ this.standantlize(worktime.time) }} -
                    {{ this.addMinutes(worktime.time) }}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div
    v-if="this.newAppointment.worktimeDetail"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="card card-plain">
            <div class="card-header pb-0 text-left">
              <h3 class="font-weight-bolder text-info text-gradient">
                Đặt lịch hẹn || Ngày:
                {{ this.newAppointment.worktimeDetail.workday.day }} || Giờ:
                {{ this.standantlize(this.newAppointment.worktimeDetail.time) }}
              </h3>
              <p class="mb-0">Nhập thông tin và xác nhận thông tin một cách chính xác</p>
            </div>
            <div class="card-body">
              <form role="form text-left" @submit.prevent="submitAppointment()">
                <div class="row">
                  <div class="col-lg-6">
                    <label>Lịch hẹn với bác sĩ</label>
                    <div class="input-group mb-3">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        v-model="this.newAppointment.doctorName"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <label>Người đặt</label>
                    <div class="input-group mb-3">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        v-model="this.newAppointment.userName"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <label>Giờ đặt</label>
                    <div class="input-group mb-3">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        :value="this.standantlize(this.newAppointment.worktimeDetail.time)"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <label>Giá tiền cho lịch hẹn</label>
                    <div class="input-group mb-3">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        v-model="this.newAppointment.price"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <label>Ngân hàng muốn thanh toán</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ABC bank"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    v-model="this.newAppointment.bankName"
                    required
                  />
                </div>
                <label>Mã thẻ Tài khoản ngân hàng</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="1234 - **** - **** - ****"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    v-model="this.newAppointment.creditNumber"
                    required
                  />
                </div>
                <label>Tin nhắn</label>
                <div class="form-group-2 mb-4">
                  <textarea
                    name="message"
                    id="message"
                    class="form-control"
                    rows="8"
                    placeholder="Your Message"
                    v-model="this.newAppointment.message"
                    required
                  ></textarea>
                </div>
                <!-- <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="rememberMe" checked="">
                    <label class="form-check-label" for="rememberMe">Remember me</label>
                  </div> -->
                <div class="text-center">
                  <h5>Giá Tiền: {{ normalize(this.newAppointment.price) }} VND</h5>
                  <button
                    type="submit"
                    class="btn btn-main btn-round-full w-100 mt-4 mb-0"
                  >
                    Thanh Toán
                  </button>
                </div>
              </form>
            </div>
            <div class="card-footer text-center pt-0 px-lg-2 px-1">
              <p class="mb-4 text-sm mx-auto">
                Don't have an account?
                <a href="javascript:;" class="text-info text-gradient font-weight-bold"
                  >Thanh toán</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkdayService from "@/services/workday.service";
import WorktimeService from "@/services/worktime.service";
import AppointmentService from "@/services/appoitment.service";
export default {
  components: {
    WorkdayService,
    WorktimeService,
    AppointmentService,
  },
  props: ["doctor", "certifications"],
  data() {
    return {
      workTimes: [],
      newAppointment: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    normalize(textPrice){
      let textnor = textPrice.toString().split('')
      textnor = textnor.reverse()
      console.log(textnor)
      if(textnor.length > 3){
        textnor.splice(3, 0, '.')
      }
      if(textnor.length > 7){
        textnor.splice(7, 0, '.')
      }
      textnor = textnor.reverse()
      console.log(textnor)
      
      return textnor.join("")
    },
    async submitAppointment() {
      try {
        const result = await AppointmentService.create(this.newAppointment);
        alert("Đặt lịch hẹn thành công");
        console.log(result);
        this.getworktime()
        this.$router.push({name: "user.confirmation"})
      } catch (err) {
        console.log(err);
      }
    },
    setworktime(worktime) {
      this.newAppointment.worktime = worktime.id;
      this.newAppointment.worktimeDetail = worktime;
    },
    standantlize(date) {
      // console.log(date.split(':'))
      const data = date.split(":");
      let time = data[0].toString() + ":" + parseInt(data[1]).toString();
      return time;
    },
    addMinutes(date) {
      // console.log(date.split(':'))
      const data = date.split(":");
      let time = data[0].toString() + ":" + (parseInt(data[1]) + 20).toString();
      if (parseInt(data[1]) + 20 == 60) {
        time = (parseInt(data[0]) + 1).toString() + ":" + "00";
      } else {
        time = data[0].toString() + ":" + (parseInt(data[1]) + 20).toString();
      }
      return time;
    },
    init() {
      this.newAppointment.doctor = this.doctor.id;
      this.newAppointment.doctorName = this.doctor.fullname;
      this.newAppointment.user = JSON.parse(localStorage.patient).id;
      this.newAppointment.userName = JSON.parse(localStorage.patient).fullname;
      this.newAppointment.price = this.doctor.appointmentPrice;
    },
    async getworktime() {
      try {
        let workdays = await WorkdayService.getAllByDoctor(this.doctor.id);
        workdays.sort(function (a, b) {
          var c = new Date(a.day);
          var d = new Date(b.day);
          return d - c;
        });
        this.workTimes = [];

        const today = Date.now();
        for (let i = 0; i < workdays.length; i++) {
          const day = new Date(workdays[i].day);
          console.log(day);
          if (day >= today) {
            const worktimes = await WorktimeService.getAllByWorkdate(workdays[i].id);
            this.workTimes.push({ workdays: workdays[i], worktimes: worktimes });
          }
        }
        console.log("this.workTimes");
        console.log(this.workTimes);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js",
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
  async created() {
    await this.init();
    await this.getworktime();
  },
};
</script>
<style scoped>
.accordion {
  --mdb-accordion-color: #4f4f4f;
  --mdb-accordion-bg: #fff;
  --mdb-accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
  --mdb-accordion-border-color: var(--mdb-border-color);
  --mdb-accordion-border-width: 1px;
  --mdb-accordion-border-radius: 0.5rem;
  --mdb-accordion-inner-border-radius: calc(0.5rem - 1px);
  --mdb-accordion-btn-padding-x: 1.5rem;
  --mdb-accordion-btn-padding-y: 1.15rem;
  --mdb-accordion-btn-color: #4f4f4f;
  --mdb-accordion-btn-bg: var(--mdb-accordion-bg);
  --mdb-accordion-btn-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%234f4f4f'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'/%3E%3C/svg%3E");
  --mdb-accordion-btn-icon-width: 1.25rem;
  --mdb-accordion-btn-icon-transform: rotate(-180deg);
  --mdb-accordion-btn-icon-transition: transform 0.2s ease-in-out;
  --mdb-accordion-btn-active-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%233b71ca'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'/%3E%3C/svg%3E");
  --mdb-accordion-btn-focus-border-color: #3b71ca;
  --mdb-accordion-btn-focus-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
  --mdb-accordion-body-padding-x: 1.5rem;
  --mdb-accordion-body-padding-y: 1.15rem;
  --mdb-accordion-active-color: #3b71ca;
  --mdb-accordion-active-bg: #fff;
}
.accordion-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--mdb-accordion-btn-padding-y) var(--mdb-accordion-btn-padding-x);
  font-size: 1rem;
  color: var(--mdb-accordion-btn-color);
  text-align: left;
  background-color: var(--mdb-accordion-btn-bg);
  border: 0;
  border-radius: 0;
  overflow-anchor: none;
  transition: var(--mdb-accordion-transition);
}
@media (prefers-reduced-motion: reduce) {
  .accordion-button {
    transition: none;
  }
}
.accordion-button:not(.collapsed) {
  color: var(--mdb-accordion-active-color);
  background-color: var(--mdb-accordion-active-bg);
  box-shadow: inset 0 calc(var(--mdb-accordion-border-width) * -1) 0
    var(--mdb-accordion-border-color);
}
.accordion-button:not(.collapsed):after {
  background-image: var(--mdb-accordion-btn-active-icon);
  transform: var(--mdb-accordion-btn-icon-transform);
}
.accordion-button:after {
  flex-shrink: 0;
  width: var(--mdb-accordion-btn-icon-width);
  height: var(--mdb-accordion-btn-icon-width);
  margin-left: auto;
  content: "";
  background-image: var(--mdb-accordion-btn-icon);
  background-repeat: no-repeat;
  background-size: var(--mdb-accordion-btn-icon-width);
  transition: var(--mdb-accordion-btn-icon-transition);
}
@media (prefers-reduced-motion: reduce) {
  .accordion-button:after {
    transition: none;
  }
}
.accordion-button:hover {
  z-index: 2;
}
.accordion-button:focus {
  z-index: 3;
  box-shadow: var(--mdb-accordion-btn-focus-box-shadow);
}
.accordion-header {
  margin-bottom: 0;
}
.accordion-item {
  color: var(--mdb-accordion-color);
  background-color: var(--mdb-accordion-bg);
  border: var(--mdb-accordion-border-width) solid var(--mdb-accordion-border-color);
}
.accordion-item:first-of-type {
  border-top-left-radius: var(--mdb-accordion-border-radius);
  border-top-right-radius: var(--mdb-accordion-border-radius);
}
.accordion-item:first-of-type .accordion-button {
  border-top-left-radius: var(--mdb-accordion-inner-border-radius);
  border-top-right-radius: var(--mdb-accordion-inner-border-radius);
}
.accordion-item:not(:first-of-type) {
  border-top: 0;
}
.accordion-item:last-of-type {
  border-bottom-right-radius: var(--mdb-accordion-border-radius);
  border-bottom-left-radius: var(--mdb-accordion-border-radius);
}
.accordion-item:last-of-type .accordion-button.collapsed {
  border-bottom-right-radius: var(--mdb-accordion-inner-border-radius);
  border-bottom-left-radius: var(--mdb-accordion-inner-border-radius);
}
.accordion-item:last-of-type .accordion-collapse {
  border-bottom-right-radius: var(--mdb-accordion-border-radius);
  border-bottom-left-radius: var(--mdb-accordion-border-radius);
}
.accordion-body {
  padding: var(--mdb-accordion-body-padding-y) var(--mdb-accordion-body-padding-x);
}
.accordion-flush .accordion-collapse {
  border-width: 0;
}
.accordion-flush .accordion-item {
  border-right: 0;
  border-left: 0;
  border-radius: 0;
}
.accordion-flush .accordion-item:first-child {
  border-top: 0;
}
.accordion-flush .accordion-item:last-child {
  border-bottom: 0;
}
.accordion-flush .accordion-item .accordion-button,
.accordion-flush .accordion-item .accordion-button.collapsed {
  border-radius: 0;
}
.accordion-button:not(.collapsed):focus {
  box-shadow: var(--mdb-accordion-btn-focus-box-shadow);
}
.accordion-button:focus {
  border-color: var(--mdb-accordion-btn-focus-border-color);
  outline: 0;
  box-shadow: none;
}
.accordion-flush {
  --mdb-accordion-flush-btn-box-shadow: inset 0 -2px 0 #f5f5f5;
  --mdb-accordion-flush-border-bottom: 2px solid #f5f5f5;
}
.accordion-flush .accordion-button:not(.collapsed) {
  box-shadow: var(--mdb-accordion-flush-btn-box-shadow);
}
.accordion-flush .accordion-item {
  border-bottom: var(--mdb-accordion-flush-border-bottom);
}
.accordion.accordion-borderless,
.accordion.accordion-flush {
  --mdb-accordion-bg: transparent;
  background-color: var(--mdb-accordion-bg);
}
.accordion-borderless {
  --mdb-accordion-borderless-btn-border-radius: 0.5rem;
  --mdb-accordion-borderless-btn-bg: #dfe7f6;
  --mdb-accordion-borderless-btn-color: #2c58a0;
}
.accordion-borderless .accordion-item {
  border: 0;
}
.accordion-borderless .accordion-item .accordion-button {
  border-radius: var(--mdb-accordion-borderless-btn-border-radius);
}
.accordion-borderless .accordion-item .accordion-button:not(.collapsed) {
  background-color: var(--mdb-accordion-borderless-btn-bg);
  color: var(--mdb-accordion-borderless-btn-color);
  box-shadow: none;
}
</style>

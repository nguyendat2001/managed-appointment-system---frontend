<template>
    <div class="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
    <!-- Navbar -->
    <nav
      class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2"
    ></nav>
    <!-- End Navbar -->
    <div class="container-fluid">
      <div
        class="page-header min-height-300 border-radius-xl mt-4"
        style="
          background-image: url('/admin/img/curved-images/curved0.jpg');
          background-position-y: 50%;
        "
      >
        <span class="mask bg-gradient-primary opacity-6"></span>
      </div>
      <div class="modal fade" id="modal-form-workday" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm Ngày nhận lịch hẹn</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Thêm Ngày nhận lịch hẹn</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" >
                                <label>chọn ngày làm việc</label>
                                <div class="input-group mb-3">
                                  <input required type="date" class="form-control" aria-label="Email" aria-describedby="email-addon" v-model="this.newWorkday.day">
                                </div>
                                
                                <div class="text-center">
                                  <button type="button" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" @click="this.summitWorkday()">Submit</button>
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
                      </div>
                    </div>
                  </div>
      <div class="card card-body blur shadow-blur mx-4 mt-n12 overflow-hidden">
        <div class="row gx-4">
          <div class="col-2">
            
            <div class="position-relative">
              <!-- <img src="../assets/img/bruce-mars.jpg" alt="profile_image" class="w-100 border-radius-lg shadow-sm"> -->
              <img
                v-if="this.doctor.avatar != null"
                :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/' + doctor.avatar"
                alt="profile_image"
                class="border-radius-lg shadow-sm"
                style="height: 190px; width: 190px"
              />
              <img
                v-else
                src="@/assets/admin/img/avatar.jpg"
                alt="profile_image"
                class="border-radius-lg shadow-sm"
                style="height: 190px; width: 190px"
              />
            </div>
          </div>
          <div class="col-5 my-auto m-2">
            <div class="h-100 mt-8">
              <h5 class="mb-1">
                {{ this.doctor.fullname }}
              </h5>
              <p class="mb-0 font-weight-bold text-sm">
                {{ this.degreeName }}
              </p>
            </div>
          </div>
          <!-- <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div class="nav-wrapper position-relative end-0 mt-8">
              <ul class="nav nav-pills nav-fill p-1 bg-transparent" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link mb-0 px-0 py-1 active"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="true"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g
                          transform="translate(-2319.000000, -291.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(603.000000, 0.000000)">
                              <path
                                class="color-background"
                                d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
                              ></path>
                              <path
                                class="color-background"
                                d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                opacity="0.7"
                              ></path>
                              <path
                                class="color-background"
                                d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                opacity="0.7"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span class="ms-1">App</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link mb-0 px-0 py-1"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 40 44"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <title>document</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g
                          transform="translate(-1870.000000, -591.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(154.000000, 300.000000)">
                              <path
                                class="color-background"
                                d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                opacity="0.603585379"
                              ></path>
                              <path
                                class="color-background"
                                d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span class="ms-1">Messages</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link mb-0 px-0 py-1"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 40 40"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <title>settings</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g
                          transform="translate(-2020.000000, -442.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(304.000000, 151.000000)">
                              <polygon
                                class="color-background"
                                opacity="0.596981957"
                                points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                              ></polygon>
                              <path
                                class="color-background"
                                d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                opacity="0.596981957"
                              ></path>
                              <path
                                class="color-background"
                                d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span class="ms-1">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-md-8 d-flex align-items-center">
                  <h6 class="mb-0">Thông Tin Cá Nhân</h6>
                </div>
                <div class="col-md-4 text-end">
                  <a href="javascript:;">
                    <i
                      class="fas fa-user-edit text-secondary text-sm"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit Profile"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body p-3">
              <p class="text-sm">
                Xin Chào, Tôi Tên là {{ this.doctor.fullname }}, tôi hiện tại là bác sĩ
                tại bệnh viện và ở Khoa {{ this.doctorDepartment.name }}, tôi có
                {{ this.doctor.experience }} trong nghề.
                <!-- Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality). -->
              </p>
              <hr class="horizontal gray-light my-4" />
              <ul class="list-group">
                <li class="list-group-item border-0 ps-0 pt-0 text-sm">
                  <strong class="text-dark">Họ Và Tên:</strong> &nbsp;
                  {{ this.doctor.fullname }}
                </li>
                
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Ngày Sinh:</strong> &nbsp;
                  {{ this.doctor.birthday }}
                </li>
                <li  v-if="this.doctor.gender == true" class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark"
                    >Giới Tính:</strong> &nbsp; Nam 
                </li>
                <li  v-else class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark"
                    >Giới Tính:</strong> &nbsp; Nữ 
                </li>
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Địa Chỉ:</strong> &nbsp;
                  {{ this.doctor.address }}
                </li>
                <li class="list-group-item border-0 ps-0 pb-0">
                  <strong class="text-dark text-sm">Mạng xã hội:</strong> &nbsp;
                  <a
                    class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                    href="javascript:;"
                  >
                    <i class="fab fa-facebook fa-lg"></i>
                  </a>
                  <a
                    class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                    href="javascript:;"
                  >
                    <i class="fab fa-twitter fa-lg"></i>
                  </a>
                  <a
                    class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                    href="javascript:;"
                  >
                    <i class="fab fa-instagram fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
                <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Ngày Mở lịch hẹn</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-outline-primary btn-sm mb-0" data-bs-toggle="modal" data-bs-target="#modal-form-workday">thêm mới</button>
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0 scrollbox" v-if="this.workdays.length != 0">
              <ul class="list-group">
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                  v-for="workday in this.workdays"
                  :key="workday.id"
                >
                  <div class="d-flex flex-column">
                    <h6 class="text-dark font-weight-bold text-sm">
                      {{ workday.day }}
                    </h6>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    <!-- {{ certificate.name }} -->
                    
                    <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                      <!-- <a  data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#"><i class="fa fa-pencil-alt text-dark m-1 ms-2"></i></a> -->
                      <a  data-mdb-color="dark" @click="this.deleteWorkday(workday.id)"><i class="far fa-trash-alt text-dark m-1"></i></a>
                      <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= certificate"> <i class="fa fa-pencil-alt text-dark"></i></button>
                      
                      <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCertificate(certificate.id)"><i class="far fa-trash-alt" ></i></button> -->
                    </div>
                      

                  </div>
                </li>
                
                
              </ul>
            </div>
            <div class="card-body p-3 pb-0 scrollbox" v-else>
              <p>Chưa có thông tin ngày mở lịch hẹn</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Bằng Cấp</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-outline-primary btn-sm mb-0" data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= {}">thêm mới</button>
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0 scrollbox" v-if="this.certificates.length != 0">
              <ul class="list-group">
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                  v-for="certificate in this.certificates"
                  :key="certificate.id"
                >
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark font-weight-bold text-sm">
                      {{ certificate.validFrom }}
                    </h6>
                    <span class="text-xs">{{ certificate.certificationUnit }}</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    {{ certificate.name }}
                    <a
                      :href="
                        'http://localhost:9004/api/loads/certificates_get/' +
                        certificate.path
                      "
                      class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i  class="fas fa-file-pdf text-lg me-1"></i> PDF</a>
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <a  data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= certificate"><i class="fa fa-pencil-alt text-dark m-1 ms-2"></i></a>
                        <a  data-mdb-color="dark"  @click="this.deleteCertificate(certificate.id)"><i class="far fa-trash-alt text-dark m-1"></i></a>
                        <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form-certificate" @click="this.newCertificates= certificate"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCertificate(certificate.id)"><i class="far fa-trash-alt" ></i></button> -->
                      </div>
                      

                  </div>
                </li>
                
                
              </ul>
            </div>
            <div class="card-body p-3 pb-0 scrollbox" v-else>
              <p>Chưa có thông tin Bằng cấp</p>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="card mb-4">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-1">Xem Lịch hẹn đã được đặt</h6>
              <p class="text-sm">Tất cả lịch hẹn</p>
            </div>
            <div class="card-body p-3">
              <div class="row">
                <ejs-schedule
                  v-if="this.loaded"
                  :height="height"
                  :selectedDate="selectedData"
                  :eventSettings="eventSettings"
                ></ejs-schedule>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent/>
        <div class="modal fade" id="modal-form-certificate" tabindex="-1" aria-labelledby="modal-form-certificate" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body p-0">
                      <div class="card card-plain">
                        <div class="card-header pb-0 text-left">
                          <h3 class="font-weight-bolder text-info text-gradient">Thêm/Chỉnh sửa Bằng Cấp</h3>
                          <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                          <p class="mb-0">Nhập thông tin về Bằng Cấp</p>
                        </div>
                        <div class="card-body">
                          <form role="form text-left" @submit.prevent="this.submitCertificate()">
                            <label>Tên Bằng Cấp</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Bằng Cấp ####" aria-label="Toiec ..." aria-describedby="email-addon"
                               v-model="this.newCertificates.name">
                            </div>
                            <label>Đơn vị cấp</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Mô tả ..." aria-label="Đơn vị cấp" aria-describedby="password-addon"
                               v-model="this.newCertificates.certificationUnit">
                            </div>
                            <label>Ngày cấp</label>
                            <div class="input-group mb-3">
                              <input required type="date" class="form-control" placeholder="triệu chứng ..." aria-label="Ngày cấp" aria-describedby="email-addon" 
                              v-model="this.newCertificates.validFrom">
                            </div>

                            <label>File</label>
                            <div class="input-group mb-3">
                              <input required type="file" ref="file" class="form-control" placeholder="triệu chứng ..." aria-label="Ngày cấp" aria-describedby="email-addon" >
                            </div>
                            
                            <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Chọn tỉnh/thành phố</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.curentProvince">
                                        <option v-for="province in this.provinces" :key="province.id" :value="province.id">{{province.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Chọn quận/huyện</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.curentDistrict">
                                        <option v-for="district in this.districts" :key="district.id" :value="district.id">{{district.name}}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-6"> 
                                    <label>Chọn xã/phường</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.newCertificates.ward">
                                        <option v-for="ward in this.wards" :key="ward.id" :value="ward.id">{{ward.name}}</option>
                                      </select>
                                    </div>
                                  </div>
                            <div class="text-center">
                              <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
                            </div>
                          </form>
                        </div>
    
                      </div>
                    </div>
                  </div>
                </div>
        </div>
    </div>
  </div>
</template>


<script>
import { Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-vue-schedule";

import DoctorService from "@/services/doctor.service";
import AppointmentService from "@/services/appoitment.service";
import CertificateService from "@/services/certificate.service";
import FooterComponent from "./footer.vue";
import ProvinceService from "@/services/province.service";
import DistrictService from "@/services/district.service";
import WardService from "@/services/ward.service";
import WorkdayService from "@/services/workday.service";
import WorktimeService from "@/services/worktime.service";
export default {
  components: {
    WorkdayService,
    WorktimeService,
    ProvinceService,
    DistrictService,
    WardService,
    DoctorService,
    AppointmentService,
    CertificateService,
    FooterComponent,
  },
  data() {
    return {
      degreeName:null,
      doctor: {},
      curentProvince:null,
      curentDistrict:null,
      newCertificates:{},
      certificates: [],
      workdays: [],
      newWorkday:{},
      scheduleData: [],
      doctorDepartment: {},
      doctorAccount: {},
      appointment_data: [],
      message: "",
      loaded: false,
      height: "550px",
      resultDepart:false,
      eventSettings: {
        dataSource: [],
      },
      selectedData: new Date(2023, 10, 10),
    };
  },
  
  watch: {
    curentProvince: function (v) {
        this.getAllDistrict(v);
    },
    curentDistrict: function (v) {
        this.getAllWard(v);
    },
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda],
  },
  computed: {
  },
  methods: {
    async summitWorkday(){
      try{
        this.newWorkday.doctor = this.doctor.id;
        // console.log(this.newWorkday)
        await WorkdayService.create(this.newWorkday)
        this.resultDepart = true
        this.getworkdays()
      }catch(err){
        console.log(err)
      }
    },
    async getworkdays(){
      try{
        this.workdays = await WorkdayService.getAllByDoctor(this.doctor.id);
        this.workdays.sort(function(a, b) {
          var c = new Date(a.day);
          var d = new Date(b.day);
          return d-c;
        });
        console.log("get workday successful!!")
      }catch(err){
        console.log(err)
      }
    },
    async submitCertificate(){
        try{

            this.newCertificates.doctor = this.doctor.id;
            console.log(this.newCertificates)
            const formData = new FormData();
            formData.append('file',this.$refs.file.files[0]);
            if(this.newCertificates.id == null){
                const result = await CertificateService.create(this.newCertificates);
                await CertificateService.uploadfile(result.id,formData)
            }else{
                const result = await CertificateService.update(this.newCertificates.id,this.newCertificates);
                await CertificateService.updatefile(result.id,formData)
            }
            this.resultDepart = true
            this.newCertificate = {}
            this.getCertificate();
        }catch(err){
            console.log(err)
        }
    },
    async deleteWorkday(id){
        try {
            await WorkdayService.delete(id);
            this.getworkdays()
            alert("xóa ngày nhận lịch hẹn thành công")
        }catch(err){
            console.log(err)
        }
    },
    async deleteCertificate(id){
        try {
            console.log(id)
            await CertificateService.delete(id);
            this.getCertificate();
        }catch(err){
            console.log(err)
        }
    },
    async getAllprovince(){
        try {
            console.log("get province")
            this.provinces = await  ProvinceService.getAllActiveProvince();
            console.log(this.provinces)
        }catch(err){
            console.log(err)
        }
    },
    async getAllWard(id){
        try {
            this.wards = await WardService.getAllByDistrict(id);
        }catch(err){
            console.log(err)
        }
    },
    async getAllDistrict(id){
        try {
            this.districts = await DistrictService.getAllByProvince(id);
        }catch(err){
            console.log(err)
        }
    },
    async getCertificate() {
      try {
        this.certificates = await CertificateService.getAllByDoctor(this.doctor.id);
        console.log("get certificates info sucessfull!");
      } catch (err) {
        console.log(err);
      }
    },
    async getDoctor(id) {
      try {
        // console.log(id)
        this.doctor = await DoctorService.get(id);

        this.doctorDepartment = this.doctor.department;
        this.doctorAccount = this.doctor.account;
        this.degreeName = this.doctor.degree.name;
        console.log("doctor info");
        console.log(this.doctor);
        console.log("get doctor info sucessfull!");
      } catch (err) {
        console.log(err);
      }
    },
    async getAppointment() {
      let scheduleData = [];
      this.appointment_data = await AppointmentService.getByDoctor(this.doctor.id);
      for (let i = 0; i < this.appointment_data.length; i++) {
        console.log(this.appointment_data[i].worktime);
        // const dayArray =  await this.appointment_data[i].worktime.workday.day.split("-");
        // const timeArray =  await this.appointment_data[i].worktime.time.split(":");
        const timeline = new Date(
          this.appointment_data[i].worktime.workday.day +
            " " +
            this.appointment_data[i].worktime.time
        );
        const timeend = new Date(timeline);
        timeend.setMinutes(timeline.getMinutes() + 20);
        await scheduleData.push({
          Id: i,
          Subject: "Lich hen voi " + this.appointment_data[i].user.fullname,
          StartTime: new Date(timeline),
          EndTime: new Date(timeend),
        });
      }
      console.log("appointment data !!");
      console.log(scheduleData);
      this.eventSettings = {"dataSource":scheduleData};
      this.loaded = true;
    },
    refreshList() {
      this.getAllprovince();
      this.getAllDoctor();
      this.activeIndex = -1;
    },
  },
  async created() {
    this.loaded = false
    await this.getDoctor(JSON.parse(localStorage.doctor).id);
    await this.getAllprovince();
    await this.getAppointment();
    await this.getCertificate();
    await this.getworkdays();
    // await console.log((await this).loaded)
    this.loaded = true
    this.message = "";
  },
};
</script>

<style>
@import "@/../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "@/../node_modules/@syncfusion/ej2-schedule/styles/material.css";

.scrollbox {
  overflow: auto;
  max-height: 400px;
}

.scrollbox-content,
.scrollbox:hover,
.scrollbox:focus {
  visibility: visible;
}

.scrollbox_delayed {
  transition: visibility 0.2s;
}

.scrollbox_delayed:hover {
  transition: visibility 0s 0.2s;
}
</style>


<template>
    <div class="container position-absolute z-index-sticky top-0" style="left:110px; top:0px;">
        <div class="row">
          <div class="col-12">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div class="container-fluid pe-0">
                <a class="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="">
                  Soft UI Dashboard
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
                        Dashboard
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link me-2" href="">
                        <i class="fa fa-user opacity-6 text-dark me-1"></i>
                        Profile
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link me-2" href="">
                        <i class="fas fa-user-circle opacity-6 text-dark me-1"></i>
                        Sign Up
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link me-2" href="">
                        <i class="fas fa-key opacity-6 text-dark me-1"></i>
                        Sign In
                      </a>
                    </li>
                  </ul>
                  <li class="nav-item d-flex align-items-center">
                    <!-- <a class="btn btn-round btn-sm mb-0 btn-outline-primary me-2" target="_blank" href="">Online Builder</a> -->
                  </li>
                  <ul class="navbar-nav d-lg-block d-none">
                    <li class="nav-item">
                      <!-- <a href="d" class="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark">Free download</a> -->
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
                    <div class="brand">
                        <h1 class="title" style="font-size: 150px;">
                            <p style="font-size: 150px;">404</p>
                        </h1>
                        <h3 class="description">Not Found</h3>
                        <br />
                        <h5 class="description">đường dẫn không xác định vui lòng truy cập đường đẫn khác</h5>
                    </div>
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
</template>

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
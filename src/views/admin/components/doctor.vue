<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h4>Phòng ban</h4>
            <div class="m-1">
              <button
                type="button"
                class="btn btn-primary m-1"
                data-bs-toggle="modal"
                data-bs-target="#modal-form"
                @click="newDepartment = {}"
              >
                Thêm mới
              </button>
              <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                  <div class="modal-content">
                    <div class="modal-body p-0">
                      <div class="card card-plain">
                        <div class="card-header pb-0 text-left">
                          <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Phòng Ban</h3>
                          <div v-if="resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                            <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                            <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                            <button type="button" class="btn-close" @click="resultDepart = false">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <p class="mb-0">Nhập thông tin Phòng Ban mới</p>
                        </div>
                        <div class="card-body">
                          <div class="text-left" v-if="newDepartment.id">
                            <button v-if="!newDepartment.isActive" type="button" class="btn btn-outline-secondary" @click="activeDepartment(newDepartment.id)">inactive</button>
                            <button v-else type="button" class="btn btn-outline-success" @click="inactiveDepartment(newDepartment.id)">active</button>
                          </div>
                          <form role="form text-left" @submit.prevent="summitDepartment">
                            <label>Tên Phòng Ban</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="ABC Phòng Ban" aria-label="Email" aria-describedby="email-addon" v-model="newDepartment.name" />
                            </div>
                            <label>Mô tả Phòng Ban</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Mô tả" aria-label="Email" aria-describedby="email-addon" v-model="newDepartment.describeDepartment" />
                            </div>
                            <div class="text-center">
                              <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">Submit</button>
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
          <div class="card-body mt-3 px-0 pt-0 pb-2 p-2">
            <vue-horizontal snap="center">
              <component-example class="m-1 p-2 card" v-for="department in departments" :key="department.id">
                <a>
                  <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                    <span class="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">{{ department.name }}</span>
                    <div class="row">
                      <div class="col-6">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="newDepartment = department">
                          <i class="fa fa-pencil-alt text-dark"></i>
                        </button>
                      </div>
                      <div class="col-6">
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="deleteDepartment(department.id)">
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </component-example>
            </vue-horizontal>
          </div>
        </div>
            <div class="card mb-4">
              <h4 class="ms-3">bác sĩ</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <router-link :to="{
                    name: 'admin.Doctor  /  AddDoctor',
                }"><button type="button" class="btn btn-primary">thêm mới</button></router-link>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Họ và tên</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Chuyên khoa</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Học vị</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Năm sinh</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Kich hoạt</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cập nhật/Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="doctor in filteredDoctors"
                          :key="doctor._id">
                        <td>
                          <p class="text-xs text-center font-weight-bold mb-0">{{doctor.id}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img v-if="doctor.avatar != null" :src="'http://127.0.0.1:9004/api/loads/avatars/avatar/'+doctor.avatar" class="avatar avatar-sm me-3" alt="user1">
                              <img v-else src="@/assets/admin/img/avatar.jpg" class="avatar avatar-sm me-3" alt="user1">

                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{doctor.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">{{doctor.account[0].email}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{doctor.department.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-success">{{doctor.degree.name}}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{doctor.birthday}}</span>
                        </td>
                        <td class="align-middle text-center">
                          <button v-if="!doctor.active" type="button" class="btn btn-outline-secondary" @click="activeDoctor(doctor.id)">inactive</button>
                          <button v-else type="button" class="btn btn-outline-success" @click="inactiveDoctor(doctor.id)">active</button>
                        </td>
                        <td class="align-middle text-center">
                          <div class="btn-group shadow-0 mt-2" role="group" aria-label="Basic example">
                            <!-- <router-link
                              :to="{
                                  name: 'admin.updatedoctor',
                                  params: { id: doctor.id },
                              }"
                              > -->
                              <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" @click="this.$router.push({ name: 'admin.updatedoctor',params: { id: doctor.id } })" > <i class="fa fa-pencil-alt text-dark"></i></button>
                            <!-- </router-link>
                            <router-link
                              :to="{
                                  name: 'admin.Doctor/Detail',
                                  params: { id: doctor.id },
                              }"
                              > -->
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" @click="this.$router.push({ name: 'admin.Doctor/Detail',params: { id: doctor.id } })"><i class="fa fa-user fa-sm" style="font-size:14px;"></i></button>
                            <!-- </router-link> -->
                            <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"><i class="far fa-trash-alt fa-sm" style="font-size:10px;"></i></button> -->
                          
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
</template>
<script>
import { ref, reactive, computed, watch } from 'vue';
import VueHorizontal from 'vue-horizontal';
import FooterComponent from './footer.vue';
import DoctorService from '@/services/doctor.service';
import DepartmentService from '@/services/department.service';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    VueHorizontal,
    FooterComponent,
  },
  setup() {
    // Refs
    // toast.success('ngưng kích hoạt thành công', { autoClose: 1000 });

    const resultDepart = ref(false);
    const doctors = ref([]);
    const departments = ref([]);
    const newDepartment = reactive({});
    const message = ref('');
    const activeIndex = ref(-1);
    const searchText = ref('');

    // Watchers
    watch(searchText, (v) => {
      searchText.value = v.toLowerCase().trim();
      activeIndex.value = -1;
    });

    // Computed
    const doctorStrings = computed(() => {
      return doctors.value.map((doctor) => {
        return [doctor.fullname, doctor.degree.name, doctor.department.name, doctor.account[0].email].join('').toLowerCase();
      });
    });

    const filteredDoctors = computed(() => {
      if (!searchText.value) return doctors.value;
      return doctors.value.filter((_doctor, index) => doctorStrings.value[index].includes(searchText.value.toLowerCase()));
    });
    const filteredDoctorsCount = computed(() => filteredDoctors.value.length);

    // Methods
    const activeDepartment = async (id) => {
      try {
        await DepartmentService.active(id);
        getAllDepartment();
        newDepartment = await DepartmentService.get(id);
      } catch (err) {
        console.log(err);
      }
    };

    const inactiveDepartment = async (id) => {
      try {
        await DepartmentService.inactive(id);
        getAllDepartment();
        newDepartment = await DepartmentService.get(id);
      } catch (err) {
        console.log(err);
      }
    };

    const activeDoctor = async (id) => {
      try {
        await DoctorService.active(id);
        toast.success('Thêm bài kiểm tra thành công ', {
                    autoClose: 1000
                });
        getAllDoctor();
        // console.log("chạy xong")
      } catch (err) {
        console.log(err);
      }
    };

    const inactiveDoctor = async (id) => {
      try {
        await DoctorService.inactive(id);
        toast.success('Thêm bài kiểm tra thành công ', {
                    autoClose: 1000
                });
        getAllDoctor();
        
      } catch (err) {
        console.log(err);
      }
    };

    const summitDepartment = async () => {
      try {
        if (newDepartment.id == null) {
          const result = await DepartmentService.create(newDepartment);
          resultDepart.value = true;
        } else {
          const result = await DepartmentService.update(newDepartment.id, newDepartment);
          resultDepart.value = true;
        }
        getAllDepartment();
      } catch (err) {
        console.log(err);
      }
    };

    const getAllDoctor = async () => {
      try {
        doctors.value = await DoctorService.getAll();
        console.log(doctors.value);
      } catch (err) {
        console.log(err);
      }
    };

    const getAllDepartment = async () => {
      try {
        departments.value = await DepartmentService.getAll();
        console.log(departments.value);
      } catch (err) {
        console.log(err);
      }
    };

    const deleteDepartment = async (id) => {
      try {
        await DepartmentService.delete(id);
        getAllDepartment();
        // alert('xóa thông tin phòng ban thành công');
        toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
      } catch (err) {
        console.log(err);
      }
    };

    const deleteDoctor = async (id) => {
      try {
        await DoctorService.delete(id);
        getAllDoctor();
      } catch (err) {
        console.log(err);
      }
    };

    const refreshList = () => {
      getAllDoctor();
      getAllDepartment();
      activeIndex.value = -1;
    };
    getAllDoctor();
    getAllDepartment();



    // Return values
    return {
      resultDepart,
      doctors,
      departments,
      newDepartment,
      message,
      activeIndex,
      searchText,
      doctorStrings,
      filteredDoctors,
      activeDoctor,
      inactiveDoctor,
      filteredDoctorsCount,
      activeDepartment,
      inactiveDepartment,
      summitDepartment,
      getAllDoctor,
      getAllDepartment,
      deleteDepartment,
      deleteDoctor,
      refreshList,

    };
  },
};
</script>
<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-6">
        <div class="card mb-4 b-table">

          <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Độ đo</h6>
            
              <div class="m-1 ">
                <button type="button" @click="this.refreshList()" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button>
                
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form-calculation" @click="this.newCalculation= {}">Thêm mới</button>
                <div class="modal fade" id="modal-form-calculation" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Độ đo</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Độ đo mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="this.submitCalculation">
                                <label>Tên Độ đo</label>
                                <div class="input-group mb-3">
                                  <input required type="text" class="form-control" placeholder="ABC Độ đo" aria-label="Email" aria-describedby="email-addon" v-model="this.newCalculation.name">
                                </div>

                                <label>Mô tả</label>
                                <div class="input-group mb-3">
                                  <input required type="text" class="form-control" placeholder="" aria-label="Email" aria-describedby="email-addon" v-model="this.newCalculation.describe">
                                </div>
                                
                                <div class="text-center">
                                  <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
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
                
            </div>
              
          </div>
          
          <div class="card-body px-0 pt-0 pb-2 scrollbox">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      tên
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Mô tả
                    </th>
                    
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="calculation in this.calculations" :key="calculation.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{calculation.name}}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span :title="calculation.describe" class="text-xs font-weight-bold mb-0 table-w-150">{{this.getLimitedPassage(calculation.describe)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{ disease.description }}
                      </p> -->
                      <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                    </td>
                    
                    <th
                      class="font-weight-bolder mb-0"
                    >
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-calculation" @click="this.newCalculation= calculation"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCalculation(calculation.id)"><i class="far fa-trash-alt"></i></button>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card mb-4 b-table">

          <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Siêu tham số</h6>
            
              <div class="m-1 ">
                <button type="button" @click="this.refreshList()" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button>
                
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form-newHyperparam" @click="this.newHyperparam= {}">Thêm mới</button>
                <div class="modal fade" id="modal-form-newHyperparam" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Siêu tham số</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Siêu tham số mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="submitHyperparam">
                                <label>Tên Siêu tham số</label>
                                <div class="input-group mb-3">
                                  <input required type="text" class="form-control" placeholder="ABC Siêu tham số" aria-label="Email" aria-describedby="email-addon" v-model="this.newHyperparam.name">
                                </div>

                                <label>Mô tả</label>
                                <div class="input-group mb-3">
                                  <input required type="text" class="form-control" placeholder="" aria-label="Email" aria-describedby="email-addon" v-model="this.newHyperparam.note">
                                </div>
                                
                                <div class="text-center">
                                  <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
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
                
            </div>
              
          </div>
          
          <div class="card-body px-0 pt-0 pb-2 scrollbox">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      Tên
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Mô tả
                    </th>
                    
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="hyperparam in this.hyperparams" :key="hyperparam.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{hyperparam.name}}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span :title="hyperparam.note" class="text-xs font-weight-bold mb-0 table-w-150">{{this.getLimitedPassage(hyperparam.note)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{ disease.description }}
                      </p> -->
                      <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                    </td>
                    
                    <th
                      class="font-weight-bolder mb-0"
                    >
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-newHyperparam" @click="this.newHyperparam= hyperparam"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark"  @click="this.deleteHyperParam(hyperparam.id)"><i class="far fa-trash-alt"></i></button>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card mb-4 b-table">

          <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Kết quả Độ đo các mô hình</h6>
            
              <div class="m-1 ">
                <button type="button" @click="this.refreshList()" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button>
                
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form-calculationResult" @click="this.newCalculationResult= {}">Thêm mới</button>
                <div class="modal fade" id="modal-form-calculationResult" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Độ đo</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Kết quả Độ đo mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="this.submitCalculationResult">
                                <!-- <label>Tên Độ đo</label> -->
                                <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Model</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.newCalculationResult.model">
                                        <option v-for="item in this.models" :key="item.id" :value="item.id">{{item.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Độ đo</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4"  v-model="this.newCalculationResult.caculation">
                                        <option v-for="item in this.calculations" :key="item.id" :value="item.id">{{item.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                </div>

                                <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Kết quả trên train</label>
                                    <div class="input-group mb-3">
                                      <input required type="number" min="0" max="1"  step='0.01' class="form-control" placeholder="" aria-label="Email" aria-describedby="email-addon" v-model="this.newCalculationResult.valueOnTrain">
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Kết quả trên test</label>
                                    <div class="input-group mb-3">
                                      <input required type="number" min="0" max="1"  step='0.01' class="form-control" placeholder="" aria-label="Email" aria-describedby="email-addon" v-model="this.newCalculationResult.valueOnTest">
                                    </div>
                                  </div>

                                </div>

                                
                                
                                <div class="text-center">
                                  <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
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
                
            </div>
              
          </div>
          
          <div class="card-body px-0 pt-0 pb-2 scrollbox">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      Model
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Độ đo
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      Kết quả trên train
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Kết quả trên test
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in this.calculationResults" :key="item.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.model.name}}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.caculation.name}}</h6>
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.valueOnTrain}}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.valueOnTest}}</h6>
                        </div>
                      </div>
                    </td>

                    <th
                      class="font-weight-bolder mb-0"
                    >
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-calculationResult" @click="this.newCalculationResult= item"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCalculationResult(item.id)"><i class="far fa-trash-alt"></i></button>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card mb-4 b-table">

          <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Kết quả Siêu tham số các mô hình</h6>
            
              <div class="m-1 ">
                <button type="button" @click="this.refreshList()" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button>
                
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form-hyperParamResult" @click="this.newHyperparamResult= {}">Thêm mới</button>
                <div class="modal fade" id="modal-form-hyperParamResult" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Độ đo</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Kết quả Siêu tham số mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="this.submitHyperparamResult">
                                <!-- <label>Tên Độ đo</label> -->
                                <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Model</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.newHyperparamResult.model">
                                        <option v-for="item in this.models" :key="item.id" :value="item.id">{{item.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Siêu tham số</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4"  v-model="this.newHyperparamResult.hyperParam">
                                        <option v-for="item in this.hyperparams" :key="item.id" :value="item.id">{{item.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                </div>

                                <label>Kết quả</label>
                                <div class="input-group mb-3">
                                  <input required type="number"  min="0"  step='0.0001'  class="form-control" placeholder="" aria-label="Email" aria-describedby="email-addon" v-model="this.newHyperparamResult.value">
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
          
          <div class="card-body px-0 pt-0 pb-2 scrollbox">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      Model
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Độ đo
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Giá trị
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in this.hyperparamResults" :key="item.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.model.name}}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.hyperParam.name}}</h6>
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{item.value}}</h6>
                        </div>
                      </div>
                    </td>
                    

                    <th
                      class="font-weight-bolder mb-0"
                    >
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-calculationResult" @click="this.newCalculationResult= item"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteHyperParamResult(item.id)"><i class="far fa-trash-alt"></i></button>
                      </div>
                    </th>
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
import HyperparamService from "@/services/hyperparam.service";
import CalculationService from "@/services/calculation.service";
import ModelService from "@/services/model.service";
import HyperparamResultService from "@/services/hyperparamresult.service";
import CalculationResultService from "@/services/calculationresult.service";
import FooterComponent from "./footer.vue";

export default {
  components: {
    HyperparamResultService,
    CalculationResultService,
    CalculationService,
    HyperparamService,
    FooterComponent,
    ModelService,
  },
  data() {
    return {
      newCalculationResult:{},
      newHyperparamResult: {},
      newCalculation:{},
      newHyperparam: {},
      calculations: [],
      hyperparams: [],
      calculationResults: [],
      hyperparamResults: [],
      models: [],
      alertDisease:false,
      message: "",
      activeIndex: -1,
      searchText: "",
      resultDepart:false,
    };
  },

  watch: {
    searchText: function (v) {
      this.searchText = v.toLowerCase().trim();
    },
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    
    diseaseStrings() {
      return this.diseases.map((disease) => {
        const { address, degree, experience } = disease;
        return [address, degree, experience].join("").toLowerCase();
      });
    },
    // Trả về các  disease có chứa thông tin cần tìm kiếm.
    filtereddiseases() {
      if (!this.searchText) return this.diseases;
      return this.diseases.filter((_disease, index) =>
        this.diseaseStrings[index].includes(this.searchText)
      );
    },

    activedisease() {
      if (this.activeIndex < 0) return null;
      return this.filtereddiseases[this.activeIndex];
    },

    filtereddiseasesCount() {
      return this.filtereddiseases.length;
    },
  },
  methods: {
    getLimitedPassage(groupPassage){
            const MAX_PASSAGE_LENGTH = 30; // Set the maximum number of characters you want to display
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
    },
    async deleteCalculation(id){
      try{
        await CalculationService.delete(id);
        this.refreshList()
        alert("xóa thông tin thành công")
      }catch(err){
        console.log(err);
      }
    },
    async deleteHyperParam(id){
      try{
        await HyperparamService.delete(id);
        this.refreshList()
        alert("xóa thông tin thành công")
      }catch(err){
        console.log(err);
      }
    },
    async deleteCalculationResult(id){
      try{
        await CalculationResultService.delete(id);
        this.refreshList()
        alert("xóa thông tin thành công")
      }catch(err){
        console.log(err);
      }
    },
    async deleteHyperParamResult(id){
      try{
        await HyperparamResultService.delete(id);
        this.refreshList()
        alert("xóa thông tin thành công")
      }catch(err){
        console.log(err);
      }
    },
    
    async getAllCalculation() {
      try {
        // console.log("get disease");
        this.calculations = await CalculationService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async getAllModel() {
      try {
        // console.log("get disease");
        this.models = await ModelService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async getAllHyperparams() {
      try {
        this.hyperparams = await HyperparamService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async getAllHyperparamsResult() {
      try {
        this.hyperparamResults = await HyperparamResultService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
     async getAllCalculationResult() {
      try {
        // console.log("get disease");
        this.calculationResults = await CalculationResultService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async submitCalculationResult() {
      try {
        if(this.newCalculationResult.id == null){
              this.result = await CalculationResultService.create(this.newCalculationResult);
              this.resultDepart = true
            }else{
              console.log("update");
              this.result = await CalculationResultService.update(this.newCalculationResult.id,this.newCalculationResult);
              // console.log(this.newRoom)
              this.resultDepart = true
            }
            this.newCalculationResult = {}
            this.refreshList()
      } catch (err) {
        console.log(err);
      }
    },
    async submitHyperparamResult() {
      try {
        if(this.newHyperparamResult.id == null){
              this.result = await HyperparamResultService.create(this.newHyperparamResult);
              this.resultDepart = true
            }else{
              console.log("update");
              this.result = await HyperparamResultService.update(this.newHyperparamResult.id,this.newHyperparamResult);
              // console.log(this.newRoom)
              this.resultDepart = true
            }
            this.newHyperparamResult = {}
            this.refreshList()
      } catch (err) {
        console.log(err);
      }
    },
    async submitCalculation() {
      try {
        if(this.newCalculation.id == null){
              this.result = await CalculationService.create(this.newCalculation);
              this.resultDepart = true
            }else{
              console.log("update");
              this.result = await CalculationService.update(this.newCalculation.id,this.newCalculation);
              // console.log(this.newRoom)
              this.resultDepart = true
            }
            this.newCalculation = {}
            this.refreshList()
      } catch (err) {
        console.log(err);
      }
    },
    async submitHyperparam() {
      try {
        if(this.newHyperparam.id == null){
              this.result = await HyperparamService.create(this.newHyperparam);
              this.resultDepart = true
            }else{
              console.log("update");
              this.result = await HyperparamService.update(this.newHyperparam.id,this.newHyperparam);
              // console.log(this.newRoom)
              this.resultDepart = true
            }
            this.newHyperparam = {}
            this.refreshList()
      } catch (err) {
        console.log(err);
      }
    },
    async deletedisease(id) {
      try {
        await diseaseService.delete(id);
        getAlldisease();
      } catch (err) {
        console.log(err);
      }
    },
    refreshList() {
      this.getAllCalculation();
      this.getAllHyperparams();
      this.getAllModel();
      this.getAllHyperparamsResult();
      this.getAllCalculationResult();
      this.activeIndex = -1;
    },
  },
  async created(){
    await this.refreshList()
  },
  // async mounted() {
  //   await this.refreshList();
  // },
};
</script>
<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
.b-table {
 
}
section {
  padding: 16px 24px;
  background: #f3f3f3;
}

.dataset{
  border: 2px solid;
  border-radius: 5px;
}

.table-w-150{
  max-width:  150px;
}
</style>

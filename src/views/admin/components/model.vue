<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            
            <div class="card mb-4">
              <h4 class="ms-2">Quản lý Model </h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newModel={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Model</h3>
                              <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Model mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="this.submitModel()">
                                <label>Tên Model</label>
                                <div class="input-group mb-3">
                                  <input  type="text" class="form-control" placeholder="nhap ten" aria-label="Email" aria-describedby="email-addon" v-model="this.newModel.name" required>
                                </div>

                                <label>Các nhãn (đặt theo cấu trúc classname1,classname2,classname3)</label>
                                <div class="input-group mb-3">
                                  <input  type="text" class="form-control" placeholder="classname1,classname2,classname3,..." aria-label="Email" aria-describedby="email-addon" v-model="this.newModel.labels" required>
                                </div>

                                <label>Kích thước ảnh</label>
                                <div class="input-group mb-3">
                                  <input  class="form-control" type="number" id="example-number-input" v-model="this.newModel.inputSize" required>
                                </div>

                                <!-- <label>Đường dẫn</label>
                                <div class="input-group mb-3">
                                  <input required type="text" class="form-control" placeholder="locahost:5000/resnet/model.json" aria-label="Email" aria-describedby="email-addon" v-model="this.newModel.path">
                                </div> -->

                                <label>Model file (chú ý chuyển đổi file về dạng json và nén thành (rar,txt))</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" ref="file" type="file" id="example-date-input" @onchange="this.onChangeFile">
                                </div>

                                <div class="form-check form-switch">
                                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked=""  v-model="this.newModel.isSegmetation">
                                  <label class="form-check-label" for="flexSwitchCheckDefault"> mô hình Segmentation</label>
                                </div>

                                <label>dataset</label>
                                <div class="form-group">
                                <!-- <label for="exampleFormControlSelect1">Example select</label> -->
                                <select class="form-control" id="exampleFormControlSelect1" v-model="this.newModel.dataset">
                                  <option v-for="item in this.datasets" :key="item._id" :value="item.id">{{item.name}}</option>
                                </select>
                              </div>
                                
                                <div class="text-center">
                                  <button type="submit"  class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
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
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tên Model</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">kích thước ảnh</th>
                        <!-- <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Path</th> -->
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nhãn</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Dataset</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chi tiết số liệu</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Dự đoán</th>
                        
                        <!-- <th class="text-secondary opacity-7"></th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="Model in this.filteredModels"
                          :key="Model._id">
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{Model.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{Model.inputSize}} x {{Model.inputSize}} x 3</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{Model.labels}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{Model.dataset.name}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                            <a class="text-xs font-weight-bold mb-0" data-mdb-color="dark"  @click="getAllHyperparams(Model.id)" data-bs-toggle="modal" data-bs-target="#hyperparam"><ins > siêu tham số</ins></a>/
                            <a class="text-xs font-weight-bold mb-0" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#calculation" @click="getAllCalculation(Model.id)"><ins>Độ đo</ins></a>

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModalLong" @click="this.$router.push({ name: 'admin.Model.Detail', params: {id: Model.id }})"> <i class="fa fa-eye text-dark" ></i></button>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td>
                        <button v-if="Model.isActive" type="button" class="mt-2 btn btn-outline-success" @click="this.inactiveModel(Model.id)">active</button>
                        <button v-else type="button" class="mt-2 btn btn-outline-secondary" @click="this.abcssda(Model.id)">inactive</button>
                      </td>
                        <td class="align-middle">
                          <div class="btn-group shadow-0 mt-2" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newModel=Model"><i class="fa fa-pencil-alt fa-sm" style="font-size:14px;"></i></button>
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" @click="this.DeleteModel(Model)"><i class="far fa-trash-alt fa-sm" style="font-size:14px;"></i></button>
                            
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
        <div class="modal fade" id="hyperparam" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
          <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Chi tiết Siêu tham số</h5>
                <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        
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
                      <tr v-for="item in this.currenthyperparam" :key="item.id">
                        
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
                            <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-calculationResult" @click="this.newCalculationResult= item"> <i class="fa fa-pencil-alt text-dark"></i></button> -->
                            
                            <!-- <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteHyperParamResult(item.id)"><i class="far fa-trash-alt"></i></button> -->
                          </div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn bg-gradient-primary">Save changes</button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="calculation" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
          <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Chi tiết Siêu tham số</h5>
                <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                 <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        
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
                      <tr v-for="item in this.currentcalculation" :key="item.id">
                       
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
                            <!-- <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-calculationResult" @click="this.newCalculationResult= item"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteCalculationResult(item.id)"><i class="far fa-trash-alt"></i></button> -->
                          </div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn bg-gradient-primary">Save changes</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>

import ModelService from "@/services/model.service";
import ModelFileService from "@/services/modelFile.service";
import DatasetService from "@/services/dataset.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
import HyperparamResultService from "@/services/hyperparamresult.service";
import CalculationResultService from "@/services/calculationresult.service";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
      HyperparamResultService,
      CalculationResultService,
      ModelService,
      DatasetService,
      VueHorizontal,
      FooterComponent,
      ModelFileService,
    },
    data() {
        
        return {
          
          currentcalculation:[],
          currenthyperparam:[],
          resultDepart: false,
          Models:[],
          datasets:[],
          departments: [],
          newModel:{},
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
        ModelStrings() {
            return this. Models.map(( item) => {
                return [item.name, item.labels, item.inputSize,item.isSegmentation,item.dataset.name].join("").toLowerCase();
            });
        },
        // Trả về các  Model có chứa thông tin cần tìm kiếm.
        filteredModels() {
            if (!this.searchText) return this. Models;
                return this. Models.filter((_Model, index) =>
                this. ModelStrings[index].includes(this.searchText)
            );
        },

        activeModel() {
            if (this.activeIndex < 0) return null;
            return this.filteredModels[this.activeIndex];
        },

        filteredModelsCount() {
            return this.filteredModels.length;
        },
    },
    methods: {
      async abcssda(id){
        try{
          await ModelService.active(id);
          this.getAllModel()
          toast.success("kích hoạt thành công")
        }catch(err){
          console.log(err)
        }
      },
      async inactiveModel(id){
        try{
          await ModelService.inactive(id);
          this.getAllModel()
          toast.success("tắt kích hoạt thành công")
        }catch(err){
          console.log(err)
        }
      },
      async getAllCalculation(id) {
        try {
          // console.log("get getAllCalculation");
          this.currentcalculation = await CalculationResultService.getallbymodel(id);
        } catch (err) {
          console.log(err);
        }
      },
      async getAllHyperparams(id) {
        try {
          console.log("get getAllHyperparams");
          this.currenthyperparam = await HyperparamResultService.getallbymodel(id);
        } catch (err) {
          console.log(err);
        }
      },
      async getAllDataset(){
        try{
          this.datasets = await DatasetService.getAllActive();
        }catch(err){
          console.log(err)
        }
      },
      async getAllModel(){
        try{
          this.Models = await ModelService.getAll();
        }catch(err){
          console.log(err)
        }
      },
      async DeleteModel(data){
        try{
          
          await ModelService.delete(data.id);
          await ModelFileService.delete(data.name);
          this.getAllModel();
          // alert("xóa model thành công")
          toast.success("xóa model thành công")
        }catch(err){
          console.log(err)
        }
      },
      async submitModel(){
        try{
          this.newModel.path = "http://127.0.0.1:5000/static/"+this.newModel.name+"/model.json"
          const formData = new FormData();
          formData.append('file',this.$refs.file.files[0]);
          formData.append('name',this.newModel.name);
          console.log(formData)
          if(this.newModel.id == null){
            await ModelService.create(this.newModel);
            await ModelFileService.create(formData);
          }else{
            console.log("update model")
            console.log(this.newModel)
            const data = await ModelService.get(this.newModel.id);
            await ModelService.update(this.newModel.id,this.newModel);
            await ModelFileService.delete(data.name);
            await ModelFileService.create(formData);
          }
          
          this.getAllModel();
          this.resultDepart = true
        }catch(err){
          console.log(err)
        }
      },
      async deleteModel(id){
        try{
          await ModelService.delete(id);
          getAllModel();
        }catch(err){
          console.log(err)
        }
      },
      refreshList() {
            this.getAllModel();
            this.getAllDataset();
            this.activeIndex = -1;
        },
    },
    async mounted() {
        await this.refreshList();

    },
};
</script>
<style scoped>


</style>
<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            
            <div class="card mb-4">
              <h4 class="ms-2">Danh sách Model </h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
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
                          <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModalLong" @click="this.$router.push({ name: 'doctor.Model.Detail', params: {id: Model.id }})"> <i class="fa fa-eye text-dark" ></i></button>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
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
      async getAllCalculation(id) {
        try {
          console.log("get getAllCalculation");
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
          this.Models = await ModelService.getAllActive();
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
            await ModelFileService.delete(data.name);
            await ModelService.update(this.newModel.id,this.newModel);
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
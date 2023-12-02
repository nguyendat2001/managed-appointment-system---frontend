<template>
  <div class="container py-4" style="width:700px;">
    <div class="modal-content">
      <div class="modal-body p-0">
        <div class="card card-plain">
          <div class="card-header pb-0 text-left">
            <h3 class="font-weight-bolder text-info text-gradient">Thêm Dataset</h3>
            <div v-if="this.success" class="alert alert-success alert-dismissible fade show" role="alert">
              <span class="alert-icon"><i class="ni ni-like-2"></i></span>
              <span class="alert-text"><strong>Success!</strong> Thêm Dataset thành công!</span>
              <button type="button" class="btn-close" >
                  <span aria-hidden="true" @click="this.success=false">&times;</span>
              </button>
          </div>
            <p class="mb-0">Nhập thông tin dataset mới</p>
          </div>
          <div class="card-body">
            <form role="form text-left">
              <label>Tên dataset</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ABC dataset"
                  aria-label="Email"
                  aria-describedby="email-addon"
                  v-model="this.newDataset.name"
                />
              </div>
              <label>độ phân giải gốc</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="226,226,3"
                  aria-label="Password"
                  aria-describedby="password-addon"
                  v-model="this.newDataset.originalSize"
                />
              </div>
              <label>số phần tử train</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="10xxxx"
                  aria-label="Email"
                  aria-describedby="email-addon"
                  v-model="this.newDataset.sampleTrain"
                />
              </div>
              <label>số phần tử test</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="10xxx"
                  aria-label="Email"
                  aria-describedby="email-addon"
                  v-model="this.newDataset.sampleTest"
                />
              </div>
              <label>số phần tử validation</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="10xxxx"
                  aria-label="Email"
                  aria-describedby="email-addon"
                  v-model="this.newDataset.sampleVal"
                />
              </div>
              <label>Bệnh đã chọn (vui lòng chọn theo thứ tự bệnh trên dataset gốc).   <span class="font-weight-bolder "> làm mới: <i class="fa fa-refresh fa-spin" @click="this.refresh()"></i></span></label>
              <div class="input-group mb-3 row">
                <div class="col-2" v-for="item in this.listDiseaseName" :key="item.id">
                  <span class="badge badge-pill badge-md bg-gradient-secondary">{{item}}</span>
                </div>
              </div>
              <vue-horizontal snap="center " >
                  <component-example class="m-1 p-2 card" v-for="disease in this.diseases" :key="disease.id">
                    <button type="button" class="btn btn-outline-secondary" @click="this.addDisease(disease)">{{disease.name}}</button>
                  </component-example>
                </vue-horizontal>
              
              <label class="form-label select-label">Example label</label>
              <div class="text-center">
                <b-button @click="submitAdd" variant="info" 
                  type="button"
                  class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                >
                  Submit
                </b-button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DiseaseService from "@/services/disease.service";
import DatasetService from "@/services/dataset.service";
import VueHorizontal from "vue-horizontal";
export default {
  components: {
    DiseaseService,
    VueHorizontal,
    },
  props: {
        id: { type: String, required: true },
    },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      newDataset:{},
      success: false,
    //   newDataset: {},
      diseases:[],
      listDiseaseId:[],
      listDiseaseName:[],
    };
  },
  methods: {
    refresh(){
      this.listDiseaseId = []
      this.listDiseaseName = []
    },
    addDisease(item){
      this.listDiseaseId.push(item.id)
      this.listDiseaseName.push(item.name)
      // console.log(this.listDisease.id)
      // this.getAlldisease()
    },
    async getdataset() {
      try {
        // console.log("get disease");
        this.newDataset = await DatasetService.get(this.id);
        this.newDataset.diseases = [];
        console.log(this.newDataset);
      } catch (err) {
        console.log(err);
      }
    },
    async getAlldisease() {
      try {
        // console.log("get disease");
        this.diseases = await DiseaseService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async submitAdd() {
      try {
        this.newDataset.diseases = [];
        this.newDataset.diseases = this.listDiseaseId
        console.log(this.newDataset);
        this.newDataset.id = this.id;
        await DatasetService.update(this.id,this.newDataset);
        this.success = true
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created(){
    await this.getAlldisease();
    await this.getdataset();
  },
};
</script>
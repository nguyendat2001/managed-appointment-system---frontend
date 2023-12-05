<template>
  <div class="container-fluid py-4">
    
    <div class="row">
      <div class="col-12">

        <div class="card mb-4 b-table">

          <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Danh sách dataset</h6>
            
              <div class="m-1 ">
                <button type="button" @click="this.refreshList()" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button>
                
                <router-link
                  :to="{
                    name: 'admin.Disease.AddDataset',
                  }"
                >
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form-dataset">Thêm mới</button>
              </router-link>
                
            </div>
              
          </div>
          <div v-if="alertDisease" class="alert alert-success alert-dismissible fade show" role="alert">
                <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                <span class="alert-text"><strong>Thành công!</strong> Thêm mới bệnh thành công!</span>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      Tên
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                     Kích thước đầu vào
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " >
                      Giá trị trên train
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Giá trị trên test
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Giá trị trên val
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      xem tất cả các bệnh
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Trạng thái
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in this.filtereddatasets" :key="item._id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{ item.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td  >
                      <span  class="text-xs font-weight-bold mb-0 table-w-150">{{item.originalSize}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{ disease.description }}
                      </p> -->
                      <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                    </td>
                    <td  class="font-weight-bolder text-center mb-0">
                      <span class="text-xs font-weight-bold mb-0 table-w-150">{{item.sampleTrain}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{ disease.symptom }}
                      </p> -->
                      
                    </td>
                    <td  class="font-weight-bolder text-center mb-0">
                      <span class="text-xs font-weight-bold mb-0 table-w-150">{{item.sampleTest}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{  disease.reason }}
                      </p> -->
                      
                    </td>
                    <td  class="font-weight-bolder text-center mb-0">
                      <span  class="text-xs font-weight-bold mb-0 table-w-150">{{item.sampleVal}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{disease.treaments}}
                      </p> -->
                      
                    </td>
                    <td class="font-weight-bolder text-center mb-0">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModalLong" @click="this.clickeddataset = item.diseases"> <i class="fa fa-eye text-dark" ></i></button>
                      
                    </td>
                    <td>
                        <button v-if="!item.isActive" type="button" class="mt-2 btn btn-outline-secondary" @click="activeDataset(item.id)">inactive</button>
                        <button v-else type="button" class="mt-2 btn btn-outline-success" @click="inactiveDataset(item.id)">active</button>
                    </td>
                    <th
                      class="font-weight-bolder mb-0"
                    >
                      <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark" data-bs-toggle="modal" data-bs-target="#modal-form-disease"  @click="this.$router.push({
                                  name: 'admin.Disease.UpdateDataset',
                                  params: { id: item.id },
                                })"> <i class="fa fa-pencil-alt text-dark"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-mdb-color="dark" @click="this.deleteDataset(item.id)"><i class="far fa-trash-alt"></i></button>
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
  <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Chi tiết dataset</h5>
                <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-left mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >
                      Bệnh
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                     Mô tả
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " >
                      Triệu chứng
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Nguyên nhân
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Diều trị
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Ngăn chặn
                    </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="disease in this.clickeddataset"
                          :key="disease.id">
                        <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class=" text-sm">{{ disease.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span :title="disease.description" class="text-xs font-weight-bold mb-0 table-w-150">{{getLimitedPassage(disease.description)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{ disease.description }}
                      </p> -->
                      <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                    </td>
                    <td>
                      <span :title="disease.symptom" class="text-xs font-weight-bold mb-0 table-w-150">{{getLimitedPassage(disease.symptom)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{ disease.symptom }}
                      </p> -->
                      
                    </td>
                    <td >
                      <span :title="disease.reason" class="text-xs font-weight-bold mb-0 table-w-150">{{getLimitedPassage(disease.reason)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{  disease.reason }}
                      </p> -->
                      
                    </td>
                    <td >
                      <span :title="disease.treaments" class="text-xs font-weight-bold mb-0 table-w-150">{{getLimitedPassage(disease.treaments)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{disease.treaments}}
                      </p> -->
                      
                    </td>
                    <td>
                      <span :title="disease.prevent" class="text-xs font-weight-bold mb-0 table-w-150">{{getLimitedPassage(disease.prevent)}}</span>
                      <!-- <p class="text-xs font-weight-bold mb-0 table-w-150">
                        {{disease.prevent}}
                      </p> -->
                    </td>
                        
                        
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
</template>
<script>
import DiseaseService from "@/services/disease.service";
import DatasetService from "@/services/dataset.service";
import ComponentDisease from "./diseaseAndDataset/ComponentDisease.vue";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    DiseaseService,
    DatasetService,
    VueHorizontal,
    ComponentDisease,
    FooterComponent,
  },
  data() {
    return {
      newDataset:{},
      newDisease: {},
      diseases: [],
      clickeddataset:[],
      datasets: [],
      alertDisease:false,
      message: "",
      activeIndex: -1,
      searchText: "",
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
    
    datasetstrings() {
      return this.datasets.map((disease) => {
        const { address, degree, experience } = disease;
        return [address, degree, experience].join("").toLowerCase();
      });
    },
    // Trả về các  disease có chứa thông tin cần tìm kiếm.
    filtereddatasets() {
      if (!this.searchText) return this.datasets;
      return this.datasets.filter((_disease, index) =>
        this.datasetstrings[index].includes(this.searchText)
      );
    },

    activedisease() {
      if (this.activeIndex < 0) return null;
      return this.filtereddatasets[this.activeIndex];
    },

    filtereddatasetsCount() {
      return this.filtereddatasets.length;
    },
  },
  methods: {
    getLimitedPassage(groupPassage){
            const MAX_PASSAGE_LENGTH = 20; // Set the maximum number of characters you want to display
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        },
    clickOnDataset(dataset){
      // console.log("on click");
      this.diseases = dataset.diseases;
      // console.log(this.diseases)
    },
    async activeDataset(id){
        try{
          await DatasetService.active(id);
          this.refreshList()
        //   alert("kích hoạt dataset thành công")
          toast.success("kích hoạt dataset thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async inactiveDataset(id){
        try{
          await DatasetService.inactive(id);
          this.refreshList()
        //   alert("ngưng kích hoạt dataset thành công")
          toast.success("ngưng kích hoạt dataset thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
    async activeDisease(id){
      try{
        await DiseaseService.active(id);
        this.getAlldisease()
        toast.success(" kích hoạt bệnh thành công", {
                    autoClose: 1000
                });
      }catch(err){
        console.log(err)
      }
    },
    async inactiveDisease(id){
      try{
        await DiseaseService.inactive(id);
        this.getAlldisease()
        toast.success("ngưng kích hoạt bệnh thành công", {
                    autoClose: 1000
                });
      }catch(err){
        console.log(err)
      }
    },
    async deleteDataset(id){
      try{
        await DatasetService.delete(id);
        this.getAllDataset();
        // alert("xóa thông tin thành công")
        toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
      }catch(err){
        console.log(err);
      }
    },
    async getAlldisease() {
      try {
        // console.log("get disease");
        this.diseases = await DiseaseService.getAll();
        console.log(this.diseases)
      } catch (err) {
        console.log(err);
      }
    },
    async getAllDataset() {
      try {
        // console.log("get dataset");
        this.datasets = await DatasetService.getAll();
        // console.log(this.datasets);
      } catch (err) {
        console.log(err);
      }
    },
    async submitDisease() {
      try {
        if(this.newDisease.id == null){
          await DiseaseService.create(this.newDisease);
        }else{
          const result = await DiseaseService.update(this.newDisease.id ,this.newDisease);
        }
        await this.getAlldisease();
        toast.success("thêm thông tin thành công", {
                    autoClose: 1000
                });
        this.newDisease = {};
        this.alertDisease = true;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteDisease(id) {
      try {
        await DiseaseService.delete(id);
        this.refreshList();
        // alert("xóa thông tin thành công")
        toast.success("xóa thông tin thành công", {
                    autoClose: 1000
                });
      } catch (err) {
        console.log(err);
      }
    },
    refreshList() {
      this.getAlldisease();
      this.getAllDataset();
      this.activeIndex = -1;
    },
  },
  async created(){
    await this.getAlldisease();
    await this.getAllDataset();
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

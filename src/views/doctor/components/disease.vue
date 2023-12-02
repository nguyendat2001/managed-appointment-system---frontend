<template>
  <div class="container-fluid py-4">
    
    <div class="row">
      <div class="col-12">

        <div class="card mb-4 b-table">

          <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Danh sách bệnh</h6>
            
              <div class="m-1 ">
                <button type="button" @click="this.refreshList()" class="btn bg-gradient-default m-1 "><i class="fa fa-refresh fa-spin" style=""></i></button>
                
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
                      Benh
                    </th>
                    <th  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" >
                      Mo ta
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " >
                      Trieu chung
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Nguyen nhan
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Dieu tri
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Ngan chan
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="disease in this.filtereddiseases" :key="disease._id">
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
        </div>
      </div>
    </div>
    <FooterComponent/>
  </div>
</template>
<script>
import DiseaseService from "@/services/disease.service";
import ComponentDisease from "./diseaseAndDataset/ComponentDisease.vue";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
export default {
  components: {
    DiseaseService,
    VueHorizontal,
    ComponentDisease,
    FooterComponent,
  },
  data() {
    return {
      newDataset:{},
      newDisease: {},
      diseases: [],
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
    clickOnDataset(dataset){
      // console.log("on click");
      this.diseases = dataset.diseases;
      // console.log(this.diseases)
    },
    
    async getAlldisease() {
      try {
        // console.log("get disease");
        this.diseases = await DiseaseService.getAll();
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
      this.getAlldisease();
      this.activeIndex = -1;
    },
  },
  async created(){
    await this.getAlldisease();
  },
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

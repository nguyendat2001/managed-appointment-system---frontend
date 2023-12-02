<template>
    <Page_Title :title="'Đơn Thuốc'" :description="'Tất cả Đơn Thuốc'"/>
    <section class="appoinment section">
    <div class="container">
        <div class="row">
            <!-- <div class="col-lg-12">
                <div class="mt-3">
                    <div class="feature-icon mb-3">
                    <i class="icofont-support text-lg"></i>
                    </div>
                    <span class="h3">Call for an Emergency Service!</span>
                    <h2 class="text-color mt-3">+84 789 1256 </h2>
                </div>
            </div> -->

            <div class="col-lg-12">
                <div class="appoinment-wrap mt-5 mt-lg-0 pl-lg-5">
                    <table class="table">
                        <thead>
                            <tr>
                            <!-- <th scope="col">#</th> -->
                                <!-- <th scope="col">Số lượng</th> -->
                                <th scope="col"></th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Lý do</th>
                                <th scope="col">Ngăn Chặn</th>
                                <th scope="col">Triệu chứng</th>
                                <th scope="col">Điều trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in this.diseases" :key="item.id">
                            <!-- <th scope="row">1</th> -->
                                <!-- <td>{{item.number}}</td> -->
                                <td>{{item.name}}</td>
                                <td :title="item.description">{{getLimitedPassage(item.description)}}</td>
                                <td :title="item.reason">{{getLimitedPassage(item.reason)}}</td>
                                <td :title="item.prevent">{{getLimitedPassage(item.prevent)}}</td>
                                <td :title="item.symptom">{{getLimitedPassage(item.symptom)}}</td>
                                <td :title="item.treaments">{{getLimitedPassage(item.treaments)}}</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>
<script>
import Page_Title from "../components/page-title.vue";
import DiseaseService from "@/services/disease.service";

export default {
  components: {
    Page_Title,
    DiseaseService,
  },
  data() {
    return {
        diseases:[],
    };
  },

  watch: {},
  computed: {
    
  },
  methods: {
    async getPrescriptionDetail(id){
        try{
          this.clickedMedicines = await PrescriptionDetailService.getByPrescription(id);
        }catch(err){
          console.log(err)
        }
      },
    getLimitedPassage(groupPassage){
            const MAX_PASSAGE_LENGTH = 50; // Set the maximum number of characters you want to display
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        },
    async getDisease(){
        try{
            this.diseases = await DiseaseService.getAll()
            this.diseases.shift();
            console.log(this.diseases)
        }catch(err){
            console.log(err)
        }
    }
  },
  mounted() {
  },
  async created(){
    await this.getDisease()
  }
};
</script>
<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
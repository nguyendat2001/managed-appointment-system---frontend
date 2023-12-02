<template>
    
      <section class="contact-form-wrap section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2 class="text-md mb-2">Thông tin tất cả bệnh</h2>
              <div class="divider mx-auto my-4"></div>
              <p class="mb-5">Thông tin bệnh được lưu trữ trên hệ thống.</p>
              <div class="subscribe">
                        <input type="text" class="form-control" placeholder="Tìm kiếm theo tên" v-model="this.searchText">
                        <button  class="btn btn-primary btn-round-full">Tìm kiếm</button>
                    </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <table class="table">
                        <thead>
                            <tr>
                            <!-- <th scope="col">#</th> -->
                                <th scope="col">Tên</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Lý do</th>
                                <th scope="col">Ngăn Chặn</th>
                                <th scope="col">Triệu chứng</th>
                                <th scope="col">Điều trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in this.filtereddiseases" :key="item.id">
                            <!-- <th scope="row">1</th> -->
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
  </section>

  <section class="section contact-info pb-0 mb-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="contact-block mb-4 mb-lg-0">
            <i class="icofont-live-support"></i>
            <h5>Liên hệ</h5>
            +823-4565-13456
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="contact-block mb-4 mb-lg-0">
            <i class="icofont-support-faq"></i>
            <h5>Email</h5>
            contact@mail.com
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="contact-block mb-4 mb-lg-0">
            <i class="icofont-location-pin"></i>
            <h5>Địa chỉ</h5>
            Xuân khánh, Ninh kiều, Cần thơ
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
        searchText:null,
    };
  },

  watch: {},
  computed: {
    diseaseStrings() {
      return this.diseases.map((disease) => {
        // const { name, description, experience } = disease;
        return [disease.name].join("").toLowerCase();
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
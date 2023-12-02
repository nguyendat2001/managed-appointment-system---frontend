<template>
    <Page_Title :title="'Dự đoán với mô hình phân lớp trí tuệ nhân tạo'" :description="'Mô hình '+this.model.name"/>
    <section class="section service-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-6 col-sm-6" >
            <div class="service-block mb-5 ">
              <!-- <img src="@/assets/user/images/classification_icon.png" alt="" class="img-fluid"> -->
              <div class="content d-flex justify-content-center row">
                <h4 class="col-12 mt-4  title-color"></h4>

                <div class="col-12 mb-4">
                  <div class="fileUploadInput">
                    <label>✨ chọn file</label>
                    <input   @change="onFileChange" type="file" />
                    <button>+</button>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <p>các nhãn dự đoán: {{this.model.labels}}</p>
                </div>
                <div class="col-8 mt-5 mb-1 row d-flex justify-content-center" style="border-end: 3px solid;" >
                    <center>
                      <img id="input-image" class="col-12 rounded" width="400" height="400" v-if="url" :src="this.url" />
                    </center>
                  <div  class="mt-2 col-12 d-flex justify-content-center"> 
                      <button v-if="url"  class="btn btn-icon btn-3 btn-primary" @click="this.predict()">chẩn đoán</button>
                  </div>
                </div>
                <div  class="col-4  mb-1 " style="border-start: 3px solid;">
                    <div v-if="this.result!=null" class="row d-flex  justify-content-center">
                      <h3 class="mb-0">Kết quả chẩn đoán</h3>
                      
                      <div class="p-3">
                        <p v-for="item in this.result" :key="item.id">Bệnh :{{item.disease}}. Tỉ lệ: {{item.prob}}</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-12 col-md-6 col-sm-6">
              
          </div>
        </div>
      </div>
    </section>
</template>
<script>
import * as tf from '@tensorflow/tfjs';
import Page_Title from "../components/page-title.vue";
import ModelService from "@/services/model.service";

export default {
  components: {
    Page_Title,
    ModelService,
    tf,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      model:{},
      network:null,
      classes:null,
      url:null,
      result:null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
            
    },
    async predict(){
        const image = document.getElementById('input-image');
        console.log(image)
        let img = tf.browser.fromPixels(image);
        console.log(img.shape)

        let normalizationOffset = tf.scalar(255 / 2); // 127.5
        let tensor = img
            .resizeNearestNeighbor([this.model.inputSize, this.model.inputSize])
            .div(255.0)
            .expandDims(0);

        // this.network.summary()
        
        const classname1 = this.classes

        console.log(tensor.toString())
        console.log("predict")
        let predictions = await this.network.predict(tensor);
        console.log(predictions);
        predictions = predictions.dataSync();
        console.log(predictions);

        // 3. Hien thi len man hinh
        let top5 = Array.from(predictions)
            .map(function (p, i) {
                return {
                    probability: p.toFixed(2),
                    className: classname1[i]
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            });
            console.log(top5);
        // this.result = top5
        this.result = []
        for(let i=0; i < this.classes.length;i++){
            // let tmp = {"name": top5[i].className} 
            console.log(top5[i].className)
            // const disease = await DiseaseService.getByName(top5[i].className);
            this.result.push({"prob":top5[i].probability,"disease":top5[i].className})
        }
        console.log(this.result)
            // $("#result_info").empty();
            // top5.forEach(function (p) {
            //         $("#result_info").append(`<li>${p.className}: ${p.probability.toFixed(3)}</li>`);
            //     });
            // }
    },
    async getModel(){
        try{
            this.model = await ModelService.get(this.id);
            this.classes = this.model.labels.split(',');
            console.log("classes")
            console.log(this.classes)
            this.network = Object.freeze(await tf.loadLayersModel(this.model.path));
            this.network.summary()
        }catch(err){
        console.log(err)
        }
    },
  },
  mounted() {
  },
  async created(){
    await this.getModel();
  },
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

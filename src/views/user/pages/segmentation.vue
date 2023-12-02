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
                <div class="col-12 mt-5 mb-1 row d-flex justify-content-center">
                    <center>
                      <img id="input-image" class="col-12 rounded" width="400" height="400" v-if="url" :src="this.url" />
                    </center>
                  <div  class="mt-2 col-12 d-flex justify-content-center"> 
                      <button v-if="url"  class="btn btn-icon btn-3 btn-primary" @click="this.predict()">chuẩn đoán</button>
                  </div>
              </div>
              </div>
            </div>
                           <canvas  id="canvas1" style="filter: grayscale(100%);" :width="this.model.inputSize" :height="this.model.inputSize"> </canvas>

          </div>

          <div class="col-lg-12 col-md-6 col-sm-6">
               <!-- <canvas  id="canvas1" style="filter: grayscale(100%);" :width="this.model.inputSize" :height="this.model.inputSize"> </canvas> -->
               <canvas  id="canvas2" style="filter: grayscale(100%);" :width="this.model.inputSize" :height="this.model.inputSize"> </canvas>

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
      predicted:false,
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
            this.predicted = false
            const image = document.getElementById('input-image');
            console.log(image)
            let img = tf.browser.fromPixels(image).resizeNearestNeighbor([this.model.inputSize, this.model.inputSize]).mean(2)
                    // .toFloat()
                    .expandDims(0)
                    .expandDims(-1);
            console.log(img.shape)

            let normalizationOffset = tf.scalar(255 / 2); // 127.5
            let tensor = img
                
                // .div(255.0)
                // .expandDims(0);

            console.log(tensor)
            // console.log("predict")
            let predictions = await this.network.predict(tensor);
            predictions = predictions.dataSync();
            console.log("predict")
            let result = tf.tensor(predictions, [this.model.inputSize, this.model.inputSize,3]);
            let result1 = result.argMax(-1).mul(255 / 2).toInt().expandDims(-1)

            console.log(result.shape)
            console.log("result");
            // const result2 = result
            console.log(result);

            const canvas1 = document.getElementById('canvas1');
            const canvas2 = document.getElementById('canvas2');
            const final1 = tf.browser.toPixels(result, canvas1);
            const final2 = tf.browser.toPixels(result1, canvas2);
            console.log("final");
            // console.log(final);
            this.predicted = true
        },
    async getModel(){
        try{
            class L2 {
                static className = 'L2';
                constructor(config) {
                  return tf.regularizers.l1l2(config)
                }
            }
            tf.serialization.registerClass(L2);
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

.fileUploadInput {
  display: grid;
  grid-gap: 10px;
  position: relative;
  z-index: 1; }
  
  .fileUploadInput label {
    display: flex;
    align-items: center;
    color: setColor(primary, 0.5);
    background: setColor(white);
    transition: .4s ease;
    font-family: arial, sans-serif;
    font-size: .75em;
    font-weight: regular; }
    
  .fileUploadInput input {
    position: relative;
    z-index: 1;
    padding: 0 gap(m);
    width: 100%;
    height: 50px;
    border: 1px solid #323262;
    border-radius: 3px;
    font-family: arial, sans-serif;
    font-size: 1rem;
    user-select: none;
    cursor: pointer;
    font-weight: regular; }
    .fileUploadInput input[type="file"] {
      padding: 0 gap(m); }
      .fileUploadInput input[type="file"]::-webkit-file-upload-button {
        visibility: hidden;
        margin-left: 10px;
        padding: 0;
        height: 50px;
        width: 0; }
        
  .fileUploadInput button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    line-height: 0;
    user-select: none;
    color: white;
    background-color: #323262;
    border-radius: 0 3px 3px 0;
    font-family: arial, sans-serif;
    font-size: 1rem;
    font-weight: 800; }
    .fileUploadInput button svg {
      width: auto;
      height: 50%; }

@-moz-document url-prefix() {
.fileUploadInput button{
    display: none
}
}
</style>

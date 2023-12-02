<template>
    <div class="container-fluid p-2">
        <div class="row p-2 d-flex justify-content-center">
            <div class="col-xl-4 col-md-12">
                <div class="file-upload-wrapper">
                    <!-- <input type="file"  id="input-file-max-fs"  @change="onFileChange" class="file-upload" data-default-file="https://mdbootstrap.com/img/Photos/Others/images/89.webp" /> -->
                    <div class="fileUploadInput">
                        <!-- <label>✨ chọn file</label> -->
                        <input   type="file" class="" @change="onFileChange" />
                        <button>+</button>
                    </div>
                </div>
                <div class="mt-2 row">
                    <img class="col-12 rounded" width="200" height="200" v-if="url" :src="this.url" />
                    <div  class="mt-2 col-12 d-flex justify-content-center"> 
                        <button v-if="url"  class="btn btn-icon btn-3 btn-primary" @click="this.predict()">chẩn đoán</button>
                    </div>
                   
                    <!-- <button v-if="url" class="btn btn-icon btn-3 btn-primary" @click="this.predict()" type="button">
                        <span class="btn-inner--icon"><i class="ni ni-button-play"></i></span>
                        <span class="btn-inner--text">chẩn đoán</span>
                    </button> -->
                </div>
            </div>
            <div class="col-xl-8 col-md-12 d-flex justify-content-center row">
                <h3 class="col-12 d-flex justify-content-center">Kết quả</h3>
                <div class="col-12 d-flex justify-content-center">
                    <img width="400" height="400" id="input-image" class="rounded"  v-if="url" :src="this.url" />
                    <img width="400" height="400"  class="rounded" v-else src="@/assets/admin/img/upload icon.jpg" />
                </div>
                <div class="card-body px-0 pt-0 pb-2 mt-5 d-flex justify-content-center row">
                    <center>
                    <h6 v-for="item in this.result" :key="item._id">Tỉ Lệ: {{item.prob}}% ||Tên bệnh: {{item.disease}}</h6>
                    </center>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="container-fluid p-2 mt-2" v-if="this.result">
        <div class="card-group">
            <div class="card"  v-for="item in this.result" :key="item._id" >
                        <div class="card-body pt-2">
                            <span class="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">Tỉ lê bệnh: {{item.prob*100}}%</span>
                            <a href="javascript:;" class="card-title h5 d-block text-darker">
                            Tên bệnh: {{item.disease.name}}
                            </a>
                            <p class="card-description mb-4">
                            Mô tả: {{item.disease.description}}
                            </p>
                            <p class="card-description mb-4">
                            Nguyên nhân: {{item.disease.reason}}
                            </p>
                            <p class="card-description mb-4">
                            Triệu chứng: {{item.disease.symptom}}
                            </p>
                            <p class="card-description mb-4">
                            Điều trị: {{item.disease.treaments}}
                            </p>
                            <p class="card-description mb-4">
                            Phòng ngừa: {{item.disease.prevent}}
                            </p>
                        </div>
                    </div>
        </div>
    </div> -->
</template>
<script>
import * as tf from '@tensorflow/tfjs';
import ModelService from "@/services/model.service"  
import DiseaseService from "@/services/disease.service";
import AmountUsedModelService from "@/services/amountUsedModel.service"    

export default {
    components: {
      ModelService,
      tf,
      DiseaseService,
      AmountUsedModelService,
    },
    props:['model'],
    data() {
        return {
          network:null,
          classes: [],
          result:null,
          url: null,
          diseases:[],
        };
    },
    
    watch: {
      
    },
    computed: {
  
    },
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
                        probability: p.toFixed(2)*100,
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
            let data = {}
            data.model = this.model.id
            await AmountUsedModelService.create(data);
        },
        async getmodel(){
            try{
                // const result = await ModelService.get(this.model.id);
                this.classes = this.model.labels.split(',');
                console.log("classes")
                console.log(this.classes)
                this.network = Object.freeze(await tf.loadLayersModel(this.model.path));
                this.network.summary()
            }catch(err){
            console.log(err)
            }
        },
        refreshList() {
            this.getmodel()
            this.activeIndex = -1;
        },
    },
    async created(){
        await this.refreshList();
    }
};
</script>

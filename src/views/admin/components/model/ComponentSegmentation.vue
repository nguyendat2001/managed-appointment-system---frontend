<template>
    <div class="container-fluid p-2">
        <div class="row p-2">
            <div class="col-xl-12 row col-md-12" style="height: 600px">
                <div class="col-12 d-flex justify-content-center row">
                    <center>
                    <div class="fileUploadInput">
                        <!-- <label>✨ chọn file</label> -->
                        <input   type="file" class="" @change="onFileChange" />
                        <button>+</button>
                    </div>
                    <!-- <input type="file" class="" @change="onFileChange" /> -->
                    <div class="d-flex justify-content-center row" v-if="url">
                        <div class="mt-2 col-12">
                            <img width="450" height="450" id="input-image" class="rounded mt-2" :src="this.url" />
                        </div>
                        <div class="mt-2 col-12">
                            <button  class="btn btn-icon btn-3 btn-primary" @click="this.predict()">chẩn đoán</button>
                        </div>
                    </div>
                    <div class="mt-2" v-else >
                        <img width="500" height="500"  class="rounded mt-2" src="@/assets/admin/img/upload icon.jpg" />
                    </div>
                    </center>
                </div>
                
            </div>
            <div class="col-xl-12 row col-md-12">
                <div class="col-12 d-flex justify-content-left row">
                    <p>chú giải: 
                    vùng <span style="background-color:red;">màu đỏ</span> là vùng nền background.
                    vùng <span style="background-color:green;color:white;">màu xanh lá</span> là vùng phổi.
                    vùng <span style="background-color:blue; color:white;">màu xanh dương</span> là vùng nhiễm trùng phổi.</p>
                </div>
            </div>
            <hr class="line"/>
            <div class="col-xl-12 col-md-12 row">
                
                <div class="col-5 d-flex justify-content-center ms-6 row">
                    
                    <div class="col-12">
                        <img  v-if="this.predicted" :width="this.model.inputSize" :height="this.model.inputSize" class="rounded mb-4" :src="this.url"/>
                        <img v-else :width="this.model.inputSize" :height="this.model.inputSize" class=" rounded mb-4" src="@/assets/admin/img/medical.png"/>
                        
                    </div>
                    <div class="col-12">
                        <!-- <canvas v-if="this.predicted"  id="canvas1" width={300} height={300}> </canvas> -->
                        <img  v-if="!this.predicted" :width="this.model.inputSize" :height="this.model.inputSize" class="mb-4 rounded" src="@/assets/admin/img/mask.png"/>
                        <canvas  id="canvas1" class="rounded" :width="this.model.inputSize" :height="this.model.inputSize"> </canvas>
                    </div>
                </div>
                <div id="arrowAnim" class="mt-10 col-2" >
                    <div class="arrowSliding">
                        <div class="arrow"></div>
                    </div>
                    <div class="arrowSliding delay1">
                        <div class="arrow"></div>
                    </div>
                    <div class="arrowSliding delay2">
                        <div class="arrow"></div>
                    </div>
                    <div class="arrowSliding delay3">
                        <div class="arrow"></div>
                    </div>
                </div>
                <div class="col-5 d-flex justify-content-center row">
                    <center>
                        <h3 class="col-12">Kết quả</h3>
                        <img  v-if="!this.predicted" :width="this.model.inputSize" :height="this.model.inputSize" style="max-width:300px; border-radius:1rem" class="image1" src="@/assets/admin/img/medical.png" alt="User Image" id="display_image">
                        <img  v-else :width="this.model.inputSize" :height="this.model.inputSize" style="max-width:300px; border-radius:1rem" class="image1" :src="this.url" alt="User Image" id="display_image">

                        <canvas ref="printcontent" class="image1 rounded" id="canvas2" style="position:relative; top:-257px; opacity: 0.3;" :width="this.model.inputSize" :height="this.model.inputSize"> </canvas>
                        <button v-if="!this.predicted" class="btn btn-icon btn-3 btn-primary" @click="downloadcanvas" type="">tải</button>
                    </center>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs';
import ModelService from "@/services/model.service"
import AmountUsedModelService from "@/services/amountUsedModel.service"

export default {
    components: {
      ModelService,
      AmountUsedModelService,
      tf,
    },
    props:['model'],
    data() {
        return {
            modelId:null,
            network:null,
            classes: [],
            url: null,
            predicted:false,
        };
    },
    
    watch: {
      
    },
    computed: {
  
    },
    methods: {
        downloadcanvas(){
            var link = document.createElement('a');
            link.download = 'filename.png';
            link.href = document.getElementById('canvas2').toDataURL()
            link.click();
        },
        async predict(){
            const current1 = new Date();

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
            const final2 = tf.browser.toPixels(result, canvas2);
            console.log("final");
            // console.log(final);

            const current2 = new Date();
            console.log(current2 - current1)
            
            this.predicted = true
            let dataPost={}
            dataPost.model = this.model.id
            await AmountUsedModelService.create(dataPost);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            },
        async getmodel(){
            try{
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
<style scoped>
#arrowAnim {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 750px;
  left: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  width: 10px;
  height: 10px;
  border: 10px solid;
  border-color: black transparent transparent black;
  transform: rotate(135deg);
}


.arrowSliding {
  position: absolute;
  -webkit-animation: slide 4s linear infinite; 
          animation: slide 4s linear infinite;
}

.delay1 {
  -webkit-animation-delay: 1s; 
    animation-delay: 1s;
}
.delay2 {
  -webkit-animation-delay: 2s; 
    animation-delay: 2s;
}
.delay3 {
  -webkit-animation-delay: 3s; 
    animation-delay: 3s;
}

@-webkit-keyframes slide {
    0% { opacity:0; transform: translateX(-5vw); }	
   20% { opacity:1; transform: translateX(-2vw); }	
   80% { opacity:1; transform: translateX(2vw); }	
  100% { opacity:0; transform: translateX(5vw); }	
}
@keyframes slide {
   0% { opacity:0; transform: translateX(-5vw); }	
   20% { opacity:1; transform: translateX(-2vw); }	
   80% { opacity:1; transform: translateX(2vw); }	
  100% { opacity:0; transform: translateX(5vw); }		
}
.line {
  border: 0;
  background-color: #000;
  height: 3px;
  cursor: pointer;
}

.image1 {
    position: relative;
    top: 30;
    left: 30;
    border: 1px red solid;
}

.image2 {
    position: absolute;
    top: 743px;
    left: 647px;
    border: 1px green solid;
    opacity: 0.3;
}
</style>

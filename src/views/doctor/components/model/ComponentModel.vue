<template>
  <div class="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
    <!-- Navbar -->
    <nav
      class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2"
    ></nav>
    <!-- End Navbar -->
    <div class="container-fluid min-height-150 mt-5">
      <div
        class="page-header min-height-150 border-radius-xl mt-4"
        style="
          background-image: url('/admin/img/curved-images/curved0.jpg');
          background-position-y: 50%;
        "
      >
        <span class="mask bg-gradient-primary opacity-6"></span>
      </div>
      <div
        class="d-flex justify-content-center card card-body blur shadow-blur mx-4 mt-n8 overflow-hidden"
      >
        <div class="row gx-4">
          <h2 class="text-center">{{this.model.name}}</h2>
        </div>
      </div>
    </div>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-xl-6">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Độ đo</h6>
                </div>
                <div class="col-6 text-end">
                  <!-- <button
                    class="btn btn-outline-primary btn-sm mb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-form-workday"
                  >
                    thêm mới
                  </button> -->
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0">
              <Bar  v-if="this.loaded"  :data="this.calculationResult" :options="this.options" />
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Tham số</h6>
                </div>
                <div class="col-6 text-end">
                  <!-- <button
                    class="btn btn-outline-primary btn-sm mb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-form-workday"
                  >
                    thêm mới
                  </button> -->
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0">
              <Bar v-if="this.loaded" :data="this.hyperparamResult" :options="this.options" />
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-12 mt-3"  v-if="this.loaded">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Dự đoán thông qua hình ảnh</h6>
                </div>
                <!-- <div class="col-6 text-end">
                  <button
                    class="btn btn-outline-primary btn-sm mb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-form-workday"
                  >
                    thêm mới
                  </button>
                </div> -->
              </div>
            </div>
            <div class="card-body p-3 pb-0">
              <ClassificationComponent  v-if="!this.model.isSegmentation" :model="this.model"/>
              <SegmentationComponent v-else :model="this.model"/>
            </div>
          </div>

          
        </div>
      </div>
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as tf from '@tensorflow/tfjs';

import CalculationResultService from "@/services/calculationresult.service";
import HyperparamResultService from "@/services/hyperparamresult.service";
import ModelService from "@/services/model.service"  
// import VueHorizontal from "vue-horizontal";
import FooterComponent from "../footer.vue";
import ClassificationComponent from "./ComponentClassification.vue";
import SegmentationComponent from "./ComponentSegmentation.vue";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    components: {
      ClassificationComponent,
      SegmentationComponent,
      CalculationResultService,
      HyperparamResultService,
      ModelService,
      FooterComponent,
      Bar,
      tf,
    },
    props: {
      id: { type: String, required: true },
    },
    data() {
        return {
          network: null,
          result: [],
          resultDepart: false,
          loaded: false,
          colors: ['#FF0000', '#00FF00',' #0000FF', '#FFFF00','#00FFFF', '#FF00FF',
                     '#C0C0C0', '#808080', '#FFCCFF','#FFCCCC','#CCCC33','#CCCC00','#99CCFF','#99CCCC',
                     '#FF66FF', '#FF66CC', '#FF6699', '#FF6666','#FF6633','#FF6600','#CC66FF','#CC66CC'],
          model:{},
          calculationResult:{
            labels:null,
            datasets:null,
          },
          hyperparamResult:{
            labels:null,
            datasets:null,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          },
        };
    },
    
    watch: {
      
    },
    computed: {
  
    },
    methods: {
      async getmodel(){
        try{
          this.model = await ModelService.get(this.id);
          // const net = await tf.loadLayersModel('http://model-server.domain/download/model.json');
          console.log(this.model)
        }catch(err){
          console.log(err)
        }
      },
      async gethyperparam(){
        try{
          this.result = await HyperparamResultService.getallbymodel(this.id);
          this.hyperparamResult.labels = []
          this.hyperparamResult.labels.push(this.model.name)
          let tmp = 0;
          this.hyperparamResult.datasets = []

          for(let i = 0; i < this.result.length ; i++){
            const abd = this.result[i]
            let data = {
              label: this.result[i].hyperParam.name,
              backgroundColor: this.colors[tmp],
              data: []
            } 
            data.data.push(this.result[i].value)
            this.hyperparamResult.datasets.push(
              data
            )
            if(tmp >= this.colors.length){
              tmp = 0
            }
            tmp ++
          }

          this.result = []

          console.log(this.hyperparamResult)
        }catch(err){
          console.log(err)
        }
      },
      async getcalculation(){
        try{
          const result =  await CalculationResultService.getallbymodel(this.id);
          this.calculationResult.labels = []
          this.calculationResult.datasets = []
          this.calculationResult.labels.push(this.model.name)
          let tmp = 0;
          for(let i = 0; i < result.length ; i++){
            this.calculationResult.datasets.push(
              {
                label: [result[i].caculation.name + " on train"],
                backgroundColor: this.colors[tmp],
                data: [result[i].valueOnTrain]
              }
            )
            
            this.calculationResult.datasets.push(
              {
                label: [result[i].caculation.name+ " on test"],
                backgroundColor: this.colors[tmp],
                data: [result[i].valueOnTest]
              }
            )

            if(tmp >= this.colors.length){
              tmp = 0
            }
            tmp = tmp + 1
          }
          console.log(this.calculationResult)
        }catch(err){
          console.log(err)
        }
      },
      refreshList() {
            
            this.activeIndex = -1;
        },
    },
    async created(){
      this.loaded = false
      await this.getmodel();
      await this.gethyperparam();
      await this.getcalculation();
      this.loaded = true
    }
};
</script>

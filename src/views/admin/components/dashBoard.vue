<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize font-weight-bold">Tổng danh thu</p>
                      <h5 class="font-weight-bolder mb-0">
                        {{this.normalize(this.revenue)}} VND
                        <!-- <span class="text-success text-sm font-weight-bolder">+55%</span> -->
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize font-weight-bold">Số lượng bác sĩ</p>
                      <h5 class="font-weight-bolder mb-0">
                        {{this.numDoctor}}
                        <!-- <span class="text-success text-sm font-weight-bolder">+3%</span> -->
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize font-weight-bold">số lượng bệnh nhân</p>
                      <h5 class="font-weight-bolder mb-0">
                        {{this.numUser}}
                        <!-- <span class="text-danger text-sm font-weight-bolder">-2%</span> -->
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize font-weight-bold">Số lịch hẹn được đặt</p>
                      <h5 class="font-weight-bolder mb-0">
                        {{this.numAppointment}}
                        <!-- <span class="text-success text-sm font-weight-bolder">+5%</span> -->
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4"  style="height:600px;">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="d-flex flex-column h-100">
                      <p class="mb-1 pt-2 text-bold">Số lượt sử dụng model</p>
                      <Bar v-if="this.loaded"  :data="this.amountUsedModel"  />
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 mb-lg-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="d-flex flex-column h-100">
                      <p class="mb-1 pt-2 text-bold">doanh thu của bác sĩ</p>
                      <Doughnut v-if="this.loaded" :data="this.doctorRevenue"  />
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
</template>
<script>
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar ,Doughnut} from 'vue-chartjs'
import DoctorService from "@/services/doctor.service";
import UserService from "@/services/user.service";
import ModelService from "@/services/model.service";
import AppointmetService from "@/services/appoitment.service";
import PrescriptionService from "@/services/prescription.service";
import AmountUsedModelService from "@/services/amountUsedModel.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";

ChartJS.register(CategoryScale, LinearScale, BarElement,ArcElement,  Title, Tooltip, Legend)
export default {
    components: {
      DoctorService,
      UserService,
      AppointmetService,
      ModelService,
      VueHorizontal,
      PrescriptionService,
      AmountUsedModelService,
      FooterComponent,
      Bar,
      Doughnut,
    },
    data() {
        return {
          loaded:false,
          medicines: [],
          revenue:null,
          numDoctor:null,
          numUser:null,
          numAppointment:null,
          doctorRevenue: {
            labels: [],
            datasets: [
              {
                backgroundColor: [],
                data: []
              }
            ]
          },
          doctorNumPrescription: {
            labels: [
              'Số đơn thuốc',
              ],
            datasets: []
          },
          amountUsedModel: {
            labels: ['số lần sử dụng model'],
            datasets: []
          },
          newMedicine:{},
          message:"",
          activeIndex: -1,
          searchText:'',
          loaded:false,
          colors: ['#FF0000', '#00FF00',' #0000FF', '#FFFF00','#00FFFF', '#FF00FF',
                     '#C0C0C0', '#808080', '#FFCCFF','#FFCCCC','#CCCC33','#CCCC00','#99CCFF','#99CCCC',
                     '#FF66FF', '#FF66CC', '#FF6699', '#FF6666','#FF6633','#FF6600','#CC66FF','#CC66CC','#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          options: {
            responsive: true,
            maintainAspectRatio: false
          },
        };
    },
    
    
    methods: {
     normalize(textPrice){
        let textnor = String(textPrice).split('')
        textnor = textnor.reverse()
        console.log(textnor)
        if(textnor.length > 3){
          textnor.splice(3, 0, '.')
        }
        if(textnor.length > 7){
          textnor.splice(7, 0, '.')
        }
        textnor = textnor.reverse()
        console.log(textnor)
        
        return textnor.join("")
      },
      async getInfor(){
        try{
          const doctor = await DoctorService.getAll();
          
          const user = await UserService.getAll();
          const appointment = await AppointmetService.getAll();
          const model = await ModelService.getAll();
          
          this.numDoctor = doctor.length
          this.numUser = user.length
          this.numAppointment = appointment.length
          this.revenue = 0;          
          for(let i = 0;i <appointment.length; i++){
            this.revenue = this.revenue + appointment[i].price;
          }
          this.doctorNumPrescription.datasets = []
          let tmp = 0;
          for(let i = 0;i <doctor.length; i++){
            let appointmentDoctor = await AppointmetService.getByDoctor(doctor[i].id);
            let prescriptionDoctor = await PrescriptionService.getByDoctor(doctor[i].id)
            
            console.log(appointmentDoctor)
            this.doctorRevenue.labels.push(doctor[i].fullname + "| ID: "+doctor[i].id)
            this.doctorRevenue.datasets[0].backgroundColor.push(this.colors[tmp])
            this.doctorRevenue.datasets[0].data.push(appointmentDoctor.reduce(function (sum, tax) {
                  return sum + tax.price;
              }, 0))
            this.doctorNumPrescription.datasets.push(
              { label: doctor[i].fullname + "| ID: "+doctor[i].id,
                backgroundColor: this.colors[tmp],
                data: [prescriptionDoctor.length]  
              }
              )
            tmp ++;
            if(tmp >= this.colors.length){
              tmp = 0
            }
          }

          const dateNow = new Date();
          let month = dateNow.getMonth();
          let year = dateNow.getFullYear();
          tmp = 0
          this.amountUsedModel.datasets = []
          
          for(let i = 0;i<model.length;i++){
            let amountModel = await AmountUsedModelService.getByModel(model[i].id);
            
            let number = amountModel.reduce(function (sum, tax) {
                  return sum + tax.amount;
              }, 0)
            console.log(number)
            this.amountUsedModel.datasets.push({
                label: model[i].name,
                backgroundColor: this.colors[tmp],
                data: [number]
            })
            tmp ++;
            if(tmp >= this.colors.length){
              tmp = 0
            }
          }
          console.log(this.amountUsedModel)
          console.log(this.doctorRevenue)
          console.log(this.doctorNumPrescription)
          console.log(this.numDoctor)
          console.log(this.numUser)
          console.log(this.revenue)
          console.log(this.numAppointment)
          this.loaded = true;
        }catch(err){
          console.log(err);
        }
      },
      
      
      refreshList() {
            
            // this.getAllUser();
            this.getAllMedicine();
            this.activeIndex = -1;
        },
    },
    async created() {
        await this.getInfor();
    },
};
</script>
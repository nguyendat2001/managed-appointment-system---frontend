<template>
<div class="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
    <!-- Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        
        <div class="col-12 col-xl-12 mt-3" >
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Nhập thông tin đơn thuốc</h6>
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
              abc
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
</div>
</template>
<script>
import PrescriptionService from "@/services/prescription.service";
import MedicineService from "@/services/medicine.service";
import UserService from "@/services/user.service";
import DoctorService from "@/services/doctor.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
export default {
    components: {
      PrescriptionService,
      MedicineService,
      VueHorizontal,
      DoctorService,
      UserService,
      FooterComponent,
    },
    data() {
        return {
          doctors: [],
          users: [],

          listMedicineName:[],
          listMedicineId:[],
          medicines: [],
          clickedMedicines:[],
          resultReser: false,
          selectedItem: [],
          Prescription:[],
          newPrescription:{},
          message:"",
          activeIndex: -1,
          searchText:'',
        };
    },
    
    watch: {
      'searchText' : function(v) {
            this.searchText = v.toLowerCase().trim();
        },
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        Prescriptiontrings() {
            return this. Prescription.map(( item) => {
                
                return [item.doctor.id,item.doctor.fullname,item.user.id,item.user.fullname,item.user.fullname,item.diagnostic,item.createAt].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filteredPrescription() {
            if (!this.searchText) return this. Prescription;
                return this. Prescription.filter((_doctor, index) =>
                this. Prescriptiontrings[index].includes(this.searchText)
            );
        },

        activedoctor() {
            if (this.activeIndex < 0) return null;
            return this.filteredPrescription[this.activeIndex];
        },

        filteredPrescriptionCount() {
            return this.filteredPrescription.length;
        },
    },
    methods: {
      async activePrescription(id){
        try{
          await PrescriptionService.active(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      async inactivePrescription(id){
        try{
          await PrescriptionService.inactive(id);
          this.refreshList();
          // alert("xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      getLimitedPassage(groupPassage){
          const MAX_PASSAGE_LENGTH = 30; // Set the maximum number of characters you want to display
          if (groupPassage.length > MAX_PASSAGE_LENGTH) {
              return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
          } else {
              return groupPassage;
          }
      },
      reFreshMedichine(){
        this.listMedicineName = []
        this.listMedicineId = []
      },
      addMedichine(item){
        this.listMedicineName.push(item.name)
        this.listMedicineId.push(item.id)
      },
      async deletePrescription(id){
        try{
          await PrescriptionService.delete(id);
          this.refreshList()
          alert("Xóa thông tin thành công")
        }catch(err){
          console.log(err)
        }
      },
      
      async submitPrescription(){
        try{
            this.newPrescription.medicines = this.listMedicineId
          console.log(this.newPrescription);
          if(this.newPrescription.id != null){
            const result = await PrescriptionService.update(this.newPrescription.id,this.newPrescription)
          }else{
            const result = await PrescriptionService.create(this.newPrescription)
          }
          
          this.newPrescription = {}
          this.listMedicineId = []
          this.resultReser=true
          this.getAllPresceiption();
          this.reFreshMedichine()
        }catch(err){
          console.log(err);
        }
      },
      async getAllPresceiption(){
        try{
          this.Prescription = await PrescriptionService.getAll();
          
        }catch(err){
          console.log(err)
        }
      },
      
      async getAllUser(){
        try{
          this.users = await UserService.getAllActive();
          // console.log(this.Prescription)
        }catch(err){
          console.log(err)
        }
      },
      async getAllDoctor() {
        try {
          // console.log("get disease");
          this.doctors = await DoctorService.getAllActive();
        } catch (err) {
          console.log(err);
        }
      },
      async getAllMedicine() {
        try {
          this.medicines = await MedicineService.getAllActive();
          
        } catch (err) {
          console.log(err);
        }
      },
      refreshList() {
            this.getAllDoctor()
            this.getAllMedicine()
            this.getAllUser();
            this.getAllPresceiption();
            this.activeIndex = -1;
        },
    },
    async created() {
        await this.refreshList();

    },
};
</script>
<style scoped>


</style>
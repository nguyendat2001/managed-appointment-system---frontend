<template>
    <Page_Title :title="this.department.name" :description="'Phòng ban'"/>
    <Department_single :department="this.department" :doctors="this.doctors"/>
</template>
<script>

import Page_Title from "../components/page-title.vue";
import Department_single from "../components/department-single.vue";
import DepartmentService from "@/services/department.service"  
import DoctorService from "@/services/doctor.service";
export default {
  components: {
    Page_Title,
    Department_single,
    DepartmentService,
    DoctorService,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      department:{},
      doctors:[],
    };
  },

  watch: {},
  computed: {},
  methods: {
    async getDepartment(){
        try{
          this.department = await DepartmentService.get(this.id);
        }catch(err){
          console.log(err)
        }
      },
    async getAllDoctor(){
        try{
          this.doctors = await DoctorService.getByDepartmentandisactive(this.id);
          console.log(this.doctors)
        }catch(err){
          console.log(err)
        }
      },
    },
    
  async created() {
    await this.getDepartment()
    await this.getAllDoctor()
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

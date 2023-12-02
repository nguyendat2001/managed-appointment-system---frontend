<template>
    <Page_Title :title="this.doctor.fullname" :description="'Chi tiết bác sĩ'"/>
    <Doctor_single v-if="this.loaded" :doctor="this.doctor" :certifications="this.certificates"/>

</template>
<script>
import DoctorService from "@/services/doctor.service"  
import Page_Title from "../components/page-title.vue";
import Doctor_single from "../components/doctor-single.vue";
import CertificateService from "@/services/certificate.service";

export default {
  components: {
    Page_Title,
    Doctor_single,
    DoctorService,
    CertificateService
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      doctor:{},
      certificates:[],
      loaded:false,
    };
  },

  watch: {},
  computed: {},
  methods: {
    async getAllCef(){
			try{
				this.certificates = await CertificateService.getAllByDoctor(this.id)
			}catch(err){
				console.log(err)
			}
		},
    async getDoctor(){
      try{
        this.doctor = await DoctorService.get(this.id);
        console.log(this.doctor)
      }catch(err){
        console.log(err)
      }
    }
  },
  async created() {
    this.loaded = false
    await this.getDoctor();
    await this.getAllCef();
    this.loaded = true
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
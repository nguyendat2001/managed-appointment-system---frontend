<template>
    <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body p-0">
                      <div class="card card-plain">
                        <div class="card-header pb-0 text-left">
                          <h3 class="font-weight-bolder text-info text-gradient">Thêm/Chỉnh sửa Bằng Cấp</h3>
                          <div v-if="this.resultDepart" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultDepart=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                          <p class="mb-0">Nhập thông tin về Bằng Cấp</p>
                        </div>
                        <div class="card-body">
                          <form role="form text-left" @submit.prevent="this.sendMessage()">
                            <label>Tên Bằng Cấp</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Bằng Cấp ####" aria-label="Toiec ..." aria-describedby="email-addon"
                               v-model="this.newCertificate.name">
                            </div>
                            <label>Đơn vị cấp</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Mô tả ..." aria-label="Đơn vị cấp" aria-describedby="password-addon"
                               v-model="this.newCertificate.certificationUnit">
                            </div>
                            <label>Ngày cấp</label>
                            <div class="input-group mb-3">
                              <input required type="date" class="form-control" placeholder="triệu chứng ..." aria-label="Ngày cấp" aria-describedby="email-addon" 
                              v-model="this.newCertificate.validFrom">
                            </div>

                            <label>File</label>
                            <div class="input-group mb-3">
                              <input required type="file" ref="file" class="form-control" placeholder="triệu chứng ..." aria-label="Ngày cấp" aria-describedby="email-addon" >
                            </div>
                            
                            <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Chọn tỉnh/thành phố</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.curentProvince">
                                        <option v-for="province in this.provinces" :key="province.id" :value="province.id">{{province.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Chọn quận/huyện</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.curentDistrict">
                                        <option v-for="district in this.districts" :key="district.id" :value="district.id">{{district.name}}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-6"> 
                                    <label>Chọn xã/phường</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.newCertificate.ward">
                                        <option v-for="ward in this.wards" :key="ward.id" :value="ward.id">{{ward.name}}</option>
                                      </select>
                                    </div>
                                  </div>
                            <div class="text-center">
                              <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">Submit</button>
                            </div>
                          </form>
                        </div>
                        <!-- <div class="card-footer text-center pt-0 px-lg-2 px-1">
                          <p class="mb-4 text-sm mx-auto">
                            Don't have an account?
                            <a href="javascript:;" class="text-info text-gradient font-weight-bold">Sign up</a>
                          </p>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
</template>
<script>

import CertificateService from "@/services/certificate.service";
import ProvinceService from "@/services/province.service";
import DistrictService from "@/services/district.service";
import WardService from "@/services/ward.service";
export default {
  components: {
    CertificateService,
    ProvinceService,
    DistrictService,
    WardService,
  },
  data() {
    return {
      wards:[],
      provinces:[],
      resultDepart:false,
      districts:[],
      curentProvince:null,
      curentDistrict:null,
      message: "",
      loaded: false,
      localCertificate:this.newCertificate,
    };
  },
  props: ['newCertificate','doctorId'],
  watch: {
    curentProvince: function (v) {
        this.getAllDistrict(v);
    },
    curentDistrict: function (v) {
        this.getAllWard(v);
    },
  },
  
  computed: {},
  methods: {
    async getAllprovince(){
        try {
            console.log("get province")
            this.provinces = await  ProvinceService.getAllActiveProvince();
            console.log(this.provinces)
        }catch(err){
            console.log(err)
        }
    },
    async getAllWard(id){
        try {
            this.wards = await WardService.getAllByDistrict(id);
        }catch(err){
            console.log(err)
        }
    },
    async getAllDistrict(id){
        try {
            this.districts = await DistrictService.getAllByProvince(id);
        }catch(err){
            console.log(err)
        }
    },
    sendMessage() {
      this.$emit('submit:c', this.localCertificate);
      // this.tempMessage = '';
    },


    refreshList() {
      this.getAllprovince();
      this.activeIndex = -1;
    },
  },
  async created() {
    await this.refreshList();
    this.message = "";
  },
};
</script>
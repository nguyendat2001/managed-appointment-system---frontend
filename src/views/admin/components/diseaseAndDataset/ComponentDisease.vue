<template>
    <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body p-0">
                      <div class="card card-plain">
                        <div class="card-header pb-0 text-left">
                          <h3 class="font-weight-bolder text-info text-gradient">Thêm/Chỉnh sửa Bệnh</h3>
                          <p class="mb-0">Nhập thông tin về bệnh</p>
                        </div>
                        <div class="card-body">
                          <form role="form text-left" @submit.prevent="this.sumitDisease()">
                            <label>Tên bệnh</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="bệnh ####" aria-label="Email" aria-describedby="email-addon"
                               v-model="this.newDisease.name">
                            </div>
                            <label>Mô tả</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Mô tả ..." aria-label="Password" aria-describedby="password-addon"
                               v-model="this.newDisease.description">
                            </div>
                            <label>Triệu chứng</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="triệu chứng ..." aria-label="Email" aria-describedby="email-addon" 
                              v-model="this.newDisease.symptom">
                            </div>
                            <label>Lý do mắc phải</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="lý do mắc phải ..." aria-label="Password" aria-describedby="password-addon" 
                              v-model="this.newDisease.reason">
                            </div>
                            <label>Điều trị</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Điều trị ..." aria-label="Email" aria-describedby="email-addon" 
                              v-model="this.newDisease.treaments">
                            </div>
                            <label>Ngăn chận</label>
                            <div class="input-group mb-3">
                              <input required type="text" class="form-control" placeholder="Ngăn chặn ..." aria-label="Password" aria-describedby="password-addon" 
                              v-model="this.newDisease.prevent">
                            </div>
                            <!-- <div class="form-check form-switch">
                              <input  class="form-check-input" type="checkbox" id="rememberMe" checked="">
                              <label class="form-check-label" for="rememberMe">Remember me</label>
                            </div> -->
                            <div class="text-center">
                              <button type="submit" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0" >Submit</button>
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
export default {
    components: {

    },
    props: ['newDisease'],
    data() {
        return {

        };
    },
    methods:{
        sumitDisease(){
            this.$emit("submit:newDisease", this.newDisease);
            // if(this.newDisease.id){
            //     this.$emit('addDisease', this.newDisease)
            // }else{
            //     this.$emit('upDateDisease', this.newDisease)
            // }
        }
    },
}
</script>

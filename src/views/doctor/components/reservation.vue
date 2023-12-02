<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            
            <div class="card mb-4">
              <h4>Phiếu đặt</h4>
              <div class="card-header pb-0  d-flex justify-content-between">
                
                  <div>
                  <div class="input-group">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                  </div>
                <button type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newReservation={}">Thêm mới</button>
                  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Phiếu đặt</h3>
                              <div v-if="this.resultReser" class="alert alert-success alert-dismissible fade show" role="alert">
                                  <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                  <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                                  <button type="button" class="btn-close" @click="this.resultReser=false">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <p class="mb-0">Nhập thông tin Phiếu Đặt mới</p>
                            </div>
                            <div class="card-body">
                              <form role="form text-left" @submit.prevent="createReservation">
                                <label>Người Đặt</label>
                                <div class="input-group mb-3">
                                  <select class="form-control form-control-sm" v-model="this.newReservation.user">
                                    <option v-for="user in this.users" :key="user.id" :value="user.id">{{user.fullname}}</option>
                                  </select>
                                </div>
                                <!-- <label>Giường</label> -->
                                <div class="input-group mb-3 row">
                                  <div class="col-6"> 
                                    <label>Chọn Phòng</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm  col-4"  v-model="this.selectedItem">
                                        <option v-for="item in this.beds" :key="item.id" :value="item.beds">{{item.room.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div class="col-6"> 
                                    <label>Chọn Giường</label>
                                    <div class="input-group mb-3">
                                      <select class="form-control form-control-sm col-4" v-model="this.newReservation.bed">
                                        <option v-for="bed in this.selectedItem" :key="bed.id" :value="bed.id">{{bed.name}}</option>
                                      </select>
                                    </div>
                                  </div>

                                </div>
                                <label>Ngày nhận Phòng</label>
                                <div class="input-group mb-3">
                                  <input required class="form-control" type="date" id="example-date-input" v-model="this.newReservation.checkInDate">
                                </div>
                                
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
                  </div>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-left mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Giường</th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phòng</th> -->
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ngày nhận</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ngày trả</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                        <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chỉnh sửa/Trả phòng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="reservation in this.filteredreservations"
                          :key="reservation.id">
                        <td>
                          <div class="d-flex px-2 py-1">
                            
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{reservation.user.fullname}}</h6>
                              <p class="text-xs text-secondary mb-0">id: {{reservation.user.id}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-left">
                              <h6 class="mb-0 text-sm">{{reservation.bed.name}}</h6>
                              <p class="text-xs text-secondary mb-0">room: {{reservation.bed.room.name}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold  mt-1 ">{{reservation.checkInDate}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td v-if="reservation.checkOutDate == null">
                          <p class="text-xs font-weight-bold mt-1 text-danger">Đang Sử dụng</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td v-else>
                          <p class="text-xs font-weight-bold mt-1">{{reservation.checkOutDate}}</p>
                          <!-- <p class="text-xs text-secondary mb-0">Organization</p> -->
                        </td>
                        <td v-if="reservation.isAccept==false">
                          <button type="button" v-if="reservation.bed.isAvailable==false" class="btn btn-default mt-1" disabled>Chờ duyệt...</button>
                          <button type="button" v-else class="btn btn-default mt-1" @click="this.acceptReservation(reservation.id)">Chờ duyệt...</button>
                          <!-- <p class="text-xs font-weight-bold">{{reservation.isAccept}}</p> -->
                        </td>
                        <td v-else>
                          <button type="button" class="btn btn-primary mt-1" disabled>đã duyệt</button>
                          <!-- <p class="text-xs font-weight-bold">{{reservation.isAccept}}</p> -->
                        </td>
                        <td>
                          <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <button v-if="reservation.isAccept" type="button" class="btn btn-outline-secondary"  data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newReservation=reservation" disabled> chỉnh sửa</button>
                            <button v-else type="button" class="btn btn-outline-secondary"  data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newReservation=reservation"> chỉnh sửa</button>
                            
                            <button v-if="reservation.isAccept" type="button" class="btn btn-outline-success" data-mdb-color="dark" @click="this.checkoutReservation(reservation)">trả phòng</button>
                            <button v-else type="button" class="btn btn-outline-success" data-mdb-color="dark" disabled>trả phòng</button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
</template>
<script>

import ReservationService from "@/services/reservation.service";
import UserService from "@/services/user.service";
import RoomService from "@/services/room.service";
import BedService from "@/services/bed.service";
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
export default {
    components: {
      ReservationService,
      UserService,
      VueHorizontal,
      RoomService,
      BedService,
      FooterComponent,
    },
    data() {
        return {
          rooms: [],
          beds: [],
          resultReser: false,
          selectedItem: [],
          users:[],
          reservations:[],
          newReservation:{},
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
        reservationstrings() {
            return this. reservations.map(( item) => {
                // const { address, degree, experience } =  item;
                return [item.checkInDate, item.checkOutDate,item.isAccept,item.bed.name,item.bed.name,item.bed.room.name,item.user.fullname].join("").toLowerCase();
            });
        },
        // Trả về các  doctor có chứa thông tin cần tìm kiếm.
        filteredreservations() {
            if (!this.searchText) return this. reservations;
                return this. reservations.filter((_doctor, index) =>
                this. reservationstrings[index].includes(this.searchText)
            );
        },

        activedoctor() {
            if (this.activeIndex < 0) return null;
            return this.filteredreservations[this.activeIndex];
        },

        filteredreservationsCount() {
            return this.filteredreservations.length;
        },
    },
    methods: {
      async checkoutReservation(reservation){
        try{
          // const date = new Date();
          // let day = date.getDate();
          // let month = date.get + 2;
          // let year = date.getFullYear();
          
          let currentDate =  new Date().toJSON().slice(0, 10);
          if(currentDate >= reservation.checkInDate){
            const data = { }
            data.bed= reservation.bed.id
            data.checkInDate=reservation.checkInDate
            data.checkOutDate=currentDate
            data.id=reservation.id
            // data.isAccept = reservation.isAccept
            data.user= reservation.user.id
            console.log(data)
            const result = await ReservationService.update(data.id,data)
            this.getAllReservation();
          }
          else{
            console.log(currentDate)
          }
        }catch(err){
          console.log(err);
        }
      },
      async createReservation(){
        try{
          console.log(this.newReservation);
          if(this.newReservation.id != null){
            const result = await ReservationService.update(this.newReservation.id,this.newReservation)
          }else{
            const result = await ReservationService.create(this.newReservation)
          }
          
          this.newReservation = {}
          this.resultReser=true
          this.getAllReservation();
        }catch(err){
          console.log(err);
        }
      },
      async getAllReservation(){
        try{
          this.reservations = await ReservationService.getAll();
          console.log(this.reservations)
        }catch(err){
          console.log(err)
        }
      },
      async acceptReservation(id){
        try{
          await ReservationService.acceptReservation(id);
          this.getAllReservation();
        }catch(err){
          console.log(err)
        }
      },
      async getAllUser(){
        try{
          this.users = await UserService.getAll();
          // console.log(this.reservations)
        }catch(err){
          console.log(err)
        }
      },
      async getAllRoom() {
        try {
          // console.log("get disease");
          this.rooms = await RoomService.getAll();
        } catch (err) {
          console.log(err);
        }
      },
      async getAllBed() {
        try {
          // console.log("get beds");
          // const result = await BedService.getAll();
          this.beds = []
          for(let i = 0; i < this.rooms.length; i++){
              // console.log(i)
              const result = await BedService.getByRoom(this.rooms[i].id);
              this.beds.push({"room":this.rooms[i],"beds":result});
          }
          // console.log( this.beds)
        } catch (err) {
          console.log(err);
        }
      },
      refreshList() {
            
            this.getAllUser();
            this.getAllReservation();
            this.activeIndex = -1;
        },
    },
    async created() {

        await this.refreshList();
        await this.getAllRoom();
        await this.getAllBed();
    },
};
</script>
<style scoped>


</style>
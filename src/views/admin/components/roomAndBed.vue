<template>
  <div class="container-fluid py-4">
    <div class="card-header pb-0 mb-3  d-flex justify-content-between">
      <h6>Quản Lý Phòng Bệnh</h6>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newRoom={}">Thêm phòng mới</button>
      <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
            <div class="modal-body p-0">
                <div class="card card-plain">
                <div class="card-header pb-0 text-left">
                    <h3 class="font-weight-bolder text-info text-gradient">Thêm/Cập Nhật Phòng</h3>
                    <div v-if="this.resultRoom" class="alert alert-success alert-dismissible fade show" role="alert">
                        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                        <span class="alert-text"><strong>Thành Công!</strong>Thông Tin đã được xử lý!</span>
                        <button type="button" class="btn-close" @click="this.resultRoom=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <p class="mb-0">Nhập thông tin Phòng mới</p>
                </div>
                <div class="card-body">
                    <form role="form text-left" @submit.prevent="summitRoom">
                    <label>Tên/Mã Phòng</label>
                    <div class="input-group mb-3">
                        <input required type="text" class="form-control" placeholder="axs123" aria-label="Email" aria-describedby="email-addon" v-model="this.newRoom.name" >
                    </div>
                    <label>sức chứa</label>
                    <div class="input-group mb-3">
                        <input required  type="number" class="form-control" placeholder="20xxx" aria-label="Email" aria-describedby="email-addon" v-model="this.newRoom.capacity">
                    </div>
                    <label>phòng dịch vụ</label>
                    <div class="form-check form-switch ps-0">
                        <!-- <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault">Email me when someone follows me</label> -->
                        <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault" checked v-model="this.newRoom.isPresidentRoom" value=true>
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
        </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <!-- <h6>Phòng: </h6> -->
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="row">
              <div class="col-12 col-xl-4 mb-3" v-for="item in this.beds" :key="item.id">
                <div class="card h-100" >
                  <div class="card-body">
                    <div class="row justify-content-left">
                        <div class="d-flex justify-content-between">
                          <h4>Phòng: {{item.room.name}}</h4>
                          <div class="btn-group shadow-0" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"  data-bs-toggle="modal" data-bs-target="#modal-form" @click="this.newRoom=item.room"> <i class="fa fa-pencil-alt text-dark"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-mdb-color="dark"  @click="deleteRoom(item.room.id)"><i class="far fa-trash-alt" ></i></button>
                          </div>
                        </div>
                        <h5>Sức Chứa: {{item.room.capacity}}</h5>
                        <h5 v-if="item.room.isPresidentRoom">Phòng Dịch Vụ: Có</h5>
                        <h5 v-else>Phòng Dịch Vụ: Không</h5>
                        <h6>chú thích: <span class="badge badge-pill bg-gradient-primary  room-text">đã đặt</span>   <span class=" room-text badge badge-pill bg-gradient-secondary">Còn trống</span></h6>
                    </div>
                    <!-- <hr class="horizontal gray-light my-4" /> -->
                    <div class="row justify-content-left">
                        <div  v-for="bed in item.beds" :key="bed.id" class="col-3 p-1">
                            <span v-if="!bed.isAvailable" class="badge badge-pill bg-gradient-primary room-text">{{bed.name}}</span>
                            <span v-else class="badge badge-pill bg-gradient-secondary room-text">{{bed.name}}</span>
                        </div>
                        <!-- <div class="col-3 p-1" v-for="bed in this.beds" :key="bed.id" >
                            <div v-if="bed.room.id==room.id">
                                <span class="badge badge-pill bg-gradient-secondary room-text">Primary</span>
                            </div>
                        </div> -->
                        <!-- <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-secondary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-secondary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-primary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-primary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-secondary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-secondary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-primary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-secondary room-text">Primary</span></div>
                        <div class="col-3 p-1"><span class="badge badge-pill bg-gradient-primary room-text">Primary</span></div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent/>
  </div>
</template>
<script>
import RoomService from "@/services/room.service";
import BedService from "@/services/bed.service";
import FooterComponent from "./footer.vue";
export default {
  components: {
    RoomService,
    BedService,
    FooterComponent,
  },
  data() {
    return {
      //   newDataset:{},
      newRoom: {},
      rooms: [],
      beds: [],
      resultRoom: false,
      //   message: "",
      activeIndex: -1,
      searchText: "",
    };
  },

  watch: {
  },
  computed: {
        // mapBed(){
        //     const result = Object.groupBy(this.beds.map(function(item) {
        //         return item.roomId = item.room.id;
        //     }), ({ roomId }) => roomId);
        //     return result;
        // },
  },
  methods: {
    // clickOnDataset(id){
    //   // console.log("on click");
    //   this.diseases = this.datasets[id-1].diseases;
    //   // console.log(this.diseases)
    // },
    async summitRoom(){
        try{
            // console.log(this.newRoom)
            if(this.newRoom.id == null){
              this.result = await RoomService.create(this.newRoom);
              this.resultRoom = true
            }else{
              console.log("update");
              console.log(this.newRoom)
              this.result = await RoomService.update(this.newRoom.id,this.newRoom);
              // console.log(this.newRoom)
              this.resultRoom = true
            }
            this.newRoom = {}
            this.refreshList()
            
        }catch(err){
            console.log(err)
        }
    },
    async deleteRoom(id) {
      try {
        await RoomService.delete(id);
        // confirm("Xác nhận xóa Phòng!");
        this.newRoom = {}
        this.refreshList()
      } catch (err) {
        console.log(err);
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
        console.log("get beds");
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
      this.getAllRoom();
      this.getAllBed();
      this.activeIndex = -1;
    },
  },
  async created() {
    await this.getAllRoom();
    await this.getAllBed();
  },
  // async mounted() {
  //   await this.refreshList();
  // },
};
</script>
<style scoped>
.room-text{
     font-size: 10px;
}
</style>

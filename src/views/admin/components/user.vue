<template>
    <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0  d-flex justify-content-between">
                <div class="m-1 row">

                    <h4 class="col-6">bệnh nhân</h4>
                    
                    <div class="input-group col-6">
                        <span class="input-group-text text-body"><i class="	fa fa-search" style="color:black;" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here..." v-model="this.searchText">
                    </div>
                </div>
                
                <!-- <button type="button" class="btn btn-primary">Add new</button> -->
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tài khoản bệnh nhân</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Họ tên</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">SĐT</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Địa chỉ</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày Sinh</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Kích hoạt</th>
                        <!-- <th class="text-secondary opacity-7"></th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="User in this.filteredUsers"
                          :key="User._id">
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{User.account[0].username}}</h6>
                              <p class="text-xs text-secondary mb-0">{{User.account[0].email}}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{User.fullname}}</h6>
                              <p v-if="User.gender" class="text-xs text-secondary mb-0">nam</p>
                              <p v-else class="text-xs text-secondary mb-0">nữ</p>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-secondary text-xs font-weight-bold">{{User.phone}}</span>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-secondary text-xs font-weight-bold">{{User.address}}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{User.birthday}}</span>
                        </td>
                        <td class="align-middle text-center">
                          <button v-if="!User.active" type="button" class="btn btn-outline-secondary" @click="active(User.id)">InActive</button>
                          <button v-else type="button" class="btn btn-outline-success" @click="inactive(User.id)">Active</button>
                        </td>
                        <!-- <td class="align-middle">
                          <div class="btn-group shadow-0 mt-2" role="group" aria-label="Basic example">
                            <router-link
                              :to="{
                                  name: 'User/Detail',
                                  params: { id: User.id },
                              }"
                              ><button type="button" class="btn btn-outline-secondary" data-mdb-color="dark"><i class="fa fa-user fa-sm" style="font-size:14px;"></i></button>
                            </router-link>
                          </div>
                        </td> -->
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

import UserService from "@/services/User.service";
import DepartmentService from "@/services/department.service"  
import VueHorizontal from "vue-horizontal";
import FooterComponent from "./footer.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    components: {
      UserService,
      DepartmentService,
      VueHorizontal,
      FooterComponent,
    },
    data() {
        return {
          resultDepart: false,
          Users:[],
          departments: [],
          newDepartment:{},
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
        
        UserStrings() {
            return this.Users.map(( User) => {
                const { id,fullname, birthday, address, gender } =  User;
                return [id,fullname, birthday, address, gender,User.account[0].email,User.account[0].username].join("").toLowerCase();
            });
        },
        // Trả về các  User có chứa thông tin cần tìm kiếm.
        filteredUsers() {
            if (!this.searchText) return this. Users;
                return this.Users.filter((_User, index) =>
                this. UserStrings[index].includes(this.searchText)
            );
        },

        activeUser() {
            if (this.activeIndex < 0) return null;
            return this.filteredUsers[this.activeIndex];
        },

        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
      async active(id){
        try{
          await UserService.active(id);
          this.refreshList()
          toast.success("kích hoạt thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async inactive(id){
        try{
          await UserService.inactive(id);
          this.refreshList()
          toast.success("ngưng thông tin thành công", {
                    autoClose: 1000
                });
        }catch(err){
          console.log(err)
        }
      },
      async getAllUser(){
        try{
          this.Users = await UserService.getAll();
        }catch(err){
          console.log(err)
        }
      },
      async deleteUser(id){
        try{
          await UserService.delete(id);
          getAllUser();
        }catch(err){
          console.log(err)
        }
      },
      refreshList() {
            this.getAllUser();
            this.getAllDepartment();
            this.activeIndex = -1;
        },
    },
    async created(){
      await this.refreshList();
    }
};
</script>
<style scoped>


</style>
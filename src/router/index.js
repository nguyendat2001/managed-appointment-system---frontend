import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios";
import { useUserStore } from "@/stores/user";
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/admin/signup",
            name: "admin.signup",
            component: () =>
                import ("@/views/Admin/signup.vue"),
        },
        {
            path: "/admin/signin",
            name: "admin.signin",
            component: () =>
                import ("@/views/Admin/signin.vue"),
        },
        {
            path: "/admin",
            // name: "DashBoard",
            component: () =>
                import ("@/views/Admin/admin.vue"),
            children: [{
                    path: "/admin/",
                    name: "admin.Dashboard",
                    component: () =>
                        import ("@/views/Admin/components/dashBoard.vue"),
                },
                {
                    path: "/admin/doctor",
                    name: "admin.Doctor",
                    component: () =>
                        import ("@/views/Admin/components/doctor.vue"),
                },
                {
                    path: "/admin/disease",
                    name: "admin.Disease",
                    component: () =>
                        import ("@/views/Admin/components/disease.vue"),
                },
                {
                    path: "/admin/model",
                    name: "admin.Model",
                    component: () =>
                        import ("@/views/Admin/components/model.vue"),
                },
                {
                    path: "/admin/calculationAndHyperparam",
                    name: "admin.Calculation",
                    component: () =>
                        import ("@/views/Admin/components/calculationAndHyperparam.vue"),
                },
                {
                    path: "/admin/prescription",
                    name: "admin.Prescription",
                    component: () =>
                        import ("@/views/Admin/components/prescription.vue"),
                },
                {
                    path: "/admin/Medicine",
                    name: "admin.Medicine",
                    component: () =>
                        import ("@/views/Admin/components/medicine.vue"),
                },
                {
                    path: "/admin/dataset",
                    name: "admin.Dataset",
                    component: () =>
                        import ("@/views/Admin/components/dataset.vue"),
                },
                {
                    path: "/admin/disease/adddataset",
                    name: "admin.Disease.AddDataset",
                    component: () =>
                        import ("@/views/Admin/components/diseaseAndDataset/ComponentAddDataset.vue"),
                },
                {
                    path: "/admin/disease/updatedataset/:id",
                    name: "admin.Disease.UpdateDataset",
                    component: () =>
                        import ("@/views/Admin/components/diseaseAndDataset/ComponentUpdateDataset.vue"),
                    props: true
                },

                {
                    path: "/admin/model/:id",
                    name: "admin.Model.Detail",
                    component: () =>
                        import ("@/views/Admin/components/model/ComponentModel.vue"),
                    props: true
                },
                {
                    path: "/admin/room",
                    name: "admin.Room",
                    component: () =>
                        import ("@/views/Admin/components/roomAndBed.vue"),
                },
                {
                    path: "/admin/appointment",
                    name: "admin.appointnment",
                    component: () =>
                        import ("@/views/Admin/components/appointment.vue"),
                },
                {
                    path: "/admin/user",
                    name: "admin.User",
                    component: () =>
                        import ("@/views/Admin/components/user.vue"),
                },
                {
                    path: "/admin/diagnoses",
                    name: "admin.Diagnoses",
                    component: () =>
                        import ("@/views/Admin/components/diagnoses.vue"),
                },
                // {
                //     path: "/admin/wizard",
                //     name: "wizard",
                //     component: () =>
                //         import ("@/views/Admin/components/wizard.vue"),
                // },
                {
                    path: "/admin/reservation",
                    name: "admin.Reservation",
                    component: () =>
                        import ("@/views/Admin/components/reservation.vue"),
                },
                {
                    path: "/admin/doctor/:id",
                    name: "admin.Doctor/Detail",
                    component: () =>
                        import ("@/views/Admin/components/profile.vue"),
                    props: true
                },
                {
                    path: "/admin/doctor/addnew",
                    name: "admin.Doctor  /  AddDoctor",
                    component: () =>
                        import ("@/views/Admin/components/createDoctor.vue"),
                },
                {
                    path: "/admin/doctor/addnew/success",
                    name: "admin.Doctor  /  AddDoctor  /  success",
                    component: () =>
                        import ("@/views/Admin/components/createDoctorSuccess.vue"),
                },
                {
                    path: "/admin/createprescription",
                    name: "admin.createprescription",
                    component: () =>
                        import ("@/views/Admin/components/createPrescription.vue"),
                },
                {
                    path: "/admin/updatedoctor/:id",
                    name: "admin.updatedoctor",
                    component: () =>
                        import ("@/views/Admin/components/updateDoctor.vue"),
                    props: true
                },


            ],
        },

        {
            path: "/doctor/signin",
            name: "doctor.signin",
            component: () =>
                import ("@/views/doctor/signin.vue"),
        },
        {
            path: "/doctor",
            // name: "DashBoard",
            component: () =>
                import ("@/views/doctor/doctor.vue"),
            children: [{
                    path: "/doctor/",
                    name: "doctor.home",
                    component: () =>
                        import ("@/views/doctor/components/home.vue")
                }, {
                    path: "/doctor/disease",
                    name: "doctor.Disease",
                    component: () =>
                        import ("@/views/doctor/components/disease.vue"),
                },
                {
                    path: "/doctor/model",
                    name: "doctor.Model",
                    component: () =>
                        import ("@/views/doctor/components/model.vue"),
                },

                {
                    path: "/doctor/prescription",
                    name: "doctor.Prescription",
                    component: () =>
                        import ("@/views/doctor/components/prescription.vue"),
                },
                {
                    path: "/doctor/Medicine",
                    name: "doctor.Medicine",
                    component: () =>
                        import ("@/views/doctor/components/medicine.vue"),
                },
                {
                    path: "/doctor/model/:id",
                    name: "doctor.Model.Detail",
                    component: () =>
                        import ("@/views/doctor/components/model/ComponentModel.vue"),
                    props: true
                },
                {
                    path: "/doctor/Room",
                    name: "doctor.Room",
                    component: () =>
                        import ("@/views/doctor/components/roomAndBed.vue"),
                },
                {
                    path: "/doctor/user",
                    name: "doctor.User",
                    component: () =>
                        import ("@/views/doctor/components/user.vue"),
                },
                {
                    path: "/doctor/diagnoses",
                    name: "doctor.Diagnoses",
                    component: () =>
                        import ("@/views/doctor/components/diagnoses.vue"),
                },
                {
                    path: "/doctor/reservation",
                    name: "doctor.Reservation",
                    component: () =>
                        import ("@/views/doctor/components/reservation.vue"),
                },
            ],
        },
        {
            path: "/user",
            // name: "DashBoard",
            component: () =>
                import ("@/views/user/main.vue"),
            children: [{
                    path: "/user/",
                    name: "user.home",
                    component: () =>
                        import ("@/views/user/pages/home.vue")
                }, {
                    path: "/user/about",
                    name: "user.about",
                    component: () =>
                        import ("@/views/user/pages/about.vue")
                }, {
                    path: "/user/appointment",
                    name: "user.appointment",
                    component: () =>
                        import ("@/views/user/pages/appointment.vue")
                }, {
                    path: "/user/department",
                    name: "user.department",
                    component: () =>
                        import ("@/views/user/pages/department.vue")
                }, {
                    path: "/user/service",
                    name: "user.service",
                    component: () =>
                        import ("@/views/user/pages/service.vue")
                },
                {
                    path: "/user/confirmation",
                    name: "user.confirmation",
                    component: () =>
                        import ("@/views/user/pages/confirmation.vue")
                }, {
                    path: "/user/doctor",
                    name: "user.doctor",
                    component: () =>
                        import ("@/views/user/pages/doctor.vue")
                }, {
                    path: "/user/department/:id",
                    name: "user.department.detail",
                    component: () =>
                        import ("@/views/user/pages/departmentDetail.vue"),
                    props: true
                }, {
                    path: "/user/doctor/:id",
                    name: "user.doctor.detail",
                    component: () =>
                        import ("@/views/user/pages/doctorDetail.vue"),
                    props: true
                }, {
                    path: "/user/profile",
                    name: "user.profile",
                    component: () =>
                        import ("@/views/user/pages/account.vue")
                }, {
                    path: "/user/prescription",
                    name: "user.prescription",
                    component: () =>
                        import ("@/views/user/pages/prescriptions.vue")
                },
                {
                    path: "/user/diagnoses",
                    name: "user.diagnoses",
                    component: () =>
                        import ("@/views/user/pages/diagnoses.vue")
                },
                {
                    path: "/user/predict",
                    name: "user.predict",
                    component: () =>
                        import ("@/views/user/pages/MLPredict.vue")
                },
                {
                    path: "/user/classification",
                    name: "user.classification",
                    component: () =>
                        import ("@/views/user/pages/listClassification.vue")
                },
                {
                    path: "/user/classification/:id",
                    name: "user.classification.predict",
                    component: () =>
                        import ("@/views/user/pages/classification.vue"),
                    props: true
                },
                {
                    path: "/user/segmentation",
                    name: "user.segmentation",
                    component: () =>
                        import ("@/views/user/pages/listSegmentation.vue")
                },
                {
                    path: "/user/segmentation/:id",
                    name: "user.segmentation.predict",
                    component: () =>
                        import ("@/views/user/pages/segmentation.vue"),
                    props: true
                },
                {
                    path: "/user/disease",
                    name: "user.disease",
                    component: () =>
                        import ("@/views/user/pages/disease.vue")
                },
                {
                    path: "/user/medicine",
                    name: "user.medicine",
                    component: () =>
                        import ("@/views/user/pages/disease.vue")
                },
            ],
        },
        {
            path: "/user/signin",
            name: "user.signin",
            component: () =>
                import ("@/views/user/signin.vue"),
        },
        {
            path: "/user/signup",
            name: "user.signup",
            component: () =>
                import ("@/views/user/signup.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notfound",
            component: () =>
                import ("@/views/Admin/Error404.vue"),
        },
    ],
    linkActiveClass: "active"
})

// router.beforeEach((to, from, next) => {
//     // const userStore = userAccStore();
//     const value = localStorage.user;
//     if (!value && to.name != "admin.signup" && to.name != "admin.signin") {
//         next({
//             path: "/admin/signin",
//             replace: true,
//         });
//     }
//     next();
// });

export default router
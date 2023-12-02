import { defineStore } from 'pinia'
import createApiClient from "@/services/api.service";

import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";

export const useUserStore = defineStore(
    "user", {
        state: () => ({
            user: {},
        }),

        actions: {
            async signUp(data) {
                const res = await AuthService.signup(data);
                console.log(res.json())
                    // this.user = user;
            },
            async refreshtoken() {
                const res = await AuthService.refreshtoken(localStorage.user.refreshToken);
                console.log(res.json())
                this.user.accessToken = res.accessToken;
                this.user.refreshToken = res.refreshToken;
                localStorage.user.refreshToken = res.refreshToken;
                localStorage.user.accessToken = res.accessToken;
                // await localStorage.setItem("user.refreshToken", res.refreshToken);
                // await localStorage.setItem("user.accessToken", res.accessToken);
            },
            async signout() {
                // const res = await AuthService.signout(localStorage.getItem("user").id);
                // console.log(res.json())
                this.user = {};
                await localStorage.removeItem('user');
                await localStorage.removeItem('patient');
                // this.$router.push({
                //     name: "admin.signin",
                // });
            },
            async signIn(username, password) {
                try {
                    const res = await AuthService.signin({ username, password });
                    this.user = await res;
                    await localStorage.setItem("user", JSON.stringify(res));
                    const resDoc = await UserService.getByAccount(this.user.id);
                    // console.log(JSON.stringify(resDoc[0]))
                    await localStorage.setItem("patient", JSON.stringify(resDoc[0]));
                } catch (err) {
                    return err;
                }

                // console.log("login info!!");
                // console.log(res);
                // this.$router.push({
                //     name: "Dashboard",
                // });
            },
        },
    });
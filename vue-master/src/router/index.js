import Vue from "vue";
import Router from "vue-router";
import User from "@/components/User";
import Admin from "@/components/Admin";
import UserList from "@/components/UserList";
import AdminSetting from "@/components/Admin-Setting";
import UserSetting from "@/components/User-Setting";
import Login from "@/components/Login";
import AddUser from "@/components/AddUser";
import ResetPassword from "@/components/ResetPassword";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/addUser",
      name: "addUser",
      component: AddUser,
    },
    {
      path: "/user",
      name: "User",
      component: User,
    },
    {
      path: "/setting",
      name: "Admin-Setting",
      component: AdminSetting,
    },
    {
      path: "/user-setting",
      name: "User-Setting",
      component: UserSetting,
    },
    {
      path: "/user-list",
      name: "UserList",
      component: UserList,
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
    },

    {
      path: "/reset",
      component: ResetPassword,
    },
  ],
});

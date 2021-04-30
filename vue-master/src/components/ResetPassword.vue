<template>
  <div>
    <app-header v-if="user && user.local && user.local.username === 'admin'" title="Password"></app-header>
    <user-header v-else title="Change Password for User"></user-header>

    <div class="main-div">
      <form class="form">
        <div class="validate-input" data-validate="Password is required" v-if="user && user.local && user.local.username !== 'admin'">
          <label>Old Password</label>
          <input
            class="input100"
            type="password"
            v-model="data.oldpassword"
            required
          />
          <span class="focus-input100"></span>
        </div>
        <div
          class="validate-input"
          data-validate="Valid username is required: ex@abc.xyz"
        >
          <label>New Password</label>
          <input
            class="input100"
            type="password"
            v-model="data.password"
            required
          />
          <span class="focus-input100"></span>
        </div>

        <div class="form-btn">
          <button
            class="login100-form-btn"
            @click.prevent="loginUser"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="Loading..."
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AdminHeader from "../AdminHeader";
import Header from "../User-Header";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      data: {},
      fullscreenLoading: false,
    };
  },
  components: {
    appHeader: AdminHeader,
    userHeader: Header,
  },
  computed: {
    ...mapGetters(["user", "url"]),
  },
  methods: {
    ...mapActions({
      setUserData: "setUser",
    }),
    loginUser() {
      if(this.data.password === '' || this.data.password === undefined){
        this.$message({
          message: "Password is required!",
          type: "error",
        });
      } else if((this.user.local.username !== 'admin') && (this.data.oldpassword === '' || this.data.oldpassword === undefined)) {
        this.$message({
          message: "Old Password is required!",
          type: "error",
        })
      } else {
        let formData = {
          password: this.data.password,
        };
        axios.put(this.url + "/password/"+this.user._id+'/', formData).then((response) => {
          this.data.password = '';
          this.data.oldpassword = '';
          this.$message({
            message: "Password changes successfully!",
            type: "success",
          });
        });
      }
    },
    //Session checking Function
    isLoged() {
      let uri = "http://localhost:5050/restaurant/get-list/";
      axios.get(uri).then((response) => {
        this.items = response.data;
        console.log(response.data);
      });
      axios
        .get(this.url + "/user", { withCredentials: true })
        .then((response) => {
          if (response.data.local) {
            this.setUserData(response.data);
          } else {
            this.$router.push({ name: "Login" });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.isLoged();
  },
};
</script>


<style lang="scss" >
.validate-input {
  display: flex;
}
.email {
  margin-left: 3rem !important;
}
.main-div {
  .form {
    width: 30%;
    align-items: center;
    position: absolute;
    left: 32%;
    top: 20%;
    padding: 5rem;
  }
  .input100 {
    border: 3px solid black;
    margin: 1rem;
  }
}
label {
  position: relative;
  left: -4rem;
  font-weight: bold;
  color: black;
  margin: 4px;
}
.login100-form-btn {
  border: 2px solid black;
  box-shadow: 5px 5px;
  background-color: white;
  margin-left: 10rem;
}
</style>

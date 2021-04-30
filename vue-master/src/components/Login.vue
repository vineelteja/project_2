<template>
  <div class="main-div">
    <form class="form">
      <div
        class="validate-input"
        data-validate="Valid username is required: ex@abc.xyz"
      >
        <label>UserName</label>
        <input class="input100" type="username" v-model="username" required />
        <span class="focus-input100"></span>
      </div>

      <div class="validate-input" data-validate="Password is required">
        <label>Password</label>
        <input class="input100" type="password" v-model="password" required />
        <span class="focus-input100"></span>
      </div>

      <div class="form-btn">
        <button
          class="login100-form-btn"
          @click.prevent="loginUser"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="Loading..."
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      resetToken: {
        findUser: "",
      },
      fullscreenLoading: false,
      loading: true,
      errorMsg: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      successMsg: "",
    };
  },
  computed: {
    ...mapGetters(["url", "baseUrl"]),
  },
  methods: {
    ...mapActions({
      setUserData: "setUser",
    }),
    loginUser() {
      this.fullscreenLoading = true;
      axios
        .post(this.url + "/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // JSON responses are automatically parsed.
          localStorage.setItem("id", response.data._id);
          if (response.data.local) {
            this.$message({
              message: "Login Successful...",
              type: "success",
            });
            this.setUserData(response.data.local);
            this.fullscreenLoading = false;
            if (response.data.local.role !== "admin") {
              this.$router.push({ name: "User" });
            } else {
              this.$router.push({ name: "Admin" });
            }
          } else {
            this.fullscreenLoading = false;
            this.errorMsg = response.data;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    isLoged() {
      axios
        .get(this.url + "/user", { withCredentials: true })
        .then((response) => {
          this.loading = false;
          if (response.data.local) {
            this.setUserData(response.data);
            if (response.data.local.role !== "admin") {
              this.$router.push({ name: "User" });
            } else {
              this.$router.push({ name: "Admin" });
            }
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
.main-div {
  .form {
    border: 5px solid black;
    width: 30%;
    align-items: center;
    position: absolute;
    left: 35%;
    top: 25%;
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
}
</style>

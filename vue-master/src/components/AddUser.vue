<template>
  <div>
    <app-header title="Add User"></app-header>
    <div class="main-div">
      <form class="form">
        <div
          class="validate-input"
          data-validate="Valid username is required: ex@abc.xyz"
        >
          <label>UserName</label>
          <input
            class="input100"
            type="username"
            v-model="data.username"
            required
          />
          <span class="focus-input100"></span>
        </div>

        <div class="validate-input" data-validate="Password is required">
          <label>Password</label>
          <input
            class="input100"
            type="password"
            v-model="data.password"
            required
          />
          <span class="focus-input100"></span>
        </div>
        <div class="validate-input" data-validate="Password is required">
          <label>Email</label>
          <input
            class="input100 email"
            type="email"
            v-model="data.email"
            required
          />
          <span class="focus-input100"></span>
        </div>

        <div class="form-btn">
          <button
            class="login100-form-btn"
            @click.prevent="loginUser"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AdminHeader from "../AdminHeader";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'AddUser',
  data() {
    return {
      data: {
        username: '',
        email: '',
        password: ''
      },
    };
  },
  components: {
    appHeader: AdminHeader,
  },
  computed: {
    ...mapGetters(["user", "url"]),
  },
  methods: {
    ...mapActions({
      setUserData: "setUser",
    }),
    loginUser() {
      if(this.data.username === '' || this.data.email === '' || this.data.password === '') {
        this.$message({
          message: "Something is missing!",
          type: "error",
        });
      } else {
        let formData = {
          username: this.data.username,
          email: this.data.email,
          role: "user",
          password: this.data.password,
        };
        axios.post(this.url + "/signup", formData).then((response) => {
          window.location.href="/user-list"
          this.$message({
            message: "User added successfully!",
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
  font-weight: bold;
  color: black;
  margin-bottom: 4px;
  position: relative;
  top: 1.2rem;
}
.login100-form-btn {
  border: 2px solid black;
  box-shadow: 5px 5px;
  background-color: white;
  margin-left: 10rem;
}
</style>

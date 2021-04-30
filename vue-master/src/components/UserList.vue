<template>
  <div>
    <app-header title="List Users"></app-header>
    <div class="main-div" v-for="item in items" :key="item._id">
      <div class="content" v-if="item.local.role !== admin">
        <span class="name">{{ item.local.username }}</span>
        <span
          class="edit"
          @click="getId(item._id)"
          data-toggle="modal"
          data-target="#myModal"
        >
          <u class="pointer">Edit Password</u></span
        >
        <span class="delete" @click="Userdelete(item._id)"
          ><u class="pointer"> Delete User</u></span
        >
      </div>
    </div>

    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Change User password</h4>
          </div>
          <form @submit.prevent="updatePassword">
            <div class="form-group">
              <label>New Password:</label>
              <input
                type="text"
                class="form-control"
                v-model="password.text"
                required
              />
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-primary" value="Change" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import AdminHeader from "../AdminHeader";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      admin: "admin",
      items: {},
      password: {},
      id: "",
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
    updatePassword() {
      let uri = "http://localhost:5050/password/" + this.id + "/";
      axios.put(uri, { password: this.password.text }).then((response) => {
        console.log(response.data);
      });
    },
    Userdelete(id) {
      let uri = "http://localhost:5050/delete/" + id + "/";
      axios.delete(uri).then((response) => {
        window.location.reload();
      });
    },
    getId(id) {
      this.id = id;
    },
    //Session checking Function
    isLoged() {
      let uri = "http://localhost:5050/get-list/";
      axios.get(uri).then((response) => {
        this.items = response.data;
        console.log(response.data);
      });
      axios
        .get(this.url + "/user", { withCredentials: true })
        .then((response) => {
          if (response.data.local.role === "admin") {
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

<style lang="scss">
.main-div {
  margin-left: 15.5rem;
  margin-top: 3rem;
  text-align: left;
  .content {
    margin-bottom: 1rem;

    .name {
      margin-right: 1rem;
      color: black;
      font-weight: bold;
    }
    .edit {
      margin-right: 1rem;
      color: blue;
      font-weight: bold;
    }
    .delete {
      color: blue;
      font-weight: bold;
    }
  }
}
.modal-content {
  padding: 20px;
}
.pointer {
  cursor: pointer;
}
</style>

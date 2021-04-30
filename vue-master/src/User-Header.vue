<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container text-dark">
        <ul class="navbar-nav main-tab">
          <li v-if="menu && menu.option1 !== null" class="nav-item text-dark">
            <a
              class="nav-link opt"
              href="#"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ menu.option1 }}</a
            >
          </li>
          <li v-if="menu && menu.option2 !== null" class="nav-item text-dark">
            <a class="nav-link opt" href="#">{{ menu.option2 }}</a>
          </li>
          <li v-if="menu && menu.option3 !== null" class="nav-item text-dark">
            <a class="nav-link opt" href="#">{{ menu.option3 }}</a>
          </li>
          <li v-if="menu && menu.option4 !== null" class="nav-item text-dark">
            <a class="nav-link opt" href="#">{{ menu.option4 }}</a>
          </li>
          <li v-if="menu && menu.option5 !== null" class="nav-item text-dark">
            <a class="nav-link opt" href="#">{{ menu.option5 }}</a>
          </li>
          <li
            data-toggle="modal"
            data-target="#myModal"
            v-if="menu.option5 === null"
            class="add-opt"
          >
            +
          </li>
        </ul>

        <ul class="navbar-nav float-right">
          <li class="nav-item text-primary">
            <a
              class="nav-link"
              href="#"
              aria-haspopup="true"
              aria-expanded="false"
              ><u v-if="user && user.local && user.local.username">{{ user.local.username }}</u></a
            >
          </li>
          <li class="nav-item text-primary">
            <a class="nav-link" href="/user-setting"><u>Settings</u></a>
          </li>
          <li class="nav-item text-primary">
            <a class="nav-link" href="#" @click="logOut"><u>Logout</u></a>
          </li>
        </ul>
      </div>
    </nav>

    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Add Menu Option</h4>
          </div>
          <form @submit.prevent="addOption">
            <div class="form-group">
              <label>Menu Option Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="option.name"
                required
              />
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-primary" value="Add" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      option: {},
      menu: {
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null
      },
    };
  },

  computed: {
    ...mapGetters(["user", "url"]),
  },
  methods: {
    addOption() {
      console.log(this.menu);
      var url = `http://localhost:5050/update/${localStorage.getItem("id")}/`;

      var formData;
      if (this.menu !== undefined) {
        var opt = this.menu;
        if (opt.option1 === null) {
          formData = {
            option1: this.option.name,
          };
        } else if (opt.option1 !== null && opt.option2 === null) {
          formData = {
            option2: this.option.name,
            option1: opt.option1,
          };
        } else if (
          opt.option1 !== null &&
          opt.option2 !== null &&
          opt.option3 === null
        ) {
          formData = {
            option3: this.option.name,
            option2: opt.option2,
            option1: opt.option1,
          };
        } else if (
          opt.option1 !== null &&
          opt.option2 !== null &&
          opt.option3 !== null &&
          opt.option4 === null
        ) {
          formData = {
            option4: this.option.name,
            option3: opt.option3,
            option2: opt.option2,
            option1: opt.option1,
          };
        } else if (
          opt.option1 !== null &&
          opt.option2 !== null &&
          opt.option3 !== null &&
          opt.option4 !== null &&
          opt.option5 === null
        ) {
          formData = {
            option5: this.option.name,
            option4: opt.option4,
            option3: opt.option3,
            option2: opt.option2,
            option1: opt.option1,
          };
        } else {
          formdata = {};
        }
        axios.put(url, formData).then((res) => {
          window.location.reload();
        });
      } else {
        formData = {
          option1: this.option.name,
        };
        axios.put(url, formData).then((res) => {
          window.location.reload();
        });
      }
    },

    getUser() {
      var url = `http://localhost:5050/get/${localStorage.getItem("id")}/`;

      axios.get(url).then((res) => {
        this.option = res.data;
        this.menu = res.data.option;
      });
    },
    logOut() {
      axios
        .get(this.url + "/logout")
        .then((response) => {
          if (response.data.logedOut) {
            localStorage.clear();
            this.$router.push({ name: "Login" });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="scss">
.main-tab {
  border: 3px solid;
}
.opt {
  color: black;
}
.add-opt {
  width: 50px;
  height: 50px;
  background: black;
  color: white;
  font-size: 31px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bolder;
}
</style>

<template>
  <div>
    <app-header title="Welcome Admin"></app-header>
    <div class="main-div">
      <h6 class="add" data-toggle="modal" data-target="#myModal">
        <u>Add Restaurants</u>
      </h6>
      <div v-for="item in items" :key="item._id">
        <div class="main-card">
          <h4 class="name">{{ item.name }}</h4>
          <br />
          <h6><b>Description</b></h6>
          <p class="description">{{ item.description }}</p>
          <span class="action1" @click="deleteItem(item._id)">Delete</span>
          <span
            class="action2"
            @click="getEditItem(item._id)"
            data-toggle="modal"
            data-target="#myEditModal"
            >Edit</span
          >
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Add Restaurant</h4>
          </div>
          <form @submit.prevent="addItem">
            <div class="form-group">
              <label>Restaurant Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="restaurant.name"
                required
              />
            </div>
            <div class="form-group">
              <label>Restaurant Description:</label>
              <input
                type="text"
                class="form-control"
                v-model="restaurant.description"
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

    <!-- Edit Modal -->
    <div id="myEditModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Edit Restaurant</h4>
          </div>
          <form @submit.prevent="editItem(edit._id)">
            <div class="form-group">
              <label>Restaurant Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="edit.name"
                required
              />
            </div>
            <div class="form-group">
              <label>Restaurant Description:</label>
              <input
                type="text"
                class="form-control"
                v-model="edit.description"
                required
              />
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-primary" value="Edit" />
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
      items: [],
      restaurant: {},
      edit: {},
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
    // Get Edit Item
    getEditItem(id) {
      let uri = "http://localhost:5050/restaurant/get/" + id + "/";
      axios.get(uri).then((response) => {
        this.edit = response.data;
      });
    },
    //Delete Function

    deleteItem(id) {
      let uri = "http://localhost:5050/restaurant/delete/" + id + "/";
      console.log(uri);
      axios.delete(uri).then(() => {
        window.location.reload();
      });
    },

    //Edit Restaurant
    editItem(id) {
      let uri = "http://localhost:5050/restaurant/update/" + id + "/";
      axios.put(uri, this.edit).then(() => {
        window.location.reload();
      });
    },

    //Add Restaurants
    addItem() {
      let uri = "http://localhost:5050/restaurant/add-data/";
      axios.post(uri, this.restaurant).then(() => {
        window.location.reload();
      });
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

<style lang="scss">
.main-div {
  margin-left: 12rem;
  padding: 20px;
}
.modal-content {
  padding: 20px;
}
.add {
  text-align: left;
  margin-left: 2rem;
  color: blue;
  font-weight: bold;
  cursor: pointer;
}
.main-card {
  border: 5px solid;
  padding: 3rem;
  width: 80%;
  text-align: left;
  margin-left: 2rem;
  margin-bottom: 1rem;
  .name {
    color: blue;
    font-weight: bold;
  }
  .description {
    font-weight: 400;
  }
}
.action1 {
  float: right;
  color: blue;
  cursor: pointer;
}
.action2 {
  float: right;
  margin-right: 1rem;
  color: blue;
  cursor: pointer;
}
</style>

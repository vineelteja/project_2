<template>
  <div>
    <app-header title="Add User"></app-header>
    <div class="main-div">
      <h6 class="add" data-toggle="modal" data-target="#AddItem">
        <u>Add Items</u>
      </h6>
      <div v-for="item in items" :key="item._id">
        <div class="main-card">
          <h4 class="name">{{ item.name }}</h4>
          <br />
          <h6><b>Description</b></h6>
          <p class="description">{{ item.description }}</p>
          <h6 class="price">{{ item.price }}$</h6>
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
    <div id="AddItem" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Add Item</h4>
          </div>
          <form @submit.prevent="addItem">
            <div class="form-group">
              <label>Item Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="Item.name"
                required
              />
            </div>
            <div class="form-group">
              <label>Item Description:</label>
              <input
                type="text"
                class="form-control"
                v-model="Item.description"
                required
              />
            </div>
            <div class="form-group">
              <label>Item Price:</label>
              <input
                type="text"
                class="form-control"
                v-model="Item.price"
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
            <h4 class="modal-title">Edit Item</h4>
          </div>
          <form @submit.prevent="editItem(edit._id)">
            <div class="form-group">
              <label>Item Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="edit.name"
                required
              />
            </div>
            <div class="form-group">
              <label>Item Description:</label>
              <input
                type="text"
                class="form-control"
                v-model="edit.description"
                required
              />
            </div>
            <div class="form-group">
              <label>Item Price:</label>
              <input
                type="text"
                class="form-control"
                v-model="edit.price"
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
import Header from "../User-Header";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [],
      Item: {},
      edit: {},
    };
  },

  components: {
    appHeader: Header,
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
      let uri = "http://localhost:5050/Item/get/" + id + "/";
      axios.get(uri).then((response) => {
        this.edit = response.data;
      });
    },
    //Delete Function

    deleteItem(id) {
      let uri = "http://localhost:5050/Item/delete/" + id + "/";
      console.log(uri);
      axios.delete(uri).then(() => {
        window.location.reload();
      });
    },

    //Edit Item
    editItem(id) {
      let uri = "http://localhost:5050/Item/update/" + id + "/";
      axios.put(uri, this.edit).then(() => {
        window.location.reload();
      });
    },

    //Add Items
    addItem() {
      let uri = "http://localhost:5050/Item/add-data/";
      axios.post(uri, this.Item).then(() => {
        window.location.reload();
      });
    },

    //Session checking Function
    isLoged() {
      let uri = "http://localhost:5050/Item/get-list/";
      axios.get(uri).then((response) => {
        this.items = response.data;
        console.log(response.data);
      });
      axios
        .get(this.url + "/user", { withCredentials: true })
        .then((response) => {
          if (response.data.local.role !== "admin") {
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
  color: blue;
  text-align: left;
  margin-left: 2rem;
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
    font-weight: bold;
  }
  .description {
    font-weight: 400;
    overflow: hidden;
  }
}
.action1 {
  float: right;

  cursor: pointer;
}
.action2 {
  float: right;
  margin-right: 1rem;
  cursor: pointer;
}
.price {
  text-align: right;
  font-weight: bold;
}
</style>

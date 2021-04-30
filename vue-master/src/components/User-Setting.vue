<template>
  <div>
    <app-header title="Setting Page"></app-header>
    <div class="main-div">
      <ul>
        <li><a href="/reset">Change Password</a></li>
      </ul>
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
      Settings: "Settings",
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
  margin-left: 13rem;
  margin-top: 3rem;
  text-align: left;
  ul {
    list-style: none;
    li {
      margin-bottom: 1rem;
      color: blue;
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>

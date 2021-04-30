<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container text-dark">
        <p class="navbar-brand" href="#">{{ title }}</p>

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
            <a class="nav-link" href="/setting"><u>Settings</u></a>
          </li>
          <li class="nav-item text-primary">
            <a class="nav-link" href="#" @click="logOut"><u>Logout</u></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: 'Header',
  computed: {
    ...mapGetters(["user", "url"]),
  },
  props: {
    title: String
  },
  methods: {
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
};
</script>

<style>
</style>

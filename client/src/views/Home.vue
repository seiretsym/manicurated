<template>
  <section class="content">
    <template v-if="$store.state.view === 'login'">
      <Login changeView="changeView" />
    </template>
    <template v-else-if="$store.state.view === 'register'">
      <Register changeView="changeView" />
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Login from "../components/Forms/login.vue";
import Register from "../components/Forms/register.vue";

@Options({
  components: {
    Login,
    Register,
  },
})
export default class Home extends Vue {}
</script>
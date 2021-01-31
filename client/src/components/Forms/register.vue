<template>
  <section class="form-section">
    <h1 class="c-hotpink">Welcome</h1>
    <p>Please sign in to begin curating your manicures.</p>
    <form
      class="form-fluid"
      v-on:submit="
        (event) => $store.dispatch({ type: 'register', event: event })
      "
    >
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        required
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        minlength="6"
        placeholder="Enter your Password"
        v-on:change="(event) => updateValidator(event)"
        required
      />
      <label for="password">Confirm Password</label>
      <input
        type="password"
        name="confirm"
        minlength="6"
        title="Must match password"
        placeholder="Confirm your Password"
        :pattern="password"
        required
      />
      <input type="submit" value="Submit" />
    </form>
    <p>
      Already registered?
      <span
        v-on:click="$store.dispatch({ type: 'changeView', view: 'login' })"
        class="link"
        >Login Here</span
      >
    </p>
  </section>
</template>

<style scoped>
.form-section {
  text-align: center;
}

.form-section h1 {
  text-shadow: 2px 1px 3px black;
}

.form-section p {
  font-size: 14px;
  color: #eb87aa;
  font-weight: bold;
}

.form-section .form-fluid {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px auto 0px;
  line-height: 1;
  text-align: left;
  height: 275px;
}

.form-section .form-fluid > label {
  position: relative;
  font-family: "Montserrat Alternates", sans-serif;
  display: block;
  font-weight: bold;
  color: skyblue;
  margin-left: 15px;
  margin-bottom: 5px;
  text-shadow: 2px 1px 3px black;
}

.form-section .form-fluid > input {
  position: relative;
  font-family: "Montserrat", sans-serif;
  border: none;
  outline: none;
  background-color: #eb87aa50;
  border-radius: 25px;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-weight: bold;
  transition: all 0.5s ease-in-out;
}

.form-section .form-fluid > input[type="submit"] {
  background-color: #87ceeb75;
  font-weight: bold;
  color: hotpink;
  cursor: pointer;
  font-family: "Montserrat Alternates", sans-serif;
  margin-top: auto;
}

.form-section .form-fluid > input[type="submit"]:hover {
  background-color: #87ceeb;
}

.form-section .form-fluid > input:focus {
  background-color: #87ceeb50;
}

.form-section .form-fluid > input:focus::placeholder {
  color: #eb87aa;
}
</style>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  methods: {
    changeView: function (view: string) {
      this.$store.view = view;
    },
    updateValidator: function (event: Event) {
      const input = event.target as HTMLInputElement;
      this.password = input.value;
    },
  },
  data: function () {
    return {
      password: String,
    };
  },
})
export default class Register extends Vue {}
</script>
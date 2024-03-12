<template>
  <div class="signin-container">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'SignIn',
  components: {
    RouterView,
  },
  data() {
    return {
      email: '',
      password: ''
    };
  }}
</script>

<style>
.signin-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

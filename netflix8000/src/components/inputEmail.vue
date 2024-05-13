<script setup>
const emit = defineEmits(["showSignUp"]);

const handleShowSignUpView = () => {
  emit("showSignUp");
};


</script>

<template>
  <div class="modal">
    <h1>Unlimited movies, TV shows and more.</h1>
    <h2>Watch anywhere. Cancel at any time.</h2>
    <div id="ready">
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <form>
        <input required type="email" placeholder="Email Address" class="email-input" />
        <button class="get-started-button" @click="handleShowSignUpView">
          GET STARTED &gt;
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#ready {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
}
form {
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
}
input {
  border: 1px solid grey;
  border-radius: 5px;
  background-color: hsla(0, 0%, 20%, 0.397);
  color: white;
  padding: 10px;
  width: 100%;
  height: 100%;
}
input::placeholder {
  color: hsla(0, 0%, 75%, 0.938);
}
button {
  margin-left: 7px;
  width: 150px;
  height: 100%;
  border: none;
  background-color: #de0e10;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>

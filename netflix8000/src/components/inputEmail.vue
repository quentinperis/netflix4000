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
      <div class="container">
        <input type="email" placeholder="Email Address" class="email-input" />
        <button class="get-started-button" @click="handleShowSignUpView">
          GET STARTED &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

 .modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
} 

 h1 {
  color: white;
  font-size: 2.5rem;
  font-weight: 900;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  line-height: 125%;
  width: 50%;
  max-width: 90%;
  padding-top: 100px;
  margin: 0 auto;
}

 h2 {
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

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
/* #ready {
  margin-top: 25px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: hsl(0, 0%, 95%);
}

.RL {
  color: hsl(0, 0%, 95%);
  text-decoration: none;
}

.container {
  display: flex;
  align-items: center;
  margin-top: 1vh;
  width: 80vw;
  max-width: 600px;
  height: 8vh;
}

.email-input {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: white;
  height: 50px;
  font-size: 1.1rem;
  caret-color: #de0510;
  outline: none;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
input::placeholder {
  font-weight: bold;
  opacity: 0.5;
  color: gray;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.get-started-button {
  padding: 10px 20px;
  border: none;
  background-color: #de0e10;
  color: white;
  cursor: pointer;
  width: 250px;
  height: 50px;
  font-size: 1.1rem;
  cursor: pointer;
} */
</style>

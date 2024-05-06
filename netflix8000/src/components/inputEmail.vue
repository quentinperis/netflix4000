<script setup>
</script>

<template>
  <div id="ready">
    <form action="/signup">
      <input
        required
        type="email"
        placeholder="Email address"
        class="email-input"
      />
      <div>
        <button class="get-started-button">GET STARTED &gt;</button>
      </div>
    </form>
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

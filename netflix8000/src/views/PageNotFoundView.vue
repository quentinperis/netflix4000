<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div id="lost">
    <div id="nav">
      <RouterLink :to="!authStore.isLoggedIn ? '/' : '/netflix'">
        <img
          class="logo"
          src="/image/Logonetflix.png"
          alt="Image logo"
          @click="handleShowHome"
        />
      </RouterLink>
    </div>
    <div id="container">
      <img src="../../public/image/Seul Sur Mars.jpg" alt="Seul sur Mars" />
      <div id="onLost">
        <div id="up">
          <h1>Lost your way?</h1>
          <p>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <RouterLink :to="!authStore.isLoggedIn ? '/' : '/netflix'">
            <button>Netflix Home</button>
          </RouterLink>
        </div>
        <div id="down">
          <div id="redCross"></div>
          <h4>Error Code</h4>
          <h3>NSES - 404</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#lost {
  z-index: 10;
  width: 100%;
  height: 100dvh;
  position: fixed;
  overflow: hidden;
}

#nav {
  width: 100%;
  background-color: black;
  padding: 15px 30px;
  padding-top: 20px;
}

#container {
  position: relative;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
}

.logo {
  height: 30px;
  width: 100px;
  cursor: pointer;
}

#onLost {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: white;
  > * {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  > #up {
    flex-direction: column;
  }
}

#up {
  height: 60%;
  width: 100%;
  top: 0;
  > h1 {
    font-size: 3.5rem;
    font-weight: 600;
  }
  > p {
    text-align: center;
    width: 45%;
    font-size: 1.2rem;
    margin-top: 15px;
    margin-bottom: 25px;
  }
}
button {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  transition-duration: 200ms;
}

button:hover {
  opacity: 0.7;
}
#down {
  height: 5%;
  > #redCross {
    background-color: red;
    height: 100%;
    width: 2px;
  }
  > h4 {
    margin: 0 10px;
    font-size: 1.5rem;
    font-weight: 100;
  }
  > h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>

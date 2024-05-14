<script setup>
import faq from "@/components/faq.vue";
import inputEmail from "@/components/inputEmail.vue";
import SvgHome from "@/components/SvgHome.vue";
import Footer from "@/components/Footer.vue";

const emit = defineEmits(["showSignUp"]);

const handleShowSignUpView = () => {
  emit("showSignUp");
};


</script>

<template>        
  <main>
    <div class="top">
      <h1>Unlimited movies, TV shows and more.</h1>
      <h2>Watch anywhere. Cancel at any time.</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <inputEmail />
    </div>
    <div class="mid"></div>
  </main>
  <div id="more">
    <h2>More Reasons to Join</h2>
    <div id="container">
      <SvgHome/>
    </div>
  </div>
  <faq @showSignUp="handleShowSignUpView" />
  <Footer />
</template>

<style scoped>
main {
  position: relative;
  top: 0;
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.mid {
  box-sizing: border-box;
  position: absolute;
  height: 10%;
  width: 130%;
  bottom: 0;
  margin: auto;
  align-items: center;
  border: solid 0.25rem transparent;
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  border-bottom: none;
  background: linear-gradient(to right,
      rgba(33, 13, 22, 1) 16%,
      rgba(184, 40, 105, 1),
      rgba(229, 9, 20, 1),
      rgba(184, 40, 105, 1),
      rgba(33, 13, 22, 1) 84%);
}

.mid::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* margin-top: -0.10rem; */
  border-radius: inherit;
  background: radial-gradient(50% 500% at 50% -420%,
      rgba(64, 97, 231, 0.4) 80%,
      rgba(0, 0, 0, 0.1) 100%),
    black;
}

.top {
  width: 100%;
  height: 100%;
  padding: 150px 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  >p {
    color: hsl(0, 0%, 98%);
  }
}

.top h1 {
  color: white;
  font-size: 4rem;
  font-weight: 900;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.top h2 {
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-bottom: 20px;
}

.top p {
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.top button {
  background-color: #de0510;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

#signin-button {
  height: 40px;
  width: 70px;
  background-color: #de0510;
  color: white;
  z-index: 2;
  border: none;
  border-radius: 3px;
  position: absolute;
  top: 25px;
  right: 75px;
  cursor: pointer;
}

#more {
  font-size: 1.1rem;
  color: hsl(0, 0%, 98%);
  background-color: black;
  padding: 20px 120px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  width: 100%;

  >h2 {
    margin: 10px 0;
    font-weight: 500;
  }
}

#container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
}

@media screen and (max-width: 1780px) {
  .top {
    padding: 150px 400px;
  }
}

@media screen and (max-width: 1400px) {
  .top {
    padding: 150px 350px;
  }
}

@media screen and (max-width: 1280px) {
  #more {
    padding: 20px 70px;
  }

  #container {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }

  .top {
    padding: 150px 300px;

    >h1 {
      font-size: 2.5rem;
    }
  }
}

@media screen and (max-width: 960px) {
  #more {
    padding: 20px 30px;
  }

  #container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  .top {
    padding: 150px 200px;

    >h1 {
      font-size: 2rem;
    }
  }
}
</style>

<script setup>
import Faq from "@/components/homePageComponents/Faq.vue";
import InputEmail from "@/components/homePageComponents/InputEmail.vue";
import SvgHome from "@/components/homePageComponents/SvgHome.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="container">
    <header>
      <div class="top">
        <h1>Unlimited movies, TV shows and more.</h1>
        <h2>Watch anywhere. Cancel at any time.</h2>
        <InputEmail />
      </div>
      <section class="mid"></section>
    </header>
    <section id="more">
      <h1>More Reasons to Join</h1>
      <div id="container">
        <SvgHome />
      </div>
    </section>
    <hr>
    <Faq />
    <hr>
    <Footer />
  </div>
</template>

<style scoped>
hr {
  height: 8px;
  background-color: rgb(38, 38, 38);
  border: none;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

header {
  position: relative;
  top: 0;
  width: 100%;
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
  border-radius: inherit;
  background: radial-gradient(50% 500% at 50% -420%,
      rgba(64, 97, 231, 0.4) 80%,
      rgba(0, 0, 0, 0.1) 100%),
    black;
}

.top {
  width: 100%;
  height: 100%;
  padding: 220px 10% 150px 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.top p {
  color: white;
  font-size: 1.45em;
}

.top h1 {
  color: white;
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 0.15em;
}

.top h2 {
  color: white;
  font-size: 1.75em;
  margin-bottom: 20px;
}

#more {
  font-size: 1.1rem;
  color: hsl(0, 0%, 98%);
  background-color: black;
  padding: 1em 15% 5em 15%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#more h1 {
  color: white;
  font-size: 2.9rem;
  font-weight: 900;
  margin-bottom: 0.4em;
  text-align: center;
}

#container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media screen and (max-width: 1780px) {
  .top {
    padding: 130px 10%;
  }
}

@media screen and (max-width: 1400px) {
  .top {
    padding: 150px 8%;
  }
}

@media screen and (max-width: 1280px) {
  #more {
    padding: 1em 5% 5em 5%;
  }

  #container {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .top {
    padding: 150px 5%;

    h1 {
      font-size: 2.85rem;
    }
  }
}

@media screen and (max-width: 960px) {
  #more {
    padding: 1em 5% 5em 5%;
    width: 100%;
    box-sizing: border-box;
  }


  #container {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .top {
    padding: 150px 3%;

    h1 {
      font-size: 2rem;
    }
  }
}

@media screen and (max-width: 768px) {

  .top {
    padding: 150px 5%;
  }

  #more {
    padding: 1em 5% 5em 5%;
    width: 100%;
    box-sizing: border-box;
  }

  #more h1 {
    color: white;
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 0.4em;
    text-align: center;
  }
}

@media screen and (max-width: 425px) {
  #more {
    padding: 1em 5% 5em 5%;
  }

  .top {
    padding: 120px 2%;

    h1 {
      font-size: 2rem;
      line-height: 1.2;
      margin-bottom: 0.5em;
    }

    h2 {
      font-size: 1.35em;
      padding-bottom: 1em;
    }
  }
}
</style>

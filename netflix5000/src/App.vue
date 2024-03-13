<script setup>
new Vue({
  el: '#app',
  data: {
    faqs: [
      {
        question: "What is Netflix?",
        answer:
          "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.                                                                                                             You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week! ",
      },
      {
        question: "How much does Netflix cost?",
        answer:
          "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR&nbsp;19.99 to EUR&nbsp;5.99 a month. No extra costs, no contracts.",
      },
      {
        question: "Where can I watch?",
        answer:
          "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.                                                                                                              You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
      },
      {
        question: "How do I cancel?",
        answer:
          "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
      },
      {
        question: "What can I watch on Netflix?",
        answer:
          "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
      },
    ],
  },
  methods: {
            toggleAccordion(index) {
                this.faqs[index].active = !this.faqs[index].active;
                
            }
        }
})
</script>

<template>
  <div id="app">
    <div
      class="faq-item"
      v-for="(faq, index) in faqs"
      :key="index"
      :class="{ active: faq.active }"
    >
      <div class="faq-title" @click="toggleAccordion(index)">
        {{ faq.question }}
      </div>
      <div class="faq-content">{{ faq.answer }}</div>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
    margin-bottom: 10px;
}
.faq-title {
    cursor: pointer;
    font-weight: bold;
    padding: 5px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 3px;
}
.faq-content {
    display: none;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
}
.faq-item.active .faq-content {
    display: block;
}
</style>

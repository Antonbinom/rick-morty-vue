<template>
  <main class="cards">
    <div class="container">
      <input
        class="header-search"
        type="text"
        placeholder="Введите имя персонажа"
      />
      <ul class="cards__list">
        <Card
          v-for="character in characters"
          :key="character.id"
          :character="character"
          :episodes="episodes"
        />
      </ul>
    </div>
  </main>
</template>

<script>
import Card from "@/components/CardComponent.vue";
import axios from "axios";
export default {
  components: { Card },
  computed: {
    characters() {
      return this.$store.getters["getCharacters"];
    },
    episodes() {
      return this.$store.getters["getEpisodes"];
    },
  },
  mounted() {
    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      this.$store.dispatch("setCharacters", response.data.results);
    });

    const getEpisodes = (url) => {
      axios.get(url).then((response) => {
        this.$store.dispatch("setEpisodes", response.data.results);
        if (response.data.info.next !== null) {
          setTimeout(() => {
            getEpisodes(response.data.info.next);
          }, 1000);
        }
      });
    };
    getEpisodes("https://rickandmortyapi.com/api/episode");
  },
};
</script>
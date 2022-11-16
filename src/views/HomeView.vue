<template>
  <main class="cards">
    <div class="container">
      <FilterComponent />
      <ul class="cards__list">
        <CardComponent
          v-for="character in characters"
          :key="character.id"
          :character="character"
          :episodes="episodes"
        />
        <div
          v-observe-visibility="{
            callback: handleInfinityScroll,
            intersection: {
              threshold: 0,
            },
          }"
        ></div>
      </ul>
    </div>
  </main>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      episodesArr: [],
      nextPage: "",
    };
  },
  components: { FilterComponent, CardComponent },

  computed: {
    characters() {
      return this.$store.getters["getCharacters"];
    },
    episodes() {
      return this.$store.getters["getEpisodes"];
    },
  },

  methods: {
    handleInfinityScroll(isVisible) {
      if (!isVisible) return;
      const getCharacters = (url) => {
        const characters = this.$store.getters["getCharacters"];
        axios.get(url).then((response) => {
          this.$store.dispatch("setCharacters", [
            ...characters,
            ...response.data.results,
          ]);
          if (response.data.info.next !== null) {
            this.nextPage = response.data.info.next;
          }
        });
      };
      if (this.nextPage !== null) getCharacters(this.nextPage);
    },
  },

  mounted() {
    this.episodesArr = [];
    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      this.$store.dispatch("setCharacters", response.data.results);
      this.nextPage = response.data.info.next;
    });

    const getEpisodes = (url) => {
      axios.get(url).then((response) => {
        this.episodesArr = [...this.episodesArr, ...response.data.results];
        if (response.data.info.next !== null) {
          getEpisodes(response.data.info.next);
        }
      });
      this.$store.dispatch("setEpisodes", this.episodesArr);
    };
    getEpisodes("https://rickandmortyapi.com/api/episode");
  },
};
</script>
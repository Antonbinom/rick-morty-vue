<template>
  <main class="cards">
    <div class="container">
      <input
        v-model="searchValue"
        id="filter"
        @input="onSearch($event)"
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
  data() {
    return {
      value: "",
    };
  },
  components: { Card },
  computed: {
    characters() {
      return this.$store.getters["getCharacters"];
    },
    episodes() {
      return this.$store.getters["getEpisodes"];
    },
    searchValue: {
      set(value) {
        this.$store.dispatch("setSearchValue", value);
      },
      get() {
        return this.$store.getters["getSearchValue"];
      },
    },
  },
  methods: {
    findCharacter() {},
  },
  mounted() {
    // axios.get("https://rickandmortyapi.com/api/character").then((response) => {
    //   this.$store.dispatch("setCharacters", response.data.results);
    // });

    const getCharacters = (url) => {
      axios.get(url).then((response) => {
        this.$store.dispatch("setCharacters", response.data.results);
        if (response.data.info.next !== null) {
          getCharacters(response.data.info.next);
        }
      });
    };
    getCharacters("https://rickandmortyapi.com/api/character");

    const getEpisodes = (url) => {
      axios.get(url).then((response) => {
        this.$store.dispatch("setEpisodes", response.data.results);
        if (response.data.info.next !== null) {
          getEpisodes(response.data.info.next);
        }
      });
    };
    getEpisodes("https://rickandmortyapi.com/api/episode");
  },
};
</script>
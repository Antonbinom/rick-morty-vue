<template>
  <main class="cards">
    <div class="container">
      <div class="cards__filter">
        <input
          v-model="searchValue"
          id="filter"
          class="cards-search"
          type="text"
          placeholder="Введите имя персонажа"
        />
        <select
          @change="onSort($event)"
          v-model="sortValue"
          class="cards-select"
        >
          <option value="dead">Dead</option>
          <option value="alive">Alive</option>
          <option value="unknown">Unknown</option>
          <option value="">All</option>
        </select>
      </div>
      <ul v-if="characters" class="cards__list">
        <Card
          v-for="character in characters"
          :key="character.name"
          :character="character"
          :episodes="episodes"
        />
      </ul>
      <div v-if="!characters.length" class="empty">Ничего не найдено!</div>
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
      sortValue: "",
      episodesArr: [],
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
    onSort(event) {
      const status = event.target.value;
      axios
        .get(`https://rickandmortyapi.com/api/character/?status=${status}`)
        .then((response) => {
          this.$store.dispatch("setCharacters", response.data.results);
        });
    },
  },
  mounted() {
    this.episodesArr = [];
    this.$store.dispatch("setSearchValue", "");
    this.$store.dispatch("setSortValue", "");

    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      this.$store.dispatch("setCharacters", response.data.results);
    });

    // const getCharacters = (url) => {
    //   axios.get(url).then((response) => {
    //     this.$store.dispatch("setCharacters", response.data.results);
    //     if (response.data.info.next !== null) {
    //       getCharacters(response.data.info.next);
    //     }
    //   });
    // };
    // getCharacters("https://rickandmortyapi.com/api/character");

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
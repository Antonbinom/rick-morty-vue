<template>
  <main class="cards">
    <div class="container">
      <div class="cards__filter">
        <input
          @input="onSearch($event)"
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
      <div v-if="loading" class="empty">Ничего не найдено!</div>
      <ul v-if="!loading" class="cards__list">
        <Card
          v-for="character in characters"
          :key="character.id"
          :character="character"
          :episodes="episodes"
        />
        <div v-observe-visibility="handleInfinityScroll"></div>
      </ul>
    </div>
  </main>
</template>

<script>
import Card from "@/components/CardComponent.vue";
import axios from "axios";
import { debounce } from "debounce";
export default {
  data() {
    return {
      value: "",
      sortValue: "",
      episodesArr: [],
      nextPage: "",
      loading: false,
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

    onSearch: debounce(function (event) {
      this.$store.dispatch("setCharacters", []);
      this.name = event.target.value;
      axios
        .get(
          `https://rickandmortyapi.com/api/character/?name=${this.name}&status=${this.status}`
        )
        .then((response) => {
          this.$store.dispatch("setCharacters", response.data.results);
          this.loading = false;
        })
        .catch((error) => console.log(error.message));
    }, 500),

    onSort(event) {
      this.status = event.target.value;
      axios
        .get(
          `https://rickandmortyapi.com/api/character/?name=${this.name}&status=${this.status}`
        )
        .then((response) => {
          this.$store.dispatch("setCharacters", response.data.results);
        })
        .catch((error) => console.log(error.message));
    },
  },

  mounted() {
    this.episodesArr = [];

    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      this.$store.dispatch("setCharacters", response.data.results);
      this.nextPage = response.data.info.next;
      console.log(this.nextPage);
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
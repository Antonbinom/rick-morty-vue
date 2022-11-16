<template>
  <main class="cards">
    <div class="container">
      <div class="cards__filter">
        <input
          @input="onSearch()"
          v-model="name"
          id="filter"
          class="cards-search"
          type="text"
          placeholder="Введите имя персонажа"
        />
        <select @change="onSort()" v-model="status" class="cards-select">
          <option value="dead">Dead</option>
          <option value="alive">Alive</option>
          <option value="unknown">Unknown</option>
          <option value="">All</option>
        </select>
      </div>
      <ul class="cards__list">
        <CardComponent
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
import CardComponent from "@/components/CardComponent.vue";
import axios from "axios";
import { debounce } from "debounce";
export default {
  data() {
    return {
      episodesArr: [],
      nextPage: "",
      pages: "",
      status: "",
      name: "",
    };
  },
  components: { CardComponent },

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
            this.pages = response.data.info.pages;
          }
        });
      };
      if (this.nextPage.replace(/[^\d]/g, "") == this.pages) {
        return;
      } else {
        getCharacters(
          `${this.nextPage}&name=${this.name}&status=${this.status}`
        );
      }
    },
    onSearch: debounce(function () {
      this.onSort();
    }, 500),

    onSort() {
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
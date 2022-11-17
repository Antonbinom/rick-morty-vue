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

      <ul class="cards__list" v-if="loading">
        <CardComponent
          v-for="character in characters"
          :key="character.id"
          :character="character"
        />
        <div v-observe-visibility="handleInfinityScroll"></div>
      </ul>
      <div v-if="!loading" class="empty">Ничего не найдено!</div>
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
      nextPage: "",
      currentPage: "",
      pages: "",
      status: "",
      name: "",
      loading: true,
    };
  },
  components: { CardComponent },

  computed: {
    characters() {
      return this.$store.getters["getCharacters"];
    },
  },

  methods: {
    handleInfinityScroll(isVisible) {
      if (!isVisible) return;
      const getCharacters = (url) => {
        axios.get(url).then((response) => {
          const characters = this.$store.getters["getCharacters"];

          this.$store.dispatch("setCharacters", [
            ...characters,
            ...response.data.results,
          ]);
          this.pages = response.data.info.pages;
          this.currentPage = +url.replace(/[^\d]/g, "");
          if (response.data.info.next !== null) {
            this.nextPage = response.data.info.next;
          }
        });
      };
      if (this.currentPage === this.pages) {
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
          this.nextPage = response.data.info.next;
          this.pages = response.data.info.pages;
          this.currentPage = +response.data.info.next.replace(/[^\d]/g, "") - 1;
          this.loading = true;
        })
        .catch((error) => {
          console.log(error.message);
          this.loading = false;
        });
    },
  },

  mounted() {
    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      this.$store.dispatch("setCharacters", response.data.results);
      this.nextPage = response.data.info.next;
      this.currentPage = response.request.responseURL;
    });
  },
};
</script>
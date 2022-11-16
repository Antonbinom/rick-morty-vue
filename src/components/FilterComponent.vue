<template>
  <div class="cards__filter">
    <input
      v-model="searchValue"
      class="cards-search"
      type="text"
      placeholder="Введите имя персонажа"
    />
    <select @change="onSort($event)" v-model="sortValue" class="cards-select">
      <option value="dead">Dead</option>
      <option value="alive">Alive</option>
      <option value="unknown">Unknown</option>
      <option value="">All</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortValue: "",
    };
  },
  computed: {
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
      this.$store.dispatch("setSortValue", event.target.value);
    },
  },
  mounted() {
    this.$store.dispatch("setSearchValue", "");
  },
};
</script>
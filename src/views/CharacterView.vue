<template>
  <div class="character__wrapper" v-if="character">
    <div class="character__card">
      <h1 class="character-name">{{ character.name }}</h1>
      <img
        class="character-image"
        :src="character.image"
        :alt="character.name"
      />
      <div class="character__info">
        <span class="character-text">Species: {{ character.species }}</span>
        <span class="character-text"
          >Location: {{ character.location.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      character: null,
    };
  },
  created() {
    const characterId = this.$route.params.id;
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        this.character = response.data;
      })
      .catch((error) => console.log(error.message));
  },
};
</script>
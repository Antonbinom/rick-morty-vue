<template >
  <div class="cards__item">
    <router-link class="cards__item-name" :to="`/character/${character.id}`">{{
      character.name
    }}</router-link>
    <img
      class="cards__item-image"
      :src="character.image"
      :alt="character.name"
    />
    <div class="cards__item-info">
      <span class="cards__item-text">Species: {{ character.species }}</span>
      <span class="cards__item-text"
        >Location: {{ character.location.name }}</span
      >
    </div>
    <div class="cards__item-episodes">
      <h3>Episodes</h3>
      <ul class="cards__item-list" v-if="episodes">
        <li v-for="episode in episodes" :key="episode.air_date">
          <router-link :to="`/episode/${episode.id}`">
            Ep. {{ episode.id }} - {{ episode.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      episodes: null,
    };
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  created() {
    const episodes = this.character.episode
      .map((item) =>
        item.replace("https://rickandmortyapi.com/api/episode/", "")
      )
      .slice(0, 5)
      .join();
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodes}`)
      .then((response) => {
        if (response.data.constructor.name == "Array") {
          this.episodes = response.data;
        } else this.episodes = [response.data];
      })
      .catch((error) => console.log(error.message));
  },
};
</script>
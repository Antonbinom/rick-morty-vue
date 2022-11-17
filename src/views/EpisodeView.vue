<template>
  <div class="episode__wrapper" v-if="episode">
    <div class="episode__card">
      <h1 class="episode-title">{{ episode.name }}</h1>
      <span class="episode-date">Release date: {{ episode.air_date }}</span>
      <div class="episode__characters">
        <ul class="episode__list">
          <li
            class="episode__item"
            v-for="character in characters"
            :key="character.id"
          >
            <router-link
              class="episode__item-link"
              :to="`/character/${character.id}`"
            >
              <img class="episode__item-image" :src="character.image" />
              <div class="episode__item-name">{{ character.name }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      episode: null,
      characters: "",
    };
  },
  created() {
    const episodeId = this.$route.params.id;
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((response) => {
        this.episode = response.data;
        let characters = this.episode.characters
          .map((item) =>
            item.replace("https://rickandmortyapi.com/api/character/", "")
          )
          .join();

        axios
          .get(`https://rickandmortyapi.com/api/character/${characters}`)
          .then((response) => {
            this.characters = response.data;
          });
      })
      .catch((error) => console.log(error.message));
  },
};
</script>
<template>
  <div class="episode__wrapper">
    <div class="episode__card">
      <h1 class="episode-title">{{ episode.name }}</h1>
      <span class="episode-date">Release date: {{ episode.air_date }}</span>
      <div class="episode__characters">
        <ul class="episode__list">
          <li
            class="episode__item"
            v-for="character in filteredCharacters"
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
export default {
  data() {
    return {
      episode: null,
      characters: "",
    };
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter((character) =>
        character.episode.includes(this.episode.url)
      );
    },
  },
  created() {
    const episodeId = this.$route.params.id;
    const item = this.$store.getters["getEpisodes"].find(
      (el) => el.id === +episodeId
    );
    this.episode = item;

    this.characters = this.$store.getters["getCharacters"];
  },
};
</script>
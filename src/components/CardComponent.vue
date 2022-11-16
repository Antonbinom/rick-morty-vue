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
      <ul class="cards__item-list">
        <li v-for="episode in filteredEpisodes" :key="episode.date">
          <router-link :to="`/episode/${episode.id}`">
            Ep. {{ episode.id }} - {{ episode.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
    episodes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredEpisodes() {
      return this.episodes
        .filter((episode) => episode.characters.includes(this.character.url))
        .slice(0, 5);
    },
  },
};
</script>
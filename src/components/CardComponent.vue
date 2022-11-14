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
        <li>
          <router-link :to="`/episode/`">
            Ep. {{}}
            <!-- {{
              episode.replace("https://rickandmortyapi.com/api/episode/", "")
            }} -->
            - {{}}
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
    // someEpisode() {
    //   // console.log(this.card.episode);
    //   return this.episodes.filter((episode) => {
    //     // console.log(episode.url);
    //     this.card.episode.forEach((item) => {
    //       // console.log(item);
    //       return episode.url === item;
    //     });
    //   });
    // },
  },
};
</script>
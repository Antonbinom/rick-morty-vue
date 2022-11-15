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
export default {
  data() {
    return {
      character: null,
    };
  },
  created() {
    const characterId = this.$route.params.id;
    const item = this.$store.getters["getCharacters"].find(
      (el) => el.id === +characterId
    );
    this.character = item;
  },
};
</script>
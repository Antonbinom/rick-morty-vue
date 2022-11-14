<template>
  <div class="character__wrapper" v-if="item">
    <div class="character__card">
      <h1 class="character-name">{{ item.name }}</h1>
      <img class="character-image" :src="item.image" :alt="item.name" />
      <div class="character__info">
        <span class="character-text">Species: {{ item.species }}</span>
        <span class="character-text">Location: {{ item.location.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
    };
  },
  created() {
    const characterId = this.$route.params.id;
    console.log(+characterId);
    const item = this.$store.getters["getCharacters"].find(
      (el) => el.id === +characterId
    );
    this.item = item;
  },
};
</script>
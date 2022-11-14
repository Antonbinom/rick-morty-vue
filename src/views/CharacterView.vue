<template>
  <div class="character__wrapper" v-if="item">
    <div class="character__card">
      <h1 class="character-name">Name</h1>
      <img class="character-image" src="" alt="" />
      <div class="character__info">
        <span class="character-text">Species: sdsd</span>
        <span class="character-text">Location: sdsdds</span>
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
  // computed: {
  //   characters() {
  //     return this.$store.getters["getCharacters"];
  //   },
  // },
  created() {
    const alias = this.$route.params.ItemAlias;
    const item = this.$store.getters["getCharacters"].find(
      (el) => el.alias === alias
    );
    this.item = item;
    console.log(this.item);
  },
};
</script>
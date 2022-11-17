<template>
  <div>
    <header-component />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  components: {
    HeaderComponent,
  },
};
</script>
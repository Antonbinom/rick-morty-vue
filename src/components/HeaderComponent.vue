<template>
  <div class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link class="header-link" to="/">
          <SVGLogo />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SVGLogo from "@/assets/img/logo.svg";
export default {
  components: { SVGLogo },
};
</script>
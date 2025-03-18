<script setup lang="ts">
import logo from "assets/imgs/logo/Logo.svg";
</script>

<template>
  <div class="base-loading">
    <div class="loading-box">
      <div class="loading-logo-container">
        <div class="yellow-box" />
        <BImg
          :src="logo"
          alt="sokan-academy-footer-logo"
          width="87px"
          height="auto"
          class="loading-img"
          :lazy="false"
        />
      </div>

      <!-- spinner -->
      <div class="loading-spinner-container">
        <span class="spinner-bullet right-bullet"></span>
        <span class="spinner-bullet middle-bullet"></span>
        <span class="spinner-bullet left-bullet"></span>
      </div>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
  src="assets/styles/components/Base/BaseLoading.scss"
/>

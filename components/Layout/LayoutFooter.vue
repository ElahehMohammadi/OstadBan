<script setup lang="ts">
import logo from "assets/imgs/logo/logo.svg";
</script>

<template>
  <footer id="layout-footer" class="footer">
    <BContainer>
      <BRow class="mb-10">
        <BCol cols="12" md="7">
          <CustomImage
            :src="logo"
            alt="sokan-academy-footer-logo"
            width="87px"
            height="auto"
          />
          <p class="footer__text">
            ما در استاد بان تلاش می‌کنیم بستری مطمئن و کاربردی برای دانشجویان
            فراهم کنیم تا با بررسی نظرات و امتیازات اساتید و دوره‌های آموزشی،
            تصمیم‌های بهتری برای آینده تحصیلی و حرفه‌ای خود بگیرند. هدف ما
            شفافیت، دسترسی آسان به اطلاعات و ایجاد محیطی برای اشتراک‌گذاری
            تجربیات آن‌ها است.
          </p>
        </BCol>
        <BCol md="1" class="d-none d-md-block" />
        <BCol class="d-flex flex-column align-items-start" cols="6" md="2">
          <h6 class="my-2 text-title-3">دسترسی سریع</h6>
          <ul class="footer__links">
            <li>
              <sp href="/search-professors">جستجوی اساتید</sp>
            </li>
            <li>
              <sp href="/search-courses">جستجوی دوره‌ها</sp>
            </li>
            <li><sp href="/submit-review">ثبت دیدگاه</sp></li>
            <li><sp href="/about-us">درباره ما</sp></li>
            <li><sp href="/contact-us">تماس با ما</sp></li>
          </ul>
        </BCol>
        <BCol class="d-flex flex-column align-items-start" cols="6" md="2">
          <h6 class="my-2 text-title-3">خدمات ما</h6>
          <ul class="footer__links">
            <li>
              <sp href="/how-it-works">نحوه استفاده</sp>
            </li>
            <li><sp href="/faq">سوالات متداول</sp></li>
            <li><sp href="/terms">قوانین و مقررات</sp></li>
            <li><sp href="/privacy">حریم خصوصی</sp></li>
          </ul>
        </BCol>
      </BRow>
      <BRow class="pt-8">
        <BCol cols="12" class="mt-3">
          <h6 class="text-secondary text-center text-title-4 mb-4">
            کلیه حقوق مادی و معنوی این وب‌سایت متعلق به استاد بان می باشد.
          </h6>
        </BCol>
      </BRow>
      <BRow class="justify-content-center align-items-center">
        <BCol
          cols="11"
          md="4"
          class="d-flex align-items-center justify-content-center"
        >
        </BCol>
      </BRow>
    </BContainer>
    <span class="sa-footer-line-bottom"></span>
  </footer>
</template>

<style
  lang="scss"
  scoped
  src="assets/styles/components/Common/LayoutFooter.scss"
/>

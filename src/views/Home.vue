<template>
  <div class="home">
    <invoices-list></invoices-list>
  </div>
</template>

<script>
import InvoicesList from "@/components/InvoicesList";

export default {
  name: "Home",
  components: {
    InvoicesList,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.home {
  width: 50%;
  @include screenMin {
    width: 80%;
  }

  @include screenMed {
    width: 90%;
  }
  margin: 0 auto;
}
</style>

<template>
  <div class="wrapper">
    <router-link class="card" :to="'/invoices/' + invoicesItem.id">
      <p class="card__id">#{{ invoicesItem.id }}</p>
      <p class="card__paymentDue">Due {{ invoicesItem.paymentDue }}</p>
      <p class="card__clientName">{{ invoicesItem.clientName }}</p>
      <p class="card__total">£ {{ invoicesItem.total }}</p>
      <!-- class binding -->
      <p :class="statusClasses">{{ invoicesItem.status }}</p>
      <span class="card__icon"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["invoicesItem"],
  computed: {
    statusClasses() {
      return "card__status--" + this.invoicesItem.status;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.dark .card {
  background-color: $backgroundColorPrimaryDark;
  color: #ffffff;
}

.wrapper {
  display: grid;
}

.card:hover {
  box-shadow: 1px 1px 5px $backgroundDeepPurple;
}

.card {
  display: grid;
  grid-template-columns: repeat(5, 1fr) repeat(1, 0.2fr);
  grid-gap: 1.5rem;
  place-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 5px;

  @include screenMin {
    width: 75vw;
  }

  @include screenMed {
    width: 83vw;
  }

  @include screenMax {
    width: 79vw;
    grid-template-columns: 1fr 0.5fr;
  }

  p {
    justify-self: start;
    @include screenMin {
      font-size: 10px;

      @include screenMed {
        font-size: 9px;
      }

      @include screenMax {
        font-size: 14px;
      }
    }
  }
  &__id {
    @include screenMax {
      grid-column: 1;
    }
  }
  &__total {
    font-weight: $titleFontWeight;
    @include screenMax {
      grid-column: 1;
    }
  }
  &__paymentDue {
    @include screenMax {
      grid-column: 1;
    }
  }
  &__clientName {
    color: grey;
    @include screenMax {
      grid-column: 2;
    }
  }

  .statusClasses {
    @include screenMax {
      grid-column: 2;
    }
  }

  &__status--pending {
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    width: 4em;
    padding: 16px 32px;
    background-color: rgba(255, 190, 92, 0.08);
    color: rgb(253, 169, 44);
    font-weight: $titleFontWeight;
  }

  &__status--paid {
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    width: 4em;
    padding: 16px 32px;
    background-color: rgba(100, 255, 100, 0.08);
    color: rgb(70, 233, 70);
    font-weight: $titleFontWeight;
  }

  &__status--draft {
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    width: 4em;
    padding: 16px 32px;
    background-color: #dfe3fa;
    font-weight: $titleFontWeight;
  }

  &__icon {
    content: url(../assets/icon-arrow-right.svg);
    cursor: pointer;
    align-self: center;
    margin: 0 auto;

    @include screenMed {
      display: none;
    }
  }
}
</style>

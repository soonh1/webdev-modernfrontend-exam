<template>
  <EditModal v-show="isModalVisible" @close="closeModal" />
  <div class="invoicewrapper">
    <router-link :to="'/'" class="backbtn">
      <span class="backbtn__icon"></span>
      <h4 class="backbtn__text">Go back</h4>
    </router-link>

    <div class="options">
      <div class="status">
        <p class="status__text">Status</p>
        <p :class="statusClasses">{{ invoicesItem.status }}</p>
      </div>
      <div class="change">
        <button type="button" class="change__edit" @click="editModal()">
          Edit
        </button>
        <button
          class="change__button"
          v-on:click="deleteInvoice(invoicesItem.id)"
        >
          Delete
        </button>
        <button
          class="change__paidbtn"
          v-on:click="markAsPaid(invoicesItem.id)"
        >
          Mark as Paid
        </button>
      </div>
    </div>

    <div class="details">
      <div class="leading">
        <h3 class="leading__title text">#{{ invoicesItem.id }}</h3>
        <p class="leading__text text">{{ invoicesItem.description }}</p>
      </div>

      <div class="address">
        <p class="address__text text">
          {{ invoicesItem.senderAddress.street }}
        </p>
        <p class="address__text text">{{ invoicesItem.senderAddress.city }}</p>
        <p class="address__text text">
          {{ invoicesItem.senderAddress.postCode }}
        </p>
        <p class="address__text text">
          {{ invoicesItem.senderAddress.country }}
        </p>
      </div>

      <div class="dates">
        <div class="created">
          <p class="created__text text">Invoice Date</p>
          <p class="created__title text">{{ invoicesItem.createdAt }}</p>
        </div>

        <div class="due">
          <p class="due__text text">Payment Due</p>
          <p class="due__title text">{{ invoicesItem.paymentDue }}</p>
        </div>
      </div>

      <div class="billaddress">
        <p class="billaddress__text text">Bill to</p>
        <p class="billaddress__title text">{{ invoicesItem.clientName }}</p>
        <p class="billaddress__text text">
          {{ invoicesItem.clientAddress.street }}
        </p>
        <p class="billaddress__text text">
          {{ invoicesItem.clientAddress.city }}
        </p>
        <p class="billaddress__text text">
          {{ invoicesItem.clientAddress.postCode }}
        </p>
        <p class="billaddress__text text">
          {{ invoicesItem.clientAddress.country }}
        </p>
      </div>

      <div class="email">
        <p class="email__text text">Sent to</p>
        <p class="email__title text">{{ invoicesItem.clientEmail }}</p>
      </div>

      <div class="itemswrapper">
        <div class="itemspec">
          <p class="itemspec_text text">Item Name</p>
          <p class="itemspec_text text">QTY.</p>
          <p class="itemspec_text text">Price</p>
          <p class="itemspec_text text">Total</p>
        </div>

        <div
          class="iteminfo"
          v-for="item in invoicesItem.items"
          :key="item.total"
        >
          <p class="iteminfo__title text">{{ item.name }}</p>
          <p class="iteminfo__text text">{{ item.quantity }}</p>
          <p class="iteminfo__text text">{{ item.price }}</p>
          <p class="iteminfo__title text">{{ item.total }}</p>
        </div>

        <div class="total">
          <p class="total__text text">Amount Due</p>
          <p class="total__title text">{{ invoicesItem.total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditModal from "./EditModal";

export default {
  name: "InvoicesItem",
  data() {
    return {
      isModalVisible: false,
    };
  },
  components: {
    EditModal,
  },
  props: ["id"],
  computed: {
    invoicesItem() {
      return this.$store.getters.invoicesItemFromId(String(this.id));
    },

    ...mapGetters(["invoicesItems"]),

    statusClasses() {
      return "status__status--" + this.invoicesItem.status;
    },
  },
  methods: {
    deleteInvoice(id) {
      this.$store.dispatch("deleteInvoice", id);
      this.$router.push({ path: "/" });
    },
    markAsPaid(id) {
      this.$store.dispatch("UPDATE_INVOICES", id);
      this.invoicesItem.status = "paid";
    },
    editModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

// Dark Mode
.dark .backbtn {
  color: #f3f3f3;
}

.dark .options {
  background-color: $backgroundColorPrimaryDark;
}

.dark .details {
  background-color: $backgroundColorPrimaryDark;
}

.dark .change__edit {
  background-color: $btnEditDarkModeColor;
  color: #ffffff;

  &:hover {
    background-color: $btnEditDarkModeLight;
  }
}

.dark .itemswrapper {
  background-color: $btnEditDarkModeColor;
}

.dark .total {
  background-color: red;
}

// Styling on page

.invoicewrapper {
  width: 55%;
  margin: 0 auto;
  padding-top: 8vh;

  @include screenMin {
    width: 90%;
  }
  @include screenMed {
    font-size: 9px;
  }
}

.backbtn {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;

  &__icon {
    content: url(../assets/icon-arrow-left.svg);
    margin-right: 0.8rem;
  }
  &__text {
    font-weight: $titleFontWeight;
  }
}

.change {
  display: flex;
  align-items: center;

  &__edit {
    background-color: $btnEditColor;
    padding: 1.1rem 1.3rem 1.1rem 1.3rem;
    border-radius: 25px;
    text-align: center;
    margin-right: 1rem;
    border-style: none;

    @include screenMed {
      width: 4rem;
      padding: 0.8rem;
      font-size: 9px;
    }

    &:hover {
      background-color: $btnEditLightColor;
    }
  }

  &__button {
    background-color: $btnRed;
    color: white;
    font-weight: $titleFontWeight;
    border-style: none;
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    width: 5rem;
    margin-right: 1rem;

    @include screenMed {
      width: 5rem;
      padding: 0.8rem;
      font-size: 9px;
    }

    &:hover {
      background-color: $btnLightRed;
    }
  }

  &__paidbtn {
    background-color: $backgroundDeepPurple;
    color: white;
    font-weight: $titleFontWeight;
    border-style: none;
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    width: 10rem;

    @include screenMed {
      width: 6rem;
      padding: 0.8rem;
      font-size: 9px;
    }

    &:hover {
      background-color: $backgroundHoverLightPurple;
    }
  }
}

.status {
  display: flex;
  align-items: center;

  &__text {
    margin-right: 1rem;
  }

  &__status--pending {
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    width: 4em;
    padding: 16px 25px;
    background-color: rgba(255, 190, 92, 0.08);
    color: rgb(253, 169, 44);
    font-weight: $titleFontWeight;
  }

  &__status--paid {
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    width: 4em;
    padding: 16px 25px;
    background-color: rgba(100, 255, 100, 0.08);
    color: rgb(70, 233, 70);
    font-weight: $titleFontWeight;
  }

  &__status--draft {
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    width: 4em;
    padding: 16px 25px;
    background-color: rgba(29, 39, 48, 0.041);
    color: rgb(3, 0, 17);
    font-weight: $titleFontWeight;
  }
}

.options {
  display: flex;
  justify-content: space-between;
  grid-template-columns: repeat(12, [col] 1fr);
  background-color: white;
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 10px;
  margin-bottom: 3vh;
  align-items: center;
}

.details {
  display: grid;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-auto-rows: auto;
  grid-column-gap: 0.5em;
  grid-row-gap: 10px;
  background-color: white;
  padding: 2rem 3rem 2rem 3rem;

  .leading {
    grid-column: col / span 3;
    grid-row: row;

    &__title {
      font-weight: $titleFontWeight;
      font-size: $boldFontSize;

      @include screenMed {
        font-size: 14px;
      }
    }
    &__text {
      color: $textinputDarkMode;
    }
  }

  .address {
    grid-column: col 10 / span 3;
    grid-row: row;
    text-align: right;
    &__text {
      color: $textinputDarkMode;
    }
  }

  .dates {
    grid-column: col / span 3;
    grid-row: row 2;

    .created {
      &__title {
        font-weight: $titleFontWeight;
        font-size: $boldFontSize;
        @include screenMed {
          font-size: 14px;
        }
        @include screenMax {
          font-size: 12px;
        }
      }
      &__text {
        color: $textinputDarkMode;
      }
    }

    .due {
      &__title {
        font-weight: $titleFontWeight;
        font-size: $boldFontSize;
        @include screenMed {
          font-size: 14px;
        }
        @include screenMax {
          font-size: 12px;
        }
      }
      &__text {
        color: $textinputDarkMode;
      }
    }
  }

  .billaddress {
    grid-column: col 5 / span 3;
    grid-row: row 2;
    &__title {
      font-weight: $titleFontWeight;
      font-size: $boldFontSize;
      @include screenMed {
        font-size: 14px;
      }
      @include screenMax {
        font-size: 12px;
      }
    }
    &__text {
      color: $textinputDarkMode;
    }
  }

  .email {
    grid-column: col 9 / span 3;
    grid-row: row 2;
    &__title {
      font-weight: $titleFontWeight;
      font-size: $boldFontSize;
      @include screenMed {
        font-size: 14px;
      }
      @include screenMax {
        font-size: 12px;
      }
    }
    &__text {
      color: $textinputDarkMode;
    }
  }
}

.itemswrapper {
  grid-column: col 1 / span 12;
  grid-row: row 3;
  display: grid;
  grid-template-columns: repeat(6, [col] 1fr);
  grid-auto-rows: auto;
  width: 100%;
  margin: 0 auto;
  background-color: aliceblue;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  .itemspec {
    grid-column: col 1 / span 6;
    grid-auto-rows: row 1;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(6, [col] 1fr);
    color: $textinputDarkMode;

    @include screenMax {
      font-size: 10px;
    }

    :nth-child(1) {
      grid-column: col 1 / span 2;
    }
    :nth-child(2) {
      grid-column: col 4 / span 1;
      text-align: center;
    }
    :nth-child(3) {
      grid-column: col 5 / span 1;
      text-align: right;
    }
    :nth-child(4) {
      grid-column: col 6 / span 1;
      text-align: right;
    }
  }
  .iteminfo {
    grid-column: col 1 / span 6;
    grid-auto-rows: row 2;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(6, [col] 1fr);

    @include screenMax {
      font-size: 10px;
    }

    &__title {
      font-weight: $titleFontWeight;
    }
    :nth-child(1) {
      grid-column: col 1 / span 2;
    }
    :nth-child(2) {
      grid-column: col 4 / span 1;
      text-align: center;
      color: $textinputDarkMode;
    }
    :nth-child(3) {
      grid-column: col 5 / span 1;
      text-align: right;
      color: $textinputDarkMode;
    }
    :nth-child(4) {
      grid-column: col 6 / span 1;
      text-align: right;
    }
  }

  .total {
    grid-column: col 1 / span 6;
    display: grid;
    padding: 1rem;
    color: white;
    background-color: rgb(35, 36, 36);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    grid-template-columns: repeat(6, [col] 1fr);

    @include screenMax {
      font-size: 20px;
    }

    &__title {
      font-weight: $titleFontWeight;
      font-size: $boldFontSize;
    }

    :nth-child(1) {
      grid-column: col 1 / span 2;
    }
    :nth-child(2) {
      grid-column: col 6 / span 1;
      text-align: right;
    }
  }
}

.text {
  margin-top: 1rem;
}

@include screenMax {
  .options {
    flex-wrap: wrap;
    padding: 1rem;
    justify-content: center;
  }

  .change {
    margin-top: 0.5rem;
  }
}
</style>

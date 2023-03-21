<template>
  <div class="headline">
    <div class="fronttitle">
      <h1 class="fronttitle__title">Invoices</h1>
      <p class="fronttitle__text">There are {{invoicesItems.length}} total invoices</p>
    </div>

    <div class="sorting">
      <div class="dropdown">
        <select v-model="statusFilter">
          <option value="" disabled selected hidden>Filter by status </option>
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <button
          type="button"
          class="sorting__btn createbutton"
          @click="showModal"
        >
          <span class="createbutton__icon"></span>
          New Invoice
        </button>

        <InvoicesModal
          v-show="isModalVisible"
          @close="closeModal"
        />
    </div>
  </div>
    
  <div class="empty" v-if="this.invoicesItems.length === 0">
    <img class="empty__img" src="@/assets/images/illustration-empty.svg" alt="">
  </div>
  <div v-else v-for="invoicesItem in filterInvoicesByStatus" :key="invoicesItem.id">
          <InvoicesListItem :invoicesItem="invoicesItem" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InvoicesListItem from './InvoicesListItem'
import InvoicesModal from './InvoicesModal'

export default {
  data() {
    return {
      isModalVisible: false,
      statusFilter: ""
    };
  },
  name: 'InvoicesList',
  computed: {
    ...mapGetters([
      'invoicesItems',
    ]),
    filterInvoicesByStatus: function() {
      return this.invoicesItems.filter(
        (invoicesItem) =>
          !invoicesItem.status.indexOf(this.statusFilter)
      );
    }
  },
  components: {
    InvoicesListItem,
    InvoicesModal
  },
  methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      submitForm() {
        this.$store.dispatch("ADD_NEW_INVOICES", this.form);
        this.form = {};
      }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.dark .fronttitle__text{
  color: #ffffff;
}

.headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3vh;
  margin-bottom: 5vh;

  @include screenMin {    
      flex-wrap: wrap;
   }
}

.sorting {
  display: flex;
  align-items: center;
}

.dropdown {
  display: flex;
  justify-content: space-between;
  margin-right: 3rem;

  select{
    background-color: $backgroundColorPrimaryLight;
    cursor: pointer;
    padding: 1rem 0.5rem 1rem 0.5rem;
    select:focus{
      outline: none;
    }
  }
}


.fronttitle {
  &__title {
    padding-bottom: 10px;
  }
  &__text {
    color: #2c3e50;
    font-family: $bodyFontFamily;
    font-size: 12px;
  }
}

.empty {
  display: flex;
  justify-content: center;
  &__img {
    width: 60%;
  }
}
</style>
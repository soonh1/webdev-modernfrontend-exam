<template>
  <form @submit.prevent="validateForm" novalidate>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div
          class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              New Invoice
            </slot>
            
          </header>
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <section class="billfrom">
                <div class="addressName">
                <h2>Bill from</h2>
                  <label for="Street Address">Street Address</label>
                  <input
                    class="label"
                    type="text"
                    v-model="form.senderAddress.street"
                    v-bind:class="{ 'is-danger': errors.senderStreet }"
                  />
                  <p class="error__text">{{ errors.senderStreet }}</p>
                </div>
                <div class="cityName">
                  <div class="city">
                    <p class="city__text">City</p>
                    <input class="label" type="text" id="City" v-model="form.senderAddress.city"  v-bind:class="{ 'is-danger': errors.senderCity }"
                    />
                    <p class="error__text">{{ errors.senderCity }}</p>
                  </div>

                  <div class="postcode">
                    <p>Post Code</p>
                    <input class="label" type="text" v-model="form.senderAddress.postCode" v-bind:class="{ 'is-danger': errors.senderPostCode }"
                   />
                    <p class="error__text">{{ errors.senderPostCode }}</p>
                  </div>

                  <div class="country">
                    <p>Country</p>
                    <input class="label" type="text" v-model="form.senderAddress.country" v-bind:class="{ 'is-danger': errors.senderCountry }"
                    />
                    <p class="error__text">{{ errors.senderCountry }}</p>
                  </div>
                </div>

              </section>
              <section class="billto">
                <h2>Bill To</h2>
                <div class="clientsName">
                  <label for="Client's Name">Client's Name</label>
                  <input
                    class="label"
                    type="text"
                    v-model="form.clientName"
                    v-bind:class="{ 'is-danger': errors.clientName }"
                    
                  />
                  <p class="error__text">{{ errors.clientName }}</p>
                  <label for="Client's Name">Client's Email</label>
                  <input
                    class="label"
                    type="text"
                    v-model="form.clientEmail"
                    v-bind:class="{ 'is-danger': errors.clientEmail }"
                    
                  />
                  <p class="error__jest error__text">{{ errors.clientEmail }}</p>
                  <label for="Client's Name">Street Address</label>
                  <input
                    class="label"
                    type="text"
                    v-model="form.clientAddress.street"
                    v-bind:class="{ 'is-danger': errors.clientStreet }"
                    
                  />
                  <p class="error__text">{{ errors.clientStreet }}</p>
                </div>

                <div class="cityName">
                  <div class="city">
                    <p class="city__text">City</p>
                    <input class="label" type="text" v-model="form.clientAddress.city" v-bind:class="{ 'is-danger': errors.clientCity }"
                    />
                    <p class="error__text">{{ errors.clientCity }}</p>
                  </div>

                  <div class="postcode">
                    <p>Post Code</p>
                    <input class="label" type="text" v-model="form.clientAddress.postCode" v-bind:class="{ 'is-danger': errors.clientPost }"
                    />
                    <p class="error__text">{{ errors.clientPost }}</p>
                  </div>

                  <div class="country">
                    <p>Country</p>
                    <input class="label" type="text" v-model="form.clientAddress.country" v-bind:class="{ 'is-danger': errors.clientCountry }"
                    />
                    <p class="error__text">{{ errors.clientCountry }}</p>
                  </div>
                </div>

                <div class="issueDate">
                  <div class="issue">
                    <p class="issue__text">Issue Date</p>
                    <input class="label" type="text" v-model="form.paymentDue" v-bind:class="{ 'is-danger': errors.paymentDue }"
                   />
                    <p class="error__text">{{ errors.paymentDue }}</p>
                  </div>

                  <div class="terms">
                    <p class="terms__text">Payment Terms</p>
                    <input class="label" type="text" v-model="form.paymentTerms"/>
                  </div>
                </div>

                <div class="projectDescription">
                  <label for="Client's Name">Description</label>
                  <input
                    class="textareas label"
                    type="text"
                    v-model="form.description"
                    v-bind:class="{ 'is-danger': errors.description }"
                    @keyup="remaincharCount()"
                  />
                  <span>{{ remaincharactersText }}</span>
                  <p class="error__text">{{ errors.description }}</p>
                </div>
              </section>
              <section class="itemList">
                <h2>Item List</h2>
                <div class="values">
                  <p class="values__text">Item Name</p>
                  <p class="values__text">.QTY</p>
                  <p class="values__text">Price</p>
                  <p class="values__text">Total</p>
                </div>
                <div class="newitem">
                  <input type="text" class="label" v-model="form.items.name">
                  <input type="text" class="label" v-model="form.items.quantity">
                  <input type="text" class="label" v-model="form.items.total">
                  <p class="newitem__text">Total</p>
                </div>
              </section>
            </slot>
          </section>

          <footer class="modal-footer">
            <slot name="footer">
              <div class="field">
                <div class="control">
                  <div class="btn-close" @click="close" aria-label="Close modal">
                    <p>Discard</p> 
                  </div>
                  <div class="submit">
                  <button class="submit__draftbutton" @click="draftClick">Save as Draft</button>
                  <button class="submit__pendingbutton" @click="pendingClick">Save & Send</button>
                  </div>
                </div>
              </div>
            </slot>
          </footer>
        </div>
      </div>
    </transition>
  </form>

</template>

<script>

export default {
  data() {
    return {
      form: {
        id: "",
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: "",
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
          street: "",
          city: "",
          postcode: "",
          country: ""
        },
        clientAddress: {
          street: "",
          city: "",
          postcode: "",
          country: ""
        },
        items: [
          {
            name: "",
            quantity: "",
            price: "",
            total: ""
          }
        ],
        total: ""
      },
      errors: {},
      isSubmitted: false,
      maxcharacter: 100,
      remaincharactersText: "Remaining 100 characters.",
      draftClicked: false,
      pendingClicked: false
    };
  },

  name: "InvoicesModal",
  methods: {
    close() {
      this.$emit("close");
    },
    draftClick() {
      this.draftClicked = true;
      this.form.status = "draft";
    },
    pendingClick() {
      this.pendingClicked = true;
      this.form.status = "pending";
    },
    validateForm() {
      this.errors = {};
      if (!this.form.senderAddress.street) {
        this.errors.senderStreet = "Please fill in Street";
      }
      if (!this.form.senderAddress.city) {
        this.errors.senderCity = "Please fill in City";
      }
      if (!this.form.senderAddress.postCode) {
        this.errors.senderPostCode = "Please fill in Post Code";
      }
      if (!this.form.senderAddress.country) {
        this.errors.senderCountry = "Please fill in Country";
      }
      if (!this.form.clientName) {
        this.errors.clientName = "Please fill in Client's Name";
      }
      if (!this.form.clientEmail) {
        this.errors.clientEmail = "Please fill in your Client's Email";
      } else if (!this.validEmail(this.form.clientEmail)) {
        this.errors.clientEmail = "Please enter a correct email address";
      }
      if (!this.form.clientAddress.street) {
        this.errors.clientStreet = "Please fill in street";
      }
      if (!this.form.clientAddress.city) {
        this.errors.clientCity = "Please fill in city";
      }
      if (!this.form.clientAddress.postCode) {
        this.errors.clientPost = "Please fill in Post Code";
      }
      if (!this.form.clientAddress.country) {
        this.errors.clientCountry = "Please fill in Country";
      }
      if (!this.form.paymentDue) {
        this.errors.paymentDue = "Please fill in a Issue Date";
      }
      if (!this.form.description) {
        this.errors.description = "Please fill in description";
      }
      else if (this.draftClicked || this.pendingClicked === true) {
        this.$store.dispatch("ADD_NEW_INVOICES", this.form);
        this.$emit("close");
      }
    },
    validEmail(email) {
      //eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    remaincharCount: function() {
      if (this.form.description.length > this.maxcharacter) {
        this.remaincharactersText =
          "Exceeded " + this.maxcharacter + " characters limit.";
      } else {
        var remainCharacters = this.maxcharacter - this.form.description.length;
        this.remaincharactersText =
          "Remaining " + remainCharacters + " characters.";
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";


// Dark Mode
.dark text {
  color: #ffffff;
}

.dark .card, {
  background-color: $backgroundColorPrimaryDark;
}

.dark .modal {
  background-color: #0C0E16;
}

.dark .btn-close{
  color: $textinputDarkMode;
}

.dark input {
  background-color: #141625;
  border-color: #141625;
  color: #ffffff;
  
  &:focus {
    outline: none;
    border: 1px solid $backgroundHoverLightPurple;
  }
}



.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  background-size: cover;
  display: flex;
  align-items: center;
  width: 100vw;
}

.modal {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 2vh 5vw 2vh 120px;
  width: 50vw;
  height: 100vh;  

  @include screenMin {    
      padding: 6rem 2rem 2rem 2rem !important;
      width: 80% !important;
   }
}


.modal-header {
  position: relative;
  border-bottom: .3rem;
  margin-bottom: .5rem;
  font-size: $titleFontSize;
  @include screenMin {    
      padding: 0 !important;
      margin: 0 !important;
      font-size: 15px;
   }
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
  border-top: .3rem;
  margin-top: 1rem;
}

.modal-body {
 margin: 1rem 0 1rem 0
}



.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.label {
  padding: .3rem;
  @include screenMin {    
      padding: 0 !important;
      width: 100% !important;
   }
}




h2 {
  color: $backgroundDeepPurple;
  font-weight: $titleFontWeight;
}

.addressName {
  display: grid;
  grid-template-columns: 1fr;
  gap: .6rem;
  margin-top: .5rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.projectDescription {
  display: grid;
  grid-template-columns: 1fr;
  gap: .6rem;
  margin-top: .5rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.cityName {
  display: flex;
  justify-content: space-between;
  margin-top: .5rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.billto {
  display: grid;
  gap: .6em;
  margin-top: .5rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.clientsName {
  display: grid;
  grid-template-columns: 1fr;
  gap: .6rem;
  margin-top: .25rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.issueDate {
  display: flex;
  justify-content: space-between;
  margin-top: .5rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.issue {
  
  width: 48%;
  .label {
    width: 95%;
    margin-top: .25rem;
    @include screenMin {    
      margin-top: 0 !important;
   }
  }
}

.terms {
   width: 48%;
  .label {
    width: 95%;
    margin-top: .25rem;
    @include screenMin {    
      margin-top: 0 !important;
   }
  }
}

.itemList {
  display: grid;
  grid-template-columns: repeat(6, [col] 1fr);
  grid-auto-rows: auto;
  width: 100%;
  margin-top: 1rem;
  @include screenMin {    
      margin-top: 0 !important;
   }

  .values {
    display: grid;
    grid-column: col 1 / span 6;
    grid-template-columns: repeat(6, [col] 1fr);
    align-items: center;
    margin-top: .5rem;
    @include screenMin {    
      margin-top: 0 !important;
   }

    :nth-child(1) {
      grid-column: col 1 / span 2;
    }
    :nth-child(2) {
      grid-column: col 3 / span 1;
    }
    :nth-child(3) {
      grid-column: col 4 / span 1;
    }
    :nth-child(4) {
      grid-column: col 6 / span 1;
    }
  }
}

.newitem {
  display: grid;
  grid-template-columns: repeat(6, [col] 1fr);
  grid-auto-rows: auto;
  grid-column: col 1 / span 6;
  align-items: center;
  margin-top: .5rem;
  @include screenMin {    
      margin-top: 0 !important;
   }

  input {
    width: 80%;
  }

    :nth-child(1) {
      grid-column: col 1 / span 2;
    }
    :nth-child(2) {
      grid-column: col 3 / span 1;
    }
    :nth-child(3) {
      grid-column: col 4 / span 1;
    }
    :nth-child(4) {
      grid-column: col 6 / span 1;
    }
}

label {
  margin-top: 0.25rem;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.control {
  display: flex;
  justify-content: space-between;
}

.btn-close {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  background-color: $btnLight;
  border-radius: 30px;

  &:hover {
     background-color: $btnEditLightColor;
  }
}

.error__text {
  margin-top: .3rem;
  color: red;
  @include screenMin {    
      margin-top: 0 !important;
   }
}

.submit {
  @include screenMin {    
      display: flex;
      flex-wrap: wrap;
   }
  &__pendingbutton {
    background-color: $backgroundDeepPurple;
    color: white;
    font-weight: $titleFontWeight;
    border-style: none;
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    width: 10rem;
    @include screenMin {    
      margin-top: 0 !important;
      padding: 0.2rem !important;
   }

    &:hover {
      background-color: $backgroundHoverLightPurple;
    }
   }

    &__draftbutton {
    background-color: $btnEditDarkModeColor;
    color: white;
    font-weight: $titleFontWeight;
    border-style: none;
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    width: 10rem;
    margin-right: 1rem;
    @include screenMin {    
      margin-top: 0 !important;
      padding: 0.2rem !important;
   }

    &:hover {
      background-color: $btnEditDarkModeLight;
    }
   }
}
</style>

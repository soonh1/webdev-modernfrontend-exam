<template>
  <form @submit.prevent="submitForm" novalidate>
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
              Edit
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
                  <p class="error__text">{{ errors.clientEmail }}</p>
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
                    @change="validateForm"/>
                    <p class="error__text">{{ errors.clientCity }}</p>
                  </div>

                  <div class="postcode">
                    <p>Post Code</p>
                    <input class="label" type="text" v-model="form.clientAddress.postCode" v-bind:class="{ 'is-danger': errors.clientPost }"
                    @change="validateForm"/>
                    <p class="error__text">{{ errors.clientPost }}</p>
                  </div>

                  <div class="country">
                    <p>Country</p>
                    <input class="label" type="text" v-model="form.clientAddress.country" v-bind:class="{ 'is-danger': errors.clientCountry }"
                    @change="validateForm"/>
                    <p class="error__text">{{ errors.clientCountry }}</p>
                  </div>
                </div>

                <div class="issueDate">
                  <div class="issue">
                    <p class="issue__text">Issue Date</p>
                    <input class="label" type="text" v-model="form.paymentDue" v-bind:class="{ 'is-danger': errors.paymentDue }"
                    @change="validateForm"/>
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
                    class="label"
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
                    <p>Cancel</p> 
                  </div>
                  <button class="publish__savebutton" @click="closePending">Save Changes</button>
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
    };
  },

  name: "InvoicesModal",
  methods: {
    close() {
      this.$emit("close");
    },
    closeDraft() {
      this.form.status = "draft";
      this.$emit("close");
    },
    closePending() {
      this.form.status = "pending";
      this.$emit("close");
    },
    submitForm() {
      this.validateForm();
      if (Object.keys(this.errors).length === 0) {
        this.isSubmitted = true;
        console.log(`Submitted the form!`, JSON.stringify(this.form));
      }
      this.$store.dispatch("ADD_NEW_INVOICES", this.form);
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



.publish__savebutton {
  background-color: $backgroundDeepPurple;
    color: white;
    font-weight: $titleFontWeight;
    border-style: none;
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    width: 10rem;

    &:hover {
      background-color: $backgroundHoverLightPurple;
    }
   }



</style>

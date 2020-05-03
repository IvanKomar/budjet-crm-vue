<template>
  <div>
    <div class="page-title">
      <h3>{{"NewRecord" | localize}}</h3>
    </div>

    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">{{"NoCategories" | localize}} <router-link to="/categories"> {{"AddNewCategory" | localize}}</router-link></p>
    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option 
          v-for="cat in categories" 
          :key="cat.id"
          :value="cat.id"
          >
            {{cat.title}}
          </option>
        </select>
        <label>{{"CategorySelect" | localize}}</label>
      </div>

      <p>
        <label>
          <input 
          class="with-gap" 
          name="type" 
          type="radio" 
          value="income" 
          v-model="type"
        />
          <span>{{"Income" | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input 
          class="with-gap" 
          name="type" 
          type="radio" 
          value="outcome" 
          v-model="type"
        />
          <span>{{"Outcome" | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount" 
          type="number" 
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">{{"Amount" | localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          {{"Message_minAmount" | localize}}
        </span>
      </div>

      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">{{"description" | localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >
          {{"Message_description" | localize}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"buttonCreate" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  })
  ,
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()  
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
   validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      } else {
        return this.info.bill >= this.amount
      }
    }
  }
  ,
  methods: {
    async handleSubmit() {
      if ( this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            data: new Date().toJSON()
          })
          const bill = this.type === 'income' 
          ? this.info.bill + this.amount 
          : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message(localizeFilter('Message_RecordCreated'))
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`${localizeFilter('Message_NotEnoghMoney')} (${this.amount - this.info.bill})`)
      }
    }
  } 
}
</script>
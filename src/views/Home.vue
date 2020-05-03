<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill' | localize}}</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click="refresh">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeBill
        :rates="currency.rates"
      />
      <HomeCurrency
       :rates="currency.rates"
       :date="currency.date"
      />

    
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
  export default {
    name: 'home',
    data: () => ({
      loading: true,
      currency: null
    }),
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
    components: {
      HomeBill,
      HomeCurrency
    },
    methods: {
      async refresh() {
        this.loading = true
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
      }
    }
  }
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Menu_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? 'Income' : 'Outcome' | localize }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div 
            class="card" 
            :class="{
              'green' : record.type === 'income',  
              'red' : record.type === 'outcome'
            }"
          >
            <div class="card-content white-text">
              <p>{{'description' | localize}}: <strong>{{record.description}}</strong></p>
              <p>{{'Amount' | localize}}: <strong>{{record.amount | currency}}</strong></p>
              <p>{{'Category' | localize}}: <strong>{{record.categoryName}}</strong> </p>

              <small>{{record.data | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else> {{"Message_recordPart1"| localize}} <strong> id: {{this.$route.params.detailId}}</strong> {{"Message_recordPart2" | localize}}</p>
  </div>
</template>


<script>
export default {
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  name: 'datail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.detailId
    const record = await this.$store.dispatch('fetchRecordById', id )
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    
    this.record = {
      ...record,
      categoryName: category.title,
    }

    this.loading = false
  }
}
</script>
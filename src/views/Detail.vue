<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? 'Доход' : 'Расход'}}
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
              <p>Описание: <strong>{{record.description}}</strong></p>
              <p>Сумма: <strong>{{record.amount | currency}}</strong></p>
              <p>Категория: <strong>{{record.categoryName}}</strong> </p>

              <small>{{record.data | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с <strong> id: {{this.$route.params.detailId}}</strong> не найдена!</p>
  </div>
</template>


<script>
export default {
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
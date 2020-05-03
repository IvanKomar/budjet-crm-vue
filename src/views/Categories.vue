<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>{{"Menu_Category" | localize}}</h3>
        </div>
        <section>
          <Loader v-if="loading"/>
          <div v-else class="row">
            <CategoryCreate
              @created="addNewCategory"
            />
            
            <CategoryEdit
              v-if="categories.length"
              :categories="categories"
              :key="categories.length + updateCount"
              @updated="updateCategories"
            />
            <p v-else class="center">{{"NoCategories" | localize}}</p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>


<script>
  import CategoryCreate from '@/components/CategoryCreate'
  import CategoryEdit from '@/components/CategoryEdit'
export default {
   metaInfo() {
    return {
      title: this.$title('Menu_Category')
    }
  },
  name: 'categories',
  data: () => ({
   categories: [],
   loading: true,
   updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex( c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount = this.categories.length + 1
    }
  },
  components: {
    CategoryCreate, CategoryEdit
  }
}
</script>
import {chunk, size} from 'lodash'

export default {
  data() {
    return {
      page:  +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination(allItems) {
      
      this.allItems = chunk(allItems, this.pageSize)
      this.pageCount = size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}
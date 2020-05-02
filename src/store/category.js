import firebase from 'firebase/app'
export default {
  actions: {
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const categoriesData = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categoriesData).map(key => ({...categoriesData[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`users/${uid}/categories`).push({title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({dispatch, commit}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
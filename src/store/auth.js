import firebase from 'firebase/app'

export default {
  actions: {
    login : async function({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    register: async function({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 1000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid: function() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
    ,
    logout: async function () {
      await firebase.auth().signOut()
    }
  }
}

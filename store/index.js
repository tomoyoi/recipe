import { vuexfireMutations } from 'vuexfire'
import firebase from '~/plugins/firebase'

export const state = () => ({
  userUid: '',
  userName: ''
})

export const mutations = {
  ...vuexfireMutations,
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  }
}

export const actions = {
  signUp({ commit }, { email, password }) {
    return auth().createUserWithEmailAndPassword(email, password)
  },

  signInWithEmail({ commit }, { email, password }) {
    return auth().signInWithEmailAndPassword(email, password)
  },
  logInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user;
      console.log('displayName : ' + user)
      commit('setUserUid', user.uid)
      commit('setUserName', user.displayName)
      console.log('displayName : ' + user.displayName)
    }).catch(function(error) {
      var errorCode = error.code;
      console.log('error : ' + errorCode)
    });
  }
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  }
}

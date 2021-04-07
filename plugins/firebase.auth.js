import { auth } from '~/plugins/firebase.js'

export default (context) => {
    const { store } = context

    return new Promise((resolve, reject) => {
        auth().onAuthStateChanged(user => {
            //ここで必要なユーザー情報のオブジェクトを作成
            store.commit('setUser', user)
            resolve()
        })
    })
}

//vuexfireのmutationsを利用するためにまずはインストールする
import { vuexfireMutations } from 'vuexfire'

//使うためにmutationsを定義して、その中でvuexfireMutationsを読み込んでexpost→これで呼び出せるようになる
export const mutations = {
  ...vuexfireMutations
}

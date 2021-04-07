export default ({ store, route, redirect }) => {
  if (!store.getters.isAuthenticated && route.name !== 'login' && route.name !== 'register') {
      console.log("sssssssssssssssss")
      redirect('/login')
  }
  if (store.getters.isAuthenticated && (route.name === 'login' || route.name === 'register')) {
      console.log("aaaaaaaaaaaaaaa")
      redirect('/')
  }
}

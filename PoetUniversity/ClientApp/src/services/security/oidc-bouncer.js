import Oidc from 'oidc-client'

var mgr = new Oidc.UserManager({
  authority: 'https://localhost:5003',
  client_id: 'poet',
  redirect_uri: 'https://localhost:8080/callback',
  response_type: 'code',
  scope: 'openid profile api1',
  post_logout_redirect_uri: 'https://localhost:8080/'
  // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
})

// disable loggin in production
Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

console.log(mgr)

export default mgr

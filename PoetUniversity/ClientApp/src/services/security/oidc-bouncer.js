// import Oidc, { UserManager } from 'oidc-client'
import config from './client-config'

import Oidc from 'oidc-client'
// var mgr = new Oidc.UserManager({
//   authority: 'https://localhost:5003',
//   client_id: 'poet',
//   redirect_uri: 'https://localhost:8080/callback.html',
//   response_type: 'code',
//   scope: 'openid profile api1',
//   post_logout_redirect_uri: 'https://localhost:8080/door'
//   // need to figure out how to get value of user out of this or set it when first log in
//   // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
// })

var mgr = new Oidc.UserManager({
  authority: config.IS4_D.authority,
  client_id: config.IS4_D.client_id,
  redirect_uri: config.IS4_D.redirect_uri,
  response_type: config.IS4_D.response_type,
  scope: config.IS4_D.scope,
  post_logout_redirect_uri: config.IS4_D.post_logout_redirect_uri
  // need to figure out how to get value of user out of this or set it when first log in
  // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
})

// disable loggin in production
Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO
console.log(mgr)

export default mgr

import Oidc from 'oidc-client'

const CLIENT_ID = 'BaXDXqmp6XX6U9UuHSC5dmrnJt6gSlJh'
const CLIENT_DOMAIN = 'shortpoet.auth0.com/'
const REDIRECT = 'https://localhost:8080/battles/battles-callback'
// const SCOPE = 'openid profile email battles-api'
const AUDIENCE = 'https://localhost:3333'

var mgr = new Oidc.UserManager({
  authority: CLIENT_DOMAIN,
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT,
  response_type: 'code',
  scope: 'openid profile api1',
  // post_logout_redirect_uri: 'https://localhost:8080/',
  audience: AUDIENCE
  // need to figure out how to get value of user out of this or set it when first log in
  // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
})

// disable loggin in production
Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

console.log(mgr)

export default mgr

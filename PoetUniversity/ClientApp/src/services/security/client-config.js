
import { WebStorageStateStore } from 'oidc-client'

const AUTH0_DOMAIN = 'https://shortpoet.auth0.com'
const AUTH0_ID = 'BaXDXqmp6XX6U9UuHSC5dmrnJt6gSlJh'

const IS4_DOMAIN = 'https://localhost:5003'
const POET_ID = 'poet'

const JSC_CALLBK = 'https://localhost:8080/callback.html'
// const RB_CALLBK = 'https://localhost:8080/callback'
const SSO_CALLBK = 'https://localhost:8080/logincallbacK'
const JP_CALLBK = 'https://localhost:8080/callback2.html'

const HOME = 'https://localhost:8080/'
const DOOR = 'https://localhost:8080/door'
const MOAT = 'https://localhost:8080/moat'
const SENTRY = 'https://localhost:8080/sentry'

const config = {
  IS4_JSC: {
    authority: IS4_DOMAIN,
    client_id: POET_ID,
    redirect_uri: JSC_CALLBK,
    response_type: 'code',
    scope: 'openid profile api1 jsc',
    post_logout_redirect_uri: HOME
  },
  IS4_D: {
    authority: IS4_DOMAIN,
    client_id: POET_ID,
    redirect_uri: JSC_CALLBK,
    response_type: 'code',
    scope: 'openid profile api1 door',
    post_logout_redirect_uri: DOOR
  },
  IS4_M: {
    authority: IS4_DOMAIN,
    client_id: POET_ID,
    redirect_uri: 'https://localhost:8080/logincallback',
    response_type: 'code',
    scope: 'openid profile api1 moat',
    post_logout_redirect_uri: MOAT
  },
  IS4_S: {
    // userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: IS4_DOMAIN,
    client_id: POET_ID,
    redirect_uri: JP_CALLBK,
    response_type: 'code',
    scope: 'openid profile api1 sentry',
    post_logout_redirect_uri: SENTRY
  },
  A0_M: {
    authority: AUTH0_DOMAIN,
    client_id: AUTH0_ID,
    redirect_uri: SSO_CALLBK,
    response_type: 'code',
    scope: 'openid profile api1',
    post_logout_redirect_uri: MOAT
  },
  A0_B: {
    authority: AUTH0_DOMAIN,
    client_id: AUTH0_ID,
    // redirect_uri: 'https://localhost:8080/battles/battles-callback',
    redirect_uri: 'https://localhost:8080/callback.html',
    response_type: 'code',
    scope: 'openid profile api1',
    post_logout_redirect_uri: 'https://localhost:8080/battles',
    audience: 'https://localhost:3333'
  },
  A0_S: {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: IS4_DOMAIN,
    client_id: POET_ID,
    redirect_uri: JSC_CALLBK,
    response_type: 'id_token token',
    scope: 'openid profile email',
    post_logout_redirect_uri: SENTRY,
    filterProtocolClaims: true,
    metadata: {
      issuer: IS4_DOMAIN + '/',
      authorization_endpoint: IS4_DOMAIN + '/authorize',
      userinfo_endpoint: IS4_DOMAIN + '/userinfo',
      end_session_endpoint: IS4_DOMAIN + '/v2/logout',
      jwks_uri: IS4_DOMAIN + '/.well-known/jwks.json'
    }
  }
}

export default config

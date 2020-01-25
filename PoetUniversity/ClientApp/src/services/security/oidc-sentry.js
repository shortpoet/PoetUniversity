// import { UserManager, WebStorageStateStore, User } from "oidc-client";
import { UserManager } from 'oidc-client'
import config from './client-config'

export default class AuthService {
  // constructor () {
  // }
  async getUserManager () {
    // let settings = {
    //   // userStore: config.IS4_S.userStore,
    //   authority: config.IS4_S.authority,
    //   client_id: config.IS4_S.client_id,
    //   redirect_uri: config.IS4_S.redirect_uri,
    //   post_logout_redirect_uri: config.IS4_S.post_logout_redirect_uri,
    //   response_type: config.IS4_S.response_type,
    //   scope: config.IS4_S.scope,
    //   audience: config.IS4_S.audience
    //   // filterProtocolClaims: config.IS4_S.filterProtocolClaims,
    //   // metadata: config.IS4_S.metadata
    // }
    let settings = config.A0_S
    let _userManager = await new UserManager(settings)
    return _userManager
  }
  async getUser () {
    try {
      let _userManager = await this.getUserManager()
      let _user = await _userManager.getUser()
      return _user
    } catch (e) {
      console.log(e)
    }
  }
  async login (returnPath) {
    try {
      let _userManager = await this.getUserManager()
      returnPath ? _userManager.signinRedirect({ state: returnPath })
        : _userManager.signinRedirect()
    } catch (e) {
      console.log(e)
    }
  }
  async logout () {
    try {
      (await this.getUserManager()).signoutRedirect()
    } catch (e) {
      console.log(e)
    }
  }
  async isLoggedIn () {
    try {
      let _userManager = await this.getUserManager()
      let _user = await _userManager.getUser()
      return (_user !== null && !_user.expired)
    } catch (e) {
      console.log(e)
    }
  }
}

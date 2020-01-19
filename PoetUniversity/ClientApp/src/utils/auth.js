import decode from 'jwt-decode'
// import axios from 'axios'
import Router from 'vue-router'
import auth0 from 'auth0-js'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'

const CLIENT_ID = 'BaXDXqmp6XX6U9UuHSC5dmrnJt6gSlJh'
const CLIENT_DOMAIN = 'shortpoet.auth0.com/'
const REDIRECT = 'https://localhost:8080/battles/battles-callback'
const SCOPE = 'openid profile email battles-api'
const AUDIENCE = 'https://localhost:3333'

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

export function login () {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  })
}

var router = new Router({
  mode: 'history'
})

export function logout () {
  clearIdToken()
  clearAccessToken()
  router.go('/battles')
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/battles',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function getIdToken () {
  console.log(localStorage)
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken () {
  let accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  console.log('checking login from auth')
  const idToken = getIdToken()
  console.log(idToken)
  // console.log(!isTokenExpired(idToken))
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  console.log(expirationDate)
  return expirationDate < new Date()
}

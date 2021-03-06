export const index = {
  // ROOT STORE @/store/index.js
  BACKEND_PREFIX_PROD: '',
  BACKEND_PREFIX_DEV: 'https://localhost:500'
}
export const auth = {
  // PARTS @/store/modules/StoreParts.js
  SERVICES_API: '1/api/Services',
  IDENTITY_API: '1/Identity',
  WEATHER_API: '1/WeatherForecast',
  BATTLES_API: '1/battles',
  PRIVATE_BATTLES_API: '1/battles/private-battles'
}
export const parts = {
  // PARTS @/store/modules/StoreParts.js
  PARTS_API: '/api/Parts/Get',
  PART_NUMBERS_API: '/api/Parts/GetPartNumbers',
  PART_DATA_API: '/api/Parts/GetAllParts',
  PART_QUERY_API: '/api/parts/Get?partnumber='
}
export const endpoints = {
  index: index,
  auth: auth,
  parts: parts
}

export default endpoints

export const index = {
  // ROOT STORE @/store/index.js
  BACKEND_PREFIX_PROD: 'https://ibp-backend.apps.pcfpre-phx.cloud.boeing.com',
  BACKEND_PREFIX_DEV: 'http://localhost:65140'
}
export const modules = {
  // MODULES @/store/modules/StoreModules.js
  MODULES_API: '/api/Modules/Get'
}
export const parts = {
  // PARTS @/store/modules/StoreParts.js
  PARTS_API: '/api/Parts/Get',
  PART_NUMBERS_API: '/api/Parts/GetPartNumbers',
  PART_DATA_API: '/api/Parts/GetAllParts',
  PART_QUERY_API: '/api/parts/Get?partnumber='
}
export const roles = {
  // ROLES @/store/modules/StoreRoles.js
  ROLES_API: '/api/Roles/Get'
}
export const dates = {
  // DATES @/store/modules/StoreDates.js
  DATES_API: '/api/Dates/Get'
}
export const tables = {
  // TABLES @/store/modules/StoreTables.js
  LOAD_TABLE_DATA: 'LOAD_TABLE_DATA',
  CHANGE_TABLE_DATA_LOADED_STATE: 'CHANGE_TABLE_DATA_LOADED_STATE',
  CHANGE_TABLE_DATA_ERRORED_STATE: 'CHANGE_TABLE_DATA_ERRORED_STATE',
  CHANGE_TABLE_CHOICE: 'CHANGE_TABLE_CHOICE'
}
export const endpoints = {
  index: index,
  modules: modules,
  parts: parts,
  roles: roles,
  dates: dates,
  tables: tables
}

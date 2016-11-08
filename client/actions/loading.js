export const APP_LOADING = 'APP_LOADING'
export const APP_READY = 'APP_READY'

export default (loading) => {
  return {
    type: loading ? APP_LOADING : APP_READY,
    payload: loading
  }
}

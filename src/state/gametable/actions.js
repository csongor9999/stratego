export const GAMETABLE_ADD = "GAMETABLE_ADD"
export const GAMETABLE_REMOVE = "GAMETABLE_REMOVE"
export const GAMETABLE_INIT = "GAMETABLE_INIT"

export const addGameTable = element => ({
  type: GAMETABLE_ADD,
  payload: element
})

export const removeGameTable = element => ({
  type: GAMETABLE_REMOVE,
  payload: element
})

export const initGameTable = element => ({
  type: GAMETABLE_INIT,
  payload: element
})
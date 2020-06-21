export const PLAYER_CHANGE = "PLAYER_CHANGE"

export const changePlayer = element => ({
  type: PLAYER_CHANGE,
  payload: element
})
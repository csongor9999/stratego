import {ENDGAME_CHANGE } from "./actions"

const initialState = 0

export const endGameReducer = (state = initialState, action) => {
  const { type } = action

  if (type === ENDGAME_CHANGE) {
    return 1;
  }

  return state
}
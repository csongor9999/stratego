import {PLAYER_CHANGE } from "./actions"

const initialState = 0

export const playerReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === PLAYER_CHANGE) {
    const element = payload
    return element;
  }

  return state
}
import {READY_ADD } from "./actions"

const initialState = 0

export const readyReducer = (state = initialState, action) => {
  const { type } = action

  if (type === READY_ADD) {
    return state + 1;
  }

  return state
}
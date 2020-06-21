import {MESSAGE_CHANGE } from "./actions"

const initialState = ''

export const messageReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === MESSAGE_CHANGE) {
    const element = payload
    return element;
  }

  return state
}
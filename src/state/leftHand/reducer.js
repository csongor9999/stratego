import {LEFTHAND_REMOVE, LEFTHAND_ADD } from "./actions"

const initialState = []

export const leftHandReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === LEFTHAND_ADD) {
    const elements = state
    const element = payload
    return [...elements, element]
  }

  if (type === LEFTHAND_REMOVE) {
    const elements = state
    const element = payload
    return elements.filter(e => e.data.id !== element.data.id);
  }

  return state
}
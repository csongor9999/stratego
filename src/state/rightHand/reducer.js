import {RIGHTHAND_REMOVE, RIGHTHAND_ADD } from "./actions"

const initialState = []

export const rightHandReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === RIGHTHAND_ADD) {
    const elements = state
    const element = payload
    return [...elements, element]
  }

  if (type === RIGHTHAND_REMOVE) {
    const elements = state
    const element = payload
    return elements.filter(e => e.data.id !== element.data.id);
  }

  return state
}
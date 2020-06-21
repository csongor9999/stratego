import { GAMETABLE_ADD, GAMETABLE_REMOVE, GAMETABLE_INIT } from "./actions"

const initialState = []

export const gameBoardReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === GAMETABLE_ADD) {
    const elements = state
    const element = payload
    return [...elements,element]
  }

  if (type === GAMETABLE_REMOVE) {
    const elements = state
    const element = payload
    return elements.filter(e => e.data.id !== element.data.id);
  }

  if (type === GAMETABLE_INIT) {
    return [];
  }

  return state
}
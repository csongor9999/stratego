import {INVENTORY_REMOVE, INVENTORY_ADD, INVENTORY_INIT } from "./actions"
import BoardData from '../BoardData.json'

const initialState = BoardData


export const inventoryReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === INVENTORY_ADD) {
    const elements = state
    const element = payload
    return [...elements, element]
  }

  if (type === INVENTORY_REMOVE) {
    const elements = state
    const element = payload
    return elements.filter(e => e.data.id !== element.data.id);
  }

  if (type === INVENTORY_INIT) {
    return BoardData;
  }

  return state
}
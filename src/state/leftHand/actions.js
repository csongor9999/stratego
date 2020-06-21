export const LEFTHAND_ADD = "LEFTHAND_ADD"
export const LEFTHAND_REMOVE = "LEFTHAND_REMOVE"

export const addLeftHand = element => ({
  type: LEFTHAND_ADD,
  payload: element
})

export const removeLeftHand = element => ({
  type: LEFTHAND_REMOVE,
  payload: element
})
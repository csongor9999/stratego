export const RIGHTHAND_ADD = "RIGHTHAND_ADD"
export const RIGHTHAND_REMOVE = "RIGHTHAND_REMOVE"

export const addRightHand = element => ({
  type: RIGHTHAND_ADD,
  payload: element
})

export const removeRightHand = element => ({
  type: RIGHTHAND_REMOVE,
  payload: element
})
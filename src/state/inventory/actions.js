export const INVENTORY_ADD = "INVENTORY_ADD"
export const INVENTORY_REMOVE = "INVENTORY_REMOVE"
export const INVENTORY_INIT = "INVENTORY_INIT"

export const addInventory = element => ({
  type: INVENTORY_ADD,
  payload: element
})

export const removeInventory = element => ({
  type: INVENTORY_REMOVE,
  payload: element
})

export const initInventory = element => ({
  type: INVENTORY_INIT,
  payload: element
})
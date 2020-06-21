import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { inventoryReducer } from "./inventory/reducer"
import { gameBoardReducer } from "./gametable/reducer"
import { leftHandReducer } from "./leftHand/reducer"
import { rightHandReducer } from "./rightHand/reducer"
import { playerReducer } from "./player/reducer"
import { messageReducer } from "./message/reducer"
import { readyReducer } from "./ready/reducer"
import { endGameReducer } from "./endGame/reducer"

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  gameBoard: gameBoardReducer,
  leftHand: leftHandReducer,
  rightHand: rightHandReducer,
  player: playerReducer,
  message: messageReducer,
  ready: readyReducer,
  endGame: endGameReducer
})

const logger = createLogger({
  collapsed: true
});

export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))
}
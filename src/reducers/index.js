import { combineReducers } from 'redux'
import currentProduct from './CurrentProduct'
import { items, itemsHasErrored, itemsIsLoading } from './Items'

export default combineReducers({
  currentProduct,
  items,
  itemsHasErrored,
  itemsIsLoading
})

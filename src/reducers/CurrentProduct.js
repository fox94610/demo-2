export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_PRODUCT':
      return action.productObj
    default:
      return state
  }
}
export const updateCurrentProduct = (productObj) => dispatch => {
  dispatch({
    type: 'UPDATE_CURRENT_PRODUCT',
    productObj
  })
}
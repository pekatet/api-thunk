const initialState = {
  item:{id: 0, name: '', price: 0, content: ''},
  status:'idle'
}


export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case 'PUT_SERVICE':
      return {...state, item: action.payload}
    case 'CHANGE_FORM_FIELD':
      const {field, value} = action.payload
      return {...state, item: {...state.item, [field]: value}}
    case 'CHANGE_FORM_STATUS':
      return {...state, status: action.payload}
    default:
      return state
  }
}
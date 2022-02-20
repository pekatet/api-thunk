//import store from '../store'

export function fetchItems(){
  return async (dispatch) => {
    dispatch(setStatus('pending'))
    console.log('in fetch')
    await fetch(process.env.REACT_APP_SERVICES_URL)
      .then((response) => {
      if(response.status >=300 && response.status <200){
        throw new Error(response.statusText);
      }
      return response
    }).then(response => response.json())
      .then(data => {
        dispatch(setStatus('success'))
        dispatch({ type: 'PUT_SERVICES', payload: data})
      },
        (e) => {
        dispatch(setStatus('error'))
        console.error('error in fetch items',e)
        })
  };
}

export function setStatus(status) {
  return {type: 'SET_STATUS', payload: status}
}

export function removeService(id) {
  return async (dispatch) => {
    dispatch(setStatus('pending'))
    await fetch(process.env.REACT_APP_SERVICES_URL + '/' + id, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        dispatch(setStatus('success'))
      },
        (e) => {
          dispatch(setStatus('error'))
          console.error('error in fetch items',e)
        })
  };
}

//form actions

export function getItem (id){
  return async (dispatch) => {
    dispatch(changeFormStatus('pending'))
    await fetch(process.env.REACT_APP_SERVICES_URL + '/' + id)
      .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        return response
      }).then(response => response.json())
      .then(data => {
        dispatch(changeFormStatus('success'))
        dispatch({ type: 'PUT_SERVICE', payload: data})
      },
        (e) => {
          dispatch(changeFormStatus('error'))
          console.error('error in fetch items',e)
        })
  };
}

export function changeFormField(field, value) {
  return {type: 'CHANGE_FORM_FIELD', payload: {field, value}}
}

export function changeFormStatus(status) {
  return {type: 'CHANGE_FORM_STATUS', payload: status}
}

export function postService (item) {
  let jsonString = JSON.stringify(item);
  return async (dispatch) => {
    dispatch(changeFormStatus('pending'));
    await fetch(process.env.REACT_APP_SERVICES_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonString
    })
      .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        else {
          dispatch(changeFormStatus('saved'))
        }
      },
        (e) => {
          dispatch(changeFormStatus('error'))
          console.error('error in fetch items',e)
        })
  };
}
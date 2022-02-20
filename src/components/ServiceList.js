import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect } from 'react'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { fetchItems, removeService, setStatus } from '../actions/actionCreators'
import ErrorMessage from './ErrorMessage'
import Spinner from 'react-bootstrap/Spinner'

function ServiceList () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch])

  let navigate = useNavigate();
  const items = useSelector(state => state.serviceList.items)
  const status = useSelector(state => state.serviceList.status)
  console.log(status)

  const handleRemove = id => {
    dispatch(removeService(id));
    dispatch(fetchItems());
  }

  if(status==='pending'){
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>)
  }
  if(status==='error'){
    return (<ErrorMessage/>)
  }

  return(
    <ul>
      {items.map(item =>
        <li className="item" key={item.id}>
          {item.name}: {item.price} руб.
          <button className="btn" onClick={() => navigate("/services/"+item.id, {replace:false})}>
            <span className="material-icons" style={{fontSize: 1.25 +'rem'}}>edit</span>
          </button>
          <button className="btn" onClick={() => handleRemove(item.id)}>✕</button>
        </li>)}
    </ul>)
}

export default ServiceList;
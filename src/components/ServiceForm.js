import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  changeFormField,
  getItem,
  postService,
} from '../actions/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './ErrorMessage'
import Spinner from 'react-bootstrap/Spinner'

function ServiceForm () {
  let navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem(params.id))
  }, [params.id])

  const item = useSelector(state => state.form.item);
  const status = useSelector(state => state.form.status);

  useEffect(() => {
    if (status==='saved'){
      navigate("/services/")
    }
  }, [navigate, status])
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ field:name, value })
    dispatch(changeFormField(name, value))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postService(item));
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

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input name='name' onChange={handleChange} value={item.name}/>
      <input name='price' onChange={handleChange} value={item.price}/>
      <input name='content' onChange={handleChange} value={item.content}/>
      <button onClick={() => navigate("/services/", {replace:true})}>Отмена</button>
      <button type='submit'>Сохранить</button>
    </form>)
}

export default ServiceForm;
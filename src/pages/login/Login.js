import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/userActions'
import Message from '../../components/Message'
import Loader from '../../components/Loader'


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo} = userLogin

    useEffect(() => {

        if(userInfo)
        {
            navigate(redirect)
        }

    } , [navigate, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) =>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) =>setPassword(e.target.value)}>
                    
                </Form.Control>
            </Form.Group>

            <Button  type='submit' variant='primary'>Sign In</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> Register </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

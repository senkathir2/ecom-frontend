import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { register } from '../../actions/userActions'
import Message from '../../components/Message'
import Loader from '../../components/Loader'



export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo} = userRegister

    useEffect(() => {

        if(userInfo)
        {
            navigate(redirect)
            //navigate('/verifyemail')
        }

    } , [navigate, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword)
        {
            setMessage('Password do not match')
        }
        else
        {
            dispatch(register(name, email, password))
        }

    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {message && <Message variant='danger'>{message}</Message> }
        {error && <Message variant='danger'>{error}</Message> }
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) =>setName(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) =>setEmail(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) =>setPassword(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Button  type='submit' variant='primary'>Register</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}> Sign In </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

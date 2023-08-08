import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { activateUserEmail } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'

export default function VerifyEmail() {

    const [email, setEmail ] = useState('')
    const [otp, setOtp] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const handleSubmit = (e) => {

        e.preventDefault()

        dispatch(activateUserEmail(email,otp))


    }

  return (
    <FormContainer>
        <h1>Verify Email</h1>
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={userInfo.email} onChange={(e) =>setEmail(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='OTP'>
                <Form.Label>OTP</Form.Label>
                <Form.Control type='text' placeholder='Enter OTP' value={otp} onChange={(e) =>setOtp(e.target.value)} required>
                    
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Submit</Button>

        </Form>
    </FormContainer>
  )
}

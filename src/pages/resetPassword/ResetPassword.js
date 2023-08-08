import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Message from '../../components/Message'

function ResetPassword() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [valid, setValid] = useState(false)
    const [error, setError] = useState('')

    const location = useLocation()
    const token = location.search.split('=')[2]
    const userid = location.search.split('=')[1].split('&')[0]

    console.log(token)
    console.log(userid)

    useEffect( () => {

        const fetchData = async() => {
            const res = await fetch(`/password-reset/${userid}/${token}/`,{
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                },
            })

            const json = await res.json()

            if(!res.ok)
            {
                setError(json.error)
            }
            else
            {
                setValid(json.success)
            }

            console.log(json)
        }

        fetchData()

    }, [token, userid])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(password !== confirmPassword)
        {
            setMessage('Password do not match')
        }
        else
        {
            const res = await fetch('/password-reset-complete/', {
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({'password':password,'token':token,'uidb64':userid})
            })

            const json = await res.json()

            setMessage(json.message)

            console.log(json)
        }

    }

  return (
    <FormContainer>
        <h1>Reset Password</h1>
        {message && <Message variant='danger'>{message}</Message> }
        {error && <Message variant='danger'>{error}</Message> }
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' value={password} onChange={(e) =>setPassword(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' disabled={!valid}>Submit</Button>

        </Form>
    </FormContainer>
  )
}

export default ResetPassword
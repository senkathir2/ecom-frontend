import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'
import FormContainer from '../../components/FormContainer'


export default function Shipping() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const handleSubmit = (e) => {

        e.preventDefault()

        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        
        navigate('/payment')

    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address ? address : ''} onChange={(e) => setAddress(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter City' value={city ? city : ''} onChange={(e) => setCity(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode ? postalCode : ''} onChange={(e) => setPostalCode(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter Country' value={country ? country : ''} onChange={(e) => setCountry(e.target.value)} required>

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>

        </Form>
    </FormContainer>
  )
}

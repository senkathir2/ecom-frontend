import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'
import FormContainer from '../../components/FormContainer'

export default function Payment() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address)
    {
        navigate('/login/shipping')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(savePaymentMethod(paymentMethod))

        navigate('/placeorder')

    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='PayPal or Credit Card' 
                        id='paypal' name='paymentMethod' 
                        checked 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>

        </Form>

    </FormContainer>
  )
}

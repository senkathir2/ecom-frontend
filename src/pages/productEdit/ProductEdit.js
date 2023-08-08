import React, { useEffect, useState } from 'react'
import { Button, Form, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listProductDetails, updateProduct } from '../../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../../contants/productConstants'



export default function ProductEdit() {

    const { id : productId } = useParams('id')

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate

    useEffect(() => {

        if(successUpdate)
        {
            dispatch({ type:PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        }
        else
        {
            if(!product.name || product._id !== Number(productId))
            {
                dispatch(listProductDetails(productId))
            }
            else
            {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    } , [productId, dispatch, product._id, navigate, successUpdate])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
        
    }

    const handleUpload = async(e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try
        {
            const config = {
                method:'POST',
                body:formData
            }

            const res = await fetch('/ecom/product/upload/', config)
            const json = await res.json()

            setImage(json)
            setUploading(false)
        }
        catch(error)
        {
            setUploading(false)
        }

    }

  return (
    <div>
        <Link to='/admin/productlist'>Go Back</Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
            : (

                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) =>setName(e.target.value)} >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) =>setPrice(e.target.value)} >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Upload Image' value={image} onChange={(e) =>setImage(e.target.value)} >

                        </Form.Control>
                        
                        <Form.Control type='file'   onChange={handleUpload} >

                        </Form.Control>

                        {uploading && <Loader/>}

                        {/* <Form.File  id='image-file' label='Choose File' custom onChange={handleUpload}>

                        </Form.File> */}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) =>setBrand(e.target.value)} >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter stock' value={countInStock} onChange={(e) =>setCountInStock(e.target.value)} >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) =>setCategory(e.target.value)} >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) =>setDescription(e.target.value)} >

                        </Form.Control>
                    </Form.Group>

                    


                    <Button  type='submit' variant='primary'>Update</Button>

                </Form>
            )}    

        </FormContainer>
    </div>
  )
}
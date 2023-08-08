import React, { useEffect,  } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { createProduct, deleteProducts, listProducts } from '../../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../../contants/productConstants'
import Paginate from '../../components/Paginate'


export default function ProductList() {

    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCrate, error:errorCreate, success:successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = window.location.search

    console.log(keyword)
    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })

        if( !userInfo.isAdmin)
        {
            navigate('/login')
        }

        if(successCreate)
        {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else
        {
            dispatch(listProducts(keyword))
        }
        
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

    const handleDelete = (id) => {

        if(window.confirm('Are you sure you want to delete this product?'))
        {
            dispatch(deleteProducts(id))
        }

    }

    const handleCreate = () => {

        dispatch(createProduct())

    }

  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={handleCreate}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danager'>{errorDelete}</Message>}

        {loadingCrate && <Loader/>}
        {errorCreate && <Message variant='danager'>{errorCreate}</Message>}

        {loading 
            ? (<Loader/>) 
            : error 
                ? (<Message variant='danger'>{error}</Message>)
                :(  <div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>    
                        </thead>

                        <tbody>
                            {products.map( product =>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' ></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => handleDelete(product._id)}>
                                            <i className='fas fa-trash' ></i>
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                    </div>
                )}
    </div>
  )
}
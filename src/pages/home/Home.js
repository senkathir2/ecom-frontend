import React, { useEffect, useState } from 'react'
import './Home.css'
import { Col, Row } from 'react-bootstrap'

import Product from '../../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productAction'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useLocation } from 'react-router-dom'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'

export default function Home() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    const location = useLocation()

    let keyword = location.search

    useEffect(() =>{

        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    //const products = []
  return (
    <div>
        {!keyword && <ProductCarousel />}
        <h1>Latest Products</h1>
        {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Row>
                        {products && products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword} />
                </div>
        }
    </div>
  )
}

import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../contants/productConstants"
import axios from 'axios'


export const listProducts = (keyword='') => async (dispatch) => {

    try
    {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const res = await fetch(`/ecom/product${keyword}`)
        const json = await res.json()

        dispatch({ type:PRODUCT_LIST_SUCCESS, payload: json})
    }
    catch (error)
    {
        dispatch({ type:PRODUCT_LIST_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}

export const listProductDetails = (id) => async (dispatch) => {

    try
    {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const res = await fetch(`/ecom/products/${id}/`)
        const json = await res.json()

        dispatch({ type:PRODUCT_DETAILS_SUCCESS, payload: json})
    }
    catch (error)
    {
        dispatch({ type:PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}

export const deleteProducts = (id) => async (dispatch , getState) => {

    try
    {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/product/delete/${id}/`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type:PRODUCT_DELETE_SUCCESS })
    }
    catch (error)
    {
        dispatch({ type:PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}

export const createProduct = () => async (dispatch , getState) => {

    try
    {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/product/create/`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({})
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type:PRODUCT_CREATE_SUCCESS, payload:json })
    }
    catch (error)
    {
        dispatch({ type:PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}

export const updateProduct = (product) => async (dispatch , getState) => {

    try
    {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/product/update/${product._id}/`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(product)
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type:PRODUCT_UPDATE_SUCCESS, payload:json })

        dispatch({ type:PRODUCT_DETAILS_SUCCESS, payload:json })
    }
    catch (error)
    {
        dispatch({ type:PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}

export const createProductReview = (productId, review) => async (dispatch , getState) => {

    try
    {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: { userInfo } } = getState()

        // const { data } = await axios.post(`/ecom/product/${productId}/reviews/`,review, {
        //     headers:{
        //         "Content-Type":"application/json",
        //         Authorization : `Bearer ${userInfo.token}`
        //     }
        // })

        const res = await fetch(`/ecom/product/${productId}/reviews/`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(review)
        })

        const json = await res.json()
        
        if(!res.ok)
        {
            throw new Error(json.detail)
        }

        

        dispatch({ type:PRODUCT_CREATE_REVIEW_SUCCESS, payload:json })

    }
    catch (error)
    {
        dispatch({ type:PRODUCT_CREATE_REVIEW_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}

export const listTopProducts = ( ) => async (dispatch) => {

    try
    {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const res = await fetch(`/ecom/product/top`)
        const json = await res.json()

        dispatch({ type:PRODUCT_TOP_SUCCESS, payload: json})
    }
    catch (error)
    {
        dispatch({ type:PRODUCT_TOP_FAIL, payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message, })
    }

}


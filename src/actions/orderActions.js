import { CART_CLEAR_ITEMS } from "../contants/cartConstants"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../contants/orderConstants"




export const createOrder = ( order ) => async (dispatch, getState) => {

    try 
    {

        dispatch({ type: ORDER_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch('/ecom/order/add/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(order)
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        //console.log(json)

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: json})

        dispatch({ type: CART_CLEAR_ITEMS, payload: json })

        localStorage.removeItem('cartItems')
        
    } 
    catch(error) 
    {
        dispatch({ 
            type:ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message, 
        })
    }


}


export const getOrderDetails = ( id ) => async (dispatch, getState) => {

    try 
    {

        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/order/${id}/`,{           
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

        //console.log(json)

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: json})
        
    } 
    catch(error) 
    {
        dispatch({ 
            type:ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message, 
        })
    }


}

export const payOrder = ( id, paymentResult ) => async (dispatch, getState) => {

    try 
    {

        dispatch({ type: ORDER_PAY_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/order/${id}/pay/`,{           
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(paymentResult)
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        //console.log(json)

        dispatch({ type: ORDER_PAY_SUCCESS, payload: json})
        
    } 
    catch(error) 
    {
        dispatch({ 
            type:ORDER_PAY_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message, 
        })
    }


}

export const deliverOrder = ( order ) => async (dispatch, getState) => {

    try 
    {

        dispatch({ type: ORDER_DELIVER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/order/${order._id}/deliver/`,{           
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: {}
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        //console.log(json)

        dispatch({ type: ORDER_DELIVER_SUCCESS, payload:json })
        
    } 
    catch(error) 
    {
        dispatch({ 
            type:ORDER_DELIVER_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message, 
        })
    }


}

export const lsitMyOrders = ( ) => async (dispatch, getState) => {

    try 
    {

        dispatch({ type: ORDER_LIST_MY_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch('/ecom/myorders/',{           
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

        //console.log(json)

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: json})
        
    } 
    catch(error) 
    {
        dispatch({ 
            type:ORDER_LIST_MY_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message, 
        })
    }


}

export const listOrders = ( ) => async (dispatch, getState) => {

    try 
    {

        dispatch({ type: ORDER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch('/ecom/order/',{           
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

        //console.log(json)

        dispatch({ type: ORDER_LIST_SUCCESS, payload: json})
        
    } 
    catch(error) 
    {
        dispatch({ 
            type:ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message, 
        })
    }


}
import { ORDER_LIST_MY_RESET } from "../contants/orderConstants"
import { USER_ACTIVATE_FAIL, USER_ACTIVATE_REQUEST, USER_ACTIVATE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../contants/userConstants"
import axios from "axios"


export const login = (email, password) => async (dispatch) => {

    try
    {

        dispatch({ type: USER_LOGIN_REQUEST })

        const res = await fetch('/ecom/user/login/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ 'username' : email, 'password' : password })
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type: USER_LOGIN_SUCCESS, payload: json})

        localStorage.setItem('userInfo', JSON.stringify(json))

    }
    catch(error)
    {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}

export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo')

    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET})

}


export const register = (name, email, password) => async (dispatch) => {

    try
    {

        dispatch({ type: USER_REGISTER_REQUEST })

        const res = await fetch('/ecom/user/register/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ 'name' : name, 'email' : email, 'password' : password })
        })

        const json = await res.json()

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        dispatch({ type: USER_REGISTER_SUCCESS, payload: json})

        dispatch({ type: USER_LOGIN_SUCCESS, payload: json})

        localStorage.setItem('userInfo', JSON.stringify(json))

    }
    catch(error)
    {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}

export const getUserDetails = ( id ) => async (dispatch, getState) => {

    try
    {

        dispatch({ type: USER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/user/${id}/`,{
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type: USER_DETAILS_SUCCESS, payload: json})


    }
    catch(error)
    {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}

export const updateUserProfile = ( user ) => async (dispatch, getState) => {

    try
    {

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch('/ecom/user/profile/update/',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(user)
        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        //console.log(json)

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: json})

        dispatch({ type: USER_LOGIN_SUCCESS, payload: json})

        localStorage.setItem('userInfo', JSON.stringify(json))


    }
    catch(error)
    {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}


export const listUsers = ( ) => async (dispatch, getState) => {

    try
    {

        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch('/ecom/users/',{
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

        dispatch({ type: USER_LIST_SUCCESS, payload: json})


    }
    catch(error)
    {
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}

export const deleteUser = (id) => async (dispatch, getState) => {

    try
    {

        dispatch({ type: USER_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/user/delete/${id}/`,{
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

        console.log(json)

        dispatch({ type: USER_DELETE_SUCCESS, payload: json})


    }
    catch(error)
    {
        dispatch({
            type:USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}

export const updateUser = ( user ) => async (dispatch, getState) => {

    try
    {

        dispatch({ type: USER_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/user/update/${user._id}/`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(user)

        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type: USER_UPDATE_SUCCESS, payload: json})

        dispatch({ type: USER_DELETE_SUCCESS, payload: json})


    }
    catch(error)
    {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}

export const activateUserEmail = ( email, otp ) => async (dispatch, getState) => {

    try
    {

        dispatch({ type: USER_ACTIVATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const res = await fetch(`/ecom/userEmail/`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Authorization : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({ 'email':email, 'otp':otp })

        })

        if(!res.ok)
        {
            throw new Error(res.statusText)
        }

        const json = await res.json()

        dispatch({ type: USER_ACTIVATE_SUCCESS, payload: json})



    }
    catch(error)
    {
        dispatch({
            type:USER_ACTIVATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}



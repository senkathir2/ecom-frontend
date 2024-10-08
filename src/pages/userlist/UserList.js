import React, { useEffect,  } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { deleteUser, listUsers } from '../../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'


export default function UserList() {

    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success : successDelete } = userDelete

    useEffect(() => {

        if(userInfo && userInfo.isAdmin)
        {
            dispatch(listUsers())
        }
        else
        {
            navigate('/login')
        }
        
    }, [dispatch, navigate, successDelete, userInfo])

    const handleDelete = (id) => {

        if(window.confirm('Are you sure you want to delete this user?'))
        {
            dispatch(deleteUser(id))
        }

    }

  return (
    <div>
        <h1>Users</h1>
        {loading 
            ? (<Loader/>) 
            : error 
                ? (<Message variant='danger'>{error}</Message>)
                :(
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>    
                        </thead>

                        <tbody>
                            {users.map( user =>(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green'}}></i>
                                    ) : (
                                        <i className='fas fa-check' style={{ color: 'red'}}></i>
                                    )}</td>

                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' ></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => handleDelete(user._id)}>
                                            <i className='fas fa-trash' ></i>
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'

import { getUsers } from '../../services/api'

import { CardLayout } from '../CardLayout'

const renderUsers = (users) => {
  return users.map((user, i) => {
    return (
      <tr key={user.id}>
        <th scope='row'>{i + 1}</th>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.resort}</td>
      </tr>
    )
  })
}

export const UsersList = () => {
  const [currentUsers, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  return (
    <CardLayout title='Users Registered'>
      <table className='table table-striped'>
        <thead className='thead-light'>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Favorite Resort</th>
          </tr>
        </thead>
        <tbody>
          {renderUsers(currentUsers)}
        </tbody>
      </table>
    </CardLayout>
  )
}

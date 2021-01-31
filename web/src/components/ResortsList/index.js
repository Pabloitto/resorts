import React, { useEffect, useState } from 'react'
import { getResorts } from '../../services/api'

import { CardLayout } from '../CardLayout'
import { ResortForm } from '../ResortForm'

const ActionButtons = () => {
  return (
    <>
      <a>
        <i className='glyphicon glyphicon-pencil' />
      </a>
      <a>
        <i className='glyphicon glyphicon-trash' />
      </a>
    </>
  )
}

const renderResorts = (resorts) => {
  return resorts.map((resort, i) => {
    return (
      <tr key={resort.id}>
        <th scope='row'>{i + 1}</th>
        <td>{resort.name}</td>
        <td>{resort.description}</td>
        <td>
          <ActionButtons />
        </td>
      </tr>
    )
  })
}

export const ResortsList = () => {
  const [currentResorts, setResorts] = useState([])

  useEffect(() => {
    getResorts().then((resorts) => {
      setResorts(resorts)
    })
  }, [])

  const onSubmit = () => {
    getResorts().then((resorts) => {
      setResorts(resorts)
    })
  }

  return (
    <CardLayout title='Resorts'>
      <ResortForm onSubmit={onSubmit} />
      <br />
      <table className='table table-striped'>
        <thead className='thead-light'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderResorts(currentResorts)}
        </tbody>
      </table>
    </CardLayout>
  )
}

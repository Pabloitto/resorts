import React, { useEffect, useState } from 'react'

import { deleteResort, getResorts } from '../../services/api'

import { ActionButtons } from '../ActionButtons'

import { CardLayout } from '../CardLayout'

import { ResortForm } from '../ResortForm'

const renderResorts = (resorts, onEdit, onDelete) => {
  return resorts.map((resort, i) => {
    return (
      <tr key={resort.id}>
        <th scope='row'>{i + 1}</th>
        <td>{resort.name}</td>
        <td>{resort.description}</td>
        <td>
          <ActionButtons
            onEdit={() => onEdit(resort)}
            onDelete={() => onDelete(resort)}
          />
        </td>
      </tr>
    )
  })
}

export const ResortsList = () => {
  const [currentResorts, setResorts] = useState([])
  const [resortForEdition, setResortForEdition] = useState({})

  useEffect(() => {
    getResorts().then((resorts) => {
      setResorts(resorts)
    })
  }, [])

  const onSubmit = () => {
    getResorts().then((resorts) => {
      setResorts(resorts)
      setResortForEdition({})
    })
  }

  const onEdit = (resort) => {
    setResortForEdition({
      ...resortForEdition,
      ...resort
    })
  }

  const onDelete = (resort) => {
    deleteResort(resort.id).then(() => {
      getResorts().then((resorts) => {
        setResorts(resorts)
      })
    })
  }

  const onChangeResort = (fieldName, value) => {
    const updates = { [fieldName]: value }
    setResortForEdition({
      ...resortForEdition,
      ...updates
    })
  }

  return (
    <CardLayout title='Resorts'>
      <ResortForm
        onSubmit={onSubmit}
        initialState={resortForEdition}
        onChange={onChangeResort}
      />
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
          {renderResorts(currentResorts, onEdit, onDelete)}
        </tbody>
      </table>
    </CardLayout>
  )
}

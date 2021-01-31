import React from 'react'

import { saveResort } from '../../services/api'

export const ResortForm = ({
  onSubmit
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: e.target.name.value,
      description: e.target.description.value
    }
    await saveResort(payload)
    e.target.name.value = ''
    e.target.description.value = ''
    onSubmit && onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          className='form-control'
          placeholder='Name'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <input
          id='description'
          type='text'
          className='form-control'
          placeholder='Description'
          required
        />
      </div>
      <button type='submit' className='btn btn-primary'>Save</button>
    </form>
  )
}

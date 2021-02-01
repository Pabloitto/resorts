import React from 'react'

import { saveOrUpdateResort } from '../../services/api'

export const ResortForm = ({
  onSubmit,
  onChange,
  initialState = {}
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: e.target.name.value,
      description: e.target.description.value
    }
    await saveOrUpdateResort(initialState.id, payload)
    onSubmit && onSubmit()
  }

  const handleChange = (fieldName) => (evt) => {
    onChange(fieldName, evt.target.value)
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
          value={initialState.name || ''}
          required
          onChange={handleChange('name')}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <input
          id='description'
          type='text'
          className='form-control'
          placeholder='Description'
          value={initialState.description || ''}
          required
          onChange={handleChange('description')}
        />
      </div>
      <button type='submit' className='btn btn-primary'>Save</button>
    </form>
  )
}

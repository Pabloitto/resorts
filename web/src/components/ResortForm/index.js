import React from 'react'

export const ResortForm = () => {
  return (
    <form>
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

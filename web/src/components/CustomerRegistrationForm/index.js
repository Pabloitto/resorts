import React, { useEffect, useState } from 'react'

import { getResorts, saveUser } from '../../services/api'

import { CardLayout } from '../CardLayout'

import { ResortChooser } from '../ResortChooser'

export const CustomerRegistrationForm = () => {
  const [currentResorts, setResorts] = useState([])

  useEffect(() => {
    getResorts().then((resorts) => {
      setResorts(resorts)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      email: e.target.email.value,
      resort: e.target.resort.value
    }
    await saveUser(payload)
    e.target.firstName.value = ''
    e.target.lastName.value = ''
    e.target.email.value = ''
    e.target.resort.value = ''
  }

  return (
    <CardLayout title='Customer Registration'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            id='firstName'
            type='text'
            className='form-control'
            placeholder='First Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            id='lastName'
            type='text'
            className='form-control'
            placeholder='Last Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            className='form-control'
            placeholder='Email'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='resort'>Favorite Resort</label>
          <ResortChooser
            id='resort'
            className='form-control'
            defaultLabel='Choose your favorite resort'
            resorts={currentResorts}
            onChange={(item) => console.log(item)}
            fallback={() => (
              <input
                id='resort'
                type='text'
                className='form-control'
                placeholder='Type your favorit resort'
                onChange={(evt) => console.log(evt.target.value)}
                required
              />
            )}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>Save</button>
      </form>
    </CardLayout>
  )
}

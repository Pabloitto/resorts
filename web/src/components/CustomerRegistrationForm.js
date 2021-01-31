import React from 'react'

export const CustomerRegistrationForm = () => {
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' className='form-control' id='firstName' placeholder='First Name' />
      </div>
      <div className='form-group'>
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' className='form-control' id='lastName' placeholder='Last Name' />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' className='form-control' id='email' placeholder='Email' />
      </div>
      <div className='form-group'>
        <label htmlFor='resort'>Favorite Resort</label>
        <select className='form-control' id='resort'>
          <option>Choose your favorite resort</option>
        </select>
      </div>
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  )
}

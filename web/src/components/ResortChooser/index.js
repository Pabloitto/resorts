import React from 'react'

import PropTypes from 'prop-types'

const renderResorts = (resorts) => {
  return resorts.map((resort) => {
    return (
      <option
        key={resort.id}
        value={resort.id}
      >
        {resort.name}
      </option>
    )
  })
}

export const ResortChooser = ({
  id,
  defaultLabel,
  className = '',
  resorts = [],
  onChange = () => {},
  required = false,
  fallback = null
}) => {
  if (!resorts || resorts.length === 0) {
    return fallback()
  }

  const handleChange = (evt) => {
    onChange && onChange(evt.target.value)
  }

  return (
    <select
      id={id}
      className={className}
      onChange={handleChange}
      required={required}
    >
      <option>{defaultLabel}</option>
      {renderResorts(resorts)}
    </select>
  )
}

ResortChooser.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  resorts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  })),
  defaultLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  fallback: PropTypes.func,
  required: PropTypes.bool
}

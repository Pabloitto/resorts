import React from 'react'

const styles = {
  marginRight: 5,
  cursor: 'pointer',
  color: '#007bff'
}

export const ActionButton = ({
  onClick,
  icon
}) => {
  return (
    <a onClick={onClick} style={styles}>
      <i className={`glyphicon glyphicon-${icon}`} />
    </a>
  )
}

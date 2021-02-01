import React from 'react'

import { ActionButton } from './ActionButton'

export const ActionButtons = ({
  onEdit,
  onDelete
}) => {
  return (
    <>
      <ActionButton icon='pencil' onClick={onEdit} />
      <ActionButton icon='trash' onClick={onDelete} />
    </>
  )
}

/* eslint-disable react/prop-types */

import React from 'react'

const LabelWithAsterisk = ({ labelText, isRequired = true, sublabel = '' }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '15px',
      }}
    >
      <span
        style={{
          flex: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {labelText}
        {isRequired && (
          <span aria-hidden="true" style={{ color: 'red', marginRight: '5px' }}>
            *
          </span>
        )}
      </span>

      {sublabel && (
        <span
          style={{
            color: '#6c757d',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            flexShrink: 0,
            textAlign: 'right',
          }}
        >
          {sublabel}
        </span>
      )}
    </div>
  )
}

export default LabelWithAsterisk

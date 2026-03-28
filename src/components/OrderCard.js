/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Theme } from 'src/constants/colors'
import { useWidth } from 'src/hooks/general/useWidth'
import React from 'react'

const OrderCard = ({ title, info }) => {
  const { width } = useWidth()

  return (
    <div
      style={
        width < 768
          ? {
              backgroundColor: Theme.primaryLight,
              borderRadius: 5,
              boxShadow: '0px 2px 3px #c8c8c8',
              // margin: '1rem',
              padding: '1rem',
              paddingBottom: 0,
              width: '49%',
              rowGap: 5,
              marginBottom: '0.5rem',
            }
          : {
              backgroundColor: Theme.primaryLight,
              borderRadius: 5,
              boxShadow: '0px 2px 3px #c8c8c8',
              // margin: '1rem',
              padding: '1rem',
              paddingBottom: 0,
              width: '20%',
              rowGap: 5,
            }
      }
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
      <p>{info}</p>
    </div>
  )
}

export default OrderCard

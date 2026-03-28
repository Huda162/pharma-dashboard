/* eslint-disable react/prop-types */

import React from 'react'
import { CCard, CCardBody, CCol } from '@coreui/react'
import { Theme } from 'src/constants/colors'

const CountCard = ({ icon, title, count, onClick }) => {
  return (
    <CCol>
      <CCard
        onClick={onClick}
        className="mt-2"
        style={{
          backgroundColor: Theme.white,
          border: 'none',
          boxShadow: '0px 2px 3px #c8c8c8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CCardBody>
          <p className="p-0 m-0">
            {icon}
            <b>{title}:</b>
            {count}
          </p>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default CountCard

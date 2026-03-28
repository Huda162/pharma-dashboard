/* eslint-disable react/prop-types */

import { CCard } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import React from 'react'

const AppCard = (props) => {
  return (
    <CCard
      className="rounded my-3"
      style={{
        backgroundColor: Theme.white,
        boxShadow: '0px 2px 3px #c8c8c8',
        border: 'none',
        padding: 15,
      }}
    >
      {props.children}
    </CCard>
  )
}

export default AppCard

/* eslint-disable react/prop-types */

import empty from '../assets/images/empty-folder.png'
import React from 'react'

const EmptyPage = ({ emptyItems }) => {
  return (
    <div className="m-3 py-3 d-flex align-items-center justify-content-center flex-column">
      <h5>لا يوجد {emptyItems} في الوقت الحالي</h5>
      <br />
      <img src={empty} alt="image" width="350" />
    </div>
  )
}

export default EmptyPage

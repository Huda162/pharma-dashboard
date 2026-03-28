/* eslint-disable react/prop-types */

import React from 'react'
import { CProgress, CProgressBar } from '@coreui/react'

const ProgressBar = ({ progress }) => {
  return (
    <CProgress color="success" variant="striped" animated value={progress}>
      <CProgressBar>{progress}%</CProgressBar>
    </CProgress>
  )
}

export default ProgressBar

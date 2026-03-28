/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import avatar from '../../assets/images/avatars/ava3.png'
import { useNavigate } from 'react-router-dom'
import { NotePencil } from 'phosphor-react'

const CurrentUser = () => {
  const currentUser = sessionStorage.getItem('name')
  const id = sessionStorage.getItem('id')
  const navigate = useNavigate()
  return (
    <>
      WE
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CAvatar src={avatar} size="large" style={{ width: '120px', border: '6px solid white' }} />
        <span style={{ marginTop: '40px' }}>{currentUser}</span>
        <div
          style={{
            backgroundColor: '#38b0f1',
            width: '75px',
            // margin: '20',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderRadius: '10px',
            padding: '5px',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/edit_user/${id}`)}
        >
          <NotePencil size={18} weight="duotone" color="white" />
          <span style={{ color: 'white' }}>تعديل</span>
        </div>
      </div>
    </>
  )
}

export default CurrentUser

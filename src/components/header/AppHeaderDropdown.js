import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilHome,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/male_avatar.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { CaretDown } from 'phosphor-react'
import { Theme } from 'src/constants/colors'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [showDialog, setShowDialog] = useState(false)
  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }
  const id = sessionStorage.getItem('id')
  return (
    <CDropdown variant="nav-item" dir="ltr">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <span style={{ margin: '5px', backgroundColor: '' }}>
          <CaretDown size={20} weight="duotone" color="black" />
        </span>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader> */}
        <CDropdownItem dir="rtl">
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black ' }}>
            <CIcon icon={cilHome} className="me-2" />
            <span className="m-"> الصفحة الرئيسية</span>
          </Link>
        </CDropdownItem>
        <CDropdownItem dir="rtl">
          <Link to={`/edit_user/${id}`} style={{ textDecoration: 'none', color: 'black ' }}>
            {' '}
            <CIcon icon={cilUser} />
            <span className="m-2">الملف الشخصي</span>
          </Link>
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem dir="rtl" onClick={() => setShowDialog(true)} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} />
          <span className="m-2">تسجيل الخروج</span>
        </CDropdownItem>
      </CDropdownMenu>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="white" style={{ backgroundColor: '#ff3a31' }}>
          هل تريد بالتأكيد تسجيل الخروج؟
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>إلغاء</Button>
          <Button onClick={() => logout()} style={{ backgroundColor: '#ff3a31', color: 'white' }}>
            نعم بالتأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </CDropdown>
  )
}

export default AppHeaderDropdown

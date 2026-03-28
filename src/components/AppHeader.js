import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb, AppSidebar } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { List } from 'phosphor-react'
import { useSidebar } from 'src/context/SidebarContext'
import { Theme } from 'src/constants/colors'
import './test.css'

const AppHeader = () => {
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const { isSidebarOpen, toggleSidebar } = useSidebar()

  return (
    <div className="app-header">
      {/* <CContainer fluid> */}
      <div>
        <input type="checkbox" id="drop-check" onChange={toggleSidebar}></input>
        <label htmlFor="drop-check" id="drop">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </label>
      </div>{' '}
      {/* <CHeaderBrand className="mx-auto d-md-none" to="/"></CHeaderBrand> */}
      {/* <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              الصفحة الرئيسية
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
      {/* <CButton style={{ width: '150px', marginTop: '10px' }} onClick={() => handleLogout()}>
          <span style={{ fontWeight: 'bolder' }}> تسجيل الخروج</span>
        </CButton> */}
      {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
      {/* <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer> */}
      {/* <CHeaderDivider /> */}
    </div>
  )
}

export default AppHeader

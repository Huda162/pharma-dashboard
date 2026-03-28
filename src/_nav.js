import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApps,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilJustifyCenter,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'المستخدمين',
    to: '/users',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'الزبائن',
    to: '/customers',
    icon: <CIcon icon={cilJustifyCenter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'المنتجات',
    to: '/products',
    icon: <CIcon icon={cilJustifyCenter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'قسم التصميم',
    to: '/design_category',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'الطلبيات',
    to: '/orders',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

export default _nav

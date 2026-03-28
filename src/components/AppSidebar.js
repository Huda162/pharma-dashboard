import React, { useEffect, useRef } from 'react'
import './test.css'
import { CDBSidebarMenuItem } from 'cdbreact'

import { NavLink, useLocation } from 'react-router-dom'
import {
  Cards,
  FacebookLogo,
  Tag,
  ChatsCircle,
  ShoppingCartSimple,
  House,
  CirclesThreePlus,
  UserCircle,
  Question,
  SidebarSimple,
  Gear,
  Gift,
  SignOut,
  Sparkle,
  UsersThree,
  MapPinLine,
  CoatHanger,
} from 'phosphor-react'
import { useSidebar } from 'src/context/SidebarContext'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatars/male_avatar.png'
import { Theme } from 'src/constants/colors'
import '../layout/layout.css'
import '../scss/_custom.scss'
import { useLogin } from 'src/hooks/login/useLogin'
import AppDialog from './AppDialog'
import { useWidth } from 'src/hooks/general/useWidth'

function Sidebar() {
  const { openSidebar, closeSidebar } = useSidebar()
  const name = sessionStorage.getItem('name') || localStorage.getItem('pharma_name')
  const location = useLocation()
  const prevLocationRef = useRef(location.pathname)
  const { width } = useWidth()
  const { logout, openSignoutDialog, closeSignoutDialog, showSignoutDialog } = useLogin()

  useEffect(() => {
    if (width > 768 && location.pathname !== '/dashboard') {
      openSidebar()
    } else if (location.pathname === '/dashboard') {
      closeSidebar()
    }
  }, [location])
  const menuItems = [
    { to: '/dashboard', icon: <House size={20} />, label: 'الصفحة الرئيسية' },
    { to: '/categories', icon: <CirclesThreePlus size={20} />, label: 'الأقسام' },
    { to: '/brands', icon: <Sparkle size={20} />, label: 'العلامات' },
    { to: '/products', icon: <Tag size={20} />, label: 'المنتجات' },
    { to: '/orders', icon: <ShoppingCartSimple size={20} />, label: 'الطلبيات' },
    { to: '/sliders', icon: <SidebarSimple size={20} />, label: 'الشرائح' },
    { to: '/banners', icon: <Cards size={20} />, label: 'البنرات' },
    { to: '/users', icon: <UserCircle size={20} />, label: 'المستخدمين' },
    { to: '/customers', icon: <UsersThree size={20} />, label: 'العملاء' },
    { to: '/coupons', icon: <Gift size={20} />, label: 'الكوبونات' },
    { to: '/areas', icon: <MapPinLine size={20} />, label: 'المناطق' },
    { to: '/socials', icon: <FacebookLogo size={20} />, label: 'التواصل' },
    { to: '/about_us', icon: <Question size={20} />, label: 'من نحن' },
    { to: '/feedbacks', icon: <ChatsCircle size={20} />, label: 'ملاحظات' },
  ]
  const firstSixItems = menuItems.slice(0, 6)

  useEffect(() => {
    const prevLocation = prevLocationRef.current
    const activeLink = document.querySelector(`.customNav[href="${prevLocation}"]`)
    if (activeLink) {
      activeLink.classList.add('leaving')
      setTimeout(() => {
        activeLink.classList.remove('leaving')
      }, 300)
    }
    prevLocationRef.current = location.pathname
  }, [location])

  return (
    <div className="sidebar-container">
      <nav
        id="sidebar"
        className="sidebar-wrapper almarai-regular"
        style={{
          transition: 'width 0.3s ease, right 0.3s ease',
        }}
      >
        <div className="logo-container d-flex justify-content-center" style={{ margin: '1px' }}>
          <img src={logo} alt="Logo" width={100} />
        </div>
        <NavLink exact to="/dashboard">
          <CDBSidebarMenuItem
            style={{ backgroundColor: Theme.primaryLight, borderRadius: 5 }}
            className={`customNav ${location.pathname === '/dashboard' ? 'activeClicked' : ''}`}
          >
            <div className="logo-container">
              <img src={avatar} alt="Logo" width={23} style={{ borderRadius: '100%' }} />
              <span
                style={{
                  color: Theme.white,
                  marginRight: '10px',
                  textDecorationLine: 'underline',
                }}
              >
                {name}
              </span>
            </div>
          </CDBSidebarMenuItem>
        </NavLink>
        <div
          className="grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0px',
            margin: '20px 15px',
          }}
        >
          {firstSixItems.map((item, index) => (
            <NavLink key={index} exact to={item.to}>
              <CDBSidebarMenuItem
                className={`customNav grid-item ${
                  location.pathname === item.to ? 'activeClicked' : ''
                }`}
                style={{
                  height: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px 3px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  margin: '2px',
                }}
              >
                <div
                  style={{
                    marginBottom: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '25px',
                    padding: '3px 3px',
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '500',
                  }}
                >
                  {item.label}
                </span>
              </CDBSidebarMenuItem>
            </NavLink>
          ))}
        </div>
        <div style={{ overflowY: 'scroll' }}>
          <NavLink exact to="/banners">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/banners' ? 'activeClicked' : ''}`}
            >
              <Cards size={25} /> البنرات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/users">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/users' ? 'activeClicked' : ''}`}
            >
              <UserCircle size={25} /> المستخدمين
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/customers">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/customers' ? 'activeClicked' : ''}`}
            >
              <UsersThree size={25} /> العملاء
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/coupons">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/coupons' ? 'activeClicked' : ''}`}
            >
              <Gift size={25} /> الكوبونات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/areas">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/area' ? 'activeClicked' : ''}`}
            >
              <MapPinLine size={25} /> المناطق
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/socials">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/socials' ? 'activeClicked' : ''}`}
            >
              <FacebookLogo size={25} /> مواقع التواصل الاجتماعي
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/about_us">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/about_us' ? 'activeClicked' : ''}`}
            >
              <Question size={25} /> من نحن
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/feedbacks">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/feedbacks' ? 'activeClicked' : ''}`}
            >
              <ChatsCircle size={25} /> ملاحظات العملاء
            </CDBSidebarMenuItem>
          </NavLink>

          {/* <NavLink exact to="/notifications" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="">
            <BellSimple size={25} /> الإشعارات
            </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/about_us" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="">
            <Chats size={25} /> من نحن
            </CDBSidebarMenuItem>
            </NavLink>{' '}
            <NavLink exact to="/privacy_policy" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="">
            <LockSimple size={25} /> سياسة الخصوصية
            </CDBSidebarMenuItem>
            </NavLink>{' '} */}
        </div>
        <div
          className="grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0px',
            margin: '20px 15px',
          }}
        >
          <NavLink exact to="/settings">
            <CDBSidebarMenuItem
              className={`customNav grid-item ${
                location.pathname === '/settings' ? 'activeClicked' : ''
              }`}
              style={{
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 3px',
                textAlign: 'center',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                margin: '2px',
              }}
            >
              <div
                style={{
                  marginBottom: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '25px',
                  padding: '3px 3px',
                }}
              >
                <Gear size={25} />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '500',
                }}
              >
                الاعدادات
              </span>
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink onClick={openSignoutDialog}>
            <CDBSidebarMenuItem
              style={{
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 3px',
                textAlign: 'center',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                margin: '2px',
              }}
            >
              <div
                style={{
                  marginBottom: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '25px',
                  padding: '3px 3px',
                }}
              >
                <SignOut size={25} />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '500',
                }}
              >
                تسجيل الخروج
              </span>
            </CDBSidebarMenuItem>
          </NavLink>
        </div>
      </nav>
      <AppDialog
        title="هل أنت متأكد من رغبتك بتسجيل الخروج ؟"
        open={showSignoutDialog}
        onClose={closeSignoutDialog}
        actionCancel={closeSignoutDialog}
        actionExecute={logout}
        deleteDialog={true}
      />
    </div>
  )
}

export default Sidebar

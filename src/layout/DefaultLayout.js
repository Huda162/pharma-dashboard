import React from 'react'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components/index'
import { useSidebar } from 'src/context/SidebarContext'
import { List } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import './layout.css'

const DefaultLayout = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar()
  return (
    <div dir="rtl" className={`page-wrapper ${isSidebarOpen ? 'toggled' : ''}`}>
      <AppSidebar />
      <main
        className="page-content almarai-regular"
        style={{
          marginLeft: isSidebarOpen ? '' : '0',
          transition: 'margin 0.3s ease',
          backgroundColor: Theme.base,
        }}
      >
        <div className="">
          <AppHeader />
          <br />
          <AppContent />
        </div>
      </main>
    </div>
  )
}

export default DefaultLayout

import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Settings from 'src/views/Settings/settings'
import Unauthorized from 'src/views/pages/unauthorized/Unauthorezed'
import { useLogin } from 'src/hooks/login/useLogin'

const AppContent = () => {
  const isLoggedIn =
    sessionStorage.getItem('log_status') || localStorage.getItem('pharma_log_status')
  const role_id = sessionStorage.getItem('role_id') || localStorage.getItem('pharma_role_id')
  console.log(role_id === 1)
  console.log(isLoggedIn)

  return (
    <CContainer style={{ flex: 1 }}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={isLoggedIn === 'true' ? <route.element /> : <Navigate to="/#" />}
                />
              )
            )
          })}

          <Route path="/#" element={<Navigate to="login" replace />} />
          <Route
            path="/settings"
            element={role_id == 1 ? <Settings /> : <Unauthorized />}
            name="الإعدادات"
          />
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

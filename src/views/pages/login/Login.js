import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CRow,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap/esm'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import { useLogin } from 'src/hooks/login/useLogin'
import { Theme } from 'src/constants/colors'
import logo from '../../../assets/images/logo.png'
import dashboard from '../../../assets/images/dashboard.png'
import '../../../components/test.css'
import '../../../layout/layout.css'
import { useWidth } from 'src/hooks/general/useWidth'

const Login = () => {
  const {
    phone,
    setPhone,
    password,
    setPassword,
    loading,
    showDialog,
    setShowDialog,
    login,
    rememberMe,
    setRememberMe,
    autoLogin,
  } = useLogin()

  useEffect(() => {
    autoLogin()
  })

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login()
    }
  }

  const { width } = useWidth()
  const [isFocused, setIsFocused] = useState({ phone: false, password: false })

  return (
    <div
      className="w-100 h-100 min-vh-100 d-flex almarai-regular"
      style={{
        background: `linear-gradient(135deg, ${Theme.white} 0%, ${Theme.base} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `
          radial-gradient(circle at 20% 80%, ${Theme.primaryLight} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${Theme.primary1} 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, ${Theme.primaryLight} 0%, transparent 30%)
        `,
          zIndex: 0,
        }}
      ></div>

      <div
        className="position-absolute d-none d-lg-block"
        style={{
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          border: `2px dashed ${Theme.primary1}40`,
          borderRadius: '50%',
          zIndex: 0,
        }}
      ></div>

      <div
        className="position-absolute d-none d-lg-block"
        style={{
          bottom: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          border: `2px solid ${Theme.primaryBlue}30`,
          borderRadius: '20px',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
      ></div>

      <CContainer
        className="d-flex align-items-center justify-content-center w-100 h-100 m-auto"
        style={{ zIndex: 1 }}
      >
        <CRow className="w-100 justify-content-center align-items-center">
          <CCol
            xs={12}
            sm={10}
            md={8}
            lg={5}
            className="d-flex justify-content-center align-items-center"
          >
            <CCard
              className="rounded-4 p-4 p-md-5 w-100"
              style={{
                backgroundColor: Theme.white,
                border: `1px solid ${Theme.primary1}20`,
                boxShadow: `
                  0 20px 40px ${Theme.grayDark}08,
                  0 0 0 1px ${Theme.white},
                  inset 0 0 0 1px ${Theme.primary1}10
                `,
                maxWidth: '450px',
                margin: width <= 768 ? '2rem auto' : '0',
              }}
            >
              <div className="text-center mb-4">
                <div className="mb-4">
                  <div className="position-relative mb-4">
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: `radial-gradient(circle, ${Theme.primary1}40 0%, transparent 70%)`,
                        borderRadius: '50%',
                        filter: 'blur(15px)',
                      }}
                    ></div>
                    <img
                      src={logo}
                      alt="Logo"
                      // width={70}
                      height={70}
                      className="position-relative"
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      }}
                    />
                  </div>
                  <h2 className="h3 almarai-bold mb-2" style={{ color: Theme.grayDark }}>
                    تسجيل الدخول
                  </h2>
                  <p
                    style={{
                      color: Theme.gray,
                      fontSize: '0.95rem',
                    }}
                  >
                    أدخل بياناتك للوصول إلى لوحة التحكم
                  </p>
                </div>
              </div>

              <CForm onKeyPress={handleKeyPress} className="w-100" dir="rtl">
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="form-label mb-2 almarai-bold"
                    style={{
                      color: Theme.grayDark,
                      fontSize: '0.9rem',
                    }}
                  >
                    رقم الهاتف
                  </label>
                  <CFormInput
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, phone: true })}
                    onBlur={() => setIsFocused({ ...isFocused, phone: false })}
                    className="rounded-3 border-0 py-3 px-4"
                    style={{
                      backgroundColor: Theme.base,
                      boxShadow: isFocused.phone
                        ? `0 0 0 3px ${Theme.primary1}40, 0 2px 10px ${Theme.grayDark}05`
                        : `0 2px 10px ${Theme.grayDark}05`,
                      transition: 'all 0.3s ease',
                      border: `1px solid ${Theme.primary1}20`,
                      fontSize: '1rem',
                      color: Theme.grayDark,
                    }}
                    placeholder="05XXXXXXXX"
                    autoComplete="username"
                    dir="rtl"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label mb-2 almarai-bold"
                    style={{
                      color: Theme.grayDark,
                      fontSize: '0.9rem',
                    }}
                  >
                    كلمة المرور
                  </label>
                  <CFormInput
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, password: true })}
                    onBlur={() => setIsFocused({ ...isFocused, password: false })}
                    className="rounded-3 border-0 py-3 px-4"
                    style={{
                      backgroundColor: Theme.base,
                      boxShadow: isFocused.password
                        ? `0 0 0 3px ${Theme.primary1}40, 0 2px 10px ${Theme.grayDark}05`
                        : `0 2px 10px ${Theme.grayDark}05`,
                      transition: 'all 0.3s ease',
                      border: `1px solid ${Theme.primary1}20`,
                      fontSize: '1rem',
                      color: Theme.grayDark,
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    dir="rtl"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <CFormCheck
                      id="rememberMe"
                      label="تذكرني"
                      reverse
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="customCheckbox"
                      style={{
                        cursor: 'pointer',
                        color: Theme.grayDark,
                      }}
                    />
                  </div>
                  <CButton
                    color="link"
                    className="p-0 text-decoration-none"
                    style={{
                      color: Theme.primary1,
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = Theme.primaryBlue
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = Theme.primary1
                    }}
                  >
                    هل نسيت كلمة المرور؟
                  </CButton>
                </div>

                <div className="mb-3">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Spinner
                        animation="border"
                        role="status"
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          color: Theme.primary1,
                        }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <CButton
                      onClick={login}
                      disabled={password.trim() === '' || phone.trim() === ''}
                      className="w-100 py-3 rounded-3 border-0 almarai-bold"
                      style={{
                        background: `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`,
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        boxShadow: `0 4px 15px ${Theme.primary1}40`,
                        transition: 'all 0.3s ease',
                        opacity: password.trim() === '' || phone.trim() === '' ? 0.6 : 1,
                        color: Theme.white,
                      }}
                      onMouseEnter={(e) => {
                        if (password.trim() !== '' && phone.trim() !== '') {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = `0 6px 20px ${Theme.primary1}60`
                          e.target.style.background = `linear-gradient(135deg, ${Theme.primaryLight} 0%, ${Theme.primary1} 100%)`
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = `0 4px 15px ${Theme.primary1}40`
                        e.target.style.background = `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`
                      }}
                    >
                      تسجيل الدخول
                    </CButton>
                  )}
                </div>
              </CForm>

              {/* {width <= 768 && (
                <div
                  className="text-center mt-4 pt-4"
                  style={{ borderTop: `1px solid ${Theme.primary1}20` }}
                >
                  <div className="position-relative mb-3">
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        width: '120px',
                        height: '120px',
                        background: `radial-gradient(circle, ${Theme.primary1}20 0%, transparent 70%)`,
                        borderRadius: '50%',
                        filter: 'blur(15px)',
                      }}
                    ></div>
                 
                  </div>
                  <p
                    className="mt-3"
                    style={{
                      color: Theme.gray,
                      fontSize: '0.9rem',
                    }}
                  >
                    alanaqa Dashboard © {new Date().getFullYear()}
                  </p>
                </div>
              )} */}
            </CCard>
          </CCol>
          {width > 768 && (
            <CCol
              lg={6}
              className="d-none d-lg-flex flex-column justify-content-center align-items-center p-5"
            >
              <div className="mb-5 text-center">
                <div className="mb-4">
                  <div className="position-relative mb-4">
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        width: '120px',
                        height: '120px',
                        background: `radial-gradient(circle, ${Theme.primary1}40 0%, transparent 70%)`,
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                      }}
                    ></div>
                    {/* <img
                      src={logo}
                      alt="Logo"
                      width={100}
                      height={100}
                      className="position-relative"
                      style={{
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                      }}
                    /> */}
                  </div>
                  <h1
                    className="display-4 mb-3 almarai-bold"
                    style={{
                      color: Theme.grayDark,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      fontWeight: 'semibold',
                    }}
                  >
                    لوحة تحكم Pharma Glow
                  </h1>
                  <p
                    className="fs-5"
                    style={{
                      color: Theme.gray,
                      maxWidth: '500px',
                      lineHeight: '1.6',
                    }}
                  >
                    نظام إدارة متكامل يوفر لك جميع الأدوات اللازمة لإدارة أعمالك بكفاءة وسهولة
                  </p>
                </div>
              </div>
            </CCol>
          )}
        </CRow>

        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          PaperProps={{
            style: {
              borderRadius: '16px',
              padding: '8px',
              backgroundColor: Theme.white,
              border: `1px solid ${Theme.primaryRed}20`,
              boxShadow: `0 20px 40px ${Theme.grayDark}10`,
            },
          }}
        >
          <DialogTitle className="text-center almarai-bold" style={{ color: Theme.primaryRed }}>
            !خطأ في التسجيل
            <div
              className="mt-2"
              style={{
                height: '3px',
                width: '50px',
                background: `linear-gradient(90deg, ${Theme.primaryRed}, ${Theme.primary1})`,
                margin: '0 auto',
                borderRadius: '2px',
              }}
            ></div>
          </DialogTitle>
          <DialogContent className="text-center py-4">
            <p
              className="mb-0 almarai-bold"
              style={{
                color: Theme.grayDark,
                lineHeight: '1.6',
              }}
            >
              رقم الهاتف أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى
            </p>
          </DialogContent>
          <DialogActions className="justify-content-center pb-4 px-4 ">
            <Button
              className="almarai-bold"
              onClick={() => setShowDialog(false)}
              variant="contained"
              style={{
                background: `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`,
                borderRadius: '10px',
                padding: '10px 40px',
                fontWeight: '600',
                color: Theme.white,
                border: 'none',
                boxShadow: `0 4px 12px ${Theme.primary1}40`,
              }}
            >
              حسناً
            </Button>
          </DialogActions>
        </Dialog>
      </CContainer>
    </div>
  )
}

export default Login

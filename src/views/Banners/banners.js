/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap/esm'
import { Cards } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useBanners } from 'src/hooks/banners/useBanners'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import EmptyPage from 'src/components/EmptyPage'
import image from '../../assets/images/image.png'
import { useLanguage } from 'src/hooks/general/useLanguage'

const Banners = () => {
  const navigate = useNavigate()
  const {
    banners,
    loading,
    showDialog,
    cancelDelete,
    executeDelete,
    selectedLanguage,
    setSelectedLanguage,
  } = useBanners()
  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="البنرات"
          icon={<Cards size={25} />}
          addItem={true}
          addPath="add-banner"
          addText="إضافة بانر"
        />
        <div>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {banners.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  <CNav variant="tabs" className="justify-content-center" layout="fill">
                    {isArabic === 'true' && (
                      <CNavItem>
                        <CNavLink
                          style={
                            selectedLanguage === 'ar'
                              ? { fontWeight: 'bold', color: Theme.grayDark }
                              : {
                                  color: Theme.primaryLight,
                                  backgroundColor: Theme.base,
                                  borderBottom: '#d8dbe0',
                                }
                          }
                          active={selectedLanguage === 'ar'}
                          onClick={() => {
                            setSelectedLanguage('ar')
                          }}
                        >
                          باللغة العربية
                        </CNavLink>
                      </CNavItem>
                    )}
                    {isEnglish === 'true' && (
                      <CNavItem>
                        <CNavLink
                          style={
                            selectedLanguage === 'en'
                              ? { fontWeight: 'bold', color: Theme.grayDark }
                              : {
                                  color: Theme.primaryLight,
                                  backgroundColor: Theme.base,
                                  borderBottom: '#d8dbe0',
                                }
                          }
                          active={selectedLanguage === 'en'}
                          onClick={() => {
                            setSelectedLanguage('en')
                          }}
                        >
                          باللغة الانجليزية
                        </CNavLink>
                      </CNavItem>
                    )}
                    {isHebrew === 'true' && (
                      <CNavItem>
                        <CNavLink
                          style={
                            selectedLanguage === 'he'
                              ? { fontWeight: 'bold', color: Theme.grayDark }
                              : {
                                  color: Theme.primaryLight,
                                  backgroundColor: Theme.base,
                                  borderBottom: '#d8dbe0',
                                }
                          }
                          active={selectedLanguage === 'he'}
                          onClick={() => {
                            setSelectedLanguage('he')
                          }}
                        >
                          باللغة العبرية
                        </CNavLink>
                      </CNavItem>
                    )}
                  </CNav>
                  <CTable align="middle" className="mb-3" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center" style={{width: '15%'}}>عنوان البانر</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">صورة البانر </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">
                          صورة البانر للهاتف
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" style={{width: '15%'}}> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {banners.map((item, index) => (
                        <CTableRow className="text-center" key={index}>
                          <CTableDataCell>
                            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                              {selectedLanguage === 'ar' ? (
                                <CRow>{item.title_ar}</CRow>
                              ) : selectedLanguage === 'en' ? (
                                <CRow>{item.title_en}</CRow>
                              ) : (
                                <CRow>{item.title_he}</CRow>
                              )}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <img
                              src={
                                selectedLanguage === 'ar'
                                  ? item.image
                                  : selectedLanguage === 'en'
                                  ? item.image_en
                                  : image
                              }
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = image
                              }}
                              alt="banner_1"
                              height="150"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <img
                              src={
                                selectedLanguage === 'ar'
                                  ? item.image_mobile
                                  : selectedLanguage === 'en'
                                  ? item.image_mobile_en
                                  : image
                              }
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = image
                              }}
                              alt="banner_1"
                              height="150"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip
                                type="edit"
                                onClick={() =>
                                  navigate(`/edit_banner/${item.id}`, { state: { item } })
                                }
                              />
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              ) : (
                <EmptyPage />
              )}
            </>
          )}
        </div>
      </CCol>
      <ToastContainer />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا البانر ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
    </CRow>
  )
}

export default Banners

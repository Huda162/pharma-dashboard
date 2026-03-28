/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CCol,
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
import { FacebookLogo } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSocials } from 'src/hooks/Socials/useSocials'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import EmptyPage from 'src/components/EmptyPage'

const Socials = () => {
  const navigate = useNavigate()
  const { socials, loading, showDialog, executeDelete, confirmDelete, cancelDelete } = useSocials()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="مواقع التواصل الاجتماعي" icon={<FacebookLogo size={25} />} />
        <div>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {socials.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  <CTable align="middle" className="mb-3" hover responsive striped>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">الاسم</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">الرابط</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {socials.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <div>{item.name}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.url}</div>
                          </CTableDataCell>

                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
                              <AppTooltip
                                type="edit"
                                onClick={() =>
                                  navigate(`/edit_social/${item.id}`, { state: { item } })
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
                <EmptyPage emptyItems="مواقع تواصل اجتماعي" />
              )}
            </>
          )}
        </div>
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا الموقع ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
      <ToastContainer />
    </CRow>
  )
}

export default Socials

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {  } from 'react'
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
import { Gift } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCopons } from 'src/hooks/copons/useCopons'
import AppDialog from 'src/components/AppDialog'
import { Theme } from 'src/constants/colors'
import PageTitle from 'src/components/PageTitle'
import { AppBreadcrumb } from 'src/components'
import AppTooltip from 'src/components/Tooltip'
import EmptyPage from 'src/components/EmptyPage'

const Copons = () => {
  const navigate = useNavigate()
  const { copons, loading, showDialog, confirmDelete, executeDelete, cancelDelete } = useCopons()

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="الكوبونات"
          icon={<Gift size={25} />}
          addItem={true}
          addText="إضافة كوبون"
          addPath="add_coupon"
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
              {copons.length > 0 ? (
                <div
                  className="rounded"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  <CTable align="middle" className="mb-3" hover responsive striped>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">الاسم</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">الكود</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">القيمة</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">تاريخ الانتهاء</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {copons.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <div>{item.name}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.code}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.type === 'percentage' ? `%${item.value}` : `₪${item.value}`}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.end_date}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
                              <AppTooltip
                                type="edit"
                                onClick={() => navigate(`/edit_coupon/${item.id}`, {state: {item}})}
                              />
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              ) : (
                <EmptyPage emptyItems='كوبونات'/>
              )}
            </>
          )}
        </div>
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا الكوبون ؟"
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

export default Copons

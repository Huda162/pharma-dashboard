/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
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
import { ChatsCircle, CheckSquare } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFeedbacks } from 'src/hooks/feedbacks/useFeedbacks'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import { useLanguage } from 'src/hooks/general/useLanguage'
import EmptyPage from 'src/components/EmptyPage'

const Feedbacks = () => {
  const navigate = useNavigate()
  const {
    feedbacks,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    toggleMarkedFeedback,
    markedFeedbacks,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    showDeleteDialog,
  } = useFeedbacks()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="ملاحظات العملاء"
          icon={<ChatsCircle size={25} />}
          addPath="add_feedback"
          addText="إضافة ملاحظة"
          addItem={true}
          mark={true}
          deleteMarked={deleteMarked}
          markedItems={markedFeedbacks}
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
              {feedbacks.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  <CTable align="middle" className="mb-3" hover responsive striped>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center" style={{ width: 100 }}>
                          <CButton
                            style={{
                              backgroundColor: Theme.primary1,
                              border: 'none',
                            }}
                            onClick={markAll}
                          >
                            <CheckSquare size={20} /> الكل
                          </CButton>
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">الاسم</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">الصورة</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">المحتوى</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {feedbacks.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center fw-medium">
                            <CFormCheck
                              id="index"
                              className="customCheckbox"
                              checked={markedFeedbacks.find((id) => id === item.id)}
                              onChange={() => {
                                toggleMarkedFeedback(item.id)
                              }}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {item.customer_name}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="d-flex flex-column h-100 align-items-center">
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <img
                                  src={item.image}
                                  alt="customer_feedback"
                                  width="100"
                                  height="100"
                                />
                              </div>
                            </div>
                          </CTableDataCell>
                            <CTableDataCell className="text-center">{item.body}</CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
                              <AppTooltip
                                type="edit"
                                onClick={() => navigate(`/edit_feedback/${item.id}`)}
                              />
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              ) : (
                <EmptyPage emptyItems="ملاحظات" />
              )}
            </>
          )}
        </div>
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذه الملاحظة ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف جميع المنتجات التي تم تحديدها ؟"
        open={showDeleteDialog}
        onClose={cancelDeleteMarked}
        actionCancel={cancelDeleteMarked}
        actionExecute={executeDeleteMarked}
        deleteDialog={true}
      />
      <ToastContainer />
    </CRow>
  )
}

export default Feedbacks

/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormSwitch,
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
import { CheckSquare, SidebarSimple } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSliders } from 'src/hooks/sliders/useSliders'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import image from '../../assets/images/image.png'
import EmptyPage from 'src/components/EmptyPage'

const Sliders = () => {
  const navigate = useNavigate()
  const {
    loading,
    showDialog,
    sliders,
    confirmDelete,
    executeDelete,
    cancelDelete,
    toggleMarkedItem,
    markedItems,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    showDeleteDialog,
    changeActiveStatus,
    loadingId,
  } = useSliders()
  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="الشرائح"
          icon={<SidebarSimple size={25} />}
          addItem={true}
          addPath="add_slider"
          addText="إضافة شريحة"
          mark={true}
          deleteMarked={deleteMarked}
          markedItems={markedItems}
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
              {sliders.length > 0 ? (
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
                        <CTableHeaderCell className="text-center">الصورة</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">صورة الهاتف</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> تفعيل </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {sliders.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center fw-medium">
                            <div className="d-flex justify-content-center align-items-center">
                              <CFormCheck
                                id="index"
                                className="customCheckbox"
                                label=" "
                                reverse
                                checked={markedItems.find((id) => id == item.id)}
                                onChange={() => {
                                  toggleMarkedItem(item.id)
                                }}
                              />
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <img
                              src={item.image ? item.image : image}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = image
                              }}
                              alt="image"
                              width="100"
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <img
                              src={item.image_mobile ? item.image_mobile : image}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = image
                              }}
                              alt="image_mobile"
                              width="100"
                            />
                          </CTableDataCell>

                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
                              <AppTooltip
                                type="edit"
                                onClick={() =>
                                  navigate(`/edit_slider/${item.id}`, { state: { item } })
                                }
                              />
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex align-items-center justify-content-center">
                              {loadingId == item.id ? (
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                              ) : (
                                <CFormSwitch
                                  size="lg"
                                  id="activeApp"
                                  checked={item.active === 'true'}
                                  reverse
                                  style={
                                    item.active === 'true'
                                      ? {
                                          boxShadow: 'none',
                                          backgroundColor: Theme.primary1,
                                          borderColor: Theme.primary1,
                                        }
                                      : { boxShadow: 'none' }
                                  }
                                  onChange={() => {
                                    changeActiveStatus(item.id, item.active)
                                  }}
                                />
                              )}
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              ) : (
                <EmptyPage emptyItems="شرائح" />
              )}
            </>
          )}
        </div>
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذه الشريحة ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف جميع الشرائح التي تم تحديدها ؟"
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

export default Sliders

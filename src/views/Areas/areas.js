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
import { CheckSquare, CirclesThreePlus, MapPinLine, Sparkle } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCategories } from 'src/hooks/categories/useCategories'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import { useLanguage } from 'src/hooks/general/useLanguage'
import image from '../../assets/images/image.png'
import EmptyPage from 'src/components/EmptyPage'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useBrands } from 'src/hooks/brands/useBrands'
import { useAreas } from 'src/hooks/areas/useAreas'

const Areas = () => {
  const navigate = useNavigate()
  const {
    areas,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    setFilterValue,
    markedItems,
    setMarkedItems,
    showDeleteDialog,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    searchQuery,
    setSearchQuery,
    handleOnDragEnd,
  } = useAreas()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="المناطق"
          icon={<MapPinLine size={25} />}
          addText="إضافة منطقة"
          addPath="add_area"
          addItem
          mark
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
              {areas?.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  <CTable
                    align="middle"
                    hover
                    responsive
                    striped
                    className=" mb-3 categories"
                    width={1000}
                  >
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
                        <CTableHeaderCell className="text-center">سعر التوصيل</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {areas?.map((item, index) => (
                        <CTableRow key={index} v-for="item in tableItems">
                          <CTableDataCell className="text-center fw-medium">
                            <div className="d-flex justify-content-center align-items-center">
                              <CFormCheck
                                id="index"
                                className="customCheckbox"
                                label=" "
                                reverse
                                checked={markedItems.find((id) => id === item.id)}
                                onChange={() => {
                                  toggleMarkedItem(item.id)
                                }}
                              />
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex flex-column h-100 align-items-center">
                              {isArabic === 'true' && (
                                <button
                                  className="hovarableText"
                                  onClick={() =>
                                    navigate(`/edit_area/${item.id}`, {
                                      state: { item },
                                    })
                                  }
                                >
                                  {item.area_name_ar}
                                </button>
                              )}
                              {isEnglish === 'true' && (
                                <button
                                  className="hovarableText"
                                  onClick={() =>
                                    navigate(`/edit_area/${item.id}`, {
                                      state: { item },
                                    })
                                  }
                                >
                                  {item.area_name_en}
                                </button>
                              )}
                              {isHebrew === 'true' && (
                                <button
                                  className="hovarableText"
                                  onClick={() =>
                                    navigate(`/edit_area/${item.id}`, {
                                      state: { item },
                                    })
                                  }
                                >
                                  {item.area_name}
                                </button>
                              )}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {item.delivery_price}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />

                              <AppTooltip
                                type="edit"
                                onClick={() =>
                                  navigate(`/edit_area/${item.id}`, {
                                    state: { item },
                                  })
                                }
                              />
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  {/* )}
                    </Droppable>
                  </DragDropContext> */}
                </div>
              ) : (
                <EmptyPage emptyItems="مناطق" />
              )}
            </>
          )}
        </div>
      </CCol>
      <ToastContainer />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذه العلامة التجارية"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف جميع العلامات التجارية التي تم تحديدها ؟"
        open={showDeleteDialog}
        onClose={cancelDeleteMarked}
        actionCancel={cancelDeleteMarked}
        actionExecute={executeDeleteMarked}
        deleteDialog={true}
      />
    </CRow>
  )
}

export default Areas

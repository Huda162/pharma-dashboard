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
import { CheckSquare, CirclesThreePlus, Sparkle } from 'phosphor-react'
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

const Brands = () => {
  const navigate = useNavigate()
  const {
    brands,
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
  } = useBrands()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="العلامات التجارية"
          icon={<Sparkle size={25} />}
          addText="إضافة علامة تجارية"
          addPath="add_brand"
          addItem={true}
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
              {brands.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="categories">
                      {(provided) => ( */}
                  <CTable
                    align="middle"
                    hover
                    responsive
                    striped
                    className=" mb-3 categories"
                    // {...provided.droppableProps}
                    // ref={provided.innerRef}
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
                        <CTableHeaderCell className="text-center">الصورة</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {brands.map((item, index) => (
                        <CTableRow
                        key={index}
                          v-for="item in tableItems"
                        >
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
                                    navigate(`/edit_brand/${item.id}`, {
                                      state: { item },
                                    })
                                  }
                                >
                                  {item.name}
                                </button>
                              )}
                              {isEnglish === 'true' && (
                                <button
                                  className="hovarableText"
                                  onClick={() =>
                                    navigate(`/edit_brand/${item.id}`, {
                                      state: { item },
                                    })
                                  }
                                >
                                  {item.name_en}
                                </button>
                              )}
                              {isHebrew === 'true' && (
                                <button
                                  className="hovarableText"
                                  onClick={() =>
                                    navigate(`/edit_brand/${item.id}`, { state: { item } })
                                  }
                                >
                                  {item.name_he}
                                </button>
                              )}
                            </div>
                          </CTableDataCell>

                          <CTableDataCell className="text-center">
                            <img
                              src={item.image ? item.image : image}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = image
                              }}
                              alt="brand"
                              width="100"
                              height="100"
                            />
                          </CTableDataCell>

                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
                              <AppTooltip
                                type="edit"
                                onClick={() =>
                                  navigate(`/edit_brand/${item.id}`, {
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
                <EmptyPage emptyItems="علامات تجارية" />
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

export default Brands

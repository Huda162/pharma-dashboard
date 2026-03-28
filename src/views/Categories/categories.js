/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CButton,
  CCard,
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
import { CheckSquare, CirclesThreePlus } from 'phosphor-react'
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
import DraggableRow from 'src/components/draggableRow'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import CategoriesTable from 'src/components/CategoriesTable'

const Categories = () => {
  const navigate = useNavigate()
  const {
    categories,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    setFilterValue,
    markedItems,
    showDeleteDialog,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    searchQuery,
    setSearchQuery,
    handleDragEnd,
    toggleDragMode,
    dragMode,
  } = useCategories()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="الأقسام الرئيسية"
          icon={<CirclesThreePlus size={25} />}
          addText="إضافة قسم"
          addPath="add_category"
          filterValue={searchQuery}
          setFilterValue={setSearchQuery}
          filterItems={true}
          addItem={true}
          mark={true}
          deleteMarked={deleteMarked}
          markedItems={markedItems}
          dragMode
          onDragMode={toggleDragMode}
          dragText={dragMode ? 'الوضع الافتراضي' : 'تعديل ترتيب الأقسام'}
        />
        {dragMode && (
          <CCard
            style={{
              width: '100%',
              backgroundColor: '#fdd954',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              borderRadius: '5px',
              border: 'none',
            }}
          >
            أنت الآن في وضع تعديل ترتيب الأقسام، يمكنك حمل القسم واسقاطه (drag and drop) في المكان
            المرغوب فيه من الجدول
            <br />
            <u>إضغط على زر &quot;الوضع الإفتراضي&quot; للخروج من وضع تعديل ترتيب الأقسام</u>
          </CCard>
        )}
        <div>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {categories.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
                >
                  {dragMode ? (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={categories.map((item) => item.id)}>
                        <CTable align="middle" className="mb-0 " striped hover responsive>
                          <CTableHead color="light">
                            <CTableRow>
                              <CTableHeaderCell className="text-center">الاسم</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">الصورة</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {categories.map((item, index) => (
                              <DraggableRow key={item.id} id={item.id} item={item} />
                            ))}
                          </CTableBody>
                        </CTable>
                      </SortableContext>
                    </DndContext>
                  ) : (
                    <CategoriesTable
                      categories={categories}
                      markedItems={markedItems}
                      toggleMarkedItem={toggleMarkedItem}
                      markAll={markAll}
                      navigate={navigate}
                      confirmDelete={confirmDelete}
                      isArabic={isArabic}
                      isEnglish={isEnglish}
                      isHebrew={isHebrew}
                    />
                  )}
                  {/* )}
                    </Droppable>
                  </DragDropContext> */}
                </div>
              ) : (
                <EmptyPage emptyItems="أقسام" />
              )}
            </>
          )}
        </div>
      </CCol>
      <ToastContainer />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا القسم؟"
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
    </CRow>
  )
}

export default Categories

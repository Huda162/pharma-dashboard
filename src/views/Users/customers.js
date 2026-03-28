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
import { CheckSquare, UserCircle, UsersThree } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUsers } from 'src/hooks/users/useUsers'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import image from '../../assets/images/image.png'
import EmptyPage from 'src/components/EmptyPage'
import { useCustomers } from 'src/hooks/users/useCustomers'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'

const columns = [
  {
    header: 'الرقم التسلسلي',
    key: 'id',
  },
  { header: 'اسم العميل', key: 'name' },
  {
    header: 'رقم الهاتف',
    key: 'phone',
  },
]

const workSheetName = 'phrama-customers'
const workBookName = 'phramaworkbook'

const CustomersPage = () => {
  const navigate = useNavigate()
  const {
    customers,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    toggleMarkedItem,
    markedItems,
    showDeleteDialog,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useCustomers()
  const userId = sessionStorage.getItem('id') || localStorage.getItem('pharma_id')

  const workbook = new Excel.Workbook()
  
    const saveExcel = async () => {
      try {
        const fileName = workBookName
  
        const worksheet = workbook.addWorksheet(workSheetName)
  
        worksheet.columns = columns
  
        worksheet.getRow(1).font = { bold: true }
  
        worksheet.columns.forEach((column) => {
          column.width = column.header.length + 5
          column.alignment = { horizontal: 'center' }
        })
  
        customers.forEach((singleCustomer) => {
          worksheet.addRow(singleCustomer)
        })
  
        worksheet.eachRow({ includeEmpty: false }, (row) => {
          const currentCell = row._cells
  
          currentCell.forEach((singleCell) => {
            const cellAddress = singleCell._address
  
            worksheet.getCell(cellAddress).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            }
          })
        })
  
        const buf = await workbook.xlsx.writeBuffer()
  
        saveAs(new Blob([buf]), `${fileName}.xlsx`)
      } catch (error) {
        console.error('<<<ERRROR>>>', error)
        console.error('Something Went Wrong', error.message)
      } finally {
        workbook.removeWorksheet(workSheetName)
      }
    }

  return (
    <CRow>
      <CCol xs>
        <PageTitle
          title="العملاء"
          icon={<UsersThree size={25} />}
          mark={true}
          deleteMarked={deleteMarked}
          markedItems={markedItems}
          isExportable
          saveExcel={saveExcel}
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
              {customers.length > 0 ? (
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
                        <CTableHeaderCell className="text-center">المسمى الوظيفي </CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> رقم الهاتف </CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الصورة </CTableHeaderCell>

                        <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {customers.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
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
                          <CTableDataCell className="text-center">
                            <div>{item.name}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">
                              <div>{item.role_id}</div>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.phone}</div>
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
                          <CTableDataCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              {userId !== item.id.toString() && (
                                <>
                                  <AppTooltip
                                    type="delete"
                                    onClick={() => confirmDelete(item.id)}
                                  />
                                </>
                              )}
                              {/* <AppTooltip
                                type="edit"
                                onClick={() =>
                                  navigate(`/edit_user/${item.id}`, { state: { item } })
                                }
                              /> */}
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              ) : (
                <EmptyPage emptyItems="مستخدمين" />
              )}
            </>
          )}
        </div>
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا المستخدم ؟"
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

export default CustomersPage

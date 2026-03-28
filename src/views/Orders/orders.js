/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CNav,
  CNavItem,
  CNavLink,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap/esm'
import { CheckSquare, ShoppingCartSimple } from 'phosphor-react'
import { ToastContainer } from 'react-toastify'
import { useOrders } from 'src/hooks/orders/useOrder'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import { AppBreadcrumb } from 'src/components'
import EmptyPage from 'src/components/EmptyPage'
import AppTooltip from 'src/components/Tooltip'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'

const columns = [
  {
    header: 'الرقم التسلسلي',
    key: 'id',
  },
  { header: 'اسم الزبون', key: 'customer_name' },
  {
    header: 'المدينة',
    key: 'city',
  },
  {
    header: 'المنطقة',
    key: 'area',
  },
  {
    header: 'بالقرب من',
    key: 'near',
  },
  {
    header: 'رقم الهاتف',
    key: 'phone',
  },
  {
    header: 'سعر التوصيل',
    key: 'delivery_price',
  },
  {
    header: 'الاجمالي',
    key: 'total',
  },
  {
    header: 'حالة الطلبية',
    key: 'status',
  },
]

const workSheetName = 'pharma-orders'
const workBookName = 'pharmaworkbook'
const Orders = () => {
  const navigate = useNavigate()
  const {
    orders,
    loading,
    showDialog,
    dialogStatus,
    status,
    orderID,
    confirmDelete,
    cancelDelete,
    executeDelete,
    updateStatus,
    setDialogStatus,
    setOrderID,
    setStatus,
    toggleMarkedItem,
    markedItems,
    showDeleteDialog,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    links,
    handlePageClick,
    getOrdersByStatus,
    selectedStatus,
    setSelectedStatus,
    editMarked,
    executeEditMarked,
    editMarkedDialog,
    setEditMarkedDialog,
    markedStatus,
    setMarkedStatus,
  } = useOrders()

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

      orders.forEach((singleOrder) => {
        worksheet.addRow(singleOrder)
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
          title="الطلبيات"
          icon={<ShoppingCartSimple size={25} />}
          mark={true}
          deleteMarked={deleteMarked}
          markedItems={markedItems}
          editItems={true}
          editMarked={editMarked}
          isExportable={true}
          saveExcel={saveExcel}
          loadingOrders={false}
        />
        <div className="mb-3">
          <br />
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <div
                className="rounded"
                style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
              >
                <CNav variant="tabs" className="justify-content-center" layout="fill">
                  <CNavItem>
                    <CNavLink
                      style={
                        selectedStatus === 'all'
                          ? { fontWeight: 'bold', color: Theme.grayDark }
                          : {
                              color: Theme.primaryLight,
                              backgroundColor: Theme.base,
                              borderBottom: '#d8dbe0',
                            }
                      }
                      active={selectedStatus === 'all'}
                      onClick={() => {
                        setSelectedStatus('all')
                      }}
                    >
                      الكل
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      style={
                        selectedStatus === 'pending'
                          ? { fontWeight: 'bold', color: Theme.grayDark }
                          : {
                              color: Theme.primaryLight,
                              backgroundColor: Theme.base,
                              borderBottom: '#d8dbe0',
                            }
                      }
                      active={selectedStatus === 'pending'}
                      onClick={() => {
                        setSelectedStatus('pending')
                      }}
                    >
                      معلق
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      style={
                        selectedStatus === 'in_progress'
                          ? { fontWeight: 'bold', color: Theme.grayDark }
                          : {
                              color: Theme.primaryLight,
                              backgroundColor: Theme.base,
                              borderBottom: '#d8dbe0',
                            }
                      }
                      active={selectedStatus === 'in_progress'}
                      onClick={() => {
                        setSelectedStatus('in_progress')
                      }}
                    >
                      في التوصيل
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      style={
                        selectedStatus === 'done'
                          ? { fontWeight: 'bold', color: Theme.grayDark }
                          : {
                              color: Theme.primaryLight,
                              backgroundColor: Theme.base,
                              borderBottom: '#d8dbe0',
                            }
                      }
                      active={selectedStatus === 'done'}
                      onClick={() => {
                        setSelectedStatus('done')
                      }}
                    >
                      عالق
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      style={
                        selectedStatus === 'delivered'
                          ? { fontWeight: 'bold', color: Theme.grayDark }
                          : {
                              color: Theme.primaryLight,
                              backgroundColor: Theme.base,
                              borderBottom: '#d8dbe0',
                            }
                      }
                      active={selectedStatus === 'delivered'}
                      onClick={() => {
                        setSelectedStatus('delivered')
                      }}
                    >
                      تم الاستلام
                    </CNavLink>
                  </CNavItem>
                  <CNavItem active={selectedStatus === 'cancelled'}>
                    <CNavLink
                      style={
                        selectedStatus === 'cancelled'
                          ? { fontWeight: 'bold', color: Theme.grayDark }
                          : {
                              color: Theme.primaryLight,
                              backgroundColor: Theme.base,
                              borderBottom: '#d8dbe0',
                            }
                      }
                      active={selectedStatus === 'cancelled'}
                      onClick={() => {
                        setSelectedStatus('cancelled')
                      }}
                    >
                      ملغي
                    </CNavLink>
                  </CNavItem>
                </CNav>
                {orders && orders.length > 0 ? (
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
                        <CTableHeaderCell className="text-center">أسم الزبون</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">المدينة</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">المنطقة</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">بالقرب من </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">رقم الهاتف</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> المجموع</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> سعر التوصيل</CTableHeaderCell>
                        <CTableHeaderCell className="text-center"> الاجمالي</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">حالة الطلبية </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">الإجراءات</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {orders.map((item, index) => (
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
                            <button
                              className="hovarableText"
                              onClick={() => navigate(`/view_order/${item.id}`)}
                            >
                              {item.customer_name}
                            </button>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.city}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.area}</div>
                          </CTableDataCell>{' '}
                          <CTableDataCell className="text-center">
                            <div>{item.near}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.phone}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>₪{item.total_products}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>₪{item.delivery_price}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>₪{item.total_final}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>
                              {status[item.id] === 'pending'
                                ? 'معلق'
                                : status[item.id] === 'in_progress'
                                ? 'في التوصيل'
                                : status[item.id] === 'done'
                                ? 'عالق'
                                : status[item.id] === 'delivered'
                                ? 'تم الاستلام'
                                : status[item.id] === 'cancelled'
                                ? 'ملغي'
                                : item.status === 'pending'
                                ? 'معلق'
                                : item.status === 'in_progress'
                                ? 'في التوصيل'
                                : item.status === 'done'
                                ? 'عالق'
                                : item.status === 'delivered'
                                ? 'تم الاستلام'
                                : item.status === 'cancelled'
                                ? 'ملغي'
                                : ''}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
                            <AppTooltip
                              type="edit"
                              onClick={() => {
                                setDialogStatus(true)
                                setOrderID(item.id)
                              }}
                            />
                            <AppTooltip
                              type="view"
                              onClick={() => navigate(`/view_order/${item.id}`)}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <EmptyPage emptyItems="طلبيات" />
                )}
              </div>
            </>
          )}
        </div>
        {selectedStatus === 'all' && (
          <CPagination align="center">
            {links &&
              links.map((item, index) => (
                <CPaginationItem
                  active={item.active}
                  key={index}
                  onClick={() => {
                    if (item.url) {
                      const page = new URL(item.url).searchParams.get('page')
                      handlePageClick(Number(page))
                    }
                  }}
                  disabled={item.url == null}
                >
                  {item.label === 'Next &raquo;' ? (
                    <>&raquo;</>
                  ) : item.label === '&laquo; Previous' ? (
                    <>&laquo;</>
                  ) : (
                    <>{item.label}</>
                  )}
                </CPaginationItem>
              ))}
          </CPagination>
        )}
      </CCol>
      <ToastContainer />
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذه الطلبية ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />

      <Dialog
        open={dialogStatus}
        onClose={() => setDialogStatus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle
          id="customized-dialog-title"
          color="black"
          style={{ width: '300px', textAlign: 'center', fontSize: '22px' }}
        >
          تعديل حالة الطلبية
        </DialogTitle>
        <DialogContent>
          <div className="col" style={{ textAlign: '' }}>
            <select
              className="form-select form-select-sm "
              value={status[orderID]}
              onChange={(e) => setStatus({ ...status, [orderID]: e.target.value })}
            >
              <option>اختر حالة </option>
              <option value="pending">معلق</option>
              <option value="in_progress">في التوصيل</option>
              <option value="delivered"> تم الاستلام</option>
              <option value="done">عالق</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-content-center">
          <CButton
            onClick={updateStatus}
            style={{ backgroundColor: Theme.primary1, borderColor: Theme.primary1 }}
          >
            نعم بالتأكيد
          </CButton>
          <Button
            onClick={() => setDialogStatus(false)}
            style={{ backgroundColor: Theme.primaryRed, margin: '0.5rem', color: Theme.white }}
          >
            إلغاء
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editMarkedDialog}
        onClose={() => setEditMarkedDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle
          id="customized-dialog-title"
          color="black"
          style={{ width: '300px', textAlign: 'center', fontSize: '22px' }}
        >
          تعديل حالة الطلبيات المحددة
        </DialogTitle>
        <DialogContent>
          <div className="col" style={{ textAlign: '' }}>
            <select
              className="form-select form-select-sm "
              value={markedStatus}
              onChange={(e) => setMarkedStatus(e.target.value)}
            >
              <option>اختر حالة </option>
              <option value="pending">معلق</option>
              <option value="in_progress">في التوصيل</option>
              <option value="delivered"> تم الاستلام</option>
              <option value="done">عالق</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-content-center">
          <CButton
            onClick={executeEditMarked}
            style={{ backgroundColor: Theme.primary1, borderColor: Theme.primary1 }}
          >
            نعم بالتأكيد
          </CButton>
          <Button
            onClick={() => setEditMarkedDialog(false)}
            style={{ backgroundColor: Theme.primaryRed, margin: '0.5rem', color: Theme.white }}
          >
            إلغاء
          </Button>
        </DialogActions>
      </Dialog>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف جميع الطلبيات التي تم تحديدها ؟"
        open={showDeleteDialog}
        onClose={cancelDeleteMarked}
        actionCancel={cancelDeleteMarked}
        actionExecute={executeDeleteMarked}
        deleteDialog={true}
      />
    </CRow>
  )
}

export default Orders

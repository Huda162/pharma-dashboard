/* eslint-disable react/prop-types */

import { CButton, CCard, CCardBody, CFormSelect } from '@coreui/react'
import { ArrowsOutCardinal, Funnel, MagnifyingGlass, NotePencil, Plus, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Theme } from 'src/constants/colors'
import { useCategories } from 'src/hooks/categories/useCategories'
import './test.css'
import '../layout/layout.css'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import excelLogo from '../assets/images/excel.png'
const PageTitle = ({
  title,
  icon,
  addText,
  addPath,
  filterValue,
  setFilterValue,
  addItem = false,
  filterItems = false,
  filterByCategory = false,
  editItems = false,
  categoryFilter,
  setCategoryFilter,
  deleteMarked,
  mark = false,
  markedItems,
  editMarked,
  saveExcel,
  isExportable = false,
  loadingOrders,
  setCurrentPage,
  dragMode = false,
  onDragMode,
  dragText,
}) => {
  const navigate = useNavigate()
  const { categories } = useCategories()
  const [isFilterFocused, setIsFilterFocused] = useState(false)

  return (
    <div
      className="mb-2"
      style={{
        overflow: 'hidden',
        marginBottom: '2rem',
        position: 'relative',
        marginBottom: '1rem',
        marginTop: '1rem',
        backgroundColor: Theme.white,
        padding: '1rem',
        borderRadius: '5px',
        boxShadow: '0px 2px 3px #c8c8c8',
      }}
    >
      <CCardBody>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center">
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${Theme.primary1}40`,
                flexShrink: 0,
              }}
            >
              {React.cloneElement(icon, {
                size: 24,
                color: Theme.white,
                weight: 'duotone',
              })}
            </div>
            <h4 className="mx-2 mb-0 almarai-bold"> {title}</h4>
          </span>
          <div className="pc-view">
            <span className="d-flex gap-1">
              {addItem && (
                <CButton
                  className="action-button primary-action"
                  style={{
                    height: '42px',
                    background: `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 0.2s ease',
                    boxShadow: `0 3px 12px ${Theme.primary1}40`,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => navigate(`/${addPath}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 5px 15px ${Theme.primary1}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = `0 3px 12px ${Theme.primary1}40`
                  }}
                >
                  <Plus size={18} weight="bold" />
                  <span
                    style={{
                      fontWeight: '700',
                      fontSize: '0.9rem',
                    }}
                  >
                    {addText}
                  </span>
                </CButton>
              )}
              {isExportable && (
                <CButton
                  className="action-button"
                  style={{
                    height: '42px',
                    background: `linear-gradient(135deg, #217949 0%, #2ecc71 100%)`,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 0.2s ease',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={saveExcel}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 3px 10px rgba(33, 121, 73, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {loadingOrders ? (
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      style={{
                        width: '0.875rem',
                        height: '0.875rem',
                        color: Theme.white,
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={excelLogo}
                        height={16}
                        alt="Excel"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                      <span
                        style={{
                          fontWeight: '600',
                          fontSize: '0.85rem',
                        }}
                      >
                        Excel
                      </span>
                    </>
                  )}
                </CButton>
              )}
              {filterByCategory && (
                <div className="filter-container" style={{ position: 'relative', flex: 1 }}>
                  <div
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                    }}
                  >
                    <Funnel size={18} color={Theme.gray} weight="duotone" />
                  </div>
                  <CFormSelect
                    id="productCategory"
                    className="customSelect"
                    style={{
                      height: '42px',
                      borderRadius: '10px',
                      border: `1px solid ${Theme.primary1}30`,
                      backgroundColor: Theme.white,
                      fontSize: '0.9rem',
                      padding: '0.5rem 2.25rem 0.5rem 0.75rem',
                      color: Theme.grayDark,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.2s ease',
                      appearance: 'none',
                      width: '100%',
                    }}
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value)
                      setCurrentPage?.(1)
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = Theme.primary1
                      e.target.style.boxShadow = `0 0 0 2px ${Theme.primary1}20`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${Theme.primary1}30`
                      e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <option value="">جميع التصنيفات</option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name_ar || item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              )}
              {filterItems && (
                <div className="search-container" style={{ position: 'relative', flex: 1 }}>
                  <div
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                    }}
                  >
                    <MagnifyingGlass
                      size={18}
                      color={isFilterFocused ? Theme.primary1 : Theme.gray}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="ابحث..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    onFocus={() => setIsFilterFocused(true)}
                    onBlur={() => setIsFilterFocused(false)}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '10px',
                      border: `1px solid ${isFilterFocused ? Theme.primary1 : Theme.primary1}30`,
                      backgroundColor: Theme.white,
                      padding: '0.5rem 2.25rem 0.5rem 0.75rem',
                      fontSize: '0.9rem',
                      color: Theme.grayDark,
                      boxShadow: isFilterFocused
                        ? `0 0 0 2px ${Theme.primary1}20`
                        : '0 2px 6px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                  />
                </div>
              )}
              {editItems && (
                <CButton
                  className="action-button"
                  style={{
                    height: '42px',
                    background:
                      markedItems.length > 0
                        ? `linear-gradient(135deg, ${Theme.primaryBlue} 0%, #4dabf7 100%)`
                        : `${Theme.gray}70`,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 0.2s ease',
                    cursor: markedItems.length > 0 ? 'pointer' : 'not-allowed',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={editMarked}
                  disabled={markedItems.length < 1}
                  onMouseEnter={(e) => {
                    if (markedItems.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = `0 3px 10px ${Theme.primaryBlue}30`
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <NotePencil size={18} weight="bold" />
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '0.85rem',
                    }}
                  >
                    تعديل
                    {markedItems.length > 0 && (
                      <span
                        style={{
                          marginRight: '4px',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {markedItems.length}
                      </span>
                    )}
                  </span>
                </CButton>
              )}

              {mark && (
                <CButton
                  className="action-button"
                  style={{
                    height: '42px',
                    background:
                      markedItems.length > 0
                        ? `linear-gradient(135deg, ${Theme.primaryRed} 0%, #f56565 100%)`
                        : `${Theme.gray}70`,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 0.2s ease',
                    cursor: markedItems.length > 0 ? 'pointer' : 'not-allowed',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={deleteMarked}
                  disabled={markedItems.length < 1}
                  onMouseEnter={(e) => {
                    if (markedItems.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = `0 3px 10px ${Theme.primaryRed}30`
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Trash size={18} weight="bold" />
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '0.85rem',
                    }}
                  >
                    حذف
                    {markedItems.length > 0 && (
                      <span
                        style={{
                          marginRight: '4px',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {markedItems.length}
                      </span>
                    )}
                  </span>
                </CButton>
              )}
              {dragMode && (
                <CButton
                  className="action-button"
                  style={{
                    height: '42px',
                    background: `linear-gradient(135deg, ${Theme.primaryBlue} 0%, #4dabf7 100%)`,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 0.2s ease',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={onDragMode}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = `0 3px 10px ${Theme.primaryBlue}30`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <ArrowsOutCardinal size={18} weight="bold" />
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '0.85rem',
                    }}
                  >
                    {dragText}
                  </span>
                </CButton>
              )}
            </span>
          </div>
        </div>

        <div className="tools-container mobile-view mt-3">
          {addItem && (
            <CButton
              style={{
                width: '100%',
                marginLeft: '5px',
                backgroundColor: Theme.primary1,
                border: 'none',
              }}
              onClick={() => {
                navigate(`/${addPath}`)
              }}
            >
              <span style={{ fontWeight: 'bolder' }}> {addText}</span>
            </CButton>
          )}
          {filterByCategory && (
            <span
              style={{
                border: '1px solid gray',
                padding: '5px',
                borderRadius: '5px',
                alignSelf: 'flex-start',
                marginLeft: '5px',
                // width: '100%'
              }}
              className=" h-75 w-100 d-flex align-items-center my-2"
            >
              <Funnel size={30} />
              <CFormSelect
                id="productCategory"
                className="customSelect"
                style={{
                  height: '30px',
                  border: 'none',
                  marginRight: '0px',
                  outline: 'none',
                  backgroundColor: Theme.white,
                  fontSize: 16,
                  padding: '0px',
                  paddingRight: '30px',
                }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option selected="" value="">
                  تصنيف
                </option>
                {categories.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </span>
          )}
          {filterItems && (
            <span
              style={{
                border: '1px solid gray',
                padding: '5px',
                borderRadius: '5px',
                alignSelf: 'flex-start',
              }}
              className=" h-75 d-flex align-items-center my-2"
            >
              <MagnifyingGlass size={20} />
              <input
                style={{
                  height: '30px',
                  marginRight: '20px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: Theme.white,
                }}
                type="text"
                placeholder="ابحث بواسطة الاسم"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </span>
          )}
          {mark && (
            <CButton
              style={{
                width: '100%',
                border: 'none',
              }}
              color="danger"
              onClick={deleteMarked}
              disabled={markedItems < 1}
            >
              <span style={{ fontWeight: 'bolder' }}>
                <Trash size={20} />
                حذف المحدد
              </span>
            </CButton>
          )}
          {editItems && (
            <CButton
              style={{
                width: '100%',
                border: 'none',
              }}
              color="info"
              onClick={editMarked}
              disabled={markedItems < 1}
            >
              <span style={{ fontWeight: 'bolder' }}>
                <NotePencil size={20} />
                تعديل المحدد
              </span>
            </CButton>
          )}
          {dragMode && (
            <CButton
              style={{
                width: '100%',
                marginTop: '5px',
                backgroundColor: Theme.primary1,
                border: 'none',
              }}
              onClick={() => {
                onDragMode()
              }}
            >
              <span style={{ fontWeight: 'bolder' }}> {dragText}</span>
            </CButton>
          )}
        </div>
      </CCardBody>
    </div>
  )
}

export default PageTitle

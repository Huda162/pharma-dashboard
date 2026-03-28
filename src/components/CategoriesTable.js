/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import {
  CButton,
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CaretDown, CaretLeft, CheckSquare } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import AppTooltip from './Tooltip'
import { motion, AnimatePresence } from 'framer-motion'
import image from '../assets/images/image.png'

const rowVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
}

const CategoriesTable = ({
  categories,
  markedItems,
  toggleMarkedItem,
  markAll,
  navigate,
  confirmDelete,
  isArabic,
  isEnglish,
  isHebrew,
}) => {
  const [expandedRows, setExpandedRows] = useState({})

  // Build category tree
  const buildCategoryTree = (parentId = 0) => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        ...category,
        children: buildCategoryTree(category.id),
      }))
  }

  const categoryTree = buildCategoryTree()

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Renders a single table row
  const renderRow = (item, level) => (
    <CTableRow
      key={item.id}
      style={{
        backgroundColor: level > 0 ? '#f8f9fa' : 'white',
        borderRight: level > 0 ? `4px solid ${Theme.primary1}` : 'none',
      }}
    >
      <CTableDataCell className="text-center" style={{ width: '10%' }}>
        <div className="d-flex justify-content-center align-items-center">
          <CFormCheck
            id={`checkbox-${item.id}`}
            className="customCheckbox"
            label=" "
            reverse
            checked={markedItems.includes(item.id)}
            onChange={() => toggleMarkedItem(item.id)}
          />
        </div>
      </CTableDataCell>

      <CTableDataCell style={{ width: '30%' }}>
        <div
          className="d-flex flex-column align-items-center h-100"
          style={{
            paddingRight: `${level * 30}px`,
            direction: 'rtl',
          }}
        >
          {isArabic === 'true' && (
            <button
              className="hovarableText"
              onClick={() => navigate(`/edit_product/${item.id}`, { state: { item } })}
            >
              {item.name_ar}
            </button>
          )}
          {isEnglish === 'true' && (
            <button
              className="hovarableText"
              onClick={() => navigate(`/edit_product/${item.id}`, { state: { item } })}
            >
              {item.name_en}
            </button>
          )}
          {isHebrew === 'true' && (
            <button
              className="hovarableText"
              onClick={() => navigate(`/edit_product/${item.id}`, { state: { item } })}
            >
              {item.name_he}
            </button>
          )}
        </div>
      </CTableDataCell>

      <CTableDataCell className="text-center" style={{ width: '20%' }}>
        <img
          src={item.image || image}
          onError={(e) => {
            e.target.onError = null
            e.target.src = image
          }}
          alt="category"
          width="80"
          height="80"
          style={{ objectFit: 'cover' }}
        />
      </CTableDataCell>

      <CTableDataCell className="text-center" style={{ width: '20%' }}>
        <div className="d-flex justify-content-center gap-2">
          <AppTooltip type="delete" onClick={() => confirmDelete(item.id)} />
          <AppTooltip
            type="edit"
            onClick={() => navigate(`/edit_category/${item.id}`, { state: { item } })}
          />
        </div>
      </CTableDataCell>

      <CTableDataCell className="text-center" style={{ width: '20%' }}>
        <div className="d-flex align-items-center justify-content-center">
          {item.children.length > 0 ? (
            <span className="badge" style={{ backgroundColor: Theme.primaryLight }}>
              {item.children.length} أقسام فرعية
            </span>
          ) : (
            <span className="text-muted">لا يوجد</span>
          )}
          {item.children.length > 0 && (
            <CButton
              color="light"
              size="sm"
              onClick={() => toggleRow(item.id)}
              className="me-2 p-0"
              style={{
                minWidth: '24px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {expandedRows[item.id] ? (
                <CaretDown size={14} weight="bold" />
              ) : (
                <CaretLeft size={14} weight="bold" />
              )}
            </CButton>
          )}
        </div>
      </CTableDataCell>
    </CTableRow>
  )

  // Recursive render with animation
  const renderRows = (items, level = 0) =>
    items.map((item) => (
      <React.Fragment key={item.id}>
        {renderRow(item, level)}

        <AnimatePresence>
          {expandedRows[item.id] && item.children.length > 0 && (
            <motion.tr
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={rowVariants}
              transition={{ duration: 0.3 }}
              style={{ padding: 0 }}
            >
              <td colSpan={5} style={{ padding: 0, border: 'none' }}>
                <CTable style={{ tableLayout: 'fixed', width: '100%' }}>
                  <CTableBody>{renderRows(item.children, level + 1)}</CTableBody>
                </CTable>
              </td>
            </motion.tr>
          )}
        </AnimatePresence>
      </React.Fragment>
    ))

  return (
    <CTable
      align="middle"
      hover
      responsive
      striped
      className="mb-3 categories rtl-table"
      style={{ tableLayout: 'fixed', width: '100%' }}
      dir="rtl"
    >
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell className="text-center" style={{ width: '10%' }}>
            <CButton
              style={{
                backgroundColor: Theme.primary1,
                border: 'none',
              }}
              onClick={markAll}
            >
              <CheckSquare size={20} className="ms-2" /> الكل
            </CButton>
          </CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ width: '30%' }}>
            الاسم
          </CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ width: '20%' }}>
            الصورة
          </CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ width: '20%' }}>
            الإجراءات
          </CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ width: '20%' }}>
            الأقسام الفرعية
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>{renderRows(categoryTree)}</CTableBody>
    </CTable>
  )
}

export default CategoriesTable

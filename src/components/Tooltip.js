/* eslint-disable react/prop-types */
import { CButton, CTooltip } from '@coreui/react'
import { Eye, NotePencil, Package, Trash } from 'phosphor-react'
import React from 'react'

const AppTooltip = ({ type, onClick }) => {
  const displayTooltip = () => {
    switch (type) {
      case 'delete':
        return (
          <CTooltip content="حذف" placement="top">
            <CButton
              color="danger"
              style={{ marginLeft: 3, boxShadow: '0px 2px 3px #c8c8c8' }}
              onClick={onClick}
            >
              <Trash size={16} color="white" />
            </CButton>
          </CTooltip>
        )
      case 'edit':
        return (
          <CTooltip content="تعديل" placement="top">
            <CButton
              color="info"
              onClick={onClick}
              style={{ marginLeft: 3, boxShadow: '0px 2px 3px #c8c8c8' }}
            >
              <NotePencil size={16} weight="duotone" color="white" />
            </CButton>
          </CTooltip>
        )
      case 'stock':
        return (
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <CTooltip content="تعديل المخزون" placement="top">
              <CButton
                color="warning"
                onClick={onClick}
                style={{ marginLeft: 3, boxShadow: '0px 2px 3px #c8c8c8' }}
              >
                <Package size={16} weight="duotone" color="white" />
              </CButton>
            </CTooltip>
          </div>
        )
      case 'view':
        return (
          <CTooltip content="عرض" placement="top">
            <CButton color="primary" onClick={onClick} style={{ boxShadow: '0px 2px 3px #c8c8c8' }}>
              <Eye size={16} weight="duotone" color="white" />
            </CButton>
          </CTooltip>
        )
      default:
        break
    }
  }
  return <>{displayTooltip()}</>
}

export default AppTooltip

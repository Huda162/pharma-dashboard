/* eslint-disable react/prop-types */

import React, { useMemo } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CFormCheck, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from 'src/hooks/general/useLanguage'
import image from '../assets/images/image.png'

const DraggableRow = React.memo(function DraggableRow({ id, item, markedItems }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const navigate = useNavigate()

  const style = useMemo(
    () => ({
      transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
      transition,
    }),
    [transform, transition],
  )
  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CTableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CTableDataCell>
        <div className="d-flex flex-column h-100 align-items-center">
          {isArabic === 'true' && (
            <button
              className="hovarableText"
              onClick={() =>
                navigate(`/edit_category/${item.id}`, {
                  state: { item },
                })
              }
            >
              {item.name_ar}
            </button>
          )}
          {isEnglish === 'true' && (
            <button
              className="hovarableText"
              onClick={() =>
                navigate(`/edit_category/${item.id}`, {
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
              onClick={() => navigate(`/category/${item.id}`, { state: { item } })}
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
          alt="category"
          width="100"
          height="100"
        />
      </CTableDataCell>
    </CTableRow>
  )
})

export default DraggableRow

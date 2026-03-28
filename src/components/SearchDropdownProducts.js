/* eslint-disable react/prop-types */

import React from 'react'
import { CFormInput } from '@coreui/react'
import { useEffect, useRef, useState } from 'react'
import './test.css'
import { ArrowDown, CaretDown } from 'phosphor-react'
import { Spinner } from 'react-bootstrap'

const SearchableDropdownProducts = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  placeholder,
  loading,
  query,
  setQuery,
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', toggle)
    return () => document.removeEventListener('click', toggle)
  }, [])

  const selectOption = (option) => {
    setQuery(() => '')
    handleChange(option)
    setIsOpen((isOpen) => !isOpen)
  }

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current)
  }

  const getDisplayValue = () => {
    if (query) return query
    if (selectedVal) return selectedVal.name_ar

    return ''
  }

  const filter = (options) => {
    return options?.filter((option) => option[label]?.indexOf(query) > -1)
  }

  return (
    <div className="dropdown" onClick={toggle}>
      <div className="control">
        <div className="selected-value">
          <CFormInput
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            autoComplete="off"
            name="searchTerm"
            required={isRequired}
            feedbackInvalid="مطلوب"
            onChange={(e) => {
              setQuery(e.target.value)
              handleChange('')
            }}
            placeholder={placeholder}
          />
        </div>
        <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
      </div>

      <div className={`options ${isOpen ? 'open' : ''}`}>
        {loading ? (
          <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {filter(options).map((option, index) => {
              return (
                <div
                  onClick={() => selectOption(option)}
                  className={`option ${option[id] === selectedVal ? 'selected' : ''}`}
                  key={`${id}-${index}`}
                >
                  {option[label]}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchableDropdownProducts

/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from 'react'
import { CFormInput } from '@coreui/react'
import { Spinner } from 'react-bootstrap'
import { CaretDown, X } from 'phosphor-react'
import './test.css'

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  placeholder = 'Select...',
  loading = false,
  isRequired = false,
  disabled = false,
}) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef(null)
  const optionsRef = useRef(null)

  // Filter options based on query
  const filteredOptions = options?.filter((option) =>
    option[label]?.toLowerCase().includes(query.toLowerCase()),
  )

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()
        selectOption(filteredOptions[highlightedIndex])
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredOptions, highlightedIndex])

  // Scroll to highlighted option
  useEffect(() => {
    if (optionsRef.current && highlightedIndex >= 0) {
      const optionElement = optionsRef.current.children[highlightedIndex]
      if (optionElement) {
        optionElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex])

  const selectOption = (option) => {
    setQuery('')
    handleChange(option[id])
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const clearSelection = (e) => {
    e.stopPropagation()
    handleChange('')
    setQuery('')
  }

  const getDisplayValue = () => {
    if (query) return query
    if (selectedVal) return options?.find((option) => option[id] === selectedVal)?.[label]
    return ''
  }

  return (
    <div className={`searchable-dropdown ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <div className="dropdown-control" onClick={() => !disabled && setIsOpen(!isOpen)}>
        <CFormInput
          type="text"
          value={getDisplayValue()}
          autoComplete="off"
          name="searchTerm"
          required={isRequired}
          feedbackInvalid="مطلوب"
          onChange={(e) => {
            setQuery(e.target.value)
            if (!isOpen) setIsOpen(true)
            if (e.target.value === '') handleChange('')
          }}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => !disabled && setIsOpen(true)}
        />

        <div className="dropdown-icons">
          {selectedVal && !query && (
            <button className="clear-btn" onClick={clearSelection} aria-label="Clear selection">
              <X size={16} />
            </button>
          )}
          <div className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
            <CaretDown size={16} weight="bold" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`dropdown-options ${isOpen ? 'open' : ''}`} ref={optionsRef}>
          {loading ? (
            <div className="dropdown-loading">
              <Spinner animation="border" size="sm" />
              <span>Loading...</span>
            </div>
          ) : filteredOptions?.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={`${id}-${index}`}
                className={`dropdown-option ${option[id] === selectedVal ? 'selected' : ''} ${
                  index === highlightedIndex ? 'highlighted' : ''
                }`}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option[label]}
              </div>
            ))
          ) : (
            <div className="dropdown-no-results">No options found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown

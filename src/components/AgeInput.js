/* eslint-disable react/prop-types */
import React from 'react'
import './test.css'
const AgeInput = ({ selectedAges, onAgeChange }) => {
  const ageOptions = [
    { value: '0-3', label: '0-3 شهر' },
    { value: '3-6', label: '3-6 شهر' },
    { value: '6-9', label: '6-9 شهر' },
    { value: '9-12', label: '9-12 شهر' },
    { value: '12-18', label: '12-18 شهر' },
    { value: '19-24', label: '18-24 شهر' },
    { value: '3y', label: '3 سنوات' },
    { value: '4y', label: '4 سنوات' },
  ]

  const handleAgeToggle = (age) => {
    onAgeChange(age)
  }

  const removeAge = (age, e) => {
    e.stopPropagation()
    onAgeChange(age)
  }

  return (
    <div className="age-section">
      <label className="form-label">الفئة العمرية</label>
      <div className="age-buttons-container">
        {ageOptions.map((age) => (
          <button
            key={age.value}
            type="button"
            className={`age-btn ${selectedAges?.includes(age.value) ? 'age-btn-active' : ''}`}
            onClick={() => handleAgeToggle(age.value)}
          >
            {age.label}
            {selectedAges?.includes(age.value) && ' ✓'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AgeInput

/* eslint-disable react/prop-types */
import React from 'react'
import './test.css'

const GenderInput = ({ selectedGender, onGenderChange }) => {
  const genderOptions = [
    { value: 'male', label: 'ذكر' },
    { value: 'female', label: 'أنثى' },
    { value: 'male, female', label: 'مناسب للجنسين' },
  ]

  const handleGenderSelect = (gender) => {
    onGenderChange(gender)
  }

  return (
    <div className="gender-section">
      <label className="form-label">الجنس</label>
      <div className="gender-options-container">
        {genderOptions.map((gender) => (
          <div key={gender.value} className="gender-option">
            <input
              type="radio"
              id={gender.value}
              name="gender"
              value={gender.value}
              checked={selectedGender === gender.value}
              onChange={() => handleGenderSelect(gender.value)}
              className="gender-radio"
            />
            <label htmlFor={gender.value} className="gender-label">
              {gender.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenderInput

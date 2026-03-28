/* eslint-disable react/prop-types */
import React from 'react'
import './test.css'

const SeasonsButtons = ({ selectedSeasons, onSeasonChange }) => {
  const seasonButtons = [
    { value: 'spring', label: 'الربيع' },
    { value: 'summer', label: 'الصيف' },
    { value: 'autumn', label: 'الخريف' },
    { value: 'winter', label: 'الشتاء' },
  ]

  const handleSeasonToggle = (season) => {
    onSeasonChange(season)
  }

  const removeSeason = (season, e) => {
    e.stopPropagation()
    onSeasonChange(season)
  }

  return (
    <div className="seasons-section">
      <label className="">الموسم</label>
      <div className="season-buttons-container">
        {seasonButtons.map((season) => (
          <button
            key={season.value}
            type="button"
            className={`season-btn ${
              selectedSeasons.includes(season.value) ? 'season-btn-active' : ''
            }`}
            onClick={() => handleSeasonToggle(season.value)}
          >
            {season.label}
            {selectedSeasons.includes(season.value) && ' ✓'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SeasonsButtons

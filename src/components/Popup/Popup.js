/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import './Popup.css'
import { Trash } from 'phosphor-react'
import PropTypes, { func, number } from 'prop-types'

function Popup({ id, onCLICK, text }) {
  const [showPopup, setShowPopup] = useState(false)
  Popup.propTypes = {
    id: PropTypes.instanceOf(number).isRequired,
    onCLICK: PropTypes.instanceOf(func).isRequired,
    text: PropTypes.instanceOf(text).isRequired,
  }
  // const ref = useRef(null)

  // const handleClickOutside = (event) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     setShowPopup(showPopup)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true)

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // }, [])
  const togglePopup = () => {
    setShowPopup(!showPopup)
    document.body.style.overflow = showPopup ? 'auto' : 'hidden'
  }

  return (
    <div>
      <div
        onClick={togglePopup}
        // ref={ref}
        style={{
          backgroundColor: '#fa3f19',
          width: '85px',
          // margin: '20',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderRadius: '10px',
          padding: '5px',
          margin: '10px',
          cursor: 'pointer',
        }}
      >
        <Trash size={22} color="white" />
        <span style={{ color: 'white' }}>حذف</span>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <div className="popup-header">
              {text}{' '}
              <button className="close-icon" onClick={togglePopup}>
                X
              </button>
            </div>
            <div className="popup-button">
              <button className="popup-yes" onClick={(id) => onCLICK(id)} id={id}>
                نعم إحذفه
              </button>
              <button onClick={togglePopup} className="popup-close">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Popup

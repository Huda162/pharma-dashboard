import { useState } from 'react'

export const useFormValidation = (addFunc) => {
  const [validated, setValidated] = useState(false)
  const [checkValidated, setCheckValidated] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    if (form.checkValidity() === false || checkValidated === false) {
      event.stopPropagation()
    } else {
      addFunc()
    }
    setValidated(true)
  }

  return {
    validated,
    handleSubmit,
    checkValidated,
    setCheckValidated,
  }
}

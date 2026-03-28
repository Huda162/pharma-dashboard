import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'

export const useAboutUs = () => {
  const [about, setAbout] = useState('')
  const [loading, setLoading] = useState(false)

  const getAboutUs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/about`)
      const data = await response.json()
      setAbout(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'categories',
    getAboutUs,
  )

  useEffect(() => {
    getAboutUs()
  }, [])
  const aboutData = about.about && about.about[0]
  const id = aboutData && aboutData.id

  return {
    loading,
    showDialog,
    about,
    getAboutUs,
    confirmDelete,
    cancelDelete,
    executeDelete,
    aboutData,
    id,
  }
}

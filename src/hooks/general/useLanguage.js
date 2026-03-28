export const useLanguage = () => {
  const isArabic = JSON.parse(localStorage.getItem('isArabic'))
  const isEnglish = JSON.parse(localStorage.getItem('isEnglish'))
  const isHebrew = JSON.parse(localStorage.getItem('isHebrew'))

  const setArabic = (value) => {
    localStorage.setItem('isArabic', JSON.stringify(value))
  }

  const setEnglish = (value) => {
    localStorage.setItem('isEnglish', JSON.stringify(value))
  }

  const setHebrew = (value) => {
    localStorage.setItem('isHebrew', JSON.stringify(value))
  }

  return {
    isEnglish,
    isArabic,
    isHebrew,
    setArabic,
    setEnglish,
    setHebrew,
  }
}

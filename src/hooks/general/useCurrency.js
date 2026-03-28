export const useCurrency = () => {
  const isNIS = JSON.parse(localStorage.getItem('isNIS'))
  const isUSD = JSON.parse(localStorage.getItem('isUSD'))
  const isJUD = JSON.parse(localStorage.getItem('isJOD'))

  const setNIS = (value) => {
    localStorage.setItem('isNIS', JSON.stringify(value))
  }

  const setUSD = (value) => {
    localStorage.setItem('isUSD', JSON.stringify(value))
  }

  const setJUD = (value) => {
    localStorage.setItem('isJOD', JSON.stringify(value))
  }

  return {
    isNIS,
    isUSD,
    isJUD,
    setNIS,
    setUSD,
    setJUD,
  }
}

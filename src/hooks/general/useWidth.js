const { useState } = require('react')

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  window.addEventListener('resize', function (event) {
    setWidth(window.innerWidth)
  })

  return { width }
}

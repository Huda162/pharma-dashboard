import { configureStore } from '@reduxjs/toolkit'
import formReducer from './redux/formReducer'

// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }
// export const store = createStore(changeState)

export default configureStore({
  reducer: {
    form: formReducer,
  },
})

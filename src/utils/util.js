import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Theme } from 'src/constants/colors'

export const notifyDelete = () =>
  toast.success('تم الحذف بنجاح', {
    position: 'top-right',
    autoClose: 3000,
    // hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    // className: 'custom-toast',
    style: { fontSize: '17px', backgroundColor: Theme.base },
    className: 'stickyToast',
  })

export const notifyAdd = () =>
  toast.success('تمت الإضافة بنجاح', {
    position: 'bottom-right',
    autoClose: 3000,
    // hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    // className: 'custom-toast',
    style: { fontSize: '17px' },
  })

export const notifyEdit = () =>
  toast.success('تم التعديل بنجاح', {
    position: 'bottom-right',
    autoClose: 3000,
    // hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    // className: 'custom-toast',
    style: { fontSize: '17px' },
  })
export const notifyEdit2 = () =>
  toast.success('تم التعديل بنجاح', {
    position: 'top-right',
    autoClose: 3000,
    // hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    // className: 'custom-toast',
    style: { fontSize: '17px' },
  })

export const notifyFailed = () =>
  toast.error('حصل خلل، يرجى المحاولة لاحقا', {
    position: 'bottom-right',
    autoClose: 3000,
    // hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    // className: 'custom-toast',
    style: { fontSize: '17px' },
  })

const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split('.').pop().trim()
}

export const dataURLtoFile = async (imgUrl) => {
  console.log('inside')
  var imgExt = getUrlExtension(imgUrl)
  const response = await fetch(imgUrl)
  const blob = await response.blob()
  const file = new File([blob], 'profileImage.' + imgExt, {
    type: blob.type,
  })
  console.log(file)
  return file
}

/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
import { Theme } from 'src/constants/colors'
import '../layout/layout.css'
import { CButton, CModal, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

const AppDialog = ({ title, open, onClose, actionCancel, actionExecute, deleteDialog = false }) => {
  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredExample"
      className="almarai-regular "
    >
      <CModalHeader>
        <CModalTitle style={{ margin: 'auto' }} id="VerticallyCenteredExample">
          {title}
        </CModalTitle>
      </CModalHeader>
      {deleteDialog ? (
        <CModalFooter>
          <CButton
            onClick={actionCancel}
            style={{ color: Theme.gray, backgroundColor: 'white', border: 'none' }}
          >
            إلغاء
          </CButton>
          <CButton
            onClick={actionExecute}
            style={{ backgroundColor: Theme.primaryRed, color: 'white', border: 'none' }}
          >
            نعم بالتأكيد
          </CButton>
        </CModalFooter>
      ) : (
        <CModalFooter>
          <CButton color="secondary">Close</CButton>
        </CModalFooter>
      )}
    </CModal>

    /* <Dialog
      open={open}
      onClose={onClose}
      className="almarai-regular"
    >
      <DialogTitle
        id="alert-dialog-title"
        color="white"
        style={{ color: Theme.primaryRed }}
      >
        {title}
      </DialogTitle>
      <DialogActions>
        {deleteDialog ? (
          <>
            <Button onClick={actionCancel} style={{color: Theme.gray}}>إلغاء</Button>
            <Button
              onClick={actionExecute}
              style={{ backgroundColor: Theme.primaryRed, color: 'white' }}
            >
              نعم بالتأكيد
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>حسنا</Button>
        )}
      </DialogActions>
    </Dialog> */
  )
}

export default AppDialog

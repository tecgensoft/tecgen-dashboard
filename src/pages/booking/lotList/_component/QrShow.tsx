/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import qz from 'qz-tray'
import { useState } from 'react'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
import { useAppSelector } from '../../../../redux/hook'

function QrShow({
  show,
  onHide,
  FileItem,
}: {
  show: boolean
  onHide: any
  FileItem: any
}) {
  const [printing, setPrinting] = useState(false)
  const { labelPrinter } = useAppSelector(state => state.print)
  // console.log("labelPrinter",labelPrinter)
  // const dispatch = useAppDispatch()
  async function printQrCode(qrCode: any) {
    setPrinting(true)

    if (!labelPrinter) {
      // console.log('Label printer is not found')
      return
    }

    try {
      const printer: any = await qz.printers.find(labelPrinter)

      const config = qz.configs.create(printer, {
        copies: 1,
      })
      const printData: any = [
        // {
        //   type: 'file',
        //   format: 'image',
        //   data: qrCode,
        // },
        {
          type: 'image', // Correct type for printing images
          format: 'png', // Specify the format (e.g., 'png', 'jpeg')
          data: qrCode,
        },
      ]
      await qz.print(config, printData)
      // console.log('label send to the label Printer')
      onHide()
      setPrinting(false)
      // dispatch(setOpen(true))
      // dispatch(setMessage('label send to the label Printer'))

   
    } catch (err: any) {
      setPrinting(false)
      // dispatch(setOpen(true))
      // dispatch(setMessage(err.toString()))

      // toast.error(err.toString())
    }
  }
  const handlePrint = async (code: any) => {
    try {
      if (!qz.websocket.isActive()) {
        await qz.websocket.connect()
      }
      // Proceed with printing
      printQrCode(code)
    } catch (error) {
      // console.error('Error printing:', error)
    }
  }
  return (
    <div>
      <Dialog open={show} onClose={onHide}>
        <DialogTitle>{/* <Modal.Title>File show</Modal.Title> */}</DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={FileItem?.final_qr_code}
            style={{
              width: '70%',
              height: '70%',
            }}
            alt="qr code"
          />
        </DialogContent>

        <DialogActions>
          <Button
      variant="contained"
            disabled={printing}
            onClick={() => handlePrint(FileItem.final_qr_code)}
          >
            print
          </Button>

          <Button onClick={onHide}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default QrShow

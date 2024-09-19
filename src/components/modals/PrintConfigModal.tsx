/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
 // @ts-nocheck 
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { hextorstr, KEYUTIL, KJUR, stob64 } from 'jsrsasign';
import qz from 'qz-tray';
import { useEffect, useState } from 'react';
import {
  printerModalClose,
  setInvoicePrinter,
  updateConnectionStatus,
  setLabelPrinter
} from '../../redux/feature/print/printSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

const PrintConfigModal = () => {
  const [printers, setPrinters] = useState<any>([]);
  const [selectInvoicePrinter, setSelectInvoicePrinter] = useState<string>('');
  const [selectLabelPrinter ,setSelectLabelPrinter] = useState<any>('');
  const { isPrinterModalOpen, isConnected, invoicePrinter, labelPrinter } =
    useAppSelector((state) => state?.print);

  const dispatch = useAppDispatch();
  qz.security.setCertificatePromise(function (
    resolve: (arg0: string) => void,
    // reject: any,
  ) {
    resolve(
      '-----BEGIN CERTIFICATE-----\n' +
        'MIIEAzCCAuugAwIBAgIUY3Z2U/YiZ+pXLEHJ8X8y4VpZsNcwDQYJKoZIhvcNAQEL\n' +
        'BQAwgY8xCzAJBgNVBAYTAmJkMQ4wDAYDVQQIDAVkaGFrYTEPMA0GA1UEBwwGdXR0\n' +
        'YXJhMRIwEAYDVQQKDAlrbWV4cHJlc3MxCzAJBgNVBAsMAml0MRkwFwYDVQQDDBBr\n' +
        'bWV4cHJlc3MuY29tLmJkMSMwIQYJKoZIhvcNAQkBFhRweWFzaHJhZnVsQGdtYWls\n' +
        'LmNvbTAgFw0yMzAzMTkwNjMxNTlaGA8yMDU0MDkxMTA2MzE1OVowgY8xCzAJBgNV\n' +
        'BAYTAmJkMQ4wDAYDVQQIDAVkaGFrYTEPMA0GA1UEBwwGdXR0YXJhMRIwEAYDVQQK\n' +
        'DAlrbWV4cHJlc3MxCzAJBgNVBAsMAml0MRkwFwYDVQQDDBBrbWV4cHJlc3MuY29t\n' +
        'LmJkMSMwIQYJKoZIhvcNAQkBFhRweWFzaHJhZnVsQGdtYWlsLmNvbTCCASIwDQYJ\n' +
        'KoZIhvcNAQEBBQADggEPADCCAQoCggEBANsRUAzOH6O42YU5tX1Q7IkL+sEP4cy+\n' +
        'LW6HM71B8I9nSsYMMuWahusqhWzhuuTp0+Uw0VasAZJFWgkyM0idxFup1OR7l0dk\n' +
        'nUUGFDN2c0Jlsw1jlezNP7ntO4E6g4/26PybKQGe2tUOKaty38yGtxRO9ycHhm5M\n' +
        'SfxB3tHg5nD4gnD6vqJM8WHdyDYldP1VCf+Eo22McoRpRkoFbi5qF7CNZIjHtOTw\n' +
        'TH4iCndcvHTRCYW9+S4v/FolVnyaIEAGx7q2Sj7xe2LAfOcfSogq5UDzRT9odQpI\n' +
        '/7Bw+8FclpN1IOijFBgeo7yHI9KX11z/YiSoIaTCRSbTy4BiK7bKk1kCAwEAAaNT\n' +
        'MFEwHQYDVR0OBBYEFFzLTMDQyHvcUxQpLHWMvpeGzWAiMB8GA1UdIwQYMBaAFFzL\n' +
        'TMDQyHvcUxQpLHWMvpeGzWAiMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQEL\n' +
        'BQADggEBAJGvduqQCf+ImWQE5rQRj+X9A736k07w7K4EzjSOjxmCBEf6gzq42VWc\n' +
        '+ZSdI9tlZi07Z4y756EE9VX7FMpyvANDAtRIFDZIXbGCHdNIULMpAVrAGLExC7vm\n' +
        '49s6cyhbVW5pTh6sKBTpTUyn2IP54BqOVzz9xC/kIRGSDsGis8DtI4C4HpRFFk+R\n' +
        'wZAAkMFNCA7VY0ECyrUNmLMcnHt25vxJGe0uPgIR3ywpdw/5eblGYzyO5MGc+NWn\n' +
        'NUEM8t69E0Z/ZvViuy+AGFQefS3VMA/BrzMj/znduwGcHqVg3IhHc3YB9oJdMBCT\n' +
        'Z8W1iUvjfd3tM7gdQ4Mhy+2nfdn6eBU=\n' +
        '-----END CERTIFICATE-----',
    )
  })
  qz.security.setSignaturePromise(function (toSign: string) {
    return function (
      resolve: (arg0: string) => void,
      reject: (arg0: unknown) => void,
    ) {
      try {
        const pk = KEYUTIL.getKey(
          '-----BEGIN PRIVATE KEY-----\n' +
            'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbEVAMzh+juNmF\n' +
            'ObV9UOyJC/rBD+HMvi1uhzO9QfCPZ0rGDDLlmobrKoVs4brk6dPlMNFWrAGSRVoJ\n' +
            'MjNIncRbqdTke5dHZJ1FBhQzdnNCZbMNY5XszT+57TuBOoOP9uj8mykBntrVDimr\n' +
            'ct/MhrcUTvcnB4ZuTEn8Qd7R4OZw+IJw+r6iTPFh3cg2JXT9VQn/hKNtjHKEaUZK\n' +
            'BW4uahewjWSIx7Tk8Ex+Igp3XLx00QmFvfkuL/xaJVZ8miBABse6tko+8XtiwHzn\n' +
            'H0qIKuVA80U/aHUKSP+wcPvBXJaTdSDooxQYHqO8hyPSl9dc/2IkqCGkwkUm08uA\n' +
            'Yiu2ypNZAgMBAAECggEAF1hY94RfysrAI3pq5Nfi3RfxuPFAVtlNbiHqWZjVUfLn\n' +
            '/QL/yYgWKKl3XosPp6Vjd2EkbeAWqsfJOIGpBWwKqNoIXfDtxiXqvJhRPsq4rbK4\n' +
            'ygx6xal5yQ6G8NaTfpwJaCIA1LNhDqNbvXGYd+tDR17C593dbZOjrsY2QJd+9zrR\n' +
            '8kjfGBUvgzlriZuE+rHcxRhaBcQw21OD/sVOWqvkXe7i8Wg6zlGDPkhdq0xArRCk\n' +
            'QgBmPCWqprz88G6JOJ3lsrFH9ZwSrDiURDAfs7ksQlFbjNNiWkMFnjTx6zEitEfk\n' +
            'pUv5+GYM1GFzAh0RisICSME2XSJI4CuElyal8dhMAQKBgQDuYxjcg+H463LikFLD\n' +
            'Y2HZ6xwj8DBT0YAYhua1zoMhjeoVN7UA2XCUsAOojrfDcgOKpRKRvHi7oCgzoPfN\n' +
            'bKg+A+uCicAmKHCIIaUX8oT3mgyRNEr2og8zT+8eMOVErFBnJ5QajTU0TMbjf48T\n' +
            'rOXTXq9czkC00DBcSHkyZP2faQKBgQDrQM2ZXCKOADT8aN0CTuwrbRKcS94TksmI\n' +
            'lVOb7lXXkj5nDvo1tgHcLLQViBjzZBxUQrwcNSo/ZGAd96hryEInv+uGphbuSgc2\n' +
            '3okCpShr6ULb/apHqD+q5wLjIYI/OupWJ6uXu5bXvdD9CpnI+PyinMos/9RUuGuL\n' +
            'RZLeB6zGcQKBgAGnsHl/dOcsg0ytYdW3b+t6ZWSee0dpsfD5pspmV6S4/oINM/WA\n' +
            'jPaLTksySnZR6VJiGQHoBBKRZxYMrQvBEF312wG6ARqCt11KloHXDjNF34Z2jXqu\n' +
            '31ok2O0lu8HBTIGa1b1lc5QcYFkd/plNXv8bri3/xJU8yMkrO6Qs7VHZAoGBAI8q\n' +
            'ObSpsFGwaI5vFoiQFQN8dkXtmbFZtBHNpjsPuOfelOFM6RIEuG8QOWudDmoYM3FH\n' +
            'x4h3BkXbxO6Xx8QH89KS5jdkHjJXlLpchQ66CbZaFxkf7x96kXxk54nn24a1SOSz\n' +
            'caZ+P5b9ahCEAgCfHcesGRF3gvUn4jK4XV+HVirRAoGAc0ET/trfaXUP8gd2ETT7\n' +
            'md0OFwKkbcHloBeV2v6OZSKYh4lz5UX/uX5rIJAsHX4Wp6XInj0Yw/t8doTI1aKa\n' +
            'DuEXoP+NfawXBenUt+LjTkcwPU73K5QoUqurtG1C4BIC8jJNebJNquD0JrUUXIzG\n' +
            's0XNgiadYG8g6rP+A4ThKQA=\n' +
            '-----END PRIVATE KEY-----',
        )
        const sig = new KJUR.crypto.Signature({
          alg: 'SHA1withRSA',
        })
        sig.init(pk)
        sig.updateString(toSign)
        const hex = sig.sign()
        resolve(stob64(hextorstr(hex)))
      } catch (err) {
      //
        reject(err)
      }
    }
  })

  function startConnection(config: undefined) {
    if (!qz.websocket.isActive()) {
      // console.log('waiting');
      qz.websocket
        .connect(config)
        .then(function () {
          dispatch(updateConnectionStatus(true));
          qz.printers
            .find()
            .then((allPrinter) => {
              setPrinters(allPrinter);
              if (allPrinter.includes(invoicePrinter)) {
                setSelectInvoicePrinter(invoicePrinter);
              }
              if (allPrinter.includes(labelPrinter)) {
                setSelectLabelPrinter(labelPrinter);
              }
            })
            .catch((e) => {
           //
            });
          // console.log('Printer connected successfully');
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      // console.log('An active connection with QZ already exists.');
    }
  }

  function endConnection() {
    if (qz.websocket.isActive()) {
      qz.websocket
        .disconnect()
        .then(function () {
          // console.log('Disconnected from QZ.');
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      // console.log('No active connection with QZ exists.');
    }
  }

  const changeInvoicePrinter = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setSelectInvoicePrinter(value);
    dispatch(setInvoicePrinter(value));
  };

  const changeLabelPrinter = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
  setSelectLabelPrinter(value);
    dispatch(setLabelPrinter(value));
  };

  useEffect(() => {
    if (isPrinterModalOpen) {
      startConnection(undefined);
    }
    return () => {
      endConnection();
    };
  }, [isPrinterModalOpen]);

  return (
    <Dialog
      className="modal"
      open={isPrinterModalOpen}
      onClose={() => dispatch(printerModalClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Printer Configuration</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1">
            Connection: {isConnected ? 'Active' : 'Inactive'}
          </Typography>
          <Typography variant="body1">
            Invoice printer: {invoicePrinter}
          </Typography>
          {/* <Typography variant="body1">
            Label printer: {labelPrinter}
          </Typography> */}
        </Box>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Select Invoice Printer</InputLabel>
          <Select
            value={selectInvoicePrinter}
            onChange={changeInvoicePrinter}
            label="Select Invoice Printer"
          >
            <MenuItem value="">Select Printer</MenuItem>
            {printers &&
              printers.map((printer:any, index:any) => (
                <MenuItem key={index} value={printer}>
                  {printer}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Select Label Printer</InputLabel>
          <Select
            value={selectLabelPrinter}
            onChange={changeLabelPrinter}
            label="Select Label Printer"
          >
            <MenuItem value="">Select</MenuItem>
            {printers &&
              printers.map((printer, index) => (
                <MenuItem key={index} value={printer}>
                  {printer}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
         sx={{fontSize:"12px"}}
          variant="contained"
          onClick={() => dispatch(printerModalClose())}
          color="secondary"
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{fontSize:"12px"}}
          onClick={() => dispatch(printerModalClose())}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrintConfigModal;
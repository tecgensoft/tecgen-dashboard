import { useTheme } from '@mui/material'
import PhoneInput from 'react-phone-input-2'

export default function Phone({
    selectedCountry,
    handlePhone,
    value
}:any) {
    const theme = useTheme()
    const mode = theme?.palette?.mode
    // const { preferredCountries } = useAppSelector(state => state.booking)

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#EFF3F4',
        border: `1px solid  ${mode === 'light' ? '#D9E3E7' : '#464646'}`,
        borderRadius: '8px',
      }
      const inputStyle = {
        width: '100%',
        height: '40px',
        backgroundColor: mode === 'light' ? '#EFF3F4' : '#464646',
        border: 'none',
        color: mode === 'light' ? '#999999' : '#848484',
        fontSize: '16px',
        outline: 'none',
      }
      const buttonStyle = {
        backgroundColor: mode === 'light' ? '#EFF3F4' : '#353434',
        border: 'none',
      }
    
    return (
        <div>

            <label
                style={{
                    color: `${theme?.palette?.mode === 'light' ? '#2e2e2e' : '#fff'}`,
                    fontSize: '14px',
                    marginBottom: '5px',
                    display: 'block',
                }}
            >
                Phone*
            </label>
            <PhoneInput
                onlyCountries={[]}
                country={selectedCountry}
                onChange={handlePhone}

                value={value}
                containerStyle={containerStyle}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
                inputProps={{
                    id: 'phone-input',
                    name: 'phone',
                    autoFocus: false,
                }}
                placeholder="Enter phone number"
            />
        </div>
    )
}

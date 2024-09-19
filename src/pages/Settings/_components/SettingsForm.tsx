import AttachFileIcon from '@mui/icons-material/AttachFile'
import { Box, Button, FormHelperText, Grid } from '@mui/material'
import SettingInput from './SettingsInput'

// interface ICompanyMetaInfo {
//   title: string
//   keywords: string
//   description: string
//   companyName: string
//   address: string
//   phone: string
//   fax: string
//   email: string
//   icon: File | null
//   logo: File | null
//   facebook: string
//   instagram: string
//   twitter: string
//   youtube: string
//   aboutUs: string
//   contact: string
//   reference: string
// }

export default function SettingsForm({ metaInfo, handleInputChange, handleFileChange, errors }: any) {
  // console.log(URL.createObjectURL(metaInfo.icon))
  const isFileOrUrl = (value:any) => {
    if(value instanceof File){
      return true
    }
    return false
  }
  return (
    <Box sx={{ padding: '15px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SettingInput
            label="Title"
            name="title"
            value={metaInfo.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Keywords"
            name="keywords"
            value={metaInfo.keywords}
            onChange={handleInputChange}
            error={!!errors.keywords}
            helperText={errors.keywords}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Description"
            name="description"
            value={metaInfo.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Company Name"
            name="company_name"
            value={metaInfo.company_name}
            onChange={handleInputChange}
            error={!!errors.company_name}
            helperText={errors.company_name}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Address"
            name="address"
            value={metaInfo.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Phone"
            name="phone"
            value={metaInfo.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Fax"
            name="fax"
            value={metaInfo.fax}
            onChange={handleInputChange}
            error={!!errors.fax}
            helperText={errors.fax}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Email"
            name="email"
            value={metaInfo.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="icon-upload" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <input
              accept="image/*"
              id="icon-upload"
              type="file"
              name="icon"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<AttachFileIcon />}
              sx={{ padding: "8px 12px" }}
            >
              Upload Icon
            </Button>
            {metaInfo.icon && <Box
              sx={{
                width: 60,
                height: 40,
                border: '2px solid #ccc',
                display: "flex",
                justifyContent: "center",
                padding: "4px",
                overflow:"hidden"
              }}
            >
              <Box
                component="img"
                src={metaInfo?.icon && isFileOrUrl(metaInfo?.icon) ?  URL.createObjectURL(metaInfo.icon) : metaInfo?.icon}
                alt="Selected Icon"
              />
            </Box>}
          </label>
          {!!errors.icon && <FormHelperText sx={{pl:4}} error>{errors.icon}</FormHelperText>}
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="logo-upload" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <input
              accept="image/*"
              id="logo-upload"
              type="file"
              name="logo"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              width={'150px'}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<AttachFileIcon />}
              sx={{ padding: "8px 12px", width:"150px" }}
            >
              Upload Icon
            </Button>
            {metaInfo.logo && <Box
              sx={{
                width: 60,
                height: 40,
                border: '2px solid #ccc',
                display: "flex",
                justifyContent: "center",
                padding: "4px",
                overflow:"hidden"
              }}
            >
              <Box
                component="img"
                src={metaInfo?.logo && isFileOrUrl(metaInfo?.logo) ?  URL.createObjectURL(metaInfo.logo) : metaInfo?.logo}
                alt="Selected Icon"
              />
            </Box>}
          </label>
          {!!errors.logo && <FormHelperText sx={{pl:4}} error>{errors.logo}</FormHelperText>}
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Facebook"
            name="facebook"
            value={metaInfo.facebook}
            onChange={handleInputChange}
            error={!!errors.facebook}
            helperText={errors.facebook}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Instagram"
            name="instagram"
            value={metaInfo.instagram}
            onChange={handleInputChange}
            error={!!errors.instagram}
            helperText={errors.instagram}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Twitter"
            name="twitter"
            value={metaInfo.twitter}
            onChange={handleInputChange}
            error={!!errors.twitter}
            helperText={errors.twitter}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="YouTube"
            name="youtube"
            value={metaInfo.youtube}
            onChange={handleInputChange}
            error={!!errors.youtube}
            helperText={errors.youtube}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="About Us"
            name="aboutus"
            value={metaInfo.aboutus}
            onChange={handleInputChange}
            error={!!errors.aboutus}
            helperText={errors.aboutus}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Contact"
            name="contact"
            value={metaInfo.contact}
            onChange={handleInputChange}
            error={!!errors.contact}
            helperText={errors.contact}
          />
        </Grid>
        <Grid item xs={12}>
          <SettingInput
            label="Reference"
            name="reference"
            value={metaInfo.reference}
            onChange={handleInputChange}
            error={!!errors.reference}
            helperText={errors.reference}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  )
}

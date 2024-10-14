import { Box } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import InputLabel from './InputLabel'

export default function TinyEditor({
  label,
  required,
}: {
  label?: string
  required?: boolean
}) {
  return (
    <Box>
      <InputLabel label={label} required={required} />
      <Editor
        apiKey="9ml9h450t0n2ed8u3wfbkxi3gl7pqorop8tor7cexmlzdx03"
        init={{
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
        initialValue=""
      />
    </Box>
  )
}

import { CloseOutlined } from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
interface IImageField {
    label?: string
    onChange?: () => void
    required?: boolean
    onImageUpload?: (files: File[] | null) => void
    imagesList?: string[]
    removeImage?: (index:number, preview: string) => void
}
export default function ImageField({
    label,
    onImageUpload,
    imagesList = [],
    required,
    removeImage
}: IImageField) {
    const [files, setFiles] = useState<File[]>([])
    const [error, setError] = useState<string | null>(null)
    const [previews, setPreviews] = useState<string[]>([])
    const [isTouched, setIsTouched] = useState<boolean>(false)
    const maxFileSize = 3 * 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png']
// console.log(previews)
    // if old image is exits.
    useEffect(() => {
        setPreviews(imagesList)
    }, [imagesList])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files
        setIsTouched(true)
        if (selectedFiles) {
            const newFiles: File[] = Array.from(selectedFiles)
            let validFiles: File[] = []
            let errorMessages: string[] = []

            newFiles.forEach(file => {
                if (!allowedTypes.includes(file.type)) {
                    errorMessages.push(
                        `Unsupported file type for ${file.name}. Please upload ${allowedTypes.join(' or ')} files.`,
                    )
                    return
                }

                // Validate file size
                if (file.size > maxFileSize) {
                    errorMessages.push(
                        `File size of ${file.name} exceeds the limit of ${maxFileSize / (1024 * 1024)}MB.`,
                    )
                    return
                }

                validFiles.push(file)
            })

            // Set previews for valid files
            const newPreviews: string[] = []
            validFiles.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string)
                    if (newPreviews.length === validFiles.length) {
                        setFiles(prev => [...prev, ...validFiles])
                        setPreviews(prev => [...prev, ...newPreviews])
                        if (onImageUpload) onImageUpload([...files, ...validFiles])
                    }
                }
                reader.readAsDataURL(file)
            })

            // Handle errors
            if (errorMessages.length > 0) {
                setError(errorMessages.join(' '))
                setPreviews([])
                if (onImageUpload) onImageUpload(null)
            } else {
                setError(null)
            }
        } else {
            setPreviews([])
            setFiles([])
            if (onImageUpload) onImageUpload(null)
            if (required) {
                setError('This field is required.')
            } else {
                setError(null)
            }
        }
    }

    // const handleRemoveImage = (index: number) => {
    //     const newFiles = [...files]
    //     const newPreviews = [...previews]

    //     newFiles.splice(index, 1)
    //     newPreviews.splice(index, 1)

    //     setFiles(newFiles)
    //     setPreviews(newPreviews)

    //     if (onImageUpload) onImageUpload(newFiles.length > 0 ? newFiles : null)
    // }

    const handleBlur = () => {
        setIsTouched(true)

        // If the field is required but no file is selected, show an error
        if (required && previews.length === 0) {
            setError('This field is required.')
        }
    }
    return (
        <Box>
            {label && (
                <Typography sx={{ fontSize: '14px', color: '#0D0D0D', mb: '8px' }}>
                    {label}
                </Typography>
            )}
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                <Button
                    sx={{
                        width: '65px',
                        height: '65px',
                        background: '#32976a4b',
                        border: '1px solid #32976A',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}
                    component="label"
                    onBlur={handleBlur}
                >
                    <ImageIcon />
                    <Box
                        component={'span'}
                        sx={{
                            fontSize: '10px',
                            lineHeight: '12px',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                        }}
                    >
                        Upload Image
                    </Box>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={handleFileChange}
                    />
                </Button>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    {previews.map((preview, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '65px',
                                height: '65px',
                                position: 'relative',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                p: 1,
                            }}
                        >
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                            <Button
                                onClick={() => {
                                    removeImage && removeImage(index, preview); 
                                    setPreviews((prev) => prev.filter((_, i) => i !== index)); 
                                    setFiles((prev) => prev.filter((_, i) => i !== index)); 
                                }}
                                color="error"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: -5,
                                    minWidth: '24px',
                                    padding: '0',
                                    lineHeight: '1',
                                }}
                            >
                                <CloseOutlined sx={{ fontSize: '16px', fontWeight: 'bold' }} />
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
            {error && isTouched && (
                <Typography color="error" sx={{ mt: 1, fontSize: '12px' }}>
                    {error}
                </Typography>
            )}
        </Box>
    )
}

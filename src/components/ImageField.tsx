import { CloseOutlined } from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
    useImgDeleteMutation,
    useImgUploadMutation,
} from '../redux/feature/imageUpload/imageUploadApi'
interface IImageField {
    label?: string
    required?: boolean
}
export default function ImageField({
    label,
    required,
}: IImageField) {
    const [error, setError] = useState<string | null>(null)
    const [previews, setPreviews] = useState<string[]>([])
    const [isTouched, setIsTouched] = useState<boolean>(false)
    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
    const maxFileSize = 3 * 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png']
    const [imgUpload, { isLoading }] = useImgUploadMutation()
    const [imgDelete] = useImgDeleteMutation()

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
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

                if (file.size > maxFileSize) {
                    errorMessages.push(
                        `File size of ${file.name} exceeds the limit of ${maxFileSize / (1024 * 1024)}MB.`,
                    )
                    return
                }

                validFiles.push(file)
            })

            if (errorMessages.length > 0) {
                setError(errorMessages.join(' '))
                return
            }

            setError(null)

            for (const file of validFiles) {
                const formData = new FormData()
                formData.append('image', file)
                const res = await imgUpload(formData)
                const img_url = res?.data?.image_url
                if (img_url) {
                    setPreviews(prev => [...prev, img_url])
                }
            }
        }
    }

    const handleRemoveImage = async (index: number, imageUrl: string) => {
        setLoadingImages(prev => ({ ...prev, [imageUrl]: true }));
        if (imageUrl) {
            await imgDelete({
                image_url: imageUrl,
            }).then(res => {
                if (res.data) {
                    const updatedPreviews = previews.filter((_, i) => i !== index)
                    setPreviews(updatedPreviews)
                }
            }).finally(() => {
                setLoadingImages(prev => ({ ...prev, [imageUrl]: false })); 
            });
        }
    }
    const handleBlur = () => {
        setIsTouched(true)
        if (required && previews.length === 0) {
            setError('This field is required.')
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('')
        },3000);    
        return () => clearTimeout(timer);
    }, [error])
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
                        position: "relative"
                    }}
                    component="label"
                    onBlur={handleBlur}
                >
                    {isLoading && <Box
                        sx={{
                            position: 'absolute',
                            width: '65px',
                            height: '65px',
                            display: 'flex',
                            top: '0px',
                            left: '0px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: "#32976a40"
                        }}
                    >
                        <CircularProgress size={'20px'} sx={{ color: 'white' }} />
                    </Box>}
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
                            {loadingImages[preview] && <Box
                                sx={{
                                    position: 'absolute',
                                    width: '65px',
                                    height: '65px',
                                    display: 'flex',
                                    top: '0px',
                                    left: '0px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: "#d32f2f40",
                                }}
                            >
                                <CircularProgress size={'20px'} sx={{ color: 'white' }} />
                            </Box>}
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
                                onClick={() => handleRemoveImage(index, preview)}
                                color="error"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    minWidth: '18px',
                                    minHeight:"18px",
                                    padding: '0',
                                    lineHeight: '1',
                                    background:"white",
                                    'box-shadow': '0px 0px 3px 0px #32976a',
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    borderRadius:"50%"
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

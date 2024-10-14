/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined } from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { SetStateAction, useEffect, useState } from 'react'
import { CREATE } from '../constant/constant'
import {
    useImgDeleteMutation,
    useImgUploadMutation,
} from '../redux/feature/imageUpload/imageUploadApi'
import { useAppSelector } from '../redux/hook'
import InputLabel from './InputLabel'
interface IImageField {
    label?: string
    required?: boolean
    tagName: string;
    setParentInfo: React.Dispatch<SetStateAction<any>>;
    isMultiple?: boolean;
    initialImage?: string[]
    errorMsg?: string | null
}
export default function ImageField({
    label,
    required = false,
    setParentInfo,
    tagName,
    isMultiple,
    initialImage= [],
    errorMsg
}: IImageField) {
    const { type } = useAppSelector(state => state.open)
    const [error, setError] = useState<string | null>()
    const [previews, setPreviews] = useState<string[]>(initialImage?.length > 0 ? initialImage : [])
    const [isTouched, setIsTouched] = useState<boolean>(false)
    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
    const maxFileSize = 3 * 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png']
    const [imgUpload, { isLoading }] = useImgUploadMutation()
    const [imgDelete] = useImgDeleteMutation()


    useEffect(() => {
        setParentInfo((prev: any) => ({ ...prev, [tagName]: previews }))
    }, [previews, setParentInfo, tagName])

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFiles = event.target.files
        setIsTouched(true)

        if (selectedFiles) {
            const newFiles: File[] = Array.from(selectedFiles)
            const validFiles: File[] = []
            const errorMessages: string[] = []

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
            if (isMultiple) {
                for (const file of validFiles) {
                    const formData = new FormData()
                    formData.append('image', file)
                    const res = await imgUpload(formData)
                    const img_url = res?.data?.image_url
                    if (img_url) {
                        setPreviews(prev => [...prev, img_url])
                    }
                }
            } else {
                if (previews.length > 0) {
                    // if EDIT we do not delete image. remove from array not call the function
                    previews.map(async (imgLink) => {
                        await imgDelete({
                            image_url: imgLink,
                        }).then(res => {
                            if (res.data) {
                                const updatedPreviews = previews.filter((link) => link !== link)
                                setPreviews(updatedPreviews)
                            }
                        })
                    })
                }
                const formData = new FormData()
                formData.append('image', validFiles[0])
                const res = await imgUpload(formData)
                const img_url = res?.data?.image_url
                if (img_url) {
                    setPreviews([img_url])
                }
            }

        }
    }

    const handleRemoveImage = async (index: number, imageUrl: string) => {
        setLoadingImages(prev => ({ ...prev, [imageUrl]: true }));
        if(type === CREATE){
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
        }else {
            const updatedPreviews = previews.filter((_, i) => i !== index)
            setPreviews(updatedPreviews)
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
        }, 3000);
        return () => clearTimeout(timer);
    }, [error])
    return (
        <Box>
            {label && (
                <InputLabel label={label} required={required} />
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
                        multiple={isMultiple}
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
                                    minHeight: "18px",
                                    padding: '0',
                                    lineHeight: '1',
                                    background: "white",
                                    'box-shadow': '0px 0px 3px 0px #32976a',
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%"
                                }}
                            >
                                <CloseOutlined sx={{ fontSize: '16px', fontWeight: 'bold' }} />
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
            {errorMsg || error && isTouched && (
                <Typography color="error" sx={{ mt: 1, fontSize: '12px' }}>
                    {errorMsg || error }
                </Typography>
            )}
        </Box>
    )
}
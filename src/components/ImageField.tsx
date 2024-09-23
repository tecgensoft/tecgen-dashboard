// import { Box, Button, Typography } from '@mui/material'
// import { useState } from 'react';
// interface IImageField {
//     label?: string
//     onChange?: () => void
//     required?: boolean
//   }
// export default function ImageField({label}: IImageField) {
//   const [previews, setPreviews] = useState<string[]>([]);


//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = event.target.files;
//     setIsTouched(true); // Mark the input as touched when a file is selected or deselected

//     if (selectedFiles) {
//       const newFiles: File[] = Array.from(selectedFiles);
//       let validFiles: File[] = [];
//       let errorMessages: string[] = [];

//       newFiles.forEach((file) => {
//         // Validate file type
//         if (!allowedTypes.includes(file.type)) {
//           errorMessages.push(`Unsupported file type for ${file.name}. Please upload ${allowedTypes.join(' or ')} files.`);
//           return;
//         }

//         // Validate file size
//         if (file.size > maxFileSize) {
//           errorMessages.push(`File size of ${file.name} exceeds the limit of ${maxFileSize / (1024 * 1024)}MB.`);
//           return;
//         }

//         validFiles.push(file);
//       });

//       // Set previews for valid files
//       const newPreviews: string[] = [];
//       validFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           newPreviews.push(reader.result as string);
//           if (newPreviews.length === validFiles.length) {
//             setFiles((prev) => [...prev, ...validFiles]);
//             setPreviews((prev) => [...prev, ...newPreviews]);
//             if (onImageUpload) onImageUpload([...files, ...validFiles]);
//           }
//         };
//         reader.readAsDataURL(file);
//       });

//       // Handle errors
//       if (errorMessages.length > 0) {
//         setError(errorMessages.join(' '));
//         setPreviews([]);
//         if (onImageUpload) onImageUpload(null);
//       } else {
//         setError(null);
//       }
//     } else {
//       setPreviews([]);
//       setFiles([]);
//       if (onImageUpload) onImageUpload(null);
//       if (required) {
//         setError('This field is required.');
//       } else {
//         setError(null);
//       }
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     const newFiles = [...files];
//     const newPreviews = [...previews];
    
//     // Remove the image at the specified index
//     newFiles.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setFiles(newFiles);
//     setPreviews(newPreviews);
    
//     if (onImageUpload) onImageUpload(newFiles.length > 0 ? newFiles : null);
//   };
//   return (
//     <Box>
//         {label && (
//         <Typography sx={{ mb: 1, fontSize: '14px', color: '#0D0D0D' }}>
//           {label}
//         </Typography>
//       )}
//       <Button variant="contained" component="label">
//         Upload Images
//         <input
//           type="file"
//           accept="image/*"
//           hidden
//           multiple
//         />
//       </Button>
//       <Box mt={2} display="flex" flexWrap="wrap">
//         {previews.map((preview, index) => (
//           <Box key={index} sx={{ mr: 1, mb: 1, position: 'relative' }}>
//             <img
//               src={preview}
//               alt={`Preview ${index + 1}`}
//               style={{
//                 maxWidth: '100px',
//                 height: 'auto',
//                 borderRadius: '4px',
//                 objectFit: 'contain',
//               }}
//             />
//             <Button
//               onClick={() => handleRemoveImage(index)}
//               variant="outlined"
//               color="error"
//               size="small"
//               sx={{ position: 'absolute', top: 0, right: 0 }}
//             >
//               X
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   )
// }

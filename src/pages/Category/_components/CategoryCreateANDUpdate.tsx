import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import ImageField from '../../../components/ImageField';
import InputField from '../../../components/InputField';
import SwitchField from '../../../components/modals/Switch';
import { useImgDeleteMutation, useImgUploadMutation } from '../../../redux/feature/imageUpload/imageUploadApi';

export default function CategoryCreateANDUpdate() {
  const [imageList, setImageList] = useState<string[]>([])
  const [imgUpload] = useImgUploadMutation()
  const [imgDelete] = useImgDeleteMutation()
  // console.log(imageList)
  const handleImageUpload = (files: File[] | null) => {
    if (files) {
      // console.log('Uploaded files:', files);
      
      for(let item of files){
        const formdata = new FormData();
        // console.log(item)
        formdata.append('image', item)
        imgUpload(formdata).then(res => {
          const img = res?.data?.image_url
          console.log(img)
          if(res.data){
            // console.log(res.data)
            setImageList([...imageList, img])
          }
        })
      }
    } else {
      console.log('No valid files selected');
    }
  };
  const handleRemoveImage = async (index: number, preview:string) => {
    const urlSplit = preview?.split(':')[0]
    if(urlSplit === 'data'){
      // console.log('data'){

    }else{
      // console.log('http')
      await imgDelete({
        image_url: preview
      })
    }
};
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}>
      <InputField name='name' label="Category Name" placeholder='Enter category name' required />
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        gap: "16px"
      }}>
        <SwitchField value={true} labelOfChecked='Is Active' />
        <Divider/>
        <SwitchField value={true} labelOfChecked='Show in Ecommerce' />
      </Box>
      <ImageField label='Upload Image'  onImageUpload={handleImageUpload} removeImage={handleRemoveImage} imagesList={imageList} />
    </Box>
  )
}

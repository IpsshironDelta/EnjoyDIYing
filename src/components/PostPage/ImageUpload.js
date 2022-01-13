import { Button } from '@mui/material';
import React from 'react'
import { useFileUpload } from "use-file-upload";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const Sample = () => {
  const defaultSrc =
    "https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/AddImage.png?alt=media&token=f9139d7f-d4d3-4be0-ae3c-2717f4ddeb45";
  const [files, selectFiles] = useFileUpload();

  return (
    <div>
      <div>
        <img src={files?.source || defaultSrc} 
          alt="preview" 
          width="200px" 
          padding ="1em"/>
      </div>

        <Button
            variant="contained"
            onClick={() =>
                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                console.log("Files Selected", { name, size, source, file });
            })
          }
          endIcon={<PhotoCamera />}
        >
          画像を追加する
      </Button>
    </div>
  );
}
 
export default Sample;
import { Button } from '@mui/material';
import React from 'react'
import { useFileUpload } from "use-file-upload";

const Sample = () => {
  const defaultSrc =
    "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";
 
  const [files, selectFiles] = useFileUpload();
  return (
    <div>
        <Button
            variant="contained"
            onClick={() =>
                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                console.log("Files Selected", { name, size, source, file });
            })
          }
        >
          画像を追加する
      </Button>
      <div>
        <img src={files?.source || defaultSrc} alt="preview" width="200px" padding ="1em" />
      </div>
    </div>
  );
}
 
export default Sample;
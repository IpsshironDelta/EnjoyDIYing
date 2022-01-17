// 画像アップロードサンプルコード
import React               from "react";
import app                 from "../../firebase";
import { getStorage, 
         ref as sRef, 
         uploadBytesResumable, 
         getDownloadURL }  from "firebase/storage";

function Upload() {
    const storage = getStorage(app)
    const handleUploadImage = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0]
        uploadImage(file)
    }

    const uploadImage = (file) => {
        if (!file) return
        const storageRef = sRef(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    return (
        <div>
            <form onSubmit={handleUploadImage}>
                <input type={'file'} className={'input'}/>
                <button type={'submit'}>Upload</button>
            </form>
        </div>
    )
}

export default Upload;
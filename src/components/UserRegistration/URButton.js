import React,
     { useState  }    from 'react';
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';
import { getAuth, 
    createUserWithEmailAndPassword , 
    updateProfile}    from "firebase/auth";
import app            from "../../firebase";
import store          from '../../store/index';
import {getStorage,
    ref as sRef, 
    uploadBytesResumable, 
    getDownloadURL }  from "firebase/storage";

export default function URButton(props){

    // 画面遷移のハンドル
    const history = useHistory();

    // 無料ユーザー登録ボタンをクリックしたとき
    const handleClick = (e) => {
        console.log(props.id)
        if(props.id == "registerOk"){
            console.log("Firebaseに登録")
            const auth = getAuth(app);

            // メールアドレスとパスワード登録
            createUserWithEmailAndPassword(auth, 
                store.getState().address, 
                store.getState().password1)
                .then((userCredential) => {
                // Signed in 
                console.log("userCredential => ",userCredential);
                const user = userCredential.user;
                console.log(user," がFirebaseに登録されました");

                // // 画像データをfirebaseへアップロード
                // const file = store.getState().photoFileData
                // uploadImage(file)

                // 登録完了ボタンに遷移
                history.push(props.link)
                })
                // 以下登録に失敗した場合
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error        => ",error);
                console.log("errorCode    => ",errorCode);
                console.log("errorMessage => ",errorMessage);
                // アドレスが重複している場合
                if (errorCode ==="auth/email-already-in-use"){
                    alert("既に登録されているメールアドレスです。")
                    console.log("アドレス重複")
                }});
            }else{
                history.push(props.link)
            }
        }

    // 画像アップロード処理
    const storage = getStorage(app)
    // const uploadImage = (file) => {
    //     const auth = getAuth(app)
    //     if (!file) return
    //     const storageRef = sRef(storage, `files/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file)
    //     uploadTask.on('state_changed',(snapshot) => {
    //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log('Upload is ' + progress + '% done');
    //         switch (snapshot.state) {
    //         case 'paused':
    //             console.log('Upload is paused');
    //             break;
    //         case 'running':
    //             console.log('Upload is running');
    //             break;
    //         default:
    //             break
    //         }},
    //         (error) => {
    //             console.log("アップロードできませんでした。")
    //             console.log(error)
    //         }, () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log(file.name," の画像アップロード完了")
    //                 console.log('File available at', downloadURL);
    //                 // ニックネーム(ユーザー名)と画像URL更新
    //                 updateProfile(auth.currentUser ,{
    //                     displayName : store.getState().displayName,
    //                     photoURL    : downloadURL,
    //                     }).then(() => {
    //                         console.log("更新完了")
    //                         store.getState().phoneNumber = file.name
    //                         console.log("displayName => ", store.getState().displayName)
    //                         console.log("photoURL    => ", downloadURL)
    //                         console.log("address     => ", store.getState().address)
    //                         console.log("password    => ", store.getState().password1)
    //                         console.log("phoneNumber => ", store.getState().phoneNumber)
    //                     }).catch((error) => {
    //                         console.log("更新失敗")
    //                     })
    //                 });
    //             });
    //         }
        
    return(

        <Button 
            size    = {props.size}
            variant = {props.variant}
            sx      = {props.sx}
            id      = {props.id}
            link    = {props.link}
            disableElevation
            onClick={() => {
                handleClick()
            }}>
            {props.text}
        </Button>
    )
}
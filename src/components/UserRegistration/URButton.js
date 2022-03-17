import React,
     { useState  }    from 'react';
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';
import { getAuth, 
    createUserWithEmailAndPassword , 
    updateProfile}    from "firebase/auth";
import app            from "../../firebase";
import store          from '../../store/index';

export default function URButton(props){

    // 画面遷移のハンドル
    const history = useHistory();

    // 無料ユーザー登録ボタンをクリックしたとき
    const handleClick = (e) => {
        console.log(props.id)
        console.log()
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
                console.log("Firebaseに登録されました");

                // ニックネーム(ユーザー名)と画像URL更新
                updateProfile(auth.currentUser ,{
                    displayName : store.getState().displayName,
                    photoURL    : store.getState().photoURL,
                    }).then(() => {
                        console.log("更新完了")
                        console.log("displayName => ",store.getState().displayName)
                        console.log("photoURL    => ",store.getState().photoURL)
                        console.log("address     => ", store.getState().address)
                        console.log("password    => ", store.getState().password1)
                    }).catch((error) => {
                        console.log("更新失敗")
                    })

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
                }
                });
            }else{
                history.push(props.link)
            }
        }
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
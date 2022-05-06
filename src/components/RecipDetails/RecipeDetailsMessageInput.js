import React, { useState } from "react"
import {Alert ,
        Button,
        TextField,
        Box,
        Divider,
        Stack,} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import {firebaseApp } from "../../firebase"
import {addDoc , 
        collection,
        Timestamp  } from "firebase/firestore"
import useProfile from "../hooks/useProfile"

export default function MessageInput() {
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const profileData = useProfile()
    const profile = profileData.profile
    
    const handleClick = () => {
        setError(false)
        const firestore = firebaseApp.firestore

        // メッセージボックスが空の場合はエラーを返す
        if (message === "") {
            console.log("空文字のため未送信")
            setError(true)
            return
          }

        try {
            const docRef = collection(firestore, "message")
            addDoc(docRef, {
                text:message,
                createdAt: Timestamp.fromDate(new Date()),
                user: {
                    name: profile?.name,
                    image: profile?.image,
                    uid: profile?.uid,
                  },
              })
            console.log("書き込み成功")
            // 画面をリフレッシュする
            // window.location.reload()
            setMessage("")
        } catch (err) {
          console.log("メッセージが送信できませんでした。。。")
          console.log(err)
          setError(true)
        }
    }
    return (
        <Stack direction="row" spacing={2} sx={{ margin: "0.5rem 1rem" }}>
            <TextField 
                size="small" 
                sx={{ flex: 1 }}
                value = {message}
                onChange={e => setMessage(e.target.value)} />
            <Button 
                variant="contained" 
                endIcon={<SendIcon />}
                onClick={() => handleClick()}>
            送信
            </Button>
        </Stack>
    )
}
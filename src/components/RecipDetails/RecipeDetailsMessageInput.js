import React, { useState } from "react"
import {Alert ,
        Button,
        TextField,
        Box,
        Divider,
        Stack,}            from "@mui/material"
import SendIcon            from '@mui/icons-material/Send';
import { db }              from '../../firebase';
import {firebaseApp }      from "../../firebase"
import {addDoc , 
        collection,
        Timestamp,
        getDocs,}          from "firebase/firestore"
import useProfile          from "../hooks/useProfile"

const collectionName = "message"

export default function MessageInput() {
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const profileData = useProfile()
    const profile = profileData.profile
    const MessageAry = []

    // pathnameから作品Noを取得
    var recipenumAry = window.location.pathname.split("/")
    const getrecipenum = recipenumAry[2]

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
                text:message,                               // メッセージ内容
                createdAt: Timestamp.fromDate(new Date()),  // メッセージ送信日時
                recipeCommentNum : getrecipenum,            // 対象の投稿(recipenumで認識)
                user: {
                    name: profile?.name,                    // メッセージ送信者の名前
                    image: profile?.image,                  // メッセージ送信者のアバター画像
                    uid: profile?.uid,                      // メッセージ送信者のUID
                  },
              })
            console.log("書き込み成功")
            // 画面をリフレッシュする
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
                label = "メッセージを入力してください。"
                onChange={e => setMessage(e.target.value)} />
            <Button 
                variant="contained" 
                endIcon={<SendIcon />}
                onClick={() => handleClick()}>
            コメントする
            </Button>
        </Stack>
    )
}
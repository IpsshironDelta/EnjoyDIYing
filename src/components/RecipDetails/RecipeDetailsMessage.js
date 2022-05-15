import React, 
      { useEffect,
        useState,
        useRef ,}           from "react"
import { db }               from '../../firebase'
import {firebaseApp }       from "../../firebase"
import { collection,
         deleteDoc,
         doc ,
         getDocs ,
         addDoc ,
         Timestamp ,}       from 'firebase/firestore'
import { Alert ,
         Avatar ,
         Typography , 
         Box ,
         Grid,
         Stack ,
         TextField,
         Button,
         createTheme , 
         ThemeProvider ,
         Tooltip ,
         CssBaseline ,
         IconButton , }     from "@mui/material"
import { format ,
         formatDistance,  } from "date-fns"
import { ja }               from "date-fns/locale"
import useProfile           from "../hooks/useProfile"
import DeleteIcon           from '@mui/icons-material/Delete'
import SendIcon             from '@mui/icons-material/Send'
import store                from '../../store/index';

const collectionMessageName = "message"

const theme = createTheme({
  shadows: ["none"],
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#E64545',
      contrastText: '#ffffff',
    },
    // テキストのカラー設定
    text: { primary: '#000000' },
  },
})

function App() {
  // 追加
  const [message, setMessage] = useState([])
  const [sendmessage , setSendMessage] = useState("")
  const [error, setError] = useState(false)
  const profileData = useProfile()
  const profile = profileData.profile
  const messageAry = [];
  const bottomRef = useRef(null)

  // pathnameから作品Noを取得
  var recipenumAry = window.location.pathname.split("/")
  const getrecipenum = recipenumAry[2]
  
  const time = (date) => {
    let timestamp = formatDistance(new Date(), date.toDate(), {
      locale: ja,
    })
    if (timestamp.indexOf("未満") !== -1) {
      return (timestamp = "たった今")
    } else if (
      timestamp.indexOf("か月") !== -1 ||
      timestamp.indexOf("年") !== -1
    ) {
      return (timestamp = format(date.toDate(), "yyyy年MM月dd日", {
        locale: ja,
      }))
    } else {
      return (timestamp = timestamp + "前")
    }
  }
  
  // firestoreからメッセージ情報を取得
  const fetchMessageData = () => {
    getDocs(collection(db, collectionMessageName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // 対象の作品(getrecipenum)と一致するコメントのみ表示する
        if(String(getrecipenum) === String(doc.data().recipeCommentNum)){
          messageAry.push({
            id : doc.id,
            ...doc.data()
          })
        }
      })
    }).then(()=>{
      setMessage([...messageAry])
    })}

  useEffect(() => {
    fetchMessageData()
  },[])

  // 削除ボタンクリック時
  const handleDelete = (id) => {
    console.log("id => ",id)
    if (window.confirm("削除してもよろしいですか？")) {
      console.log("OK を選択してます" , id)
      
      // ドキュメントのid（名前）を取得
      console.log("ドキュメントのid（名前）を取得")
      console.log("削除するID",id)
      deleteDoc(doc(db , collectionMessageName , id)).then((doc) => {
        fetchMessageData()
        alert("削除しました。")
      })
      .catch(() => {
        alert("失敗しました")
     })
    }else{
      console.log("キャンセルを選択してます。")
    }
  }

  // 送信ボタンクリック時
  const handleClick = () => {
    setError(false)
    const firestore = firebaseApp.firestore

    // メッセージボックスが空の場合はエラーを返す
    if (sendmessage === "") {
        console.log("空文字のため未送信")
        setError(true)
        return
      }

    try {
        const docRef = collection(firestore, "message")
        addDoc(docRef, {
            text:sendmessage,                           // メッセージ内容
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
        fetchMessageData()
        setSendMessage("")
      } catch (err) {
        console.log("メッセージが送信できませんでした。。。")
        console.log(err)
        setError(true)
      }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, m: 2, }}>
        <Grid item xs={12}>
          {message ? (
            message.map((message) => (
              <Box 
                key={message.id} 
                sx={{
                  display: "flex",
                  flexDirection:profile && profile.uid === message.user.uid ? "row" : "row-reverse",
                  my: 2,
                  gap: 2,
                  flexGrow: 1, m: 2,}}>
                <Box>
                  <Avatar src={message.user.image ? message.user.image : ""} alt="" />
                </Box>
                <Box sx={{ ml: 0 }}>
                  <Typography 
                    sx={{ fontSize: 12 }}
                    align = {profile && profile.uid === message.user.uid ? "left" : "right"}>
                      {/* ユーザー名の表示 */}
                    {message.user.name}
                  </Typography>
                  <Typography 
                    sx={{ 
                      p: 1, 
                      background: "#dddddd", 
                      borderRadius: 1 ,
                      maxWidth : 400,
                      minWidth : 200,}}
                    align = {profile && profile.uid === message.user.uid ? "left" : "right"}>
                      {/* メッセージ内容の表示 */}
                      {message.text}
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid item xs={8} align = "left">
                      <Typography sx={{ fontSize: 12 }}>
                        {/* メッセージの送信日時の表示 */}
                        {format(message.createdAt.toDate(), "yyyy年MM月dd日hh:mm")}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} align = "right">
                      <Typography sx={{ fontSize: 12 }}>
                        {/* メッセージ送信日時の履歴表示 */}
                        {time(message.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} align = "center">
                      {/* 削除ボタンの表示 */}
                      {/* 他のユーザーの投稿した作品に対して、自分のメッセージは削除可能 */}
                      {/* 自分の投稿した作品のメッセージはすべての削除可能 */}
                      {profile && (profile.uid === message.user.uid || profile.uid === store.getState().recipeUID)  ? 
                        <IconButton 
                          onClick={() => handleDelete(message.id)}>
                          <Tooltip title="削除する" arrow>
                            <DeleteIcon sx={{ color : "#808080" ,fontSize: 16}}/>
                          </Tooltip>
                        </IconButton> : ""}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))) : (
            <p>メッセージが存在しません</p>)}
            <div ref={bottomRef}></div>
            {/* メッセージ送信部分 */}
            <Stack direction="row" spacing={2} sx={{ margin: "0.5rem 1rem" }}>
              <TextField 
                  size="small" 
                  sx={{ flex: 1 }}
                  value = {sendmessage}
                  onChange={e => setSendMessage(e.target.value)} />
              <Button 
                  variant="contained" 
                  endIcon={<SendIcon />}
                  onClick={() => handleClick()}>
              送信
              </Button>
            </Stack>
          </Grid>
      </Box>
      {/* 空入力の場合はエラーを表示 */}
      {error && <Alert severity="error">送信できませんでした</Alert>}
    </ThemeProvider>
  );
}

export default App;
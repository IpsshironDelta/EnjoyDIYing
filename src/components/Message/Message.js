import React, 
      { useEffect,
        useState,
        useRef ,
        useLayoutEffect, } from "react";
import { db }      from '../../firebase';
import { collection,
         deleteDoc,
         doc ,
         getDocs ,
         addDoc ,}  from 'firebase/firestore';
import { Avatar ,
         Typography , 
         Box ,
         Grid,
         Container ,
         createTheme , 
         ThemeProvider ,
         CssBaseline , } from "@mui/material"
import { format ,
         formatDistance,  } from "date-fns"
import { ja } from "date-fns/locale"
import MessageInput from "./MessageInput";
import MainpageHeader    from '../MainPage/MainPageHeader';
import useProfile from "../hooks/useProfile"
import { useHistory } from "react-router-dom"

const collectionName = "message"
const titleName      = "チャットルーム(テスト)"
const theme = createTheme({
  shadows: ["none"],
})

function App() {
  // 追加
  const [addKanji, setaddKanji] = useState("");
  const [addKana, setaddKana] = useState("");
  const [message, setMessage] = useState([]);
  const profileData = useProfile()
  const profile = profileData.profile
  const array = [];
  const bottomRef = useRef(null)
  const history = useHistory();

  useLayoutEffect(() => {
    bottomRef?.current?.scrollIntoView()
  })
  
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
      return (timestamp = format(date.toDate(), "yyyy年M月d日", {
        locale: ja,
      }))
    } else {
      return (timestamp = timestamp + "前")
    }
  }
  
  const fetchMessageData = () => {
    getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.id,doc.data())
        console.log(doc.data().text)
        console.log(format(doc.data().createdAt.toDate(), "yyyy年MM月dd日hh:mm"))
        array.push({
          id : doc.id,
          ...doc.data()
        })})
    }).then(()=>{
      setMessage([...array])
    })};

  useEffect(() => {
    fetchMessageData()
  },[]);

  // 削除ボタンクリック時
  const handleDelete = (id) => {
    console.log("id => ",id)
    if (window.confirm("削除してもよろしいですか？")) {
      console.log("OK を選択してます" , id)
      
      // ドキュメントのid（名前）を取得
      console.log("ドキュメントのid（名前）を取得")
      console.log("削除するID",id)
      deleteDoc(doc(db , collectionName , id)).then((doc) => {
        fetchMessageData()
        alert("削除しました。")
      })
      .catch(() => {
        alert("失敗しました")
     })
    }else{
      console.log("キャンセルを選択してます。")
    }
  };

  // 追加
  const handleAdd = () => {
    addDoc(collection(db , collectionName),{
      kanji: addKanji,
      yomi: addKana,
    }).then(() => {
      fetchMessageData();
      setaddKana("");
      setaddKanji("");
      alert("追加しました");
    }).catch(() => {
      alert("失敗しました");
    });
  }

  const handleClick = () => {
    history.push("/test")
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth >
        <MainpageHeader/>
      </Container>
      <Container maxWidth="md">
        <CssBaseline />
        <Box sx={{ flexGrow: 1, m: 2, pt: 6, pb: 4 }}>
          <Typography align="center" variant="h4">
            {titleName}
          </Typography>
        <Typography align="center">
            漢字:{" "}
            <input
              type="text"
              value={addKanji}
              onChange={(event) => setaddKanji(event.target.value)}
            />
            読み仮名:{" "}
            <input
              type="text"
              value={addKana}
              onChange={(event) => setaddKana(event.target.value)}
            />
          <button onClick={() => handleAdd()}>追加</button>
          <button onClick={() => handleClick()}>TEST</button>
        </Typography>
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
                  <Box sx={{ ml: 2 }}>
                    <Typography sx={{ fontSize: 12 }}>
                      {message.user.name}
                    </Typography>
                    <Typography sx={{ p: 1, background: "#dddddd", borderRadius: 1 }}>
                      {message.text}
                      <button onClick={() => handleDelete(message.id)}>削除</button>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={8} align = "left">
                        <Typography sx={{ fontSize: 12 }}>
                          {format(message.createdAt.toDate(), "yyyy年MM月dd日hh:mm")}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} align = "right">
                        <Typography sx={{ fontSize: 12 }}>
                          {time(message.createdAt)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              ))) : (
              <p>メッセージが存在しません</p>)}
              <div ref={bottomRef}></div>
          </Grid>
        </Box>
      </Container>
      <MessageInput/>
    </ThemeProvider>
  );
}

export default App;
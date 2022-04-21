import React ,
      { useEffect,
        useState,
        useRef ,
        useLayoutEffect, } from "react";
import { db }       from '../../firebase';
import { collection,
         getDocs ,}  from 'firebase/firestore';
import { Avatar ,
         Typography , 
         Box ,
         Grid,
         createTheme , 
         ThemeProvider ,} from "@mui/material"
import { format ,
         formatDistance,  } from "date-fns"
import { ja } from "date-fns/locale"
import useProfile from "../hooks/useProfile"

const collectionName = "message"
const theme = createTheme()

export default function MainPageImageList() {
  const [message, setMessage] = useState([]);
  const profileData = useProfile()
  const profile = profileData.profile
  const bottomRef = useRef(null)
  const array = [];
  // 一番下の画面までスクロールする
  // useLayoutEffect(() => {
  //   bottomRef?.current?.scrollIntoView()
  // })

  // タイムスタンプ
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

  const fetchUsersData = () => {
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
    fetchUsersData()
  },[]);


  return (
    <ThemeProvider theme={theme}>
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
                <Typography sx={{ fontSize: 12 ,color:"#000000"}}>
                  {message.user.name}
                </Typography>
                <Typography sx={{ p: 1, background: "#dddddd", borderRadius: 1 ,color:"#000000"}}>
                  {message.text}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={8} align = "left">
                    <Typography sx={{ fontSize: 12 ,color:"#000000"}}>
                      {format(message.createdAt.toDate(), "yyyy年MM月dd日hh:mm")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} align = "right">
                    <Typography sx={{ fontSize: 12 ,color:"#000000" }}>
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
    </ThemeProvider>
  );
}

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList() {
  return (
    <ImageList sx={{ width: 1000, height: 450 }}>
      <ImageListItem key="Subheader" cols={4}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];


// import React, 
//       { useEffect,
//         useState,
//         useRef ,
//         useLayoutEffect, } from "react";
// import { db }              from '../../firebase';
// import { collection,
//          deleteDoc,
//          doc ,
//          getDocs ,
//          addDoc ,}         from 'firebase/firestore';
// import { Avatar ,
//          Typography , 
//          Box ,
//          Grid,
//          Container ,
//          createTheme , 
//          ThemeProvider ,
//          CssBaseline , }   from "@mui/material"
// import { format ,
//          formatDistance, } from "date-fns"
// import { ja }              from "date-fns/locale"
// import MessageInput        from "./MessageInput";
// import MainpageHeader      from '../MainPage/MainPageHeader';
// import useProfile          from "../../components/hooks/useProfile"
// import {ref ,
//         getDownloadURL,
//         setImage ,}   from "firebase/storage"
// import {firebaseApp }      from "../../firebase"

// const collectionName = "message"
// const filepath       = "gs://myfirebasesample-c6d99.appspot.com/PAGE_USE_IMG/"
// const filename       = "001_mainpage_img.png"
// const titleName      = "TEST画面"
// const theme = createTheme()

// function App() {
//   // 追加
//   const [addKanji, setaddKanji] = useState("");
//   const [addKana, setaddKana] = useState("");
//   const [message, setMessage] = useState([]);
//   const array = [];
//   const bottomRef = useRef(null)
//   const [image, setImage] = useState()

//   const firestorage = firebaseApp.firestorage
//   const gsReference = ref(
//     firestorage,
//     filepath + filename
//   )

//   useLayoutEffect(() => {
//     bottomRef?.current?.scrollIntoView()
//   })
  
//   const fetchUsersData = () => {
//     getDocs(collection(db, collectionName)).then((querySnapshot)=>{
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id,doc.data())
//         console.log(doc.data().text)
//         console.log(format(doc.data().createdAt.toDate(), "yyyy年MM月dd日hh:mm"))
//         array.push({
//           id : doc.id,
//           ...doc.data()
//         })})
//     }).then(()=>{
//       setMessage([...array])
//     })};

//   useEffect(() => {
//     fetchUsersData()
//   },[]);

//   const handleAdd = () => {
//     getDownloadURL(gsReference)
//     .then(url => {
//       setImage(url)
//     })
//     .catch(err => console.log(err))
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth >
//         <MainpageHeader/>
//       </Container>
//       <Container maxWidth="md">
//         <CssBaseline />
//         <Box sx={{ flexGrow: 1, m: 2, pt: 6, pb: 4 }}>
//           <Typography align="center" variant="h4">
//             {titleName}
//           </Typography>
//           <Typography align="center">
//             <img src={image} alt="" />
//             <button onClick={() => handleAdd()}>追加</button>
//           </Typography>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;
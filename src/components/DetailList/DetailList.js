import   React, 
       { useState,
         useEffect,}         from "react"
import { Box ,
         Typography,
         Container , }       from '@mui/material'
import { createTheme,
         ThemeProvider }     from '@mui/material/styles'
import { useHistory,
         withRouter }        from 'react-router'
import   DetailListHeader    from './DetailListHeader'
import   DetailListImageList from './DetailListImageList'
import   Footer              from '../Footer'

const theme = createTheme({
  shadows: ["none"],
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#E64545',
      contrastText: '#ffffff',
    },
    // 背景のカラー設定
    background: {
      default: '#ffffff',
    },
    // テキストのカラー設定
    text: { primary: '#000000' },
  },
})

function DetailList(props) {
  const history = useHistory()
  var categoryAry = decodeURI(window.location.pathname).split("/")
  const [getcategory , setGetCategory] = useState()
  const [getdetail , setGetDetail] = useState()

  // pathnameからcategoryとdetailを取得
  const getCategoryDetail = () =>{
    // categoryのみの場合もあるので、"_"で切り分け
    if(categoryAry[2].indexOf("_") != -1){
      setGetCategory(categoryAry[2].substring(0,categoryAry[2].indexOf("_")))
      setGetDetail(categoryAry[2].substring(categoryAry[2].indexOf("_")+1))
    }else{
      setGetCategory(categoryAry[2])
      console.log(categoryAry[2])
    }
  }

  useEffect(() => {
    getCategoryDetail()
  },[]);
  
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <DetailListHeader/>
        </Container>
        <Container maxWidth = "md" >
            <Box sx={{ flexGrow: 1, m: 2, pt: 4, pb: 4 }}>
                <Container maxWidth>
                    {getdetail ? 
                    <Typography
                        component="h1"
                        variant="h5"
                        align="left"
                        color="text.primary"
                        gutterBottom
                        sx = {{backgroundColor : "#ffffff",
                                color : "#000000",
                                padding: "1rem 2rem",
                                borderTop: "double #E64545 6px",
                                borderBottom: "double #E64545 6px",
                                pt : 5 , 
                                pb : 1 ,}}>
                        "{getdetail}"に関する作品たち
                    </Typography>
                    : <Typography
                    component="h1"
                    variant="h5"
                    align="left"
                    color="text.primary"
                    gutterBottom
                    sx = {{backgroundColor : "#ffffff",
                            color : "#000000",
                            padding: "1rem 2rem",
                            borderTop: "double #E64545 6px",
                            borderBottom: "double #E64545 6px",
                            pt : 5 , 
                            pb : 1 ,}}>
                    "{getcategory}"に関する作品たち
                </Typography> }
                    <Typography
                        component="h1"
                        variant="h5"
                        align="left"
                        color="text.primary"
                        gutterBottom
                        sx = {{backgroundColor : "#ffffff",
                                color : "#000000",
                                padding: "1rem 2rem",
                                pt : 1 , 
                                pb : 1 ,}}>
                        {getcategory}<br/>
                        {getdetail}
                    </Typography>
                    <DetailListImageList
                      GetCategory = {getcategory}
                      GetDetail   = {getdetail}/>
                </Container>
            </Box>
        </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(DetailList);

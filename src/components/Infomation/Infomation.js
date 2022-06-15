import   React, 
       { useState,
         useEffect,}         from "react"
import { Box ,
         Typography,
         Container ,
         Grid ,
         Table , 
         TableBody ,
         TableCell ,
         TableContainer ,
         TableHead , 
         TableRow , 
         Paper , }           from '@mui/material'
import { createTheme,
         ThemeProvider }     from '@mui/material/styles'
import { useHistory,
         withRouter }        from 'react-router'
import   InfomationHeader    from './InfomationHeader'
import   Footer              from '../Footer'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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

function Infomation(props) {
  
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <InfomationHeader/>
        </Container>
        <Container maxWidth = "md" >
            <Box sx={{ flexGrow: 1, m: 2, pt: 4, pb: 4 }}>
                <Container maxWidth>
                  <Typography
                      variant="h6"
                      align="left"
                      color="text.primary"
                      gutterBottom
                      sx = {{backgroundColor : "#ffffff",
                              color : "#000000",
                              padding: "1rem 2rem",
                              pt : 5 , 
                              pb : 1 ,}}>
                      <strong>Infomation</strong>
                  </Typography>
                  <Typography
                      variant="h5"
                      align="left"
                      color="text.primary"
                      gutterBottom
                      sx = {{backgroundColor : "#ffffff",
                              color : "#000000",
                              padding: "1rem 2rem",
                              pt : 1 , 
                              pb : 1 ,}}>
                      お知らせ・ニュース
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell ><strong>Date</strong></TableCell>
                          <TableCell align="left"><strong>Infomation</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {InfomationData.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {/* 日付を表示 */}
                              <strong>{row.date}</strong>
                            </TableCell>
                            {/* タイトルを表示 */}
                            <TableCell align="left">{row.title}</TableCell>
                            {/* リンクをクリックすると詳細画面へ遷移して文章を表示(予定) */}
                            {/* <TableCell align="left">{row.infoDetail}</TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* {InfomationData.map((item) => (
                    <Grid>
                      <Typography
                          component="h1"
                          variant="h6"
                          align="left"
                          color="text.primary"
                          gutterBottom
                          sx = {{backgroundColor : "#eeeeee",
                                  color : "#000000",
                                  padding: "1rem 2rem",
                                  borderTop    : "solid #E64545 1px",
                                  borderBottom : "solid #E64545 1px",
                                  borderLeft   : "solid #E64545 10px",
                                  borderRight  : "solid #E64545 1px",
                                  borderRadius : 2,
                                  pt : 1 , 
                                  pb : 1 ,}}>
                          {item.date}
                      </Typography>
                      <Typography
                          component="h1"
                          variant="body1"
                          align="left"
                          color="text.primary"
                          gutterBottom
                          sx = {{backgroundColor : "#ffffff",
                                  color : "#000000",
                                  padding: "1rem 2rem",
                                  pt : 1 , 
                                  pb : 1 ,}}>
                          {item.title}
                      </Typography>
                    </Grid>
                  ))} */}
              </Container>
            </Box>
        </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(Infomation);

const InfomationData = [
  {
    id   : "20220601",
    date : "2022/06/01",
    title: "これ、考えた人すごいね。をリリースしました。",
    contents: "はじめまして　「これ、考えた人すごいね。」ちぢめて「これかん」と申します。"+
              "この度、DIYのアイディアをみんなで共有&投稿するアプリをリリースしました。"+
              "DIYは作るだけではなく、アイディアを探すのも楽しく、「これ、考えた人すごいね。」と思うような作品を探したり、"+
              "投稿したりしてDIYを一緒に楽しみましょう！",
    infoDetail : "詳細はこちら"
  },
]
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
import   PrivacyPolicyHeader    from './PrivacyPolicyHeader'
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

function PrivacyPolicy(props) {
  
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <PrivacyPolicyHeader/>
        </Container>
        <Container maxWidth = "md" >
            <Box sx={{ flexGrow: 1, m: 2, pt: 4, pb: 4 }}>
                <Container maxWidth>
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        sx = {{backgroundColor : "#ffffff",
                                color : "#000000",
                                padding: "1rem 2rem",
                                pt : 5 , 
                                pb : 1 ,}}>
                        プライバシーポリシー
                    </Typography>
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
                        個人情報取り扱いに関する基本方針
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
                        これ、考えた人すごいね。では、サービスを提供する上で以下のプライバシーポリシーに従い、
                        お客様のプライバシーを尊重し個人情報に対して十分な配慮を行うと共に、
                        適切な取り扱いおよび保護に努めます。
                    </Typography>
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
                        個人情報の取得
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
                        これ、考えた人すごいね。では当サービスのご利用において、
                        お客様の個人情報を収集することがございます。
                        収集するにあたっては利用目的を明記の上、
                        適法かつ公正な手段によります。
                        当サービスで収集する個人情報は以下の通りです。<br/><br/>
                        ・メールアドレス<br/>
                        ・パスワード
                    </Typography>
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
                        個人情報の利用目的
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
                        これ、考えた人すごいね。では当サービスでお客様よりお預かりした個人情報の利用目的は以下の通りです。<br/><br/>
                        ・お問い合わせの返信時<br/>
                        ・当サービスに関する情報やご案内の配信<br/>
                        ・サービス改善に関するマーケティング<br/>
                        ・何らかの理由によりご連絡する必要が生じた場合
                    </Typography>
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
                        個人情報開示、提供について
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
                        これ、考えた人すごいね。では以下のいずれかに該当する場合を除き、
                        お客様の断りなく第三者に個人情報を開示、提供することはございません。<br/><br/>
                      ・ご本人の同意がある場合<br/>
                      ・法的拘束力がある第三者機関からの開示要求がある場合<br/>
                      ・人の生命、身体、財産の保護のために必要がある場合であり、本人の同意を得ることが困難である場合
                    </Typography>
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
                        cookie(クッキー)の使用について
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
                        これ、考えた人すごいね。では、お客様によりよいサービスを提供するため、
                        cookie （クッキー）を使用することがありますが、
                        これにより個人を特定できる情報の収集を行えるものではなく、
                        お客様のプライバシーを侵害することはございません。<br/><br/>
                         ※cookie （クッキー）とは、サーバーコンピュータからお客様のブラウザに送信され、
                         お客様が使用しているコンピュータのハードディスクに蓄積される情報です。
                    </Typography>
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
                        プライバシーポリシーの変更
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
                        これ、考えた人すごいね。では、収集する個人情報の変更、利用目的の変更、
                        またはその他プライバシーポリシーの変更を行う際は、
                        当ページへの変更をもって公表とさせていただきます。
                    </Typography>
                </Container>
            </Box>
        </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(PrivacyPolicy);


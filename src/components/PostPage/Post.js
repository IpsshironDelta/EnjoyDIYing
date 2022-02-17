import * as React        from 'react';
import CssBaseline       from '@mui/material/CssBaseline';
import Box               from '@mui/material/Box';
import Container         from '@mui/material/Container';
import Paper             from '@mui/material/Paper';
import Stepper           from '@mui/material/Stepper';
import Step              from '@mui/material/Step';
import StepLabel         from '@mui/material/StepLabel';
import Button            from '@mui/material/Button';
import Link              from '@mui/material/Link';
import Typography        from '@mui/material/Typography';
import { createTheme,
         ThemeProvider } from '@mui/material/styles';
import RecipeContentForm from './RecipeContentForm';
import HowToMakeForm     from './HowToMakeForm';
import Review            from './Review';
import PostPageHeader    from './PostPageHeader';
import PostPageButton    from './PostPageButton';
import { useHistory}     from 'react-router';
import store             from '../../store/index';
import app               from "../../firebase";
import {getStorage,
        ref as sRef, 
        uploadBytesResumable, 
        getDownloadURL } from "firebase/storage";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['DIY作品の内容を書く',
//               'TEST',
               '完了'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <RecipeContentForm />;
    case 1:
      return <HowToMakeForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Post() {
  const [activeStep, setActiveStep] = React.useState(0);
  const storage = getStorage(app)

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    // 確定ボタンをクリックしたタイミングで画像をアップロードする。
    if(activeStep===0){
      console.log("ファイルをアップロードします。")
      // 空の配列を削除
      var newStructFiles = store.getState().structfiles.filter(Boolean);

      // ファイルをアップロード
      newStructFiles.forEach(element => {
        uploadImage(element)
      });
      console.log("すべての画像のアップロードが完了しました。")
    }
  };

  const uploadImage = (file) => {
    if (!file) return
    const storageRef = sRef(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',(snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          break
        }
      },
        (error) => {
          console.log(error)
          console.log("アップロードできませんでした。")
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            console.log(file.name,"　の画像アップロード完了")
        });
      }
    );
  }


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const history = useHistory();
  const mypage = (event) =>{
    history.push("/mypage");
  };
  const toppage = (event) =>{
    history.push("/");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <PostPageHeader />
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              DIY作品を投稿する
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length - 1 ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    おめでとうございます！<br></br>投稿が完了しました!
                  </Typography>
                  <Typography variant="subtitle1">
                    今回も作品づくりお疲れさまでした。<br></br>
                    これからもDIYでたくさん作品を作って、仲間とたくさん共有しましょう！
                  </Typography>
                  <Box sx={{ '& button': { m: 1 } }}>
                    <PostPageButton
                      text = "Myページに戻る"
                      link = "/mypage"
                      size = "medium"
                      variant = "outlined"/>
                    <PostPageButton
                      text ="閲覧ページTOPに戻る"
                      link ="/"
                      size = "medium"
                      variant = "outlined"
                      />
                    <PostPageButton
                      text ="出品した作品を見る"
                      link ="/"
                      size = "medium"
                      variant = "outlined"
                      />
                    <PostPageButton
                      text ="続けて出品する"
                      link ="/post"
                      size = "medium"
                      variant = "contained"
                      />
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        戻る
                      </Button>
                    )}
                    {activeStep == 0 && (
                      <Button onClick={mypage} sx={{ mt: 3, ml: 1 }}>
                        MyページTOPに戻る
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? '確定する' : '次へ'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </Container>
    </ThemeProvider>
  );
}
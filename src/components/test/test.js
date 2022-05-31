import   React, 
      {  useState }      from "react"
import { emphasize, styled } from '@mui/material/styles';
import { Chip , 
  Typography ,
  Grid,
  createTheme,
  ThemeProvider ,
  Button, 
  CardMedia,}      from "@mui/material"

const theme = createTheme()
const defaultSrc =
    "https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2FAddImage.png?alt=media&token=d4acd7c6-5a2b-4f54-a4bb-0e6240d25f81";

export default function CustomizedBreadcrumbs() {
  const [image, setImage] = useState()
  const [testImage , setTestImage] = useState()
  const [imageAry , setImageAry] = useState([])
  const [countStep , setCountStep ] = useState(0)
  const buffAyr = [""]

  const addComponent = () => {
    console.log("imageAry : " , imageAry)
    if(countStep < 8){
      imageAry.push({
        id : imageAry.length,
        // ...buffAyr,
      })
      setCountStep(countStep + 1)
    }
  }

  const delComponent = () => {
    console.log("imageAry : " , imageAry)
    if(countStep > 0){
      imageAry.pop({
        // imagefile : "",
      })
      setCountStep(countStep - 1)
    }
  }

  const handleChange = (e) => {
    if (e.target.files !== null) {
        setImage(e.target.files[0])
        console.log("handleChange => ",e.target.files[0])
        console.log("image => ",image)
      }
    }
  
  const onChangeTest = (e) => {
    console.log("★" , e.target.id)
    console.log("★★" , imageAry[e.target.id])
    if (e.target.files !== null) {
      imageAry[e.target.id] = e.target.files[0]
      console.log("★imageAry => ",imageAry)
      setImageAry([...imageAry])
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography 
      component="h1" 
      variant="h6" 
      align="left"
      sx = {{backgroundColor : "#ffffff",
            color : "#000000",
            padding: "0.2rem",
            borderLeft : "solid #E64545 6px"}}>
      画像選択
    </Typography>
    <Grid container spacing={1} align= "center">
        {/* <Item>タイトル画像<ImageUpload/></Item> */}
        <Grid item xs={12} md={12}>
          <CardMedia
            sx={{ width: 400, height: 400 }}
            // src={image ? URL.createObjectURL(image) : profile ? profile.image : ""}alt=""/>
            image={image ? URL.createObjectURL(image) : defaultSrc}alt=""/>
          <input
            id="mainImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}/>
            <label htmlFor="mainImage">
              <Button 
                variant="outlined" 
                color="primary" 
                component="span"
                sx = {{width : 400}}>
                画像を選択する
              </Button>
            </label>
        </Grid>

        <Grid item xs={12} md={4}>
          手数：{countStep}
        </Grid>
        <Grid item xs={12} md={4}>
          <Button 
            variant = "outlined"
            onClick = {addComponent}>手順を追加する</Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button 
            variant = "outlined"
            onClick = {delComponent}>手順を減らす</Button>
        </Grid>

        {/* 以下のコンポーネントをクリック毎に増やす */}
        <Grid container spacing={0}>
          {imageAry.map((imageary) => (
          <Grid md = {3}>
            <CardMedia
              sx={{ width: 200, height: 200 }}
              image={imageary.image ? URL.createObjectURL(imageary.name) : defaultSrc}alt=""/>
              <input
                id={imageary}
                type="file"
                accept="image/*"
                onChange={onChangeTest}
                style={{ display: "none" }}/>
                <label htmlFor={imageary.id}>
                  <Button 
                    id = {imageary}
                    variant="outlined" 
                    color="primary" 
                    component="span"
                    sx = {{width : 200}}>
                    画像を選択する{imageary.imagefile}
                  </Button>
                </label>
            </Grid>
          ))}
        </Grid>
        {/* <Item>画像2<ImageUpload/></Item>
        <Item>画像3<ImageUpload/></Item> */}
    </Grid>
  </ThemeProvider>
  )
}

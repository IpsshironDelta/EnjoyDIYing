import React ,
      { useState,}    from "react"
import { styled }     from '@mui/material/styles'
import Box            from '@mui/material/Box'
import ButtonBase     from '@mui/material/ButtonBase'
import { useHistory,
         withRouter } from "react-router-dom"
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { WindowSharp } from "@mui/icons-material"

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 100,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.25,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#ddd",
  opacity: 0.1,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function RecipeDetailsImageButton(props) {
  // タイトル表示
  const [titlename, setTitleName] = useState("");
  var text  = props.text
  var recipeNum = props.info.recipenum
  var info = props.info
  const history = useHistory()
  // タイトル変更
  var changeTitle = (props) => {
      setTitleName(info.title)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 100, width: '100%' }}>
      <ImageButton
        focusRipple
        key     = {props.imgURL}
        style   = {props.style}
        text    = {props.text}
        onClick = {() => {
            changeTitle()
            console.log("★",recipeNum)
            // 作品番号(recepeNum)をアドレス末尾に付与
            // 1回ホーム画面への遷移をかませる
            history.push("/")
            setTimeout(() => {
              history.push(`/recipedetails/${recipeNum}`)
            },1)
            }}>
        <ImageSrc style={{ backgroundImage: `url(${props.imgURL})` }} />
          {/* titleとsubtitleが存在する場合は、ImageListItemBarを表示する */}
        {props.title && props.subtitle ?
          <ImageListItemBar
            title={props.title}
            subtitle={props.subtitle}/>
            : ""}
        <ImageBackdrop className={props.className} />
      </ImageButton>
    </Box>
  );
}

export default withRouter(RecipeDetailsImageButton);

import React ,
      { useState,}    from "react";
import { styled }     from '@mui/material/styles';
import Box            from '@mui/material/Box';
import ButtonBase     from '@mui/material/ButtonBase';
import { useHistory } from "react-router-dom";
import { PrivacyTipSharp } from "@mui/icons-material";


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
      opacity: 0.15,
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

export default function ProfilesImageButton(props) {
    // タイトル表示
    const [titlename, setTitleName] = useState("");
    var text  = props.text
    var recipeNum = props.info.recipenum
    var info = props.info
    const history = useHistory();
    // タイトル変更
    var changeTitle = (props) => {
        setTitleName(info.title)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 70, width: '70%' }}>
      <ImageButton
        focusRipple
        key     = {props.imgURL}
        style   = {{
          width  : "70px",
          height : "70px"}}
        text    = {props.text}
        onClick = {() => {
            changeTitle()
            console.log(recipeNum)
            // 作品番号(recepeNum)をアドレス末尾に付与
            history.push(`/recipedetails/${recipeNum}`)}}>
        <ImageSrc style={{ backgroundImage: `url(${props.imgURL})` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
        </Image>
      </ImageButton>
    </Box>
  );
}

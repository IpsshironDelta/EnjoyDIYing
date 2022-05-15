import React ,
      { useState,
        useEffect,}          from "react";
import { Typography , 
  Card ,
  CardHeader , 
  CardMedia , 
  CardContent , 
  CardActions , 
  Collapse ,
  Avatar,
  createTheme , 
  ThemeProvider ,
  IconButton,}              from "@mui/material"
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useProfile           from "../hooks/useProfile"
import { format ,
  formatDistance,  } from "date-fns"
import { ja }               from "date-fns/locale"
import { collection,
  getDocs ,}         from 'firebase/firestore';
import { db }               from '../../firebase';

const collectionRecipeName = "recipe"
const collectionCategoryName = "category"

const theme = createTheme()
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  // 作品情報を格納する配列
  const [recipe, setRecipe] = useState([]);
  const profileData = useProfile()
  const profile = profileData.profile
  const recipeAry = [];
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
  // firestoreからレシピ情報の取得
  const fetchRecipeData = () => {
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        recipeAry.push({
          id : doc.id,
          ...doc.data()
        })})
    }).then(()=>{
      setRecipe([...recipeAry])
      // オブジェクト内の日付(createdAt)をキーに昇順にソートする
      recipeAry.sort(function(first , second){
        return (format(first.createdAt.toDate() , "yyyyMMdd") < format(second.createdAt.toDate() , "yyyyMMdd")) ? -1 : 1
      })
    })};

  useEffect(() => {
    fetchRecipeData()
  },[]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={theme}>
    {recipe ? (
      recipe.sort().map((recipe) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          // アバター画像を表示
          <Avatar src={profile ? profile.image : ""} alt="" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>}
        // 作品タイトルとサブタイトルを表示
        title={recipe.title}
        subheader={format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}/>
      {/* 作品画像を表示 */}
      <CardMedia
        component="img"
        height="194"
        image={recipe.image.url}
        alt="Paella dish"
      />
      <CardContent>
        {/* 作品メモを表示 */}
        <Typography variant="body2" color="text.secondary">
        {recipe.memo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* お気に入りボタンを表示 */}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* 共有ボタンを表示 */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* ここから下はいらないかなー */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    ))) : (
      <p>投稿が存在しません</p>)}
      </ThemeProvider>
  );
}

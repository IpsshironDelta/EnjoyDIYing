import   React, 
      {  useEffect , 
         useState }               from "react"
import { styled }                 from '@mui/material/styles';
import { useHistory }             from "react-router-dom"
import   ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import   MuiAccordion             from '@mui/material/Accordion';
import   MuiAccordionSummary      from '@mui/material/AccordionSummary';
import   MuiAccordionDetails      from '@mui/material/AccordionDetails';
import { Typography,
         Grid ,
         Button,
         Link , }                 from '@mui/material';
import { createTheme,
         ThemeProvider }          from '@mui/material/styles'
import { collection,
         getDocs , }              from "firebase/firestore"
import { db }                     from '../../firebase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const collectionCategoryName = "category"
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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:"#ffffff",
  borderTop    : "solid #E64545 1px",
  borderBottom : "solid #E64545 1px",
  borderLeft   : "solid #E64545 10px",
  borderRight  : "solid #E64545 1px",
  borderRadius : 5,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function CategoryListAccordion() {
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  }

  const [categorys, setCategorys] = useState([])
  const [detail, setDetail] = useState([])
  const categoryAry = []
  const detailAry = []
  const history = useHistory()

  // firestoreからcategoryの取得
  const fetchCategoryData = () => {
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // 重複していない要素だけを追加する
        if(!categoryAry.includes(doc.data().category)){
            // 「その他」は末尾に格納する
            if(doc.data().category !== "その他"){
              categoryAry.unshift(
                doc.data().category)
            }else{
              categoryAry.push(
                doc.data().category)
            }
          }
        })
      }).then(()=>{
        setCategorys([...categoryAry])
      })}

  // firestoreからdetailの取得
  const fetchDetailData = () => {
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // 「その他」は末尾に格納する
        if(doc.data().detail !== "その他"){
          detailAry.unshift(
            doc.data())
        }else{
          detailAry.push(
            doc.data())
        }})
      }).then(()=>{
        setDetail([...detailAry])
      })}

  useEffect(() => {
    fetchCategoryData()
    fetchDetailData()
  },[])

  return (
    <ThemeProvider theme={theme}>
      {categorys.map((categorys) => (
        <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Link href={`/categorylist/${categorys}`} fontSize={"18px"} color = "#000000">
              <strong>{categorys}</strong>
            </Link>
          </AccordionSummary>
          <Grid container spacing={0} >
            {detail.map((detail) => 
              ( categorys === detail.category ?
                <Grid item xs={3}>
                  <AccordionDetails>
                    <Button 
                      id = {detail.detail}
                      variant='outlined'
                      sx = {{fontSize:11 ,
                             borderRadius : 5,
                             color:"#a0522d" , 
                             width : 170,
                             backgroundColor : "#faf0e6"}}
                      onClick = {() => {
                        history.push(`/categorylist/${categorys}_${detail.detail}`)
                      }}>
                      {detail.detail}
                      <ArrowForwardIosIcon sx = {{fontSize:16}}/>
                    </Button>
                  </AccordionDetails>
                </Grid>
              : "" )
            )}
          </Grid>
        </Accordion>
      ))}
    </ThemeProvider>
  );
}

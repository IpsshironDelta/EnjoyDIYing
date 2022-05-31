import   React ,
       { useState }   from 'react'
import { useHistory } from "react-router-dom";
import   Button       from '@mui/material/Button';
import   useLogout    from '../hooks/logOutUseAuth';
import   useProfile   from "../../components/hooks/useProfile"

export default function QuestionButton(props){
    const history = useHistory()
    const profileData = useProfile()
    const profile = profileData.profile
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const { logout } = useLogout()

    const handleLogout = (id) => {
        if(id === "logout"){
            logout()
            setOpen(true)
            setAnchorEl(null)
            console.log("ポップアップ出す")
        }else{
            history.push("/login")
        }
    }
    return(
        <Button 
            id        = {props.id}
            size      = {props.size}
            variant   = {props.variant} 
            startIcon = {props.startIcon}
            disableElevation
            sx        = {props.sx}
            onClick={() => {
                console.log("props.id が「logout」だったらログアウトする ⇒ " , props.id)
                // ログインしていなければ新規登録画面へ遷移する
                if(props.id === "logout" || props.id === "login"){
                    handleLogout(props.id)
                }else if(!profile){
                    history.push("/signup")
                }else{
                    history.push(props.link)
                }
            }}>
            {props.text}
        </Button>
    )
}
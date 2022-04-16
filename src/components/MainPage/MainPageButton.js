import React ,
      { useState }    from 'react'
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';
import useLogout      from '../hooks/logOutUseAuth';

export default function MainPageButton(props){
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
        setOpen(true)
        setAnchorEl(null)
        console.log("ポップアップ出す")
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
                if(props.id === "logout"){
                    handleLogout()
                }
            history.push(props.link);
            }}>
            {props.text}
        </Button>
    )
}
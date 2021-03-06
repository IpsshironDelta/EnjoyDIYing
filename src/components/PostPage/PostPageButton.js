import React          from 'react'
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';

export default function PostPageButton(props){
    const history = useHistory();
    return(
        <Button 
            id        = {props.id}
            variant   = {props.variant}
            size      = {props.size}
            startIcon = {props.startIcon}
            fullWidth = {props.fullWidth}
            sx        = {props.sx}
            onClick={() => {
            history.push(props.link)
            console.log("ボタンのクリックイベント")
            }}>
            {props.text}
        </Button>
        )
}
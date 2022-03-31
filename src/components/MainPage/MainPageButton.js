import React          from 'react'
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';

export default function MainPageButton(props){
    const history = useHistory();
    return(
        <Button 
            size      = {props.size}
            variant   = {props.variant} 
            startIcon = {props.startIcon}
            disableElevation
            sx        = {props.sx}
            onClick={() => {
            history.push(props.link);
            }}>
            {props.text}
        </Button>
    )
}
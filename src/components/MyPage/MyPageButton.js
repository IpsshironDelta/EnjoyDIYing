import React          from 'react'
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';

export default function MyPageButton(props){
    const history = useHistory();
    return(
        <Button 
            size     = {props.size}
            variant  = {props.variant}  
            sx       = {props.sx}
            id       = {props.id}
            link     = {props.link}
            startIcon= {props.startIcon}
            disableElevation
            onClick={() => {
                history.push(props.link);
            }}>
            {props.text}
        </Button>
    )
}
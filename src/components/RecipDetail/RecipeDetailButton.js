import React          from 'react'
import Button         from '@mui/material/Button';
import { useHistory } from "react-router-dom";

export default function RecipeDetailButton(props){
    const history = useHistory();
    return(
        <Button 
            size      = {props.size}
            variant   = {props.variant} 
            startIcon = {props.startIcon}
            disabled  = {props.disabled}
            fullWidth = {props.fullWidth}
            disableElevation
            sx        = {props.sx}
            padding   = {props.padding}
            onClick={() => {
                history.push(props.link);
                }}>
            {props.text}
        </Button>
    )
}
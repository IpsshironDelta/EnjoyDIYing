import React          from 'react'
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';

export default function MyPageEditButton(props){
    const history = useHistory();

    return(
        <Button 
            id       = {props.id}
            label    = {props.label}
            name     = {props.name}
            type     = {props.type}
            size     = {props.size}
            variant  = {props.variant}
            sx       = {props.sx}
            link     = {props.link}
            disableElevation
            onClick={() => {
                history.push(props.link)
            }}>
            {props.text}
        </Button>
    )
}
import React          from 'react'
import { useHistory } from "react-router-dom";
import Button         from '@mui/material/Button';

export default function PostPageButton(props){
    const history = useHistory();
    return(
        <Button 
            variant={props.variant}
            size = {props.size}
            onClick={() => {
            history.push(props.link)}}>
            {props.text}
        </Button>
        )
}
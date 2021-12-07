import React from 'react'
import { Link,useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

export default function PostPageButton(props){
    const history = useHistory();
    return(
        <Button variant="contained" disableElevation>
            <p onClick={() => {
            history.push(props.link);
            }}>
            {props.text}
            </p>
        </Button>
    )
}
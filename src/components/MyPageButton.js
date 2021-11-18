import React from 'react'
//Linkをインポート
import { Link,useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

export default function MyPageButton(props){
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
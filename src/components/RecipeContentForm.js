import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MyPageButton from '../components/MyPageButton';
import {useHistory } from "react-router-dom";
import Selectbox from "./Selectbox"

export default function AddressForm() {
    const history = useHistory();
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            DIYレシピの内容を書く
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="recipeTitle"
                name="recipeTitle"
                label="レシピタイトル"
                fullWidth
                autoComplete="recipe-title"
                variant="standard"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Selectbox/>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}
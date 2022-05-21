import React, { useState } from "react"
import {Button,
        TextField,
        Stack,
        InputAdornment ,} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

export default function MainPageSearchBox() {
    return (
        <Stack direction="row" spacing={2} sx={{ margin: "0.5rem 1rem" }}>
            <TextField 
                size="small" 
                sx={{ flex: 1 }}
                label = "検索ワードを入力してください。"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}/>
            <Button 
                variant="contained">
            検索
            </Button>
        </Stack>
    )
}
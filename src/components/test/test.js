import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { getDatabase, ref, set } from "firebase/database";

function Chat() {
  const addChat = () => {
    const db = getDatabase();
    const userName = prompt("Please enter the chat user name");

  if (userName) {
    console.log("userName => ",userName)

    db.collection("users").add({
      name: userName
      }).then((doc) => {
        console.log(`追加に成功しました`);
      }).catch((error) => {
        console.log(error);
      });
    }
  };


  return (
    <Stack spacing={2} direction="row">
      <Button 
        variant ="contained"
        sx={"background-color:mediumpurple;"}
        onClick={addChat}>ボタン</Button>

    </Stack>
  );
}

export default Chat;
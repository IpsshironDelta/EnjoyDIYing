import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"


function Chat() {
  const addChat = () => {
//    const db = getDatabase();
    const db = firebase.firestore()

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
        onClick={addChat}>スタート</Button>

    </Stack>
  );
}

export default Chat;
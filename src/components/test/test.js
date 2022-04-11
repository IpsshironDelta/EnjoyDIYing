import React, { useEffect,useState } from "react";
import app             from "../../firebase";
import { collection, 
          getDocs,
          getFirestore,
          deleteDoc,} from "firebase/firestore";

type user = {
  id: string;
  name: string;
  height: number;
};

function App() {
  // 追加
  const [addUserName, setAddUserName] = useState("");
  const [addUserHeight, setAddUserHeight] = useState(200);

  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const array = [];
  
  // === 追記分 ===
  const fetchUsersData = () => {
    getDocs(collection(db, "users")).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.id,doc.data());
        array.push({
          id : doc.id,
          ...doc.data()
        })})
    }).then(()=>{
      setUsers([...array])
    })};

  useEffect(() => {
    fetchUsersData()
  },[]);
  // =============
  // 追加
  const handleDelete = (id) => {
    console.log("id => ",id)
    if (window.confirm("削除してもよろしいですか？")) {
      console.log("OK を選択してます" , id)
      
      getDocs(collection(db, "users")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // ドキュメントのid（名前）を取得
          console.log("ドキュメントのid（名前）を取得")
          console.log("検索されたID",doc.id)
          console.log("削除するID",id)
          db.collection("users").doc(id).delete()
        })})
        // .then(() => {
        //   fetchUsersData();
        //   alert("削除しました");
        // })
        // .catch(() => {
        //   alert("失敗しました");
        // });
    }else{
      console.log("キャンセルを選択してます。")
    }
  };

  // 追加
  const handleAdd = () => {
    if (window.confirm("追加してもよろしいですか？")) {
      db.collection("users")
        console.log("★",addUserName , addUserHeight)
        .add({
          name: addUserName,
          height: addUserHeight,
        })
        .then(() => {
          fetchUsersData();
          setAddUserHeight(200);
          setAddUserName("");
          alert("追加しました");
        })
        .catch(() => {
          alert("失敗しました");
        });
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <div>
        <label>
          NAME:{" "}
          <input
            type="text"
            value={addUserName}
            onChange={(event) => setAddUserName(event.target.value)}
          />
        </label>
        <label>
          HEIGHT:{" "}
          <input
            type="number"
            value={addUserHeight}
            onChange={(event) => setAddUserHeight(event.target.valueAsNumber)}
          />
        </label>
        <button onClick={() => handleAdd()}>追加</button>
      </div>
        <table>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.height}cm</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default App;
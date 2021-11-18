import React from 'react'
import MyPageButton from '../components/MyPageButton';

import { Link,useHistory } from "react-router-dom";

const BrowsingTop = () => {

  const history = useHistory();

  return (

    <>
      <p>閲覧TOP画面</p>

      <p
         onClick={() => {
           history.push("/WorkDisplay");
         }}
       >
         作品リンク(複数表示予定)
       </p>

       <MyPageButton text="MyページTOP画面へ" link="/MyPage"/>

      <p><Link to="/login">ログインページ</Link></p>

      <p><a href="https://qiita.com/" target="_blank" rel="noreferrer">Qiitaへ</a></p>
    </>

  )
}

export default BrowsingTop
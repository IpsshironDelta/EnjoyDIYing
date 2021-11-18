import React, { useState } from "react";
import app from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const auth = getAuth(app)
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, formData.email, formData.password).then((v) => {
            console.log(v);
        }).catch((e) => {
            console.log(e);
            alert("認証失敗");
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>サインインページ</h2>
            <div>
                email: <input type="text" id="email" name="email" onChange={handleChange} value={formData.email} />
            </div>
            <div>
                password: <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
            </div>
            <div>
                <button onClick={handleSignIn}>サインイン</button><br />
            </div>
        </div>
    )
}

export default Signin;
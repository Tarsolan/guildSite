import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { MemberAuthContext } from "./utils/providers/MemberAuthContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <MemberAuthContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MemberAuthContext>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const submitHandler = async (event) => {
//   console.log(event);
//   event.preventDefault();
//   if (!isLogin) {
//     var userName = userNameInputRef.current.value;
//   }
//   const email = emailInputRef.current.value;
//   const password = passwordInputRef.current.value;
//   // donwload maybe joi for validation or create some
//   setisLoading(true);
//   let url;
//   if (isLogin) {
//     url = "http://localhost:3001/api/auth";
//   } else {
//     url = "http://localhost:3001/api/users";
//   }

//   let body;
//   if (isLogin) {
//     body = {
//       email: email,
//       password: password,
//     };
//   } else {
//     body = {
//       username: userName,
//       email: email,
//       password: password,
//     };
//   }

//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     setisLoading(false);
//     const data = await res.json();

//     if (!res.ok) {
//       let errorMessage = data;
//       throw new Error(errorMessage);
//     }

//     authCtx.login(data._id);
//     navigate("/", { replace: true });
//   } catch (error) {
//     alert(error.message);
//   }
// };

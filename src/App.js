import "./App.css";
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoList from "./pages/TodoList";
import Button from "./components/Button";
import { getStorage } from "./utils/storage";

function App() {
  const [text, setText] = useState("로그인하기");
  const access_token = getStorage("access_token");

  const onClick = () => {
    if (text === "로그인하기") {
      setText("회원가입하러가기");
    } else {
      setText("로그인하기");
    }
  };

  return (
    <div className="App">
      {access_token.length > 0 ? (
        <TodoList />
      ) : (
        <div>
          <Button onClick={onClick}>{text}</Button>
          {text !== "로그인하기" ? <LoginPage /> : <RegisterPage />}
        </div>
      )}
    </div>
  );
}

export default App;

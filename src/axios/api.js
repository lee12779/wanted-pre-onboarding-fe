import axios from "axios";
import { setStorage, getStorage } from "../utils/storage";
import { URL } from "../utils/constants";

export const signUp = async (data) => {
  try {
    await axios.post(URL + `auth/signup`, data).then((response) => {
      alert("회원가입이 완료되었습니다.");
      return response.data;
    });
  } catch (e) {
    console.log("signup error!");
  }
};

export const login = async (data) => {
  try {
    await axios.post(URL + "auth/signin", data).then((response) => {
      const access_token = response.data["access_token"];
      setStorage("access_token", access_token);
      return response.data;
    });
  } catch (e) {
    console.log("signin error!");
  }
};

const token = getStorage("access_token");

const authendAxios = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createTodo = async (data) => {
  try {
    await authendAxios.post(URL + "todos", data).then((response) => {
      alert("추가되었습니다.");
    });
  } catch (e) {
    console.log("todo error!");
  }
};

export const getTodo = async () => {
  try {
    return await authendAxios.get(URL + "todos");
  } catch (e) {
    console.log("todo error!");
  }
};

export const updateTodo = async (id, data) => {
  try {
    await authendAxios.put(URL + `todos/${id}`, data).then((response) => {
      alert("수정완료되었습니다.");
      //console.log(response.data);
    });
  } catch (e) {
    console.log("todo 수정 error!");
  }
};

export const deleteTodo = async (id) => {
  try {
    await authendAxios.delete(`todos/${id}`).then((response) => {
      alert("삭제완료되었습니다.");
      console.log(response.data);
    });
  } catch (e) {
    console.log("todo 삭제 error!");
  }
};

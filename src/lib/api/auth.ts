// 로그인

import client from "./client";
export interface Auth {
  username: string;
  password: string;
}

// 로그인
export const login = ({ username, password }: Auth) =>
  client.post("/api/auth/login", { username, password });

// 회원가입
export const register = ({ username, password }: Auth) =>
  client.post("/api/auth/register", { username, password });

// 로그인 상태 확인
export const check = () => client.get("/api/auth/check");

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components/macro";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */

interface TextMap {
  login: "로그인";
  register: "회원가입";
  [key: string]: TextMap[keyof TextMap];
}

const textMap: TextMap = {
  login: "로그인",
  register: "회원가입",
};

interface AuthFormProps {
  type?: string | undefined;
  form?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

function AuthForm({ type, form, onChange, onSubmit }: AuthFormProps) {
  useEffect(() => {
    console.log("type", type);
  }, [type]);
  return (
    form && (
      <AuthFormBlock>
        <h3>{type && textMap[type]}</h3>
        <form onSubmit={onSubmit}>
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="아이디"
            onChange={onChange}
            value={form.username && form.username}
          />
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />
          {type === "register" && (
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          )}
          <Button cyan fullWidth style={{ marginTop: "1rem" }}>
            {type && textMap[type]}
          </Button>
        </form>
        <Footer>
          {type === "login" ? (
            <Link to="/register">회원가입</Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </Footer>
      </AuthFormBlock>
    )
  );
}

export default AuthForm;

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

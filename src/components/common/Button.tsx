import React, { ReactChild } from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

interface ButtonProps {
  cyan?: boolean;
  fullWidth?: boolean;
  children?: ReactChild;
  style?: any;
}

interface SCprops {
  fullWidth?: boolean;
  cyan?: boolean;
}

const StyledButton = styled.button<SCprops>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const Button = (props: ButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;

import React, { ReactChild } from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { useHistory, useParams } from "react-router-dom";

interface ButtonProps {
  cyan?: boolean;
  fullWidth?: boolean;
  children?: ReactChild;
  style?: any;
  to?: string;
  onClick?: () => void;
}

interface SCprops {
  fullWidth?: boolean;
  cyan?: boolean;
  to?: string;
  onClick: any;
}

const Button = (props: ButtonProps) => {
  const history = useHistory();
  const onClick = (e: MouseEvent) => {
    if (props.to) {
      history.push(props.to);
    }
  };
  return (
    <StyledButton onClick={props.onClick ? props.onClick : onClick} {...props}>
      {props.children}
    </StyledButton>
  );
};

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

export default Button;

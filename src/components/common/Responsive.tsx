import React, { ReactChild } from "react";
import styled from "styled-components/macro";

export interface ResponsiveProps {
  children: ReactChild;
  rest?: any;
}

function Responsive({ children, ...rest }: ResponsiveProps) {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
}

export default Responsive;

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

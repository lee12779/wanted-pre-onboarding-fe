import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100px;
  margin: 20px;
  height: 40px;
`;

function Button({ children, onClick, disabled }) {
  return (
    <StyledButton
      className="btn btn-sm btn-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

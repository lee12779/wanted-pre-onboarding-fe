import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 400px;
  height: 50px;
`;

function Input({ name, type, placeholder, value, onChange }) {
  return (
    <div>
      <StyledInput
        className="form-control"
        id="floatingInput"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;

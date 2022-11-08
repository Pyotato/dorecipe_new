import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
// import { loginUser } from "../../reducer/userReducer";
import { useInput } from "../../../hooks/useInput";
import AccountIcon from "./loginIcon";
import CreateRecipeIcon from "./createRecipeIcon";
const LoginCreateRecipeLogo = () => {
  return (
    <>
      <LoginCreateRecipeWrapper>
        <LoginWrapper>
          <AccountIcon />
          <CreateRecipeIcon />
        </LoginWrapper>
      </LoginCreateRecipeWrapper>
    </>
  );
};

const LoginCreateRecipeWrapper = styled.div`
  width: fit-content;
  display: inline-flex;
`;

const LoginWrapper = styled.div`
  display: inline-flex;
`;

export default LoginCreateRecipeLogo;

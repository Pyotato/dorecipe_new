import MainLayout from "@layout/mainLayOut";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NotFoundIcon } from "@assets/NotFound.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!alert("해당 페이지에 접근할 수 없습니다.")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <MainLayout>
        <TotalWrap>
          <div>
            <NotFoundIcon />
            <h1>Ooops...Page Not Found.</h1>
          </div>
          <div>
            <h2>요청한 웹페이지의 이름이 바뀌었거나</h2>
            <h2>현재 사용할 수 없거나 삭제되었습니다.</h2>
            <h2>입력하신 주소가 정확한지 다시 한번 확인해보시기 바랍니다.</h2>
          </div>
        </TotalWrap>
      </MainLayout>
    </>
  );
};
export default NotFoundPage;

const TotalWrap = styled.div`
  width: 100%;
  flex-wrap: wrap;
  align-content: center;
  text-align: center;
  height: 100vh;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20% 0;
  gap: 5%;
  & div {
    width: 45%;
  }
`;

import styled from "styled-components";
import EventList from "../../components/eventCp/eventList";
import MainLayout from "../../layout/mainLayOut";

const EventPage = () => {
  return (
    <>
      <MainLayout>
        <TotalWrap>
          <div
            style={{
              fontWeight: "700",
              paddingBottom: "3vh",
            }}
          >
            <h1>이벤트</h1>
          </div>
          <EventList />
        </TotalWrap>
      </MainLayout>
    </>
  );
};
export default EventPage;

const TotalWrap = styled.div`
  width: 100%;
  padding: 0 6vw;
  padding-top: 12vh;
  height: 100vh;
`;

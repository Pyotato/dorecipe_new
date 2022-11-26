import MainLayout from "../../layout/mainLayOut";
import SignUpTemplate from "../../components/joinMemberCp";
import { LogoHeader } from "../../components/_common/logo";

const JoinMemberPage = () => {
  return (
    <>
      <MainLayout>
        <LogoHeader />
        <SignUpTemplate />
      </MainLayout>
    </>
  );
};
export default JoinMemberPage;

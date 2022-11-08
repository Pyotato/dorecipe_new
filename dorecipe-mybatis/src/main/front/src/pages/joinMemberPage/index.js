import MainLayout from "../../layout/mainLayOut";
import SignUpTemplate from "../../components/JoinMemberCp";
import { MainLogo } from "../../components/_common/mainLogo";

const JoinMemberPage = () => {
  return (
    <>
      <MainLayout>
        <MainLogo />
        <SignUpTemplate />
      </MainLayout>
    </>
  );
};
export default JoinMemberPage;

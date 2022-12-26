import LayOutFooter from "./footer";
import LayOutHeader from "./header";

const MainLayout = ({ children }) => {
  return (
    <>
      <LayOutHeader />
      {children}
      <LayOutFooter />
    </>
  );
};
export default MainLayout;

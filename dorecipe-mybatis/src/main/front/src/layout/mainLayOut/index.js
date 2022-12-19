import LayOutFooter from "./footer";
import LayOutHeader from "./header";

const MainLayout = ({ children }) => {
  return (
    <>
      <LayOutHeader />
      {/* <div>{children}</div> */}
      {children}
      <LayOutFooter />
    </>
  );
};
export default MainLayout;

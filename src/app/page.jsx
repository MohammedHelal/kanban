import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Main from "../components/Main";
import MainContainer from "./MainContainer";
import ModalsContainer from "../util/ModalsContainer";

export default function Home() {
  return (
    <>
      <Header />
      <ModalsContainer />
      <MainContainer>
        <Sidebar />
        <Main />
      </MainContainer>
    </>
  );
}

import EditoWrapper from "./components/EditoWrapper/EditoWrapper";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import QueryEditor from "./components/QueryEditor/QueryEditor";
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarTree from "./components/Sidebar/SidebarTree/SidebarTree";
import VisualEditor from "./components/VisualEditor/VisualEditor";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <Sidebar>
          <SidebarTree />
        </Sidebar>
        <Main>
          <EditoWrapper editor1={<VisualEditor />} editor2={<QueryEditor />} />
        </Main>
        {/* right sidebar : add later */}
      </Layout>
    </RecoilRoot>
  );
}

export default App;

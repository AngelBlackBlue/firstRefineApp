import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { App as AntdApp, ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";

function App(): JSX.Element {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
    <AntdApp>
     <Refine 
         dataProvider={dataProvider}
         authProvider={authProvider}
     >
      <Authenticated 
          key="protected" 
          fallback={<div>Not Authenticated</div>}
      >
         {/* <ShowProduct/> */}
         {/* <EditProduct/> */}
         <ListProducts />
         {/* <CreateProduct/> */}
       </Authenticated>
     </Refine>
    </AntdApp>
    </ConfigProvider>
  
  );
}

export default App;

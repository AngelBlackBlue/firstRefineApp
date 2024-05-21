import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { App as AntdApp, ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";

function App() {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
    <AntdApp>
     <Refine dataProvider={dataProvider}>
       {/* <ShowProduct/> */}
       <EditProduct/>
       {/* <ListProducts/> */}
       {/* <CreateProduct/> */}
     </Refine>
    </AntdApp>
    </ConfigProvider>
  
  );
}

export default App;

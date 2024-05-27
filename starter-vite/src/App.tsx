import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { 
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { App as AntdApp, ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";

import { Login } from "./pages/login";
import { Header } from "./componentes/header";


export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "protected-products",
            list: "/products",
            show: "/products/:id",
            edit: "/products/:id/edit",
            create: "/products/create",
            meta: { label: "Products" },
          },
        ]}
      >
        <Routes>
          <Route
            element={
              // We're wrapping our routes with the `<Authenticated />` component
              // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
              // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
          <Route 
              index
              // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
              // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
              element={<NavigateToResource resource="protected-products" />}
          />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                {/* <Navigate to="/" /> */}
                {/* <Navigate to="/products" /> */}
                {/* We're also replacing the <Navigate /> component with the <NavigateToResource /> component. */}
                {/* It's tailored version of the <Navigate /> component that will redirect to the resource's list route. */}
                <NavigateToResource resource="protected-products" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}






// function App(): JSX.Element {
//   return (
//     <BrowserRouter>
//          <ConfigProvider theme={RefineThemes.Blue}>
//               <AntdApp>
//                    <Refine 
//                        dataProvider={dataProvider}
//                        authProvider={authProvider}
//                        routerProvider={routerProvider}
//                        >
//                         <Authenticated 
//                             key="protected" 
//                             fallback={<Login/>}
//                             >
//                           <Header/>
//                            {/* <ShowProduct/> */}
//                            {/* <EditProduct/> */}
//                            <ListProducts />
//                            {/* <CreateProduct/> */}
//                         </Authenticated>
//                    </Refine>
//               </AntdApp>
//          </ConfigProvider>
//     </BrowserRouter>
  
//   );
// }

// export default App;

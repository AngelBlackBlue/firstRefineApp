import { getDefaultFilter, useMany } from "@refinedev/core";
import { 
    useTable, 
    EditButton, 
    ShowButton,
    getDefaultSortOrder, 
    FilterDropdown,
    useSelect, 
    List
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

interface RecordType {
    id: string; 
  }

export const ListProducts = () => {
  // We'll use pass `tableProps` to the `<Table />` component,
  // This will manage the data, pagination, filters and sorters for us.
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    // We're adding default values for our filters
    filters:{
      initial: [{ field: "Category.id", operator: "eq", value: 2}]
    },
    syncWithLocation: true,
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("Category.id", filters, "eq")
  })

  
  return (
    // <div>
    //   <h1>Products</h1>
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column 
          dataIndex="id" 
          title="ID" 
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          />
        <Table.Column 
          dataIndex="name" 
          title="Name" 
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          // FilterDropdown will map the value to the filter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input/>
            </FilterDropdown>
          )}
        />
          
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }
            
            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              // We'll store the selected id as number
              mapValue={(selectedKey) => Number(selectedKey)}
              >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
          />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record: RecordType) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.id } />
              <EditButton hideText size="small" recordItemId={record.id } />
            </Space>
          )}
          />
        </Table>
    </List>  
    // </div>
  );
};


// import { useTable, useMany, useNavigation } from "@refinedev/core"

// type SortOrder = "asc" | "desc";

// import { Link } from "react-router-dom"

// export const ListProducts = () => {
//     const {
//         tableQueryResult: { data, isLoading },
//         current,
//         setCurrent,
//         pageCount,
//         sorters,
//         setSorters,
//     } = useTable({
//         // resource: "protected-products",
//         pagination: {current:1, pageSize: 10},
//         sorters: { initial: [{field: "id", order: "asc"}]},
//         syncWithLocation: true,
//     });

//     // You can also use methods like show or list to trigger navigation.
//     // We're using url methods to provide more semantically correct html.
//     const { showUrl, editUrl } = useNavigation();

//     const { data: categories } =useMany({
//         resource: "categories",
//         ids: data?.data?.map( (product) => product.category?.id) ??  [],
//     })


//    if (isLoading) {
//         return <div>Loading...</div>
//     }

//     const onPrevious = () => {
//         if (current > 1) {
//             setCurrent(current - 1)
//         }
//     } 

//     const onNext = () => {
//         if (current < pageCount) {
//             setCurrent(current + 1)
//         }
//     }

//     const onPage = (page: number) => {
//         setCurrent(page)
//     }

//     // We'll use this function to get the current sorter for a field.
//     const getSorter = (field: string) =>{
//         const sorter = sorters?.find((sorter) => sorter.field === field);

//         if (sorter) {
//             return sorter.order
//         }
//     }

//     // We'll use this function to toggle the sorters when the user clicks on the table headers.
//     const onSort = (field: string) =>{
//         const sorter =  getSorter(field)
//         setSorters(
//             sorter === "desc" ? [
//             {                field,
//                 order: sorter === "desc" ? "asc" : "desc",
//             }
//             ] : [
//             {
//                 field,
//                 order: sorter === "asc" ? "desc" : "asc",
//             },
//             ]
//         )
//     }

//     // We'll use this object to display visual indicators for the sorters.
//     const indicator = { asc: "⬆️", desc: "⬇️"}

//     return (
//         <div>
//            <h1>Products</h1>
//            <table>
//                 <thead>
//                     <tr>
//                         <th onClick={() => onSort("id")}>
//                             ID {indicator[getSorter("id") as SortOrder]}
//                         </th>
//                         <th onClick={() => onSort("name")}>
//                             Name {indicator[getSorter("name") as SortOrder]}
//                         </th>
//                         <th>
//                             Category
//                         </th>
//                         <th onClick={() => onSort("material")}>
//                             Material {indicator[getSorter("material") as SortOrder]}
//                         </th>
//                         <th onClick={() => onSort("price")}>
//                             Price {indicator[getSorter("price") as SortOrder]}
//                         </th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data?.data.map((product) => (
//                         <tr key={product.id}>
//                             <td>{product.id}</td>
//                             <td>{product.name}</td>
//                             {/* <td>{product.category?.id}</td> */}
//                             <td>{
//                                 categories?.data.find(
//                                    (category) => category.id == product.category?.id,
//                                 )?.title
//                             }
//                             </td>
//                             <td>{product.material}</td>
//                             <td>{product.price}</td>
//                             <td>
//                               <Link to={showUrl("protected-products", product.id ?? "N/A")}>Show</Link>
//                               <Link to={editUrl("protected-products", product.id ?? "N/A")}>Edit</Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//            </table>
//            <div className="pagination">
//                 <button type="button" onClick={onPrevious}>
//                     {"<"}
//                 </button>
//                 <div>
//                     {current -1 > 0 && (
//                         <span onClick={()=> onPage(current-1)}>{current-1}</span>
//                     )}
//                     <span className="current">{current}</span>
//                     {current + 1 < pageCount && (
//                         <span onClick={()=> onPage(current+1)}>{current+1}</span>
//                     )}
//                 </div>
//                 <button type="button" onClick={onNext}>
//                     {">"}
//                 </button>
//            </div>
//         </div>
//     )
// }



 
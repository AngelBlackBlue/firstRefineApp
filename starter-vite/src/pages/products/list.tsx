import { useTable, useMany, useNavigation } from "@refinedev/core"

type SortOrder = "asc" | "desc";

import { Link } from "react-router-dom"

export const ListProducts = () => {
    const {
        tableQueryResult: { data, isLoading },
        current,
        setCurrent,
        pageCount,
        sorters,
        setSorters,
    } = useTable({
        // resource: "protected-products",
        pagination: {current:1, pageSize: 10},
        sorters: { initial: [{field: "id", order: "asc"}]},
        syncWithLocation: true,
    });

    // You can also use methods like show or list to trigger navigation.
    // We're using url methods to provide more semantically correct html.
    const { showUrl, editUrl } = useNavigation();

    const { data: categories } =useMany({
        resource: "categories",
        ids: data?.data?.map( (product) => product.category?.id) ??  [],
    })


   if (isLoading) {
        return <div>Loading...</div>
    }

    const onPrevious = () => {
        if (current > 1) {
            setCurrent(current - 1)
        }
    } 

    const onNext = () => {
        if (current < pageCount) {
            setCurrent(current + 1)
        }
    }

    const onPage = (page: number) => {
        setCurrent(page)
    }

    // We'll use this function to get the current sorter for a field.
    const getSorter = (field: string) =>{
        const sorter = sorters?.find((sorter) => sorter.field === field);

        if (sorter) {
            return sorter.order
        }
    }

    // We'll use this function to toggle the sorters when the user clicks on the table headers.
    const onSort = (field: string) =>{
        const sorter =  getSorter(field)
        setSorters(
            sorter === "desc" ? [
            {                field,
                order: sorter === "desc" ? "asc" : "desc",
            }
            ] : [
            {
                field,
                order: sorter === "asc" ? "desc" : "asc",
            },
            ]
        )
    }

    // We'll use this object to display visual indicators for the sorters.
    const indicator = { asc: "⬆️", desc: "⬇️"}

    return (
        <div>
           <h1>Products</h1>
           <table>
                <thead>
                    <tr>
                        <th onClick={() => onSort("id")}>
                            ID {indicator[getSorter("id") as SortOrder]}
                        </th>
                        <th onClick={() => onSort("name")}>
                            Name {indicator[getSorter("name") as SortOrder]}
                        </th>
                        <th>
                            Category
                        </th>
                        <th onClick={() => onSort("material")}>
                            Material {indicator[getSorter("material") as SortOrder]}
                        </th>
                        <th onClick={() => onSort("price")}>
                            Price {indicator[getSorter("price") as SortOrder]}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            {/* <td>{product.category?.id}</td> */}
                            <td>{
                                categories?.data.find(
                                   (category) => category.id == product.category?.id,
                                )?.title
                            }
                            </td>
                            <td>{product.material}</td>
                            <td>{product.price}</td>
                            <td>
                              <Link to={showUrl("protected-products", product.id ?? "N/A")}>Show</Link>
                              <Link to={editUrl("protected-products", product.id ?? "N/A")}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
           </table>
           <div className="pagination">
                <button type="button" onClick={onPrevious}>
                    {"<"}
                </button>
                <div>
                    {current -1 > 0 && (
                        <span onClick={()=> onPage(current-1)}>{current-1}</span>
                    )}
                    <span className="current">{current}</span>
                    {current + 1 < pageCount && (
                        <span onClick={()=> onPage(current+1)}>{current+1}</span>
                    )}
                </div>
                <button type="button" onClick={onNext}>
                    {">"}
                </button>
           </div>
        </div>
    )
}

// import {useList} from "@refinedev/core"

// export const ListProducts = () => {
//     const {data, isLoading } = useList({
//         resource: "products",
//         pagination: {current:1, pageSize: 10},
//         sorters: [{field: "name", order: "asc"}],
//         filters: [{field: "material", operator: "eq", value: "Aluminum"}]
//     });

//     if (isLoading) {
//         return <div>Loading...</div>
//     }

//     return (
//         <div>
//             <h1>Products</h1>
//             <ul>
//                 {data?.data?.map((product) => (
//                     <li key={product.id}>
//                         <p>
//                             {product.name}
//                             <br />
//                             price: {product.price}
//                             <br />
//                             Material:{product.material}
//                         </p>
//                     </li>
                
//                 ))}
//             </ul>
//         </div>
//     )
// }


 
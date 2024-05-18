import { useTable } from "@refinedev/core"

export const ListProducts = () => {
    const {
        tableQueryResult: { data, isLoading } 
    } = useTable({
        resource: "products",
        pagination: {current:1, pageSize: 10},
        sorters: { initial: [{field: "id", order: "asc"}]},
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
           <h1>Products</h1>
           <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Material</th>
                        <th>Price</th>
               </tr>
                </thead>
                <tbody>
                    {data?.data.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category?.id}</td>
                            <td>{product.material}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
           </table>
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


 
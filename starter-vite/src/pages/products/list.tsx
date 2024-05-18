import { useTable, useMany } from "@refinedev/core"

export const ListProducts = () => {
    const {
        tableQueryResult: { data, isLoading },
        current,
        setCurrent,
        pageCount 
    } = useTable({
        resource: "products",
        pagination: {current:1, pageSize: 10},
        sorters: { initial: [{field: "id", order: "asc"}]},
    });

    console.log(data?.data)

    const { data: categories } =useMany({
        resource: "categories",
        ids: data?.data?.map( (product)  => product.category?.id) ??  [],
    })

    console.log(categories?.data)

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
                            {/* <td>{product.category?.id}</td> */}
                            <td>{
                                categories?.data.find(
                                   (category) => category.id == product.category?.id,
                                )?.title
                            }
                            </td>
                            <td>{product.material}</td>
                            <td>{product.price}</td>
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


 
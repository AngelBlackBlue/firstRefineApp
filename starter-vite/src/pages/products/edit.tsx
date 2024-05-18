import { useForm, useSelect } from "@refinedev/core"

export const EditProduct = () => {
    const { onFinish, mutationResult, queryResult } = useForm({
        action: "edit",
        resource: "products",
        id: "123"
    })
    
    if (queryResult === undefined) {
        console.log(queryResult)
        throw new Error('.....')
    }

    const record = queryResult.data?.data;
    
    const { options } = useSelect({
        resource: "categories"
        // optionLabel: "title", // Default value is "title" so we don't need to provide it.
       // optionValue: "id", // Default value is "id" so we don't need to provide it.
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Using FormData to get the form values and convert it to an object.
       // const data = Object.fromEntries(new FormData(event.target).entries());
       const formElement = event.target as HTMLFormElement; // Convertimos el evento al tipo HTMLFormElement
       const data = Object.fromEntries(new FormData(formElement).entries());
   
        // Calling onFinish to submit with the data we've collected from the form.
        onFinish({
            ...data,
            price: Number(data.price).toFixed(2),
            category: { id: Number(data.category)}
        });
      };

   return (
    <form onSubmit={onSubmit} >
        <div >
           <label htmlFor="name">Name</label>
           <input 
               type="text" 
               id="name" 
               name="name" 
               defaultValue={record?.name}
               className="text-center"
            />
        </div>
        
        <div>
           <label htmlFor="description">Description</label>
           <textarea 
               name="description" 
               id="description"
               defaultValue={record?.description}
               >
            </textarea>
        </div>

        <div>
           <label htmlFor="price">Price</label>
           <input 
               type="number" 
               id="price" 
               name="price" 
               pattern="\d*\.?\d*"
               defaultValue={record?.price}
            />
        </div>

        <div>
            <label htmlFor="material">Material</label>
            <input 
                type="text" 
                id="material" 
                name="material"
                defaultValue={record?.material} 
            />
            
        </div>

        {/* <label htmlFor="category">Category ID</label>
        <input type="number" id="category" name="category"/> */}

        <label htmlFor="category">Category</label>
        <select name="category" id="category">
            {options?.map((option) => (
                <option 
                    key={option.value} 
                    value={option.value}
                    selected={record?.category.id == option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>

        <div>
            {mutationResult.isSuccess && <span>successFully submitted</span>}
            <button type="submit">Submit</button>
        </div>
    </form>
   ) 
}



// import { useOne, useUpdate } from "@refinedev/core";

// export const EditProduct = () => {
//     const { data, isLoading } = useOne({resource: "products", id: 123});
//     const {mutate, isLoading: isUpdating } = useUpdate();

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     const updatePrice = async () => {
//         await mutate({
//             resource: "products", 
//             id: 123, 
//             values: {
//                 price: Math.floor(Math.random()*100),
//             }
//         });
//     };

//     return (
//         <div>
//             <div>Product name: {data?.data.name}</div>
//             <div>Product price: {data?.data.price}</div>
//             <button onClick={updatePrice}>Update Price</button>

//         </div>
//     )
// };

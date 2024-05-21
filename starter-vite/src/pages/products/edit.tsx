import { useForm, useSelect } from "@refinedev/core"
import { Button, Flex, Input, Select } from "antd"

export const EditProduct = () => {
    const { onFinish, mutationResult, queryResult } = useForm({
        action: "edit",
        resource: "products",
        id: "131"
    })

       
    const record = queryResult?.data?.data;
    
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
        <Flex vertical>
           
               <label htmlFor="name">Name</label>
               <input 
                   type="text" 
                   id="name" 
                   name="name" 
                   defaultValue={record?.name}
                />
                <Input 
                   type="text" 
                   id="name" 
                   name="name" 
                   defaultValue={record?.name}
                />
         
         
     
        <Flex vertical>
           <label htmlFor="description">Description</label>
           <textarea 
               name="description" 
               id="description"
               defaultValue={record?.description}
               >
            </textarea>
        </Flex>  
    

           <label htmlFor="price">Price</label>
           <Input 
               type="number" 
               id="price" 
               name="price" 
               pattern="\d*\.?\d*"
               defaultValue={record?.price}
               />
      

    
            <label htmlFor="material">Material</label>
            <Input 
                type="text" 
                id="material" 
                name="material"
                defaultValue={record?.material} 
                />
            
    

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

        <Flex justify="center">
            {mutationResult.isSuccess && <span>successFully submitted</span>}
            <button type="submit">submit</button>
            {/* <Button type="primary" htmlType="submit">Submit</Button> */}
        </Flex>
        </Flex>
      
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

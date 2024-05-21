import { useForm, useSelect } from "@refinedev/core"
import { Flex, Input } from "antd";
import { useEffect } from "react";

export const CreateProduct = () => {

    const { onFinish, mutationResult } = useForm({
        action: "create",
        resource: "products",
    })


    
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
    <form onSubmit={onSubmit} className="flex flex-col bg-black">
      <Flex vertical>
        
           <label htmlFor="name">Name</label>
           <Input
              type="text" 
              id="name" 
              name="name"
           />
           {/* <input type="text" id="name" name="name"/> */}
             
           <label htmlFor="description">Description</label>
           <textarea name="description" id="description"></textarea>
               
           <label htmlFor="price">Price</label>
           <input type="number" id="price" name="price" step=".01"/>
              
            <label htmlFor="material">Material</label>
            <input type="text" id="material" name="material" />
     
        {/* <label htmlFor="category">Category ID</label>
        <input type="number" id="category" name="category"/> */}

        <label htmlFor="category">Category</label>
        <select name="category" id="category">
            {options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>

        <div>
            {mutationResult.isSuccess && <span>successFully submitted</span>}
            <button type="submit">Submit</button>
        </div>
      </Flex>    
    </form>
   ) 
}
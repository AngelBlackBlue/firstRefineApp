import { useForm } from "@refinedev/core"

export const CreateProduct = () => {
    const { onFinish, mutationResult } = useForm({
        action: "create",
        resource: "products",
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
        <div className="flex flex-col bg-black">
           <label htmlFor="name">Name</label>
           <input type="text" id="name" name="name" className="text-center"/>
        </div>
        
        <div>
           <label htmlFor="description">Description</label>
           <textarea name="description" id="description"></textarea>
        </div>

        <div>
           <label htmlFor="price">Price</label>
           <input type="number" id="price" name="price" step=".01"/>
        </div>

        <div>
            <label htmlFor="material">Material</label>
            <input type="text" id="material" name="material" />
        </div>

        <div>
            <label htmlFor="category">Category ID</label>
            <input type="number" id="category" name="category"/>
        </div>

        <div>
            {mutationResult.isSuccess && <span>successFully submitted</span>}
            <button type="submit">Submit</button>
        </div>
    </form>
   ) 
}
import { useState, ChangeEvent, FormEvent } from "react";
import { IProduct } from "../../api/Products";
import Input from "../inputs/Input";
import TextArea from "../inputs/TextArea";

interface ProductFormProps {
  product: IProduct | null;
  onSubmit: (product: IProduct) => void;
}

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<IProduct>(
    product || {
      id: 0,
      title: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
    }
  );


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div> 
        <label className="text-gray-300 font-poppins">Title</label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>

      <label className="text-gray-300 font-poppins">Category</label>
      <Input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      
      <label className="text-gray-300 font-poppins">Price</label>
      <Input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />

      <label className="text-gray-300 font-poppins">Stock</label>
      <Input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
      />

      <label className="text-gray-300 font-poppins">Description</label>
      <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
      />

        <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 cursor-pointer bg-sky-800 hover:bg-sky-900 transition rounded-sm text-gray-200 font-poppins">Save</button>
        </div>


    </form>
  );
};

export default ProductForm;

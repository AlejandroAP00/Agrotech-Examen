import { useState } from "react";
import { IProduct } from "../../api/Products";
import ProductForm from "./Form";

interface ProductCreateProps {
  onClose: () => void;
  onSave: (product: IProduct) => void;
}

const ProductCreate = ({ onClose, onSave }: ProductCreateProps) => {
  const [formData, setFormData] = useState<IProduct>({ 
    id: 0,
    title: "",
    category: "",
    description: "",
    price: 0,
    stock: 0 }
  );

  const handleSubmit = (newProduct: IProduct) => {
    onSave(newProduct);
    onClose();
  };

  return (
    <div>
      <ProductForm product={formData} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductCreate;

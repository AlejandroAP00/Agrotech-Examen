import { useState, useEffect } from "react";
import { IProduct } from "../../api/Products";
import ProductForm from "./Form";

interface ProductEditProps {
  product: IProduct | null;
  onClose: () => void;
  onSave: (product: IProduct) => void;
}

const ProductEdit = ({ product, onClose, onSave }: ProductEditProps) => {
  const [formData, setFormData] = useState<IProduct>(
    product || { 
      id: 0,
      title: "",
      category: "",
      description: "",
      price: 0,
      stock: 0 
    }
  );

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = (updatedProduct: IProduct) => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <div>
      <ProductForm product={formData} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;

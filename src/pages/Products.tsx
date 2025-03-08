import { useEffect, useState } from "react";
import { getCategories, getProducts, updateProduct } from "../api/Products";
import { IProduct, ICategory, addProduct } from "../api/Products";
import Input from "../components/inputs/Input";
import FloatMenu from "../components/Globals/FloatMenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../components/Modals/BasicModal";
import ProductEdit from "../components/Products/Edit";
import ProductCreate from "../components/Products/Create";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Estado de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false); // Controlar si se está agregando un producto o editando uno
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [updatedProductId, setUpdatedProductId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts({ search, category });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error); // debug
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error); // debug
      }
    };

    fetchCategories();
    fetchProducts();
  }, [search, category]);

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsAddingProduct(false);
    setIsModalOpen(true);
  };;

  const handleSave = async (updatedProduct: IProduct) => {
    try {
      const savedProduct = await updateProduct(updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
      );

      setUpdatedProductId(savedProduct.id);
      toast.success("Product updated successfully!");

      setTimeout(() => {
        setUpdatedProductId(null);
      }, 700);
    } catch (error) {
      console.error("Error saving product:", error); // debug
      toast.error("Failed to update product.");
    }
  };

  const handleAddProduct = async (newProduct: IProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts((prev) => [addedProduct, ...prev]);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error); // debug
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="container mx-auto mt-10 rounded-2xl">
      {/* Filtros */}
      <div className="filters flex gap-4 items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-[300px]">
            <Input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="p-2 bg-[#1b1b1b] text-white rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button className="px-5 py-2 cursor-pointer bg-sky-800 hover:bg-sky-900 transition rounded-sm text-gray-200 font-poppins" onClick={() => { setIsAddingProduct(true); setIsModalOpen(true); }}>Add Product</button>
        </div>
      </div>

      {/* Tabla */}
      <div id="table" className="bg-[#1b1b1b] rounded-2xl my-4">
        <div className="header grid grid-cols-12 py-2">
          <div className="text-gray-200 px-2 text-base font-bold md:col-span-4 lg:col-span-3">Title</div>
          <div className="text-gray-200 px-2 text-base font-bold md:col-span-2 lg:col-span-2">Category</div>
          <div className="text-gray-200 px-2 text-base font-bold lg:col-span-4 hidden lg:block">Description</div>
          <div className="text-gray-200 px-2 text-base font-bold md:col-span-2 lg:col-span-1">Price</div>
          <div className="text-gray-200 px-2 text-base font-bold md:col-span-2 lg:col-span-1">Stock</div>
          <div className="text-gray-200 px-2 text-base font-bold md:col-span-2 lg:col-span-1 text-center">Actions</div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-10">
            <div className="w-12 h-12 border-4 border-t-transparent border-[#1B6CA7] rounded-full animate-spin"></div>
            <span className="text-slate-400 font-poppins text-base ml-4">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1">
            {products.map((product, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 py-2 ${index % 2 === 0 ? "bg-[#141414]" : "bg-[#1b1b1b]"} ${product.id === updatedProductId ? "updated-product" : ""}`}
              >
                <div className="text-gray-200 px-2 md:col-span-4 lg:col-span-3">{product.title}</div>
                <div className="text-gray-200 px-2 md:col-span-2 lg:col-span-2">{product.category}</div>
                <div className="text-gray-200 px-2 text-sm lg:col-span-4 hidden lg:block">
                  {product.description.length > 100 ? product.description.slice(0, 100) + "..." : product.description}
                </div>
                <div className="text-gray-200 px-2 md:col-span-2 lg:col-span-1">${product.price.toFixed(2)}</div>
                <div className="text-gray-200 px-2 md:col-span-2 lg:col-span-1">{product.stock}</div>
                <div className="text-gray-200 px-2 md:col-span-2 lg:col-span-1 flex justify-center">
                  <FloatMenu Icon={BsThreeDotsVertical}>
                    <div className="p-2 cursor-pointer" onClick={() => handleEdit(product)}>Edit</div>
                  </FloatMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle={isAddingProduct ? "Add New Product" : "Edit Product"}>
        {isAddingProduct ? (
          <ProductCreate  onSave={handleAddProduct} onClose={() => setIsModalOpen(false)} />
        ) : (
          selectedProduct && <ProductEdit product={selectedProduct} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
        )}
      </Modal>
      

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Products;

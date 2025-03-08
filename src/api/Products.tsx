import apiClient from "./apiClient";

export interface IProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}

interface FilterProduct {
  search?: string;
  category?: string;
}

export const getProducts = async (filters: FilterProduct = {}) => {
  try {
    let url = "/products";

    if (filters.search) {
      url = `/products/search?q=${filters.search}`;
    } else if (filters.category) {
      url = `/products/category/${filters.category}`;
    }

    const response = await apiClient.get(url);
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const updateProduct = async (product: IProduct): Promise<IProduct> => {
  try {
    const { id, ...productData } = product; 
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const addProduct = async (product: IProduct): Promise<IProduct> => {
  try {
    console.log(product)
    const response = await apiClient.post(`/products/add`, product);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


export interface ICategory {
  name: string;
}

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await apiClient.get("/products/categories");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

import api from '../utils/api';

// Types
export interface Product {
  _id: string;
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  location?: string;
  supplier?: string;
  minimumStock?: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInput {
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  location?: string;
  supplier?: string;
  minimumStock?: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  page: number;
  pages: number;
  total: number;
}

// Get all products
export const getProducts = async (
  page = 1,
  limit = 10,
  keyword = '',
  category = '',
  isActive?: boolean
) => {
  const params: Record<string, string | number | boolean> = {
    page,
    limit,
  };

  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  if (isActive !== undefined) params.isActive = isActive;

  const response = await api.get<ProductsResponse>('/products', { params });
  return response.data;
};

// Get product by ID
export const getProductById = async (id: string) => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// Create product
export const createProduct = async (productData: ProductInput) => {
  const response = await api.post<Product>('/products', productData);
  return response.data;
};

// Update product
export const updateProduct = async (id: string, productData: Partial<ProductInput>) => {
  const response = await api.put<Product>(`/products/${id}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Get low stock products
export const getLowStockProducts = async () => {
  const response = await api.get<Product[]>('/products/low-stock');
  return response.data;
};
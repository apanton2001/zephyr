import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req: Request, res: Response) => {
  try {
    // Support for basic filtering
    const filterOptions: any = {};
    
    // Handle active/inactive filter
    if (req.query.isActive) {
      filterOptions.isActive = req.query.isActive === 'true';
    }
    
    // Handle category filter
    if (req.query.category) {
      filterOptions.category = req.query.category;
    }
    
    // Support for search
    if (req.query.keyword) {
      filterOptions.$or = [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { sku: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(filterOptions)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    // Get total count for pagination
    const count = await Product.countDocuments(filterOptions);

    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Fetch a product by ID
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Manager
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      sku,
      description,
      category,
      price,
      quantity,
      location,
      supplier,
      minimumStock,
      imageUrl,
    } = req.body;

    // Check if product with SKU already exists
    const productExists = await Product.findOne({ sku });

    if (productExists) {
      res.status(400).json({ message: 'A product with this SKU already exists' });
      return;
    }

    // Create new product
    const product = await Product.create({
      name,
      sku,
      description,
      category,
      price,
      quantity,
      location,
      supplier,
      minimumStock,
      imageUrl,
      isActive: true,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400).json({ message: 'Invalid product data' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Manager
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      category,
      price,
      quantity,
      location,
      supplier,
      minimumStock,
      imageUrl,
      isActive,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.price = price !== undefined ? price : product.price;
      product.quantity = quantity !== undefined ? quantity : product.quantity;
      product.location = location || product.location;
      product.supplier = supplier || product.supplier;
      product.minimumStock = minimumStock !== undefined ? minimumStock : product.minimumStock;
      product.imageUrl = imageUrl || product.imageUrl;
      product.isActive = isActive !== undefined ? isActive : product.isActive;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Manager
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Get low stock products
// @route   GET /api/products/low-stock
// @access  Private
export const getLowStockProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      $expr: {
        $lte: ['$quantity', '$minimumStock']
      },
      isActive: true
    });

    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
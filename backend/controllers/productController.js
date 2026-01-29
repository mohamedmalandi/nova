import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // If 'activeOnly' query param is present, filter by isActive: true
        const filter = { ...keyword };
        if (req.query.activeOnly === 'true') {
            filter.isActive = true;
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product/service/account
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product/service/account
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const { name, type, category, price, description, image, options } = req.body;

        const product = new Product({
            name,
            type,
            category,
            price,
            description,
            image,
            options,
        });

        const createdProduct = await Product.create(product);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product/service/account
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const { name, type, category, price, description, image, options } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.type = type || product.type;
            product.category = category || product.category;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.options = options || product.options;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product/service/account
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle product visibility
// @route   PATCH /api/products/:id/toggle
// @access  Private/Admin
const toggleProductVisibility = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.isActive = !product.isActive;
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductVisibility,
};

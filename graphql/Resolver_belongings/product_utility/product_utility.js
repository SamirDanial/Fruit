const Product = require("../../../models/product");
const checkAdmin = require("../utility/check_admin");

module.exports = {
  autoFillNameProduct: async function ({ Name }, req) {
    let names = [];
    const productNames = await Product.find({
      name: { $regex: Name, $options: "i" },
    });
    productNames.forEach((product) => {
      if (product.visible) names.push(product.name);
    });

    return names;
  },

  filterByNameProduct: async function ({ Name }, req) {
    const products = await Product.find({
      name: { $regex: Name, $options: "i" },
    })
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 });
    const customisedProducts = [];

    products.forEach((product) => {
      let p = {};
      p._id = product._id.toString();
      p.name = product.name;
      p.description = product.description;
      p.price = product.price;
      p.visible = product.visible;
      p.photos = product.photos.filter((x) => x.featured == true);
      console.log(p);
      customisedProducts.push(p);
    });

    return {
      products: customisedProducts.map((product, index) => {
        return {
          ...product,
        };
      }),
    };
  },

  getProduct: async function ({ ID }, req) {
    const product = await Product.findById(ID);

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  getProducts: async function ({ PageSize, PageNumber }, req) {
    const products = await Product.find()
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 });
    const customisedProducts = [];

    products.forEach((product) => {
      let p = {};
      p._id = product._id.toString();
      p.name = product.name;
      p.description = product.description;
      p.price = product.price;
      p.visible = product.visible;
      p.photos = product.photos.filter((x) => x.featured == true);
      console.log(p);
      customisedProducts.push(p);
    });

    return {
      products: customisedProducts.map((product, index) => {
        return {
          ...product,
        };
      }),
    };
  },

  createProduct: async function ({ productInput }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const product = new Product({
      name: productInput.name,
      description: productInput.description,
      price: productInput.price,
      visible: productInput.visible,
      photos: [
        {
          photoUrl: productInput.photo.photoUrl,
          featured: productInput.photo.featured,
        },
      ],
    });

    const savedProduct = await product.save();

    return {
      ...savedProduct._doc,
      _id: savedProduct._id.toString(),
    };
  },

  editProduct: async function ({ productInput }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const product = await Product.findOneAndUpdate(
      { _id: productInput.ID },
      {
        name: productInput.name,
        description: productInput.description,
        price: productInput.price,
        visible: productInput.visible,
      },
      { new: true }
    );

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  addImageToProduct: async function ({ ID, photoInput }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const product = await Product.findById(ID);
    product.photos.push({
      photoUrl: photoInput.photoUrl,
      featured: photoInput.featured,
    });

    await product.save();

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  deleteImageFromProduct: async function ({ ID, PhotoID }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const product = await Product.findById(ID);
    product.photos = await product.photos.filter(
      (x) => x._id.toString() !== PhotoID
    );
    await product.save();

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  setFeatureProduct: async function ({ ID, PhotoID }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const product = await Product.findById(ID);
    const currentFeatured = await product.photos.filter(
      (x) => x.featured == true
    )[0];
    currentFeatured.featured = false;
    const photo = await product.photos.filter(
      (x) => x._id.toString() == PhotoID
    )[0];
    photo.featured = true;
    await product.save();

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  deleteProduct: async function ({ ID }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    await Product.deleteOne({ _id: ID });

    return "deleted successfully";
  },
};

// seed-full.js
import mongoose from "mongoose";
import Vendor from "./models/Vendor.js";
import Category from "./models/Category.js";
import Subcategory from "./models/Subcategory.js";
import Product from "./models/Product.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/multivendor";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected");

  // Clear existing
  await Vendor.deleteMany();
  await Category.deleteMany();
  await Subcategory.deleteMany();
  await Product.deleteMany();

  // ---------------------------
  // VENDORS (Branches)
  // ---------------------------
  const restaurantA1 = await Vendor.create({
    name: "Restaurant A1",
    description: "Main branch of Restaurant"
  });

  const restaurantA2 = await Vendor.create({
    name: "Restaurant A2",
    description: "Secondary branch"
  });

  const groceryA1 = await Vendor.create({
    name: "A1 Mart Grocery",
    description: "Supermarket Branch"
  });

  const groceryA2 = await Vendor.create({
    name: "A2 Mart Grocery",
    description: "Supermarket Branch"
  });

  // -------------------------------------
  // RESTAURANT CATEGORIES
  // -------------------------------------
  const biryaniCat = await Category.create({
    name: "Biryani",
    vendor: restaurantA1._id
  });

  const startersCat = await Category.create({
    name: "Starters",
    vendor: restaurantA1._id
  });

  // -------------------------------------
  // RESTAURANT SUBCATEGORIES
  // -------------------------------------
  const vegBiryaniSub = await Subcategory.create({
    name: "Veg Biryani",
    category: biryaniCat._id
  });

  const nonVegBiryaniSub = await Subcategory.create({
    name: "Non-Veg Biryani",
    category: biryaniCat._id
  });

  const vegStartersSub = await Subcategory.create({
    name: "Veg Starters",
    category: startersCat._id
  });

  const nonVegStartersSub = await Subcategory.create({
    name: "Non-Veg Starters",
    category: startersCat._id
  });

  // -------------------------------------
  // RESTAURANT PRODUCTS
  // -------------------------------------
  await Product.insertMany([
    {
      name: "Veg Dum Biryani",
      price: 180,
      vendor: restaurantA1._id,
      category: biryaniCat._id,
      subcategory: vegBiryaniSub._id
    },
    {
      name: "Paneer Biryani",
      price: 200,
      vendor: restaurantA1._id,
      category: biryaniCat._id,
      subcategory: vegBiryaniSub._id
    },
    {
      name: "Chicken Biryani",
      price: 240,
      vendor: restaurantA1._id,
      category: biryaniCat._id,
      subcategory: nonVegBiryaniSub._id
    },
    {
      name: "Mutton Biryani",
      price: 320,
      vendor: restaurantA1._id,
      category: biryaniCat._id,
      subcategory: nonVegBiryaniSub._id
    },

    // Starters
    {
      name: "Paneer Tikka",
      price: 160,
      vendor: restaurantA1._id,
      category: startersCat._id,
      subcategory: vegStartersSub._id
    },
    {
      name: "Gobi Manchurian",
      price: 120,
      vendor: restaurantA1._id,
      category: startersCat._id,
      subcategory: vegStartersSub._id
    },
    {
      name: "Chicken 65",
      price: 180,
      vendor: restaurantA1._id,
      category: startersCat._id,
      subcategory: nonVegStartersSub._id
    },
    {
      name: "Fish Fry",
      price: 220,
      vendor: restaurantA1._id,
      category: startersCat._id,
      subcategory: nonVegStartersSub._id
    }
  ]);

  // -------------------------------------
  // GROCERY CATEGORIES
  // -------------------------------------
  const oilsCat = await Category.create({
    name: "Oils",
    vendor: groceryA1._id
  });

  const attaCat = await Category.create({
    name: "Atta",
    vendor: groceryA1._id
  });

  const spicesCat = await Category.create({
    name: "Spices & Minerals",
    vendor: groceryA1._id
  });

  // -------------------------------------
  // GROCERY SUBCATEGORIES
  // -------------------------------------
  const oilSunflowerSub = await Subcategory.create({
    name: "Sunflower Oil",
    category: oilsCat._id
  });

  const oilGroundnutSub = await Subcategory.create({
    name: "Groundnut Oil",
    category: oilsCat._id
  });

  const wheatAttaSub = await Subcategory.create({
    name: "Wheat Atta",
    category: attaCat._id
  });

  const riceFlourSub = await Subcategory.create({
    name: "Rice Flour",
    category: attaCat._id
  });

  const masalaSpicesSub = await Subcategory.create({
    name: "Masala Powders",
    category: spicesCat._id
  });

  // -------------------------------------
  // GROCERY PRODUCTS
  // -------------------------------------
  await Product.insertMany([
    // Oils
    {
      name: "Freedom Sunflower Oil 1L",
      price: 150,
      vendor: groceryA1._id,
      category: oilsCat._id,
      subcategory: oilSunflowerSub._id
    },
    {
      name: "Saffola Sunflower Oil 1L",
      price: 155,
      vendor: groceryA1._id,
      category: oilsCat._id,
      subcategory: oilSunflowerSub._id
    },
    {
      name: "24 Mantra Groundnut Oil 1L",
      price: 180,
      vendor: groceryA1._id,
      category: oilsCat._id,
      subcategory: oilGroundnutSub._id
    },

    // Atta
    {
      name: "Aashirvaad Atta 5kg",
      price: 240,
      vendor: groceryA1._id,
      category: attaCat._id,
      subcategory: wheatAttaSub._id
    },
    {
      name: "Pillsbury Atta 5kg",
      price: 230,
      vendor: groceryA1._id,
      category: attaCat._id,
      subcategory: wheatAttaSub._id
    },

    // Spices
    {
      name: "Red Chilli Powder 500g",
      price: 120,
      vendor: groceryA1._id,
      category: spicesCat._id,
      subcategory: masalaSpicesSub._id
    },
    {
      name: "Turmeric Powder 500g",
      price: 90,
      vendor: groceryA1._id,
      category: spicesCat._id,
      subcategory: masalaSpicesSub._id
    }
  ]);

  console.log("Seed Completed Successfully");
  process.exit();
}

seed();

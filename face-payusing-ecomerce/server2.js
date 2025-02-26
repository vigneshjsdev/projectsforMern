require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    phone: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);


// Configure Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        console.log(req.body);
        
        if (false) {
            return cb(new Error('Email is required in the request body'));
        }
        cb(null, `${"ahaahh".replace(/[@.]/g, '_')}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

//----------------------------------------- API to Upload Image --------------------------------------------//
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});
//----------------------------------------- API to Fetch User Profile --------------------------------------------//
app.get('/profile', async (req, res) => {
    try {
        const usersCollection = await connectDB();
        const email = req.query.email;
        const user = await usersCollection.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

// Serve Uploaded Images
app.use('/uploads', express.static('./uploads'));


// Register User
app.post("/register", async (req, res) => {
    try {
        const { fullname, username, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Account already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, username, email, phone, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password!" });

        res.status(200).json({ message: "Login successful!", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String
});
const Product = mongoose.model("Product", productSchema);
// API to add a product
app.post("/add-product", upload.single("image"), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";

        const newProduct = new Product({ name, price, description, category, image });
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// API to fetch products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific product by ID
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

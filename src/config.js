const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to the database using async/await pattern for better error handling
async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected Successfully");
    } catch (err) {
        console.log("Database cannot be Connected:", err.message);
    }
}

// Create Schema for storing user sign-up information
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure username is unique
    },
    password: {
        type: String,
        required: true
    }
});



// Create a collection for users
const User = mongoose.model("User", UserSchema);

// Export the connection function and User model

// Create Schema for storing user sign-up information

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
});

const MailingList = mongoose.model("MailingList", NewsletterSchema);

const contactUsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema)



const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  article_data: {
    content: String, // base64 PDF
    mimetype: String,
    filename: String
  },
  image_data: {
    content: String, // base64 image
    mimetype: String,
    filename: String
  },
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", articleSchema);






const playerStatsSchema = new mongoose.Schema({
    matchId: { type: String, required: true },
    matchName: { type: String, required: true },
    setType: { type: Number, required: true }, 
    finalScore: { type: [String],required: true },
    matchWinner: { type: String, required: true },
    matchDate: { type: Date, required: true },
    player1: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        height: {
            value: {
                ft: { type: Number, required: function() { return this.unit === 'ft'; } },
                inches: { type: Number, required: function() { return this.unit === 'ft'; }, min: 0, max: 11 },
                cm: { type: Number, required: function() { return this.unit === 'cm'; } },
            },
            unit: { type: String, enum: ['cm', 'ft'], required: true },
        },
        gender: { type: String, enum: ['male', 'female', 'other'], required: true },
        racket: { type: String, required: true },
        dominantHand: { type: String, enum: ['left', 'right', 'ambidextrous'], required: true } 


    },
    player2: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        height: {
            value: {
                ft: { type: Number, required: function() { return this.unit === 'ft'; } },
                inches: { type: Number, required: function() { return this.unit === 'ft'; }, min: 0, max: 11 },
                cm: { type: Number, required: function() { return this.unit === 'cm'; } },
            },
            unit: { type: String, enum: ['cm', 'ft'], required: true },
        },
        gender: { type: String, enum: ['male', 'female', 'other'], required: true },
        racket: { type: String, required: true },
        dominantHand: { type: String, enum: ['left', 'right', 'ambidextrous'], required: true } 
    },
    
    stats: { type: Map, of: Number, default: {} },
    eachSetScore: { type: [String], default: [] },
    statsmatchTimeline: [
        {
            timestamp: { type: String, required: true },
            message: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() } 
});

// Middleware to update `updatedAt` before saving
playerStatsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


const PlayerStats = mongoose.model("PlayerStats", playerStatsSchema);
module.exports = { connectDatabase, User, MailingList, ContactUs, PlayerStats, Article };

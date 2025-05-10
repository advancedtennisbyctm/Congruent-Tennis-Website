require('dotenv').config();



const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { connectDatabase, User } = require("./src/config.js");

const app = express();

// Connect to the database
connectDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) return next();
    return res.redirect("/");
}

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // Serve main page
});

// Signup
app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ errorMessage: "❌ Email or Username Already Taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, username, password: hashedPassword });

        res.status(200).json({ message: "✅ Signup Successful!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ errorMessage: "Unexpected error. Please try again later." });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send("Username not found.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Incorrect password.");

        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        };

        res.redirect("/"); // Reload index.html with session active
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Login failed.");
    }
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout Error:", err);
            return res.status(500).send("Logout failed.");
        }
        res.redirect("/");
    });
});

// Session check
app.get("/session", (req, res) => {
    if (req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    }
    return res.json({ loggedIn: false });
});


const { MailingList } = require("./src/config.js");
app.post("/newsletter", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "<strong>Email is Required!</strong>" });
        }

        const existingSubscriber = await MailingList.findOne({ email });

        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: "<strong>❌ Email Already Subscribed!</strong>" });
        }

        await MailingList.create({ email });
        return res.status(200).json({ success: true, message: "<strong>✅ Thank You For Subscribing!</strong>" });
    } catch (error) {
        console.error("Newsletter Error:", error);
        return res.status(500).json({ success: false, message: "<strong>An Error Occurred. Please Try Again Later. 🕒</strong>" });
    }
});

const { ContactUs } = require("./src/config.js");

app.post("/contactus", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ errorMessage: "All fields Are Required." });
        }

        // Create a new ContactUs entry in the database
        await ContactUs.create({ name, email, message });

        // Send success response
        res.status(200).json({ message: "Message Sent Successfully! Wait For Us To Get Back To You ⏳" });
    } catch (error) {
        console.error("Error in /contactus:", error);
        res.status(500).json({ errorMessage: "❌ An Unexpected Error Occurred. Please Try Again Later." });
    }
});
const { PlayerStats } = require("./src/config.js");

function generateMatchId() {
    const today = new Date();
    
    // Get local date parts
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const datePart = `${year}${month}${day}`; // Format: YYYYMMDD
    const randomPart = Math.random().toString(36).substr(2, 8).toUpperCase(); // 8-character alphanumeric string

    return `${datePart}-${randomPart}`;
}


// Save stats endpoint
app.post('/save-stats', async (req, res) => {
    const {
        matchId = generateMatchId(),
        matchName,
        setType,
        finalScore,
        matchWinner,
        matchDate,
        player1,
        player2,
        stats,
        eachSetScore,
        statsmatchTimeline, // Accept custom timeline
    } = req.body;

    

    try {
        const updatedMatchStats = await PlayerStats.findOneAndUpdate(
            { matchId },
            {
                matchId,
                matchName,
                setType,
                finalScore,
                matchWinner,
                matchDate,
                player1,
                player2,
                stats,
                eachSetScore,
                statsmatchTimeline, // Save timeline as provided
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: 'Stats saved successfully', matchId, data: updatedMatchStats });
    } catch (error) {
        console.error('Error saving stats:', error);
        res.status(500).json({ message: 'Failed to save stats', error: error.message });
    }
});



app.get('/search', async (req, res) => {
    const { type, query } = req.query;

    let filter = {};

    switch (type) {
        case 'matchId':
            filter = { matchId: query };
            break;

        case 'playerName':
            filter = {
                $or: [
                    { "player1.name": { $regex: query, $options: 'i' } },
                    { "player2.name": { $regex: query, $options: 'i' } }
                ]
            };
            break;

        case 'matchDate':
            // Adjusted to clearly handle "YYYY-MM-DD"
            const start = new Date(`${query}T00:00:00.000Z`);
            const end = new Date(`${query}T23:59:59.999Z`);
            filter = { matchDate: { $gte: start, $lte: end } };
            break;

        case 'matchName':
            filter = { matchName: { $regex: query, $options: 'i' } };
            break;

        case 'matchId':
            filter = { matchId: query };
            break;

        default:
            return res.status(400).json({ message: 'Invalid search type' });
    }

    try {
        const results = await PlayerStats.find(filter).limit(20);

        if (!results.length) {
            return res.status(404).json({ message: 'No matches found' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

// server config
const server = express();
const PORT = process.env.PORT || 3377;

// middleware for json support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// set up static asset directory for production
if (process.env.NODE_ENV === "production") {
    server.use(express.static("client/dist"));
}

// configure session
server.use(session({
    secret: "derp",
    resave: true,
    saveUninitialized: true
}))

// mongoose config
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/manicurated";
const mongoConfigs = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// open connections
mongoose.connect(MONGODB_URI, mongoConfigs);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
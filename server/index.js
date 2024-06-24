const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js"); // Make sure this path is correct
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/* Routes*/
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes); // Correctly using the booking routes
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
   .connect(process.env.MONGO_URL, {
    dbName: "dream_nest",
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

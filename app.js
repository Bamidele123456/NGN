const express = require("express");
const profileRoutes = require("./routes/profile");
const cors = require("cors");
const bodyParser = require("body-parser");
const stringRoutes = require("./routes/stringRoutes");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/me", profileRoutes);
app.use("/strings", stringRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

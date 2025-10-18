const express = require("express");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/me", profileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/me`);
});

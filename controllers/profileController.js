const axios = require("axios");

exports.getProfile = async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    const catFact = response.data.fact;

    // Your profile data
    const profile = {
      name: "Bamidele Oriku",
      github: "https://github.com/Bamidele123456/NGN",
      email: "bamideleprecious85@gmail.com",
      bio: "Backend Developer passionate about building scalable systems.",
      cat_fact: catFact,
    };

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch cat fact." });
  }
};

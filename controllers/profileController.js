const axios = require("axios");

export const getProfile = async (req, res) => {
  try {
    const { data } = await axios.get("https://catfact.ninja/fact");

  
    const response = {
      status: "success",
      user: {
        name: "Bamidele Oriku",
        email: "bamideleprecious85@gmail.com", 
        stack: "Python/Flask,JavaScript/Nodejs,C#/ASP.NET",
      },
      timestamp: new Date().toISOString(),
      fact: data.fact
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching the cat fact."
    });
  }
};


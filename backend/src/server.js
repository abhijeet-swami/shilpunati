import app from "./app.js";
import connectToDB from "./configs/db.config.js";
import "dotenv/config";

const startServer = () => {
  connectToDB()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Server running at https://localhost:${process.env.PORT}`);
      });
    })
    .catch((error) => {
      console.log(`Error while starting server: ${error.message}`);
    });
};

startServer();

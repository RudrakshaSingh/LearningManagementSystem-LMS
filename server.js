import app from "./app.js"; // to use module instead of commmon js(ensur to give file extension in modules)
import connectionToDb from "./config/dbConnection.js";
import cloudinary from "cloudinary";

const PORT = process.env.PORT || 8000;

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
    await connectionToDb();
    console.log(`app is listening on http://localhost:${PORT}`);
});

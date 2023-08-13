import app from "./app.js"; // to use module instead of commmon js(ensur to give file extension in modules)
import connectionToDb from "./config/dbConnection.js";
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    await connectionToDb();
    console.log(`app is listening on http://localhost:${PORT}`);
});

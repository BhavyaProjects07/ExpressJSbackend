import dotenv from "dotenv";
import connectDB from "./db/index.js";



dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
    })
    .catch((err) => {
    console.log("Failed to connect to the database", err);
})
    
// const app = express()    

// ; async(() => {
//     try {
//         mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Error: ");
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("Error connecting to the database", error);
//         throw err;
//     }
//  })()
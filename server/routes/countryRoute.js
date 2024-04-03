import express from "express";

const route = express.Router();




route.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from the server!" });
}
);


export default route;
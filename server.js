import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";

const app = express();
const upload = multer();

app.use(cors());

app.post("/upload", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    const form = new FormData();
    form.append("file", req.file.buffer, "board.jpg");

    const ocrResponse = await fetch("https://helpman.komtera.lt/chessocr/", {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
    });

    const html = await ocrResponse.text();

    const fenMatch = html.match(/FEN:\s*([^<\s]+)/i);
    const fen = fenMatch ? fenMatch[1] : "ERROR";

    res.send(fen);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

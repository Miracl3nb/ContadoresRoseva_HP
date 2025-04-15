const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;


app.use("/static", express.static("static"));


//app.use(express.static(path.join(__dirname, "public",)));

app.use(express.static("public"));

// Endpoint
app.get("/api/impresora/:ip", (req, res) => {
    const ip = req.params.ip;
    const url = `https://${ip}/hp/device/InternalPages/Index?id=UsagePage`;

    exec(`curl -k --tls-max 1.0 "${url}"`, (error, stdout) => {
        if (error) {
            return res.status(500).json({ error: "No se pudo conectar a la impresora." });
        }

        const $ = cheerio.load(stdout);

        let serial = "No encontrado";
        $("strong").each((i, el) => {
            const text = $(el).text().trim();
            if (/^[A-Z0-9]{8,}$/.test(text)) {
                serial = text;
                return false;
            }
        });

        const impressions = $("#UsagePage\\.EquivalentImpressionsTable\\.Print\\.Total").text().trim() || "No encontrado";

        res.json({ serial, impressions });
    });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor web corriendo en http://localhost:${PORT}`);
});

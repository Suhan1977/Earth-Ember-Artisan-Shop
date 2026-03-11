import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Enquiries
  app.post("/api/enquire", async (req, res) => {
    try {
      const { name, email, phone, product, message } = req.body;
      
      if (!name || !email || !product) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const enquiryData = `
--- New Enquiry ---
Date: ${new Date().toISOString()}
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Product: ${product}
Message: ${message}
-------------------
`;

      await fs.appendFile(path.join(__dirname, "enquiries.txt"), enquiryData);
      
      res.json({ success: true, message: "Thank you for your enquiry! We will get back to you soon." });
    } catch (error) {
      console.error("Error saving enquiry:", error);
      res.status(500).json({ error: "Failed to process enquiry" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

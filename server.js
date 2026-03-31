import express from "express";

const app = express();
app.use(express.json());

let jobs = [];

// Add print job
app.post("/print", (req, res) => {
  jobs.push(req.body);
  console.log("📥 New job:", req.body);

  res.json({ success: true });
});

// Get all jobs (for bridge)
app.get("/jobs", (req, res) => {
  const pending = [...jobs];
  jobs = []; // clear after sending

  res.json(pending);
});

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Cloud Print Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));

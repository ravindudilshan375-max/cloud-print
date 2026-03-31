import express from "express";

const app = express();
app.use(express.json());

let jobs = [];

// Send print job
app.post("/print", (req, res) => {
  const job = {
    id: Date.now(),
    data: req.body,
    status: "pending"
  };
  jobs.push(job);
  res.json({ success: true });
});

// Get jobs
app.get("/jobs", (req, res) => {
  res.json(jobs.filter(j => j.status === "pending"));
});

// Mark done
app.post("/done/:id", (req, res) => {
  const id = Number(req.params.id);
  jobs = jobs.map(j =>
    j.id === id ? { ...j, status: "done" } : j
  );
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Cloud Print API Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

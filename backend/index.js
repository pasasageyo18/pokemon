const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/catch", (req, res) => {
  const isCaught = Math.random() < 0.5;
  console.log(isCaught);
  res.status(200).send({ probability: isCaught ? 50 : 0 });
});

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

app.post("/release", (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }

  const primeStatus = isPrime(number);
  if (primeStatus) {
    res.json({ success: true, message: "Released successfully", number });
  } else {
    res.json({ success: false, message: "Release failed", number });
  }
});

const fibonacci = (n) => {
  if (n < 2) return n;
  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
};

app.post("/rename", (req, res) => {
  const { name, renameCount } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const fibonacciNumber = fibonacci(renameCount);
  const newName = `${name}-${fibonacciNumber}`;
  res.status(200).send({ newName });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

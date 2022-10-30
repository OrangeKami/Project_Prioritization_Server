import { app } from "./server.js";

// * set server's address
const PORT = process.env.PORT || 5000;

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };

app.listen(PORT, () => {
  console.log(`Lisening on port ${process.env.PORT}`);
});

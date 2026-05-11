import app from "./app.js";
import { safeLog } from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  safeLog(`Server running on port1 ${PORT}`);
});

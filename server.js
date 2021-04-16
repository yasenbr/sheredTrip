const express = require("express");
const { PORT } = require("./config/config");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const routes = require("./routes");
require("./config/mongoose");
require("./config/express")(app);

app.use(routes);
//always after routes
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is on port ${PORT}...`));

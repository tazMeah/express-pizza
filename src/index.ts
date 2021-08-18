import express from "express";
import path from 'path';
import route from "./routes/routing";
import cors from "cors";

const app = express();
const port = 3000;


// Settings for web pages
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use("/", route);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})



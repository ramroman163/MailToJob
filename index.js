import express from 'express';
import path from 'node:path';
import { sendMailRouter } from './routes/sendMail.js';
import engines from 'consolidate'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', __dirname + '/static');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => { res.sendFile(process.cwd() + "/static/index.html") })
app.use("/mail", sendMailRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/`)
})
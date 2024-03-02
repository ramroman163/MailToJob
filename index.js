import express from 'express';
import { sendMailRouter } from './routes/sendMail.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => { res.status(200).send(`<h1>Petición exitosa</h1>`) })
app.use("/mail", sendMailRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/`)
})
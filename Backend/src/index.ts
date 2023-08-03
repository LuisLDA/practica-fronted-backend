import express from "express";
import { json } from "express";
import cors from "cors";
import multer from "multer";
import { process_doc } from "./lang_script";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
  console.log("¡Alguien ha dado ping!");
  res.setHeader("Content-Type", "application/json");
  res.send("pong");
});

app.get("/hola/:nombre/:apellido", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  console.log("¡Alguien ha ingresado sus nombres!");
  res.send({ nombre: nombre, apellido: apellido });
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    if (!fileExtension.includes(".pdf")) {
      callback(new Error("Solo se permiten archivos PDF"));
    }
    callback(null, true);
  },
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file || !req.body?.question) {
    return res.status(400).send();
  }
  const response = await process_doc(req.file?.filename, req.body.question);
  res.send(response);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

app.use((req, res, next) => {
  res.status(404).send("¡Lo siento! ¡No puedo encontrar eso!");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

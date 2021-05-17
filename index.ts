const dotenv = require('dotenv')
dotenv.config()
// @ts-ignore
import express from 'express'

var cors = require('cors')

const app = express()
const multer = require('multer');
const upload = multer({dest: "tmp/"});

app.use(cors())

app.use(express.json())
import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import {AdminCtrl} from "./controllers/AdminController";
import {CameraCtrl} from "./controllers/CameraController";

app.get('/customers', AdminCtrl.getCustomer)
app.post('/login', AdminCtrl.login)
app.get('/patients/:uuid', AdminCtrl.getPatient)
app.get('/patient_images/:uuid', AdminCtrl.getImage)

app.post('/patients', CameraCtrl.createPatient)
app.post('/patient_images', upload.single('file'), CameraCtrl.createPatientImage)
app.post('/images_completed', CameraCtrl.imagesCompleted)
app.put('/patients', CameraCtrl.insertPatientInformation)
app.post('/patients/satisfaction', CameraCtrl.satisfied)
app.post('/patients/completed', CameraCtrl.completed)

app.listen(8000, () => {
    console.log('Port 8000 ready')
})
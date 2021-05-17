import * as express from "express";
import fs from 'fs';

// @ts-ignore
import request from 'request';
import Image from "../components/HeadApi/Image";
import Patient from "../components/HeadApi/Patient";
import PutPatient from "../components/HeadApi/Request/PutPatient";
import Satisfied from "../components/HeadApi/Request/Satisfied";
import Patients from "../components/HeadApi/Request/Patients";
import Customer from "../components/HeadApi/Request/Customer";
import ImagePerson from "../components/HeadApi/Request/ImagePerson";

class CameraController {

    async createPatient(req: express.Request, res: express.Response) {
        let customer = new Customer();
        let patient = new Patient();
        customer.uuid = req.body.customer;
        let result = patient.init(customer)
        result.then((r) => {
                res.json({
                    status: 'person created',
                    patient: r.data.patientUuid,
                })
            }
        )
    }

    async createPatientImage(req: express.Request, res: express.Response) {
        let createImage = new Image();
        const patients = new Patients();
        let patient = new Patient();
        const imagePerson = new ImagePerson();

        patients.uuid = req.body.patient;
        let imageCreated = await createImage.create(req.file.path, 'head_hair');

        imagePerson.uuidPatient = patients.uuid;
        imagePerson.uuidImage = imageCreated.uuid;
        imagePerson.service = 'head_hair';
        imagePerson.position = req.body.position;
        let result = patient.mapImageWithPatient(
            imagePerson
        );
        result.then(() =>
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
                console.log('successfully deleted /tmp/hello');
            })
        );
        res.json({
            status: 'images created',
        });
    }

    async imagesCompleted(req: express.Request, res: express.Response) {

        if (!req.body.patient) {
            console.error('no patient provided');
            res.json({
                status: 'bad'

            })
        } else {
            let patient = new Patients();
            let createImage = new Patient();
            patient.uuid = req.body.patient;
            let result = createImage.imagesCompleted(patient)
            result.then(() =>
                res.json({
                    status: 'Images completed'
                })
            );
        }
    }

    async insertPatientInformation(req: express.Request, res: express.Response) {
        if (!req.body.patient) {
            console.error('no patient provided');
            res.json({
                status: 'bad'

            })
        } else {
            let uuid = req.body.patient;
            let putPatient = new PutPatient();
            putPatient.salutation = req.body.salutation;
            putPatient.firstName = req.body.firstName;
            putPatient.lastName = req.body.lastName;
            putPatient.email = req.body.email;
            putPatient.dateOfBirth = req.body.dateOfBirth;
            putPatient.mobile = req.body.mobile ?? '';
            let createImage = new Patient();
            let result = createImage.putPatient(uuid, putPatient)
            result.then(() =>
                res.json({
                    status: 'Person object updated'
                })
            );
        }


    }

    async satisfied(req: express.Request, res: express.Response) {
        if (!req.body.patient) {
            console.error('no patient provided');
            res.json({
                status: 'bad'

            })
        } else {
            let createImage = new Patient();
            const patients = new Patients();
            patients.uuid = req.body.patient;
            let satisfied = new Satisfied();
            satisfied.satisfaction = req.body.satisfied
            let result = createImage.patientSatisfied(patients, satisfied)
            result.then(() =>
                res.json({
                    status: 'Person satisfied updated'
                })
            );
        }
    }

    async completed(req: express.Request, res: express.Response) {
        if (!req.body.patient) {
            console.error('no patient provided');
            res.json({
                status: 'bad'

            })
        } else {
            const patients = new Patients();
            patients.uuid = req.body.patient;
            let createImage = new Patient();
            let result = createImage.completed(patients)
            result.then(() =>
                res.json({
                    status: 'Patients completed ^^'
                })
            );
        }
    }


}

export const CameraCtrl = new CameraController()
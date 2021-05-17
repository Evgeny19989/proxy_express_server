import * as express from "express";
// @ts-ignore
import request from 'request';
import Patient from "../components/HeadApi/Patient";
import Patients from "../components/HeadApi/Request/Patients";
import Image from "../components/HeadApi/Request/Image";

class AdminController {

    async login(req: express.Request, res: express.Response) {

        request({
            method: 'POST',
            url: `${process.env.HEAD_API}/api_tokens`,
            json: {email: req.body.email, password: req.body.password},

        }, function (error, response) {
            if (!error && response.statusCode == 200) {
                try {
                    res.json({
                        status: 'success',
                        data: response.body,
                    });
                } catch (error) {
                    res.status(400)
                }
            } else {
                res.status(400).json({
                    status: 'error 400',
                    data: 'error 400'
                });
            }
        })
    }

    async getCustomer(req: express.Request, res: express.Response) {

        // @ts-ignore
        if (req.headers.uuid === 'null' || req.headers.token === 'null') {
            res.status(400,).json(
                {status: 'not uuid or token'}
            )
        } else {
            request({
                headers: {
                    authorization: `Bearer ${req.headers.token}`,
                    Accept: "application/json"
                },
                method: 'GET',
                url: `${process.env.HEAD_API}/customers/${req.headers.uuid}`,

            }, function (error, response) {
                if (!error && response.statusCode == 200) {
                    res.json({
                        status: 'success',
                        data: JSON.parse(response.body),
                    });

                } else {
                    res.status(400).json({
                        status: 'error 400',
                        data: 'error 400'
                    });
                }
            })
        }
    }

    async getPatient(req: express.Request, res: express.Response) {
        const patients = new Patients();
        patients.uuid = req.params.uuid;
        let getPatient = new Patient();
        let result = getPatient.getPatient(patients)
        result.then((data) => {
                if (data == 400) {
                    res.status(400).json({
                        status: 'error',
                    })
                } else {
                    res.json({
                        status: 'Get patient success',
                        data: data
                    })
                }
            }
        );
    }

    async getImage(req: express.Request, res: express.Response) {
        const image = new Image
        image.uuid = req.params.uuid;
        let getImage = new Patient();
        let result = getImage.getImage(image)
        result.then((data) => {
                if (data == 400) {
                    res.status(400).json({
                        status: 'error',
                    })
                } else {
                    res.json({
                        status: 'Get image success',
                        data: data
                    })
                }
            }
        );
    }
}

export const AdminCtrl = new AdminController()

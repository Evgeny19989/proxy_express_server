import ImagePerson from "./Request/ImagePerson";
import axios from "axios";
import PutPatient from "./Request/PutPatient";
import Satisfied from "./Request/Satisfied";
import Patients from "./Request/Patients";
import Customer from "./Request/Customer";

export default class Patient {

    async init(customer: Customer) {

        const res = await axios({
            headers: {
                authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                Accept: "application/json"
            },
            method: 'POST',
            url: `${process.env.HEAD_API}/patients`,
            data: {customerUuid: customer.uuid},
        })
        if (res.status != 201) {
            // test for status
            console.error(res.data);
        }
        return res;
    }


    async putPatient(uuid: string, patient: PutPatient) {
        try {
            let res = await axios({
                method: "PUT",
                url: `${process.env.HEAD_API}/patients/${uuid}`,
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json",
                },
                data: patient
            })
            if (res.status == 200) {
                // test for status
                console.log(res.status)
            }
            return true
        } catch
            (err) {
            console.error(err.response.data);
        }

    }

    async patientSatisfied(patients: Patients, staisfied: Satisfied) {
        try {
            let res = await axios({
                method: "PATCH",
                url: `${process.env.HEAD_API}/patients/${patients.uuid}/satisfaction`,
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json",
                    "content-type": "application/merge-patch+json"
                },
                data: staisfied
            })
            if (res.status == 200) {
                // test for status
                console.log(res.status)
            }
            return true
        } catch
            (err) {
            console.error(err.response.data);
        }
    }

    async mapImageWithPatient(imagePerson: ImagePerson) {
        try {
            let res = await axios({
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json"
                },
                method: "POST",
                url: `${process.env.HEAD_API}/patients/image`,
                data: imagePerson
            })
            if (res.status == 201) {
                // test for status
                console.log(res.status)
            }
            return true
        } catch
            (err) {
            console.error(err.response.data);
        }
    }

    async imagesCompleted(patient: Patients) {
        try {
            let res = await axios({
                method: "PATCH",
                url: `${process.env.HEAD_API}/patients/${patient.uuid}/images/completed`,
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json",
                    "content-type": "application/merge-patch+json"
                },
                data: {}
            })
            if (res.status == 200) {
                // test for status
                console.log(res.status)
            }
            return true
        } catch
            (err) {
            console.error(err.response.data);
        }
    }

    async completed(patients: Patients) {
        try {
            let res = await axios({
                method: "PATCH",
                url: `${process.env.HEAD_API}/patients/${patients.uuid}/completed`,
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json",
                    "content-type": "application/merge-patch+json"
                },
                data: {}
            })
            if (res.status == 200) {
                // test for status
                console.log(res.status)
            }
            return true
        } catch
            (err) {
            console.error(err.response.data);
        }
    }

    async getSortedPatients() {

    }

    async getPatient(patients: Patients) {
        try {
            let res = await axios({
                method: "GET",
                url: `${process.env.HEAD_API}/patients/${patients.uuid}`,
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json",
                },
            })
            if (res.status == 200) {
                // test for status
                return res.data
            }
        } catch
            (err) {
            console.error(err.response);
            return 400
        }
    }

    async getImage(patients: Patients) {
        try {
            let res = await axios({
                method: "GET",
                url: `${process.env.HEAD_API}/patient_images/${patients.uuid}`,
                headers: {
                    authorization: `Bearer ${process.env.HEAD_API_BEARER}`,
                    accept: "application/json",
                },
            })
            if (res.status == 200) {
                // test for status
                return res.data
            }
        } catch
            (err) {
            console.error(err.response);
            return 400
        }
    }
}
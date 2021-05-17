import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import ImageCreated from "./Response/ImageCreated";

export default class Image {

    async create(path: string, serviceName: string) {
        let form = new FormData();
        form.append('file', fs.createReadStream(path), `${serviceName}.jpg`);

        const response = await axios({
            method: "post",
            url: `${process.env.HEAD_API}/patient_images`,
            data: form,
            headers: {
                "Authorization": `Bearer ${process.env.HEAD_API_BEARER}`,
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
            }
        })
        if (response.status != 201) {
            console.error(response.data);
        }

        const responseObject = new ImageCreated();
        responseObject.uuid = response.data.uuid;
        responseObject.contentUrl = response.data.contentUrl;

        return responseObject;
    }
}
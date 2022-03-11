import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals'
import { User } from '../interfaces/interfaces';
import { useCookies } from '@react-smart/react-cookie-service';
import { useDownloadFile } from '../customHooks/useDownloadFile';
import { DateTime } from "luxon"

const BillingExportComponent: React.FunctionComponent<{}> = (props) => {
    const [textResponse, setTextResponse] = useState("")
    const [successfulRequest, setSuccessfulRequest] = useState(false)
    const [errorRequest, setErrorRequest] = useState(false)

    const { getCookie } = useCookies(); 

    const getFileName = () => {
    return DateTime.local().toISODate() + "_bill.pdf"; //TODO: add details based on customer/projectID into filename
    };

    function clearInputfields() {
            //TODO
    } 

    const postDownloading = () => {
        clearInputfields(); 
        setTextResponse("Successfully Downloaded Pdf");
    }
    
    const preDownloading = () => setTextResponse("Loading...");

    const onErrorDownloadFile = () => setTextResponse("Der Computer sagt Nein!")
    
    const downloadPdfBill = () => {
    // throw new Error("uncomment this line to mock failure of API");
    return axios.post(`${BASE_URL}/api/invoices/export/pdf`, null, { headers: { authorization: getCookie("basicAuthToken") }, responseType: "blob", params: {customerId: 1, projectId: 1} })
    };


    const { ref, url, download, name } = useDownloadFile({
    apiDefinition: downloadPdfBill,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName,
    });
    
    
    return(
        <>
        <p>{textResponse}</p>
        <a href={url} download={name} className="hidden" ref={ref} />
        <button className="formButtonGreen" onClick={download}>Download PDF</button>
        </>
    )
    }

    export default BillingExportComponent;
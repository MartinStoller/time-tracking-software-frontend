import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals'
import { User } from '../interfaces/interfaces';
import { useCookies } from '@react-smart/react-cookie-service';
import { useDownloadFile } from '../customHooks/useDownloadFile';
import { DateTime } from "luxon"
import {Customer, Project} from "../interfaces/interfaces"

const BillingExportComponent: React.FunctionComponent<{}> = (props) => {
    const [textResponse, setTextResponse] = useState("")
    const [state, setState] = useState({
        customerName: "",
        customerId: "",
        customerProjects: [] as Project[],
        projectTitle: "",
        allCustomers: [] as Customer[],
        customerNameList: [] as string[],
        projectId: ""
    });

    const { getCookie } = useCookies(); 

    const getFileNamePdf = () => {
    return DateTime.local().toISODate() + `_bill_${state.customerName}_${state.projectTitle}.pdf`; 
    };

    const getFileNameXML = () => {
    return DateTime.local().toISODate() + `_bill_${state.customerName}_${state.projectTitle}.xml`; 
    };

    const getFileNameXlsx = () => {
    return DateTime.local().toISODate() + `_bill_${state.customerName}_${state.projectTitle}.xlsx`; 
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
    return axios.post(`${BASE_URL}/api/invoices/export/pdf`, null, { headers: { authorization: getCookie("basicAuthToken") }, responseType: "blob", params: {customerId: state.customerId, projectId: state.projectId} })
    };

    const downloadXMLBill = () => {
    // throw new Error("uncomment this line to mock failure of API");
    return axios.post(`${BASE_URL}/api/invoices/export/xml`, null, { headers: { authorization: getCookie("basicAuthToken") }, responseType: "blob", params: {customerId: state.customerId, projectId: state.projectId} })
    };

    const downloadXlsxBill = () => {
    // throw new Error("uncomment this line to mock failure of API");
    return axios.post(`${BASE_URL}/api/invoices/export/excel`, null, { headers: { authorization: getCookie("basicAuthToken") }, responseType: "blob", params: {customerId: state.customerId, projectId: state.projectId} })
    };

    const { ref: refPdf, url: urlPdf, download: downloadPdf, name: namePdf } = useDownloadFile({
    apiDefinition: downloadPdfBill,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName: getFileNamePdf,
    });

    const { ref: refXML, url: urlXML, download: downloadXML, name: nameXML } = useDownloadFile({
    apiDefinition: downloadXMLBill,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName: getFileNameXML,
    });

    const { ref: refXlsx, url: urlXlsx, download: downloadXlsx, name: nameXlsx } = useDownloadFile({
    apiDefinition: downloadXlsxBill,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName: getFileNameXlsx,
    });

    function loadAllCustomers(){
        axios.get(`${BASE_URL}/api/customers`,
        { headers: { authorization: getCookie("basicAuthToken") }},
        ).then((response) => setState({...state, allCustomers: response.data}))
        .catch(() => console.log("AAAAAAHHHHHHHHH !!!"))
    }

    function getCustomerNameList(){
        let customerNameList: string[] = [];
        state.allCustomers.map((customer) => customerNameList=[...customerNameList, customer.name]);
        setState({...state, customerNameList: customerNameList});
    }

    function getCustomerIdAndProjectsByName(customerName: string){
        let id: string = state.allCustomers.find(customer => customer.name === customerName)?.id || "";
        let projects: Project[] = state.allCustomers.find(customer => customer.name === customerName)?.projects || [];
        setState({...state, customerId: id, customerProjects: projects})
        }
    
    function getProjectIdByTitle(projectTitle: string){
        let id: string = state.customerProjects.find(project => project.title === projectTitle)?.id || "";
        setState({...state, projectId: id})
    }

    //first get List of all available Customers:
    useEffect(() => {
        loadAllCustomers();
    }, []);

    //then get a List of their names
    useEffect(() => {
        if (state.allCustomers != [])
            getCustomerNameList();
        }  
    , [state.allCustomers]);

    //based on that list, check if input was valid and if so, store all available Projects
    useEffect(() => {
        if(state.customerNameList.includes(state.customerName)){
            getCustomerIdAndProjectsByName(state.customerName)
        }  
    }, [state.customerName]);


    //Once a Project was chosen, update the project Id, so the API request has all Information it needs
        useEffect(() => {
            getProjectIdByTitle(state.projectTitle)
        }, [state.projectTitle]);

    return(
        <>
        <h2>Rechnungserstellung</h2>
        Bitte wähle zuerst den Customer aus und wähle dann von der Liste vorhandener Projekte:
        <br />
        <input type="text" name="customer" list = "Customers" placeholder="Customer Name" value = {state.customerName} onChange={(event) => setState({ ...state, customerName: event.target.value })} />
                <datalist id="Customers">
                    {state.allCustomers.map((customer) => (
                    <option key={customer.name} value={customer.name}></option>  
                    ))}
                    
                </datalist>
        <input type="text" name="project" list = "Projects" placeholder="Project Title" value = {state.projectTitle} onChange={(event) => setState({ ...state, projectTitle: event.target.value })} />
                <datalist id="Projects">
                    {state.customerProjects.map((project) => (
                    <option key={project.title} value={project.title}></option>  
                    ))}
                    
                </datalist>
        <br />
        <a href={urlPdf} download={namePdf} className="hidden" ref={refPdf} />
        <button className="formButtonGreen" onClick={downloadPdf}>as PDF</button>
        <a href={urlXML} download={nameXML} className="hidden" ref={refXML} />
        <button className="formButtonGreen" onClick={downloadXML}>as XML</button>
        <a href={urlXlsx} download={nameXlsx} className="hidden" ref={refXlsx} />
        <button className="formButtonGreen" onClick={downloadXlsx}>as Excel</button>
        <p>{textResponse}</p>
        </>
    )
    }

    export default BillingExportComponent;
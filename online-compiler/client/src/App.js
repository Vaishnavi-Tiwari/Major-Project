import axios from "axios";
import './App.css';
import React, { useState, useEffect } from "react";
import stubs from "./defaultStubs";
import moment from 'moment';

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "cpp";
    setLanguage(defaultLang);
  }, []);

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language);
    console.log(`${language} set as default!`);
  };

  const renderSubmitTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let result = "";
    let { submittedAt, startedAt, completedAt } = jobDetails;
    submittedAt = moment(submittedAt).toString();
    result += `Submitted At: ${submittedAt}  `;
    if (!completedAt || !startedAt ) {
      return result;
    }
    return result;

  };
  const renderExecutionTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let result = "";
    let { submittedAt, startedAt, completedAt } = jobDetails;
    submittedAt = moment(submittedAt).toString();
    const start = moment(startedAt);
    const end = moment(completedAt);
    const executionTime = end.diff(start, "seconds", true);
    result += ` \nExecution Time: ${executionTime}s`;
    return result;

  };

  const handleSubmit = async () =>{
    const payload = {
      language,
      code
    };
    try{
    setJobId("");
    setStatus("");
    setOutput("");
    setJobDetails(null);
    const {data} = await axios.post("http://localhost:5000/run", payload);
    console.log(data);
    setJobId(data.jobId);
    let intervalId;

    intervalId = setInterval(async() => {

      const {data: dataRes} = await axios.get(
        "http://localhost:5000/status", 
        { params: { id : data.jobId } }
      );
      const {success, job, error} = dataRes;
      console.log(dataRes);

      if(success) {
        const {status : jobStatus, output: jobOutput} = job;
        setStatus(jobStatus);
        setJobDetails(job);
        if(jobStatus === "pending") return;
        setOutput(jobOutput);
        clearInterval(intervalId);


      } else {
        setStatus("Error: Please retry!");
        console.error(error);
        clearInterval(intervalId);
        setOutput(error);
      }

      console.log(dataRes);
    }, 1000);

    } catch({response}){
      if(response){
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error connecting to server");
      }
      
    }
  }

  return (
    <div className="App">
      <h1 className="title">Online Code Compiler</h1>
      <div class="row">
        <div class="column left">
          <br />
          <label style={{color: "rgb(10, 108, 199)"}}>Language:</label>
          <select
            value={language}
            onChange={(e) => {
              let response = window.confirm("Are you sure you want to change language? WARNING: Your current code will be lost.");

              if(response){
                setLanguage(e.target.value);
              }
            }}
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
          <div >
            <button class="setd" onClick={setDefaultLanguage}>Set Default</button>
          </div>
        </div>
      
      <div class="column middle">
      <textarea 
        rows="30" 
        cols="70" 
        value={code}
        onChange={(e)=>{
          setCode(e.target.value);
        }}
        ></textarea>
        <br />
        <button class='submitbtn' onClick={handleSubmit}>Submit</button>
      </div>
      
      <div class="column right">
      
      <p>{status}</p>
      <p>{renderSubmitTimeDetails()}</p>
      <p>{ renderExecutionTimeDetails()}</p>
      <p>{`Output: ${output}`}</p>
      </div>
      </div>
    </div>
  );
}

export default App;



/*import axios from "axios";
import './App.css';
import React, { useState, useEffect } from "react";
import stubs from "./defaultStubs";
import moment from 'moment';

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "cpp";
    setLanguage(defaultLang);
  }, []);

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language);
    console.log(`${language} set as default!`);
  };

  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let result = "";
    let { submittedAt, startedAt, completedAt } = jobDetails;
    submittedAt = moment(submittedAt).toString();
    result += `Submitted At: ${submittedAt}  `;
    if (!completedAt || !startedAt ) {
      return result;
    }
    const start = moment(startedAt);
    const end = moment(completedAt);
    const executionTime = end.diff(start, "seconds", true);
    result += ` \nExecution Time: ${executionTime}s`;
    return result;

  };

  const handleSubmit = async () =>{
    const payload = {
      language,
      code
    };
    try{
    setJobId("");
    setStatus("");
    setOutput("");
    setJobDetails(null);
    const {data} = await axios.post("http://localhost:5000/run", payload);
    console.log(data);
    setJobId(data.jobId);
    let intervalId;

    intervalId = setInterval(async() => {

      const {data: dataRes} = await axios.get(
        "http://localhost:5000/status", 
        { params: { id : data.jobId } }
      );
      const {success, job, error} = dataRes;
      console.log(dataRes);

      if(success) {
        const {status : jobStatus, output: jobOutput} = job;
        setStatus(jobStatus);
        setJobDetails(job);
        if(jobStatus === "pending") return;
        setOutput(jobOutput);
        clearInterval(intervalId);


      } else {
        setStatus("Error: Please retry!");
        console.error(error);
        clearInterval(intervalId);
        setOutput(error);
      }

      console.log(dataRes);
    }, 1000);

    } catch({response}){
      if(response){
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error connecting to server");
      }
      
    }
  }

  return (
    <div className="App">
      <h1 className="title">Online Code Compiler</h1>
      <div class="row">
        <div class="column left">
          <br />
          <label style={{color: "rgb(10, 108, 199)"}}>Language:</label>
          <select
            value={language}
            onChange={(e) => {
              let response = window.confirm("Are you sure you want to change language? WARNING: Your current code will be lost.");

              if(response){
                setLanguage(e.target.value);
              }
            }}
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
          <div >
            <button class="setd" onClick={setDefaultLanguage}>Set Default</button>
          </div>
        </div>
      
      <div class="column middle">
      <textarea 
        rows="30" 
        cols="70" 
        value={code}
        onChange={(e)=>{
          setCode(e.target.value);
        }}
        ></textarea>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
      <div class="column right">
      
      <p>{status}</p>
      <p>{renderTimeDetails()}</p>
      <p>{`Output: ${output}`}</p>
      </div>
      </div>
    </div>
  );
}

export default App;

*/
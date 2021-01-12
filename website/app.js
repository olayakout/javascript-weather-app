/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&appid=d54b774ed6be4cdc5ece1a715ca1dd2b&units=metric';




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//post request
const postData = async ( url = '', data = {})=>{
     // console.log("post",data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
     // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
         // console.log("response",newData);
        return newData;
    }catch(error) {
         // console.log("error", error);
    }
}

//get request
const getData = async ( url = '')=>{

    const response = await fetch(url, {
    method: 'GET'    
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
     // console.log("error", error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const userResponse =  document.getElementById('feelings').value;
  const zip =  document.getElementById('zip').value;
  if(zip){
    getData('/getDataProject',)
    // New Syntax!
    .then(function(data){
      // Add data
      getTemp(baseURL,zip, apiKey).then(function(data){

         // console.log("get",data);
        postData('/addDataProject', {temprature: data, userResponse: userResponse, date: newDate} );
        updateUI(data);

        
        
      })

      
    })
  }else{
    alert("please enter zip value");
  }
   
  }
  
  const getTemp = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    try {
  
      const data = await res.json();
       // console.log("temp",data.main.temp)
      return data.main.temp;
    }  catch(error) {
       // console.log("error", error);
      // appropriately handle the error
    }
  }
  const updateUI = async (data) => {
    const request = await fetch('/getDataProject');
    try{
      const allData = await request.json();
       // console.log("updateUI",allData);
      document.getElementById('temp').innerHTML = data;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('content').innerHTML = allData.userResponse;
  
    }catch(error){
       // console.log("error", error);
    }
  }
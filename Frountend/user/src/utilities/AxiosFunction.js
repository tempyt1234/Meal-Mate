import axios from "axios";
async function readData(url){
    try
    {
        const res=await axios.get(url)
        console.log(res.data,"data");
        
        return res.data;
    }catch(err)
    {
        console.log(err);
    }
}
async function storeData(url,dataObject)
{
    try
    {
        console.log("Your data is:"+dataObject.name)
        const res=await axios.post(url+"/users",dataObject,{headers:{"Content-Type":"application/json"}})

    }catch(err)
    {
        throw err;
    }
    
    
}
export{readData,storeData}


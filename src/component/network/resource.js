import Request from "./request";
import URI from "../config/uri"

class Resource {
    async global(){
        const header = {          
          "Content-Type": "application/json",
        }
    
        let res = await Request.get(URI.API_BASE_URL + URI.global);
        
        return new Promise((resolve, reject) => {
          try{
            resolve(res.data)
          } catch (err) {
            reject("An error occurred")
          }
        });
    }
}

export default new Resource();
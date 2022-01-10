const dotenv = require('dotenv');
dotenv.config();
const mp_api_key = process.env.MPARTICLE_GDPR_API_KEY;
const mp_api_secret = process.env.MPARTICLE_GDPR_SECRET_KEY;
const status_callback_urls = process.env.CALLBACK_URL;
const mparticle_url = "https://opendsr.mparticle.com/v2/requests/";
const axios = require('axios');
const csv_file = process.env.CSV_FILE;
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
var data = [];
fs.createReadStream(csv_file)
  .pipe(csv())
  .on('data', function (row) {
    console.log(row);
    data.push(row['mpid']);
  }).on('end', function () {
    console.log('Data loaded');
    var mpids = [];
    var jsonBody;
    console.log(data.length);
    for(var start=0;start<data.length;start++)
    {
        mpids.push(data[start]);
        
        if((start + 1) % 5000 == 0)
        {
            var subject_request_id = uuidv4();
            let date_ob = new Date();
            let date = date_ob.getDate()-1;
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            var submitted_time = year + "-" + month + "-" + date
            var jsonBody = 
                {
                    "regulation": "gdpr",
                    "subject_request_id": subject_request_id,
                    "subject_request_type": "erasure",
                    "submitted_time": submitted_time,
                    "api_version": "2.0",
                    "status_callback_urls":
                    [
                        "<enter_callback_url_here>"
                    ],
                    "extensions":
                    {
                        "opendsr.mparticle.com":
                        {
                            "mpids":mpids
                        }
                    }
                };
            //console.log(JSON.stringify(jsonBody));
            
            /*
            var mParticleAPI = await axios.post(mparticle_url,jsonBody,{auth:{
                username:mp_api_key,
                password:mp_api_secret
              }});
            */
            sendEvent(jsonBody);
            mpids = [];
        }

    }

  })

  async function sendEvent(jsonBody)
  {
    var mParticleAPI = await axios.post(mparticle_url,jsonBody,{auth:{
        username:mp_api_key,
        password:mp_api_secret
      }});
  }
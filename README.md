# mParticleOpenDSRErasureTool
 This tool will allow you to automate the deletion of profiles within mParticle using the OpenDSR APIs

https://docs.mparticle.com/developers/dsr-api/v3/

Objective

This guide will allow you to delete profiles within a customer’s mParticle instance in an automated manner using the OpenDSR APIs

Why is this needed?

After development, your customer might want to ask you to delete the profiles within their environment. Normally, profiles that are in-active or dormant after 30 days will be wiped out of the platform. Sometimes, customers may want to delete the said profiles without waiting the 30 day limit. The tool below will help you achieve this.

Steps:

1.) Replace the .env file with the GDPR API Key and Secret obtained from the workspaces page.

![image](https://user-images.githubusercontent.com/47293714/148714819-eb983712-4c22-4cf0-b5a6-195edd208af8.png)

2.) Download the audience file into your local filepath.

![image](https://user-images.githubusercontent.com/47293714/148714871-dbdd98af-874a-467d-aa74-c35a2d0f69d9.png)

3.) Run the tool via command line or terminal by invoking the comment 

node index.js

![image](https://user-images.githubusercontent.com/47293714/148714913-f1ddf93e-52da-463f-ae95-5d6e81ca86b2.png)

4.) Verify in mParticle.

![image](https://user-images.githubusercontent.com/47293714/148714964-0c86bd67-5cb5-48c8-9f46-97e631d79940.png)

![image](https://user-images.githubusercontent.com/47293714/148714986-0a850902-4273-42d0-847d-103d0792cec7.png)

Notes: Every GDPR Request payload can only contain 5000  worth of records.

Sample GDPR Request Deletion API Payload run in Postman

``` JSON
POST https://opendsr.mparticle.com/v2/requests/
{
    "regulation": "gdpr",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "subject_request_type": "erasure",
    "submitted_time": "2022-01-05",
    "api_version": "2.0",
    "status_callback_urls":
    [
        "https://webhook.site/4b45cae0-2ffc-422c-bbdb-930845839a8d"
    ],
    "extensions":
    {
        "opendsr.mparticle.com":
        {
            "mpids":
            [
                -7201284209016359738,
                8624881018980390275
            ]
        }
    }
}
```

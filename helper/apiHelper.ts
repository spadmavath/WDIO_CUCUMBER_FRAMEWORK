import request from "supertest";
let payload={
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}
//what is request
// console.log(`type of request: ${typeof request}`);//function
// console.log(`request.length: ${request.length}`);// to understand number of arguments for the function(one argument)
async function GET(
  baseURL: string,
  endpoint: string,
  queryparam: string,
  authToken: string,
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `one of the given values baseurl:${baseURL} , endpoint:${endpoint} is invalid`,
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  try {
    return await request(baseURL)
      .get(endpoint)
      .query(queryparam)
      .set("content-type", "application/json")
      .set("Accept ", `application/json`);
  } catch (err) {
    console.error(`Error in GET request: ${err}`);
    throw err;
  }
}
(async function POST(
  baseURL: string,
  endpoint: string,
  authToken: string,
  payload: Object,
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `one of the given values baseurl:${baseURL} , endpoint:${endpoint} is invalid`,
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  try {
    let response= await request(baseURL)
      .post(endpoint)
      .send(payload)
      // .auth(authToken, { type: "bearer" })
      .set("content-type", "application/json")
      // .set("Accept", `application/json`);
      console.log(response.status);
      console.log(`responsebody:${JSON.stringify(response.body)}`);
  } catch (err) {
    console.error(`Error in POST request: ${err}`);
    throw err;
  }
})("https://petstore.swagger.io/v2", "/user", "",payload);

export default {GET}
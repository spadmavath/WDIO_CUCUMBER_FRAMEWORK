import {config as baseConfig} from "../wdio.conf"
export const config = Object.assign(baseConfig,{

    environment: "TEST",
    baseURL:"https://petstore.swagger.io/v2"

})
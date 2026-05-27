class ApiHelper {

  // Generic GET Method
  async GET(
    baseUrl: string,
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<any> {

    const response = await fetch(
      `${baseUrl}${endpoint}`,
      {
        method: "GET",
        headers: headers
      }
    );

    const body = await response.json();

    return {
      status: response.status,
      body: body
    };
  }

  // Generic POST Method
  async POST(
    baseUrl: string,
    endpoint: string,
    headers: Record<string, string> = {},
    payload: object = {}
  ): Promise<any> {

    const response = await fetch(
      `${baseUrl}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(payload)
      }
    );

    const body = await response.json();

    return {
      status: response.status,
      body: body
    };
  }

  // Generic DELETE Method
  async DELETE(
    baseUrl: string,
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<any> {

    const response = await fetch(
      `${baseUrl}${endpoint}`,
      {
        method: "DELETE",
        headers: headers
      }
    );

    return {
      status: response.status
    };
  }
}

export default new ApiHelper();
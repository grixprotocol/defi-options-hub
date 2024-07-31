export interface InfrastructuresResponse {
    statusCode: number;
    body: {
      reqId: string;
      status: string;
      message: string;
      data: {
        availableInfrastructures: string[];
      };
    };
  }
  
  export async function fetchInfrastructures(apiKey: string): Promise<InfrastructuresResponse> {
    const url = 'https://external-api-dev.grix.finance/v1/infrastructures';
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    const data: InfrastructuresResponse = await response.json();
    return data;
  }
  
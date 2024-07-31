export interface ExpiriesResponse {
    statusCode: number;
    body: {
      reqId: string;
      status: string;
      message: string;
      data: {
        availableExpiries: string[];
      };
    };
  }
  
  export async function fetchExpiries(apiKey: string): Promise<ExpiriesResponse> {
    const url = 'https://external-api-dev.grix.finance/v1/expiries';
  
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
  
    const data: ExpiriesResponse = await response.json();
    return data;
  }
  
export type GrixFeeResponse = {
    usdFee: number;
    payWithTokenFee: number;
  };
  
  export async function fetchGrixFee(apiKey: string): Promise<GrixFeeResponse> {
    const url = 'https://external-api-dev.grix.finance/v1/grixfee';
  
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
  
    const data: GrixFeeResponse = await response.json();
    return data;
  }
  
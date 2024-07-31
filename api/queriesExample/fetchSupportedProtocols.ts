interface Response {
    statusCode: number;
    body: Body;
  }
  
  interface Body {
    reqId: string;
    status: string;
    message: string;
    data: Data;
  }
  
  interface Data {
    supportedProtocols: SupportedProtocols;
  }
  
  interface SupportedProtocols {
    supportedProtocols: string[];
    arbitrum: ProtocolDetails;
    zksync: ProtocolDetails;
  }
  
  interface ProtocolDetails {
    [protocol: string]: {
      underlyingAssets: string[];
    };
  }
  
  
  export async function fetchSupportedProtocols(apiKey: string): Promise<Response> {
    const url = 'https://external-api-dev.grix.finance/v1/supportedProtocols';
  
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
  
    const data: Response = await response.json();
    return data;
  }
  
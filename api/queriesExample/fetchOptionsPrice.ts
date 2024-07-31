export interface OptionsResponse {
    statusCode: number;
    body: {
      reqId: string;
      status: string;
      message: string;
      data: {
        availableExpiries: string[];
        supportedProtocols: string[];
        optionsListResponse: {
          [asset: string]: {
            [expiry: string]: {
              [optionType: string]: {
                [strikePrice: string]: {
                  strikePrice: string;
                  protocols: {
                    [protocol: string]: {
                      usdPrice: number;
                      contractsAmount: number;
                      positionType: string;
                    }[];
                  };
                };
              };
            };
          };
        };
      };
    };
  }
  
  export async function fetchOptionsPrice(
    expiries: number[],
    asset: string,
    optionType: string,
    protocols: string[],
    apiKey: string
  ): Promise<OptionsResponse> {
    const url = new URL('https://external-api-dev.grix.finance/v1/optionsprice');
    url.searchParams.append('expiries', expiries.join(','));
    url.searchParams.append('asset', asset);
    url.searchParams.append('optionType', optionType);
    if (protocols.length > 0) {
      url.searchParams.append('protocols', protocols.join(','));
    }
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    const data: OptionsResponse = await response.json();
    return data;
  }
  
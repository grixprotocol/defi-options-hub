# Grix API Integration Guide

Welcome to the Grix API Integration Hub, your gateway to advanced DeFi options trading capabilities. This guide will help you understand how to interact with our API endpoints effectively.

## Recommended Flow

1. **Fetch Available Expiries**: Start by querying the expiries endpoint to get all available expiries.
2. **Fetch Supported Protocols**: Use the supportedProtocols endpoint to retrieve the list of protocols.
3. **Fetch Options Price**: Use the optionsprice endpoint with the required filters to get the options price details.

## Endpoint: /expiries

### Description

This endpoint returns all available expiries in the market.

### HTTP Request

GET /v1/expiries

### Example Request
```bash
curl -X GET "https://external-api-dev.grix.finance/v1/expiries" -H "accept: application/json" -H "x-api-key: <YOUR_API_KEY>"
```

### Example Response
```json
{
  "statusCode": 200,
  "body": {
    "reqId": "example-req-id",
    "status": "success",
    "message": "Data fetched successfully",
    "data": {
      "availableExpiries": ["1729843200", "1729933200"]
    }
  }
}
```

## Endpoint: /supportedProtocols

### Description

This endpoint returns a list of supported protocols and the underlying assets available for each protocol.


### HTTP Request

GET /v1/supportedProtocols

### Example Request
```bash
curl -X GET "https://external-api-dev.grix.finance/v1/supportedProtocols" -H "accept: application/json" -H "x-api-key: <YOUR_API_KEY>"
```

### Example Response
```json
{
  "statusCode": 200,
  "body": {
    "reqId": "184031ff-7e6f-410e-b906-d47e9da2639f",
    "status": "success",
    "message": "Data fetched successfully",
    "data": {
      "supportedProtocols": {
        "supportedProtocols": [
          "rysk",
          "lyra",
          "aevo",
          "premia",
          "moby",
          "ithaca",
          "zomma"
        ],
        "arbitrum": {
          "aevo": {
            "underlyingAssets": [
              "BTC",
              "ETH"
            ]
          },
          "premia": {
            "underlyingAssets": [
              "BTC",
              "ETH"
            ]
          },
          "moby": {
            "underlyingAssets": [
              "BTC",
              "ETH"
            ]
          },
          "ithaca": {
            "underlyingAssets": [
              "ETH"
            ]
          }
        },
        "zksync": {
          "zomma": {
            "underlyingAssets": [
              "BTC",
              "ETH"
            ]
          }
        }
      }
    }
  }
}
```

## Endpoint: /optionsprice

### Description

This endpoint returns the available options price details. 

### HTTP Request

GET /v1/optionsprice

### Query Parameters

- `expiries` (array of integers, required): Filter by array of expiry dates (UNIX timestamps).
- `asset` (string, required): Filter by asset name (eth or btc).
- `optionType` (string, required): Filter by option type (call or put).
- `protocols` (array of integers, optional): Filter by specific protocol (Premia, Aevo, Moby, etc...)

### Example Request
```bash
curl -X GET "https://external-api-dev.grix.finance/v1/optionsprice?expiries=1729843200&asset=eth&optionType=call&protocols=premia&protocols=aevo'" -H "accept: application/json" -H "x-api-key: <YOUR_API_KEY>"
```

### Example Response

```json
{
  "statusCode": 200,
  "body": {
    "reqId": "example-req-id",
    "status": "success",
    "message": "Data fetched successfully",
    "data": {
      "availableExpiries": ["1729843200", "1729933200"],
      "supportedProtocols": ["premia", "aevo"],
      "optionsListResponse": {
        "eth": {
          "1729843200": {
            "call": {
              "3500": {
                "strikePrice": "3500",
                "protocols": {
                  "premia": [
                    {
                      "usdPrice": 200.5,
                      "contractsAmount": 1,
                      "positionType": "long"
                    }
                  ],
                  "aevo": [
                    {
                      "usdPrice": 199.9,
                      "contractsAmount": 1,
                      "positionType": "short"
                    }
                  ]
                }
              }
            }
          }
        },
      }
    }
  }
}
```
## Endpoint: /infrastructures

### Description

This endpoint returns a list of available infrastructures.

### HTTP Request

GET /v1/infrastructures

### Example Request
```bash
curl -X GET "https://external-api-dev.grix.finance/v1/infrastructures" -H "accept: application/json" -H "x-api-key: <YOUR_API_KEY>"
```

### Example Response

```json
{
  "statusCode": 200,
  "body": {
    "reqId": "25fd0beb-4e96-43a5-9325-3bb0673b73dc",
    "status": "success",
    "message": "Data fetched successfully",
    "data": {
      "availableInfrastructures": [
        "arbitrum",
        "zksync"
      ]
    }
  }
}
```
## Disclaimer

This is the first phase of our API, and it should be used at your own risk. We're continuously working to improve and expand the features based on your feedback and needs.

## Future Plans

- **Transactions Execution**: Ability to execute transactions through the API.
- **DeFi Options Portfolio**: Fetching users' portfolios and holdings.
- **Arbitrage Opportunities**: Identifying unique arbitrage opportunities.

Stay tuned for more updates!

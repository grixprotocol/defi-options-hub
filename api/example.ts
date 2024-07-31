import { fetchExpiries } from "./queriesExample/fetchExpiries";
import { fetchInfrastructures } from "./queriesExample/fetchInfrastructures";
import { fetchOptionsPrice } from "./queriesExample/fetchOptionsPrice";
import { fetchSupportedProtocols } from "./queriesExample/fetchSupportedProtocols";

const apiKey = 'your-api-key';

// Fetch Expiries
fetchExpiries(apiKey)
  .then(data => console.log('Expiries Data:', data))
  .catch(error => console.error('Error fetching expiries:', error));

// Fetch Supported Protocols
fetchSupportedProtocols(apiKey)
  .then(data => console.log('Supported Protocols Data:', data))
  .catch(error => console.error('Error fetching supported protocols:', error));

// Fetch Options Price
const expiries = [1729843200, 1729933200];
const asset = 'eth';
const optionType = 'call';
const protocols = ['premia', 'aevo'];

fetchOptionsPrice(expiries, asset, optionType, protocols, apiKey)
  .then(data => console.log('Options Price Data:', data))
  .catch(error => console.error('Error fetching options price:', error));

// Fetch Infrastructures
fetchInfrastructures(apiKey)
  .then(data => console.log('Infrastructures Data:', data))
  .catch(error => console.error('Error fetching infrastructures:', error));

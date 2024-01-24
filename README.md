# Digital Identifers on the Internet Computer

## Overview

This project demonstrates how to resolve digital identifiers on the Internet Computer (ICP). 

**[Paystrings by The Registry]**(https://theregistry.app/) and **[IC Naming](https://www.icnaming.com/)** are two digital identity products on the Internet Computer, similar to **[Ethereum Name Service]**(https://ens.domains/) and **[Unstoppable Domains]**(https://unstoppabledomains.com/).

### Paystrings

**[Paystrings by The Registry]**(https://theregistry.app/) is a solution for secure and streamlined digital identity management. 

Individuals can create a unique identifier that links to their ICP principal or wallet address and/or their fiat account balances. This differs from other naming services such as ENS, which only allows linking a human-readable name to a cryptocurrency wallet address.

Paystrings are formatted as [name]$[domain]. For example, allidoizcode$upayed.me. 

#### How to integrate

You can reference the [index.tsx](src/index.tsx) for the entire code. 

#### Step 1: Download the npm package @the-registry/tir

Using npm: 
```
npm i @the-registry/tir
```

Using yarn:
```
yarn add @the-registry/tir
```

Using npx:
```
npx i @the-registry/tir
```

#### Step 2: Call the getPayStringAsync function

The ```getPayStringAsync``` function requires:

- Prefix - the name which starts before $ of a given paystring
- Domain - the name which starts after $ of a given paystring
- options - which includes a JSON of the chain id and environment.

```
async function getPayStringAsync(
  prefix: string,
  domain: string,
  options?: Options,
): Promise<PaymentInformation | undefined>;
```
An example of resolving paystring allidoizcode$upayed.me which was deployed on ICP on mainnet

```
const fetchData = async () => {
    try {
      const prefix = 'allidoizcode'; // Replace with name (which starts before $ in a paystring)
      const domain = 'upayed.me'; // Replace with domain (which starts after $ in a paystring)
      const options = {
        chain: 'icp', // Replace with the actual chain
        environment: 'mainnet', // Replace with the actual environment
      };
      const result = await getPayStringAsync(prefix, domain, options);
      setPaymentInfo(result || undefined);
    } catch (error) {
      console.error('Error fetching payment information:', error);
    }
  };
  fetchData();
}, []);
```





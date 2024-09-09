import { signMessage } from "@wagmi/core";
import { getSignatureExpired } from "./getSignatureExpiry";

export const handleSignMessage = async (
    amount: number,
    price: number,
    userAddress: string,
    asset: string,
    expirationDate: number,
    strikePrice: string,
    optionType: string
) => {
    const signatureExpired = getSignatureExpired();
    const message = `
      I, the user with address ${userAddress}, sign the following option contract:
      - Asset: ${asset}
      - Option Type: ${optionType}
      - Strike Price: ${strikePrice}
      - Amount: ${amount}
      - Price: ${price}
      - Expiration Date: ${expirationDate}
      This signature expires on: ${signatureExpired}
      By signing you are acknowledging that you are not from a restricted country (detailed in Grix terms) and that you have read, understood, and agree to comply with and be bound by the Grix Finance Terms of Use and Disclaimers located here: https://www.grix.finance/legal/terms-of-use   
    `;

    const resultSign = await signMessage({
        message: message.trim(),
    });
    return { userSignature: resultSign, signedMessage: message };
};

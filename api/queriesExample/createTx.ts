import { fetchGrixFee } from "../helpers/getGrixFee";
import { grantAllowance } from "../helpers/grantAllowance";
import { handleSignMessage } from "../helpers/signingMessage";
import { fetchOptionsPrice } from "./fetchOptionsPrice";

const createTx = async () => {
    const myAddress = "0x49618959038599a7417d48c41838C694AfaC00c6";
    const optionParams = {
        expiries: [1714329600],
        asset: "ETH",
        optionType: "CALL",
        protocols: ["Premia"],
        apiKey: "your_api_key_here",
        strikePrice: "2500",
        amountOfContracts: 1,
    };

    const optionsPriceInfo = await fetchOptionsPrice(
        optionParams.expiries,
        optionParams.asset,
        optionParams.optionType,
        optionParams.protocols,
        optionParams.apiKey
    );

    const optionPrice = optionsPriceInfo.body.data.optionsListResponse[optionParams.asset][optionParams.expiries[0]][optionParams.optionType][optionParams.strikePrice].protocols[optionParams.protocols[0]][0].usdPrice;

    const grixFee = await fetchGrixFee(optionParams.apiKey);

    const amountToApprove = optionPrice + grixFee.usdFee;

    const allowance = await grantAllowance(amountToApprove);

    const  { userSignature, signedMessage } = await handleSignMessage(optionParams.amountOfContracts, optionPrice, myAddress, optionParams.asset, optionParams.expiries[0], optionParams.strikePrice, optionParams.optionType);



};
createTx();
import Client from 'bitcoin-core';
import ApiHelper from './api-helper';

const btcClientOptions = {
  host: process.env.KUKY_COIN_HOST,
  port: process.env.KUKY_COIN_PORT,
  username: process.env.KUKY_COIN_USERNAME,
  password: process.env.KUKY_COIN_PASSWORD
}

const btcClient = new Client(btcClientOptions);


const getAdmin = async () => {
  return process.env.KUKY_COIN_ADMIN;
}

const getWallets = async () => {
  return await btcClient.command('listwallets')
    .then((res) => { return res })
    .catch((err) => { return null });
};

const createWallet = async (wallet_name: String) => {
  return await btcClient.command('createwallet', wallet_name)
    .then((res) => { return res })
    .catch((err) => { return null });
}

const refreshWallet = async (walletCode: String) => {

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  let result = await wallet.command('loadwallet', walletCode)
    .then((res) => { return 1 })
    .catch((err) => { let errorCode = err['code'] || 0; return errorCode });

  switch (result) {
    case -4:
      break;
    case -18:
    case -19:
      await createWallet(walletCode);
      break;
    default:
      break;
  }
}

const getWalletInfo = async (walletCode: string) => {

  await refreshWallet(walletCode);

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('getwalletinfo')
    .then((res) => { return res })
    .catch((err) => { return null });
}

const getBalance = async (walletCode: String) => {

  await refreshWallet(walletCode);

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('getbalance')
    .then((res) => { return res })
    .catch((err) => { return null });
};

const getWalletAddress = async (walletCode: String) => {

  await refreshWallet(walletCode);

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('getnewaddress')
    .then((res) => { return res })
    .catch((err) => { return null });

}

const getAddressesByLabel = async (walletCode: String, label: String) => {

  await refreshWallet(walletCode);

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('getaddressesbylabel', label)
    .then((res) => { return res })
    .catch((err) => { return null });
}

const getTransactions = async (walletCode: String, count = 10, skip = 0, watchOnly = false) => {

  await refreshWallet(walletCode);

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('listtransactions', '*', count, skip)
    .then((res) => { return res })
    .catch((err) => { return null });
};

const getTransaction = async (walletCode: String, txid: String, watchOnly = false) => {

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('gettransaction', txid)
    .then((res) => { return res })
    .catch((err) => { return null });
};

const sendMoney = async (walletCode: String, amounts, minconf = 1, comment = '', subtractfeefrom = []) => {

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('sendmany', '', amounts, minconf, comment)
    .then((res) => { return res })
    .catch((err) => { return null });
};

const sendToAddress = async (walletCode: String, address: String, amount, comment = '', comment_to = '', subtractfeefromamount = false, replaceable?: Boolean, conf_target?: Number, estimate_mode?: String) => {

  const wallet = new Client({ ...btcClientOptions, wallet: walletCode });

  return await wallet.command('sendtoaddress', address, amount, comment, comment_to)
    .then((res) => { return res })
    .catch((err) => { return null });
};

const currentRates = async () => {
  let $link = 'https://api.coinbase.com/v2/exchange-rates?currency=LTC';
  let $json_data = await ApiHelper.apiGet($link, {});
  let $rates = $json_data['data']['rates'];
  return $rates;
};


export default {
  getAdmin,
  getWallets,
  getWalletInfo,
  getBalance,
  getWalletAddress,
  getAddressesByLabel,
  getTransactions,
  getTransaction,
  sendMoney,
  sendToAddress,
  currentRates
}
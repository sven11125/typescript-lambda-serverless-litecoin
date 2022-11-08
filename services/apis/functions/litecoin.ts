import { APIGatewayEvent, Handler } from 'aws-lambda';
import { authWrapper } from '@lib/authWrapper';
import { failure, success } from '@lib/response-lib';
import btcHelper from '@lib/helpers/btc-helper';


export const getAdmin: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const adminWallet = await btcHelper.getAdmin();
    return await success({ message: 'success', data: adminWallet });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getWallets: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const wallets = await btcHelper.getWallets();
    return await success({ message: 'success', data: wallets });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getWalletInfo: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const walletCode = JSON.parse(event.body).walletCode;
    const wallet = await btcHelper.getWalletInfo(walletCode);
    return await success({ message: 'success', data: wallet });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getBalance: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const walletCode = JSON.parse(event.body).walletCode;
    const balance = await btcHelper.getBalance(walletCode);
    return await success({ message: 'success', data: balance });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getWalletAddress: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const walletCode = JSON.parse(event.body).walletCode;
    const walletAddress = await btcHelper.getWalletAddress(walletCode);
    return await success({ message: 'success', data: walletAddress });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getAddressesByLabel: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const requestBody = JSON.parse(event.body);
    const addressesByLabel = await btcHelper.getAddressesByLabel(requestBody.walletCode, requestBody.label);
    return await success({ message: 'success', data: addressesByLabel });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getTransactions: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const requestBody = JSON.parse(event.body);
    const transactions = await btcHelper.getTransactions(requestBody.walletCode, requestBody.count, requestBody.skip);
    return await success({ message: 'success', data: transactions });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const getTransaction: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const requestBody = JSON.parse(event.body);
    const balance = await btcHelper.getTransaction(requestBody.walletCode, requestBody.txid);
    return await success({ message: 'success', data: balance });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const sendMoney: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const requestBody = JSON.parse(event.body);
    const transaction = await btcHelper.sendMoney(requestBody.walletCode, requestBody.amounts, requestBody.minconf, requestBody.comment);
    return await success({ message: 'success', data: transaction });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const sendToAddress: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const requestBody = JSON.parse(event.body);
    const transaction = await btcHelper.sendToAddress(requestBody.walletCode, requestBody.address, requestBody.amount, requestBody.comment, requestBody.comment_to);
    return await success({ message: 'success', data: transaction });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);

export const currentRates: Handler = authWrapper('Admin', async (event: APIGatewayEvent) => {
  try {
    const rates = await btcHelper.currentRates();
    return await success({ message: 'success', data: rates });
  } catch (e) {
    return await failure({ message: e.message });
  }
}, true);
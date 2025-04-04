import { expect } from '@playwright/test';
import { LandingPage } from '../src/pages/LandingPage';
import { test } from '../test-options';
import { Customer } from '../src/data-models/customer';
import { CustomerDashboardPage } from '../src/pages/CustomerDashboardPage';

test.describe('Customer Transactions Functionality', () => {
    let customerDashboardPage: CustomerDashboardPage
    let customer: Customer

    test.beforeEach(async ({ page, testDataDir }) => {
        const testData = require(`${testDataDir}/login-test.json`)        
        customer = testData.customer

        const landingPage = new LandingPage(page)
        await landingPage.navigate()        
        const customerLogingPage = await landingPage.gotoCustomerLogin()        
        customerDashboardPage = await customerLogingPage.loginAsCustomer(customer)      
        await customerDashboardPage.waitForLoadingComplete();   
    });

    test('[3] Customer can deposit funds successfully', async ({ page }) => {
        const balance = await customerDashboardPage.getBalance();
        await customerDashboardPage.depositFund("1")
        expect(await customerDashboardPage.getMessage()).toBe("Deposit Successful")
        expect(await customerDashboardPage.getBalance()).toBe(balance+1);
    });

    test('[4] Deposit is not successful when no amount is inputted', async ({ page }) => {
        const balance = await customerDashboardPage.getBalance();
        await customerDashboardPage.depositMainBtn.click();
        await customerDashboardPage.depositBtn.click();
        expect(await customerDashboardPage.getMessage()).toBe("");
        expect(await customerDashboardPage.getBalance()).toBe(balance);
    });

    test('[5] Customer can withdraw funds successfully', async ({ page }) => {
        const balance = await customerDashboardPage.getBalance();
        await customerDashboardPage.withdrawFund("1")
        expect(await customerDashboardPage.getMessage()).toBe("Transaction successful")
        expect(await customerDashboardPage.getBalance()).toBe(balance-1);
    });

    test('[6] Customer cannot withdraw fund amount greater than balance', async ({ page }) => {
        const balance = await customerDashboardPage.getBalance();
        const deposit = (balance + 1)
        await customerDashboardPage.withdrawFund(deposit.toString())
        expect(await customerDashboardPage.getMessage()).toBe("Transaction Failed. You can not withdraw amount more than the balance.")
        expect(await customerDashboardPage.getBalance()).toBe(balance);
    });

    test('[7] Withdraw is not successful when no amount is inputted', async ({ page }) => {
        const balance = await customerDashboardPage.getBalance();
        await customerDashboardPage.withdrawMainBtn.click();
        await customerDashboardPage.withdrawBtn.click();
        expect(await customerDashboardPage.getMessage()).toBe("");
        expect(await customerDashboardPage.getBalance()).toBe(balance);
    });

});
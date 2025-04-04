import { expect } from '@playwright/test';
import { LandingPage } from '../src/pages/LandingPage';
import { test } from '../test-options';
import { User } from '../src/data-models/user';
import { CustomerLoginPage } from '../src/pages/CustomerLoginPage';

test.describe('Customer Login Functionality', () => {
    let landingPage: LandingPage
    let customerLogingPage: CustomerLoginPage
    let user: User

    test.beforeEach(async ({ page, testDataDir }) => {
        const testData = require(`${testDataDir}/login.json`)
        landingPage = new LandingPage(page)
        landingPage.navigate()        
        user = testData.customer
        customerLogingPage = await landingPage.gotoCustomerLogin()
    });

    test('[1] Customer can successfully login', async ({ page }) => {
        const customerDashboardPage = await customerLogingPage.loginAsCustomer(user)      
        await customerDashboardPage.waitForLoadingComplete();   
        expect(page.url().includes("account")).toBe(true);
    });

    test('[2] Customer can successfully logout', async ({ page }) => {
        const customerDashboardPage = await customerLogingPage.loginAsCustomer(user) 
        customerLogingPage = await customerDashboardPage.header.clickLogout()
        expect(page.url().includes("customer")).toBe(true);
    });
});
import { expect } from '@playwright/test';
import { LandingPage } from '../src/pages/LandingPage';
import { test } from '../test-options';
import { User } from '../src/data-models/user';

test.describe('Login Functionality', () => {
    let landingPage: LandingPage
    let testData: any

    test.beforeEach(async ({ page, testDataDir }) => {
        testData = require(`${testDataDir}/login.json`)
        landingPage = new LandingPage(page)
        landingPage.navigate()
    });

    test('[1] Customer can successfully login', async ({ page }) => {
        const user = testData.customer as User
        const customerLogingPage = await landingPage.gotoCustomerLogin()
        const customerDashboardPage = await customerLogingPage.loginAsCustomer(user)         
        expect(await customerDashboardPage.hasUrl("account"))

        await customerDashboardPage.header.clickLogout()
    });
});
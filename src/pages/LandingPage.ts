import { expect, Locator, Page } from '@playwright/test'
import { CustomerLoginPage } from './CustomerLoginPage';
import { BankManagerPage } from './BankManagerPage';

export class LandingPage {
    readonly page: Page
    readonly custLoginBtn: Locator
    readonly bankMngrLoginBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.custLoginBtn = page.locator("//button[. = 'Customer Login']")
        this.bankMngrLoginBtn = page.locator("//button[. = 'Bank Manager Login']")
    }

    async navigate() {
        await this.page.goto('/angularJs-protractor/BankingProject', { timeout: 20 * 1000 }); // 20 seconds timeout for navigation
    }

    async gotoCustomerLogin(): Promise<CustomerLoginPage>
    {
        await this.custLoginBtn.click()
        return new CustomerLoginPage(this.page)
    }

    async gotoBankManagerLogin(): Promise<BankManagerPage>
    {
        await this.bankMngrLoginBtn.click()
        return new BankManagerPage(this.page);
    }
}
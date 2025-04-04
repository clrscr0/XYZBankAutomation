import { expect, Locator, Page } from '@playwright/test'
import { CustomerDashboardPage } from './CustomerDashboardPage';
import { User } from '../data-models/user';

export class CustomerLoginPage
{
    readonly page: Page;
    loginBtn!: Locator;
    readonly nameDp: Locator;

    constructor(page: Page) {
        this.page = page
        this.nameDp = page.locator("#userSelect")
        this.loginBtn = page.locator("//button[. = 'Login']")
    }

    async loginAsCustomer(user : User): Promise<CustomerDashboardPage>
        {
            await this.nameDp.selectOption(user.name)
            await this.loginBtn.click();

            return new CustomerDashboardPage(this.page);
        }
}
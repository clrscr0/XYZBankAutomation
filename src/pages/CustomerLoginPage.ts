import { expect, Locator, Page } from '@playwright/test'
import { CustomerDashboardPage } from './CustomerDashboardPage';
import { Customer } from '../data-models/customer';

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

    async loginAsCustomer(customer : Customer): Promise<CustomerDashboardPage>
        {
            await this.nameDp.selectOption(customer.firstName + " " + customer.lastName)
            await this.loginBtn.click();

            return new CustomerDashboardPage(this.page);
        }
}
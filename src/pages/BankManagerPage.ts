import { expect, Locator, Page } from '@playwright/test'
import { Customer } from '../data-models/customer'

export class BankManagerPage
{
    readonly page: Page
    readonly addCustomerMainBtn: Locator
    readonly openAccountMainBtn: Locator
    readonly customersMainBtn: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postCodeInput: Locator
    readonly addCustomerBtn: Locator
    readonly customerDp: Locator
    readonly currencyDp: Locator    
    readonly processBtn: Locator
    readonly searchInput: Locator

    constructor(page: Page)
    {
        this.page = page
        this.addCustomerMainBtn = page.locator('button', { hasText: /^Add Customer/ })
        this.openAccountMainBtn = page.locator('button', { hasText: /^Open Account/ })
        this.customersMainBtn = page.locator('button', { hasText: /^Customers/ })
        this.firstNameInput = page.locator('//input[@placeholder="First Name"]')
        this.lastNameInput = page.locator('//input[@placeholder="Last Name"]')
        this.postCodeInput = page.locator('//input[@placeholder="Post Code"]')
        this.addCustomerBtn = page.locator('//button[.="Add Customer"]')
        this.customerDp = page.locator('#userSelect')
        this.currencyDp = page.locator('#currency')
        this.processBtn = page.locator('//button[.="Process"]')
        this.searchInput = page.locator('//input[@placeholder="Search Customer"]')
    }

    async addCustomer(customer : Customer)
    {
        await this.addCustomerMainBtn.click()
        await this.firstNameInput.fill(customer.firstName)
        await this.lastNameInput.fill(customer.lastName)
        await this.postCodeInput.fill(customer.postCode)

        await this.addCustomerBtn.click({ timeout: 2000});
    }

    async openCustomerAccount(customer: Customer, currency: string)
    {
        await this.openAccountMainBtn.click()
        await this.customerDp.selectOption(customer.firstName + " " + customer.lastName)
        await this.currencyDp.selectOption(currency)
        await this.processBtn.click({timeout: 2000})
    }

    async searchCustomer(searchTerm: string)
    {
        await this.customersMainBtn.click()
        await this.searchInput.fill(searchTerm)
    }

    async getCustomerResults(): Promise<Customer[]>
    {
        const customers: Customer[] = [];
        const rows: Locator = this.page.locator('//tbody/tr');

        for (const row of await rows.all()) {
            const firstName = await row.locator('td:nth-child(1)').innerText();
            const lastName = await row.locator('td:nth-child(2)').innerText();
            const postCode = await row.locator('td:nth-child(3)').innerText();

            customers.push({
                firstName,
                lastName,
                postCode
            });
        }

        return customers
    }
}
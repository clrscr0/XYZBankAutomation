import { expect, Locator, Page } from '@playwright/test'

export class BankManagerPage
{
    readonly page: Page
    readonly addCustomerBtn: Locator
    readonly openAccountBtn: Locator
    readonly customersBtn: Locator

    constructor(page: Page)
    {
        this.page = page
        this.addCustomerBtn = page.locator('')
        this.openAccountBtn = page.locator('')
        this.customersBtn = page.locator('')
    }

    async gotoAddCustomer()
    {

    }

    async gotoOpenCustomerAccount()
    {
        
    }

    async gotoCustoemrsBtn()
    {
        
    }
}
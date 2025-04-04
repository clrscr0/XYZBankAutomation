import { Page, Locator } from "@playwright/test";
import { HeaderNavigation } from "./component/HeaderNavigation";

export class CustomerDashboardPage
{
    readonly page : Page
    readonly header : HeaderNavigation
    readonly depositMainBtn : Locator
    readonly withdrawMainBtn : Locator
    readonly amountInput : Locator
    readonly depositBtn : Locator
    readonly withdrawBtn : Locator
    readonly balance : Locator

    constructor(page : Page)
    {
        this.page = page
        this.header = new HeaderNavigation(page)     
        this.depositMainBtn = page.locator('button', { hasText: /^Deposit/ })
        this.withdrawMainBtn = page.locator('button', { hasText: /^Withdraw/ })
        this.amountInput = page.locator('//input[@placeholder= "amount"]')        
        this.depositBtn = page.locator('//button[. = "Deposit"]')
        this.withdrawBtn = page.locator('//button[. = "Withdraw"]')
        this.balance = page.locator('//div[starts-with(., "Account Number")]/strong[2]')
    }

    async waitForLoadingComplete()
    {        
        await this.page.waitForSelector("//button[. = 'Logout']")
    }

    async getMessage() : Promise<string>
    {        
        return await this.page.locator('//span[@ng-show="message"]').innerText();
    }

    async getBalance() : Promise<number>
    {      
        return parseInt(await this.balance.innerText());
    }

    async depositFund(amount : string)
    {
        await this.depositMainBtn.click()
        await this.amountInput.fill(amount)
        await this.depositBtn.click({ timeout: 2000 })
    }

    async withdrawFund(amount : string)
    {
        await this.withdrawMainBtn.click()
        await this.amountInput.fill(amount)
        await this.withdrawBtn.click({ timeout: 2000 })
    }
}
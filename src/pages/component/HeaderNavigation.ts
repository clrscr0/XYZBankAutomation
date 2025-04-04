import { Locator, Page } from "@playwright/test";
import { CustomerLoginPage } from "../CustomerLoginPage";

export class HeaderNavigation
{
    readonly page : Page
    readonly logout : Locator

    constructor(page : Page)
    {
        this.page = page
        this.logout = page.locator("//button[. = 'Logout']")
    }

    async clickLogout() : Promise<CustomerLoginPage>
    {
        await this.logout.click();

        return new CustomerLoginPage(this.page);
    }
}
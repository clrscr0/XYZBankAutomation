import { Page } from "@playwright/test";
import { HeaderNavigation } from "./component/HeaderNavigation";

export class CustomerDashboardPage
{
    readonly page : Page
    readonly header : HeaderNavigation

    constructor(page : Page)
    {
        this.page = page
        this.header = new HeaderNavigation(page)        
    }

    async hasUrl(url : string): Promise<boolean>
    {
        return this.page.url().includes(url)
    }
}
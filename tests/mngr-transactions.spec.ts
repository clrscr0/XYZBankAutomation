import { expect } from '@playwright/test';
import { LandingPage } from '../src/pages/LandingPage';
import { test } from '../test-options';
import { BankManagerPage } from '../src/pages/BankManagerPage';
import { Customer } from '../src/data-models/customer';

test.describe('Manager Transactions Functionality', () => {
    let bankManagerPage: BankManagerPage
    let testData : any

    test.beforeEach(async ({ page, testDataDir }) => {
        testData = require(`${testDataDir}/manager-test.json`) 

        const landingPage = new LandingPage(page)
        await landingPage.navigate()        
        bankManagerPage = await landingPage.gotoBankManagerLogin()
    })

    test('[8] Manager can add a customer successfully', async ({ page }) => {             
        const customer = testData.customerToAdd as Customer
        await bankManagerPage.addCustomer(customer)
        page.on('dialog', dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toContain('Customer added successfully with customer id');
            dialog.accept();
          });
    });

    test('[9] Manager can open a customer account', async ({ page }) => {
        const customer = testData.openAccountCustomer.customer as Customer
        const currency = testData.openAccountCustomer.currency as string
        await bankManagerPage.openCustomerAccount(customer, currency)
        page.on('dialog', dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toContain('Account created successfully with account Number');
            dialog.accept();
          });
    });

    test('[10] Manager can search for a customer by partial account number', async ({ page }) => {
        const expectedCustomer = testData.searchAccount.customer as Customer
        const accountNumber = testData.searchAccount.partialAccount as string
        await bankManagerPage.searchCustomer(accountNumber)
        const searchResults = await bankManagerPage.getCustomerResults()
        expect(searchResults.length).toBeGreaterThan(0)
        expect(searchResults).toEqual(expect.arrayContaining([expectedCustomer]))
    });

    test.fixme('[11] Manager can search for a customer by full account number (THIS IS A BUG AND EXPECTED TO FAIL)', async ({ page }) => {
        const expectedCustomer = testData.searchAccount.customer as Customer
        const accountNumber = testData.searchAccount.fullAccount as string
        await bankManagerPage.searchCustomer(accountNumber)
        const searchResults = await bankManagerPage.getCustomerResults()
        expect(searchResults).toHaveLength(0)
        expect(searchResults).toEqual(expect.arrayContaining([expectedCustomer]))
    });
})
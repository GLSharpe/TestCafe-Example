import HomePage from '../support/homepage-page.js';
import { Selector } from "testcafe";

const homePage = new HomePage();

fixture `Example tests`
    .page(homePage.baseUrl);

    test('3. Checking you can search for return tickets', async t =>{
        await homePage.enterLocations('London Bridge', 'Brighton');
        await t
            .click(homePage.returnRadioButton)
            .click(homePage.tomorrowButton)
            .click(homePage.nextDayButton);
        const validNextDay = await homePage.checkNextDateValid();
        await t
            .expect(validNextDay).eql(true);

    })
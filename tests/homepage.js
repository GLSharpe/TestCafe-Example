import HomePage from '../support/homepage-page.js'

const homePage = new HomePage();

fixture `Tests on the home page of the TrainLine website as a demo of TestCafe`
    .page(homePage.baseUrl)

test('Radio Buttons Check', async t =>{

    homePage.checkAllBoxes();
    await t
        .expect(homePage.openReturnRadioButton.checked).ok();
    })
    
test('Cannot fill in return when Single or Open return is selected', async t => {
    await t
        .click(homePage.returnRadioButton)
        .expect(homePage.returnDateBar.getAttribute('aria-disabled')).eql('false')
        .click(homePage.returnRadioButton)
        .expect(homePage.returnDateBar.length).eql(0)
        .click(homePage.openReturnRadioButton)
        .expect(homePage.returnDateBar.length).eql(0);
})

test('Same test as above', () => {
    homePage.checkReturnBarState(homePage.oneWayRadioButton, 1);
    homePage.checkReturnBarState(homePage.returnRadioButton, 0);
    homePage.checkReturnBarState(homePage.openReturnRadioButton, 0);
})

import { Selector, t} from "testcafe";

export default class HomePage {
    constructor (){
        this.baseUrl = 'https://www.thetrainline.com/';
        this.fromLocation = Selector("[id='from.text'] ");
        this.toLocation = Selector("[id='to.text']");
        this.oneWayRadioButton = Selector('#single');
        this.returnRadioButton = Selector('#return');
        this.openReturnRadioButton = Selector('#openReturn');
        this.returnDateBar = Selector("input[name='page.journeySearchForm.inbound.title']");
        this.suggestedStationFrom = Selector('#stations_from li:nth-child(1)');
        this.suggestedStationTo = Selector('#stations_to li:nth-child(1)');
        this.submitButton = Selector("button[data-test='submit-journey-search-button']");
        this.resultsPriceBar = Selector("div[data-test='train-results-container-OUTWARD']");
        this.nextDayButton = Selector("fieldset[data-test='inbound-datepicker'] button[data-test='datepicker-next-day-button']");
        this.tomorrowButton = Selector("fieldset[data-test='outbound-datepicker'] button[data-test='datepicker-next-day-button]");
        this.outBoundDateBar = Selector("[id='page.journeySearchForm.outbound.title']");
        this.inBoundDateBar = Selector("[id='page.journeySearchForm.inbound.title']");
        this.searchPageTitle= Selector("span[data-test='change-journey-header']");

        this.fromText = 'London Bridge';
        this.toText = 'Brighton';
        
    }

    //Method for exercise 1.2
    async enterFromLocation(locationText){
        await t
            .typeText(this.fromLocation, locationText)
            .click(this.suggestedStationFrom);       
    }

    //Method for exercise 1.2
    async enterToLocation(locationText){
        await t
            .typeText(this.toLocation, locationText)
            .click(this.suggestedStationTo);            
    }
    
    //Validate Page method
    async validatePage(){
        await t
            .expect(Selector("title").innerText).contains('Trainline');
        await t
            .expect(this.searchPageTitle.innerText).contains('Your search:');
        await t
            .expect(this.searchPageTitle.innerText).contains(this.fromText);
        await t
            .expect(this.searchPageTitle.innerText).contains(this.toText);
    }

    //Method for exercise 1.3
    async enterLocations(fromLocation, toLocation){
        this.enterFromLocation(fromLocation);
        this.enterToLocation(toLocation);
    }

    //Method for exercise 3 (I know it’s a horrible way to go about it)
    async checkNextDateValid(){
        var validNextDay;
        const outBoundDate = await this.outBoundDateBar.getAttribute('value');
        const inBoundDate = await this.inBoundDateBar.getAttribute('value');
        const outBoundDay = parseInt(outBoundDate.toString().substring(0,2));
        const inBoundDay = parseInt(inBoundDate.toString().substring(0,2));
        const outBoundMonth = outBoundDate.toString().substring(3,6);
        const monthsOf31 = ['Jan','Mar','May','Jul','Aug','Oct','Dec'];
        const monthsOf30 = ['Apr','Jun','Sep','Nov'];

        //Checks if the next day has a value of 1 greater than the previous day
        if (inBoundDay === outBoundDay + 1){
            validNextDay = true;
        }
        //Checks for boundary dates
        else if (inBoundDay === 1){
            if(monthsOf31.includes(outBoundMonth) && outBoundDay === 31){
                validNextDay = true;
            }
            else if (monthsOf30.includes(outBoundMonth) && outBoundDay === 30){
                validNextDay = true;
            }
            //Checks February
            else if ((outBoundDay === 28 && parseInt(outBoundDate.substring(7)) % 4 !== 0)
            ||
            (outBoundDay === 29 && parseInt(outBoundDate.substring(7)) % 4 === 0)){
                validNextDay = true;
            }
            else{
                validNextDay = false;
            }
        }
        else{
            validNextDay = false;
        }
        return validNextDay;
    }    
}
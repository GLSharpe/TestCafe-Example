# TestCafe-Example
Simple demo of tests on TestCafe.

##Background

This is a TestCafe self training suite.
The purpose of this document is to provide some structure for self-learning around TestCafe Studio and basic automation in JavaScript. It assumes that you have a basic grounding in JavaScript so if you don’t have a background in this then look 
at a basic JavaScript course and then return to this document: [1]
All of the automation will be performed against the front page of the trainline website, as this has a combination of basic and more complex challenges.
The examples will be done against The Trainline site [2].
(If anyone finds any errors in this document please correct them)

##Learning Points

 Markup : * Installations
          * Project Setup
          * Writing Tests
          * Using Selectors
          * Running Tests
          * Different Browsers
          * Examples
          * Links

##Installation

All of the installation details can be found in link [3].
If you were to read through this document, it should give you a good overview of the tool as a whole and all the instructions to get it up and running (Note that “Getting Started” is 3rd on the Table of Contents so if you’re reading the page and think “have I missed something?”, you havent).
It is also recommended that you download the TestCafe Studio IDE for this. I would recommend at least trying it: [4]
If not, then Visual Studio Code is a perfectly fine place for you to write your code.

##Setup 

The way that you arrange your files within the project is up to you. If you have a look in the examples file in [3] then you can see that each example is set out slightly differently. However, if you were to look at the example project: [5]
 it has a more object-oriented style with one folder containing page objects and one folder containing test classes. 
When you create separate JavaScript files it is always a good idea to import/export to other files as you create and initialize them as it is an easy thing to forget to do further down the line.

##Writing Tests

All tests must be contained inside a test fixture which contains a description of the test fixture and a ‘page’ feature with a URL. For example, if you were to want to run some tests on the TrainLine website you would start off the JavaScript file with the imports from the other pages that you wish to use and then you would begin the test fixture with:

``` fixture `Tests on the home page of the TrainLine website `
    .page(homePage.baseUrl);
```
After the fixture has been opened, you can then start writing your tests. The syntax for this is standard. This involves calling “async/await” functions so if this is something that you haven’t investigated them it will be worth looking into it now. More info can be found here: [6]
When you create an initialise a test, you set the title of the test as the first parameter and the function as the second. For example, if you wanted to run a test where there were 3 radio buttons, you clicked on them all one after the other and then checked that the final one you clicked on was the one that was check:

```test('Radio Buttons Check', async t =>{

    await t
        .click(homePage.returnRadioButton)
        .click(homePage.oneWayRadioButton)
        .click(homePage.openReturnRadioButton)
        .expect(homePage.openReturnRadioButton.checked).ok();
    })
```
(N.B. the variables are initialized on another file that I have imported as “homepage”).
The using “expect” is a great way to generate an assertion and it can be deployed in several different ways. More information can be found here: [7]
If there is something a bit more specific that you wish to check and find that the expect feature doesn’t quite have the functionality that you require then you can look at installing expect.js: [8]

##Using Selectors

To use the Selector feature you need to first use the import:

```import { Selector } from "testcafe";```

at the top of each file you intend to use selectors on.

For there, using simple selectors in TestCafe are very easy, if an element has a ID (e.g. id = “elementId”) or a unique class (e.g. class = “elementClass”) affixed to it it then it is simply a matter of declaring the variables as follows:

```const elementById = Selector('#elementId')

const elementByClass = Selector('.elementClass')
```

To find an element that has another unique feature affixed to it (e.g. a div with an attribute “name” with a value “myDivElement”) then it can be found using:

```const elementByAttribute = Selector("div[name='myDivElement']")```

N.B. if you wish to find an element by an id or a class but it contains syntactically important characters (e.g. full stops) you can use this method to find them:

```const elementByIdAttribute = Selector("[id='strange.id']")```

To find elements by more complicated selectors you can use a standard CSS selector chain, like one that you can copy from the dev tools (but never copy from dev tools!!!). So, for example, if there were to be an element that was a list element contained in a list with a parent element with a unique id (e.g. id = “anotherElementId”) then you could select it by:

```const elementBySelectorChain = Selector('#anotherElementId > ul > li:nth-child([index])')```

There are many different ways to use Selectors and they can be found here: [9]

##Running Tests

###TestCafe Studios

To run tests for TestCafe studio just click the blue ‘run button next to the test file.

To only run specific tests within the file then you can click the drop down by the file to display all the tests within it. You can then select specific tests to run, each of which will display the same run button when you hover over them.

###Command Line

Running the tests from a command prompt is as simple as declaring a “testcafe” operation, declaring the browser or browsers and then pointing it in the direction of the file containing the tests. To run a test suite called “homepage.js” in chrome navigate to the folder containing the file and enter “testcafe chrome hompage.js.
There are many specific cases where you would not just wish to plainly run all the tests of 1 file so please see the below link for a comprehensive look at the ways to use the command prompt to run your tests: [10]

##Different Browsers

If you’re using the TestCafe Studio IDE then the browser can be changed using the drop downs at the top.

If you’re running TastCafe from a command prompt then the browser is determined by the second argument, see the Running Tests section for more details.

##Exercises

A few simple exercises that will help you get to grips with writing tests in TestCafe. This should take you from the set up to the running of the tests. 
Hints can be found at the bottom of the document

###Ex 0.1

Once you have TestCafe installed, create a folder with 2 JavaScript files in calling one “homepage” and one “examples”.

###Ex 0.2

Import the “Selector” function from TestCafe into both files and import “t”, the TestController from TestCafe in homepage.
(Hint available) 

###Ex 0.3

Create an exportable class inside your homepage file called Homepage and add a constructor as you would with any JavaScript file {link}. Inside the constructor, add a variable called “baseUrl” and set it to the url of the Trainline. Then go to the examples file and import “HomePage” from the location of the homepage file. Then create a new instance of HomePage called “homePage”.
(Hint available)

###Ex 0.4

Create a test fixture, it can have any title you want but it should point to the base url of the Trainline.
(Hint available)

###Ex 0.5

Go to the trainline website and find the “From” and “To” search boxes.
 
Within the constructor in the homepage file, use Selectors to find these objects and call them “fromLocation” and “toLocation”. From now on, add all page objects into this constructor.

###Ex 1.1

Create a test, titled whatever you like, that:

 Markup : * Navigates to the webpage.
          * Enters the text “London Bridge” into the From field and, if there is a drop down, selects the top option in the drop down.
          * Enter the text “Brighton” into the To field and, if there is a drop down, selects the top option in the drop down.
          * Clicks on the “Get Times and Tickets” button.
          * Checks that the title of the next page contains the string “Trainline”.

Write this test linearly, one step after the other without creating any supporting methods. 

###Ex 1.2

Create a test that does the same function as above, but this time create 2 supporting methods in the homepage file that both receive 1 argument. One method should enter the argument into the From box and then, if there is a drop down, picks the top option. Call it “enterFromLocation”. The other method should enter the argument into the To box and then, if there is a drop down, picks the top option. Call it “enterToLocation”. Use these methods in the test.

###Ex 1.3

Create another test that does the same function as the 2 above, but now create another method in the homepage file that takes 2 arguments. This method should pass in the first argument to the enterFromLocation method and the second into the enterToLocation and call this method “enterLocations”. Use this method in the test.

###Ex 2

Create a test, titled whatever you like, that:

 Markup : * Navigates to the webpage.
          * Checks that the title of the next page contains the string “Trainline”.
          * Uses your “enterLocations” method to search for a train from London Bridge to Brighton.
          * Clicks on the “Get Times and Tickets” button.
          * Checks that the results page is shown.

The last point in fairly nonspecific, but if you were to find an element that were to only feature in the results page and ensure that it’s there (or ‘expect’ it to ‘exist’ if you like) then that should be sufficient for now.
          

###Ex 3 (Extention and JavaScript Practice)

Create a test, titled whatever you like, that:

 Markup : * Navigates to the webpage.
          * Uses your “enterLocations” method to search for a train from London Bridge to Brighton.
          * Clicks the “Return” radio button.
          * Clicks the “Tomorrow” button to set the out-bound date as tomorrow.
          * Clicks the “Next Day” button to set the in-bound date as the day after tomorrow.
          * Create a method in that checks that the date displayed in the in-bound date field is truly the day after the date displayed in the out-bound field. Let this method return a Boolean value and expect this value to be returned as true. (You can change the setup around and put in different values to test your method).

##Links

Number | Link
------------- | -------------
[1]  | https://www.codecademy.com/learn/introduction-to-javascript
[2]  | https://www.thetrainline.com/
[3]  | https://github.com/DevExpress/testcafe
[4]  | https://www.devexpress.com/products/testcafestudio/
[5]  | https://github.com/qualityshepherd/testcafe-example
[6]  | https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html
[7]  | https://devexpress.github.io/testcafe/documentation/test-api/assertions/
[8]  | https://devhints.io/expectjs
[9]  | https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/
[10]  | https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html

##Hints to Exercises

###Ex 0.2

In hompage.js:
```import { Selector, t} from "testcafe";```

In example.js:
```import { Selector } from "testcafe";```

###Ex 0.3

In homepage.js:
```import { Selector, t} from "testcafe";

export default class HomePage {
    constructor (){
        this.baseUrl = 'https://www.thetrainline.com/';        
    }```

In examples.js:

```import HomePage from './homepage.js';
import { Selector } from "testcafe";

const homePage = new HomePage();```


###Ex 0.4

HINT:
Look back into the “Writing a Test” section.
In examples.js:
```import HomePage from './homepage.js';
import { Selector } from "testcafe";

const homePage = new HomePage();

fixture `Example tests`
    .page(homePage.baseUrl);```


###Ex 0.5

At the point of writing this the id’s contained full stops so were found using the method shown in the NB in the Using Selectors section.
```export default class HomePage {
    constructor (){
        this.baseUrl = 'https://www.thetrainline.com/';
        this.fromLocation = Selector("[id='from.text']");
        this.toLocation = Selector("[id='to.text'");       
    }```


###Ex 1.1

You can find the title of a page using: 
```Selector("title").innerText```


###Ex 1.2

Don’t forget to proceed the method with ‘async’

###Ex 1.3

Don’t forget the “this” key word when calling the methods.


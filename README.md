[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![GitHub commits](https://badgen.net/github/commits/abuna1985/sortable-table/main/)](https://github.com/abuna1985/sortable-table/commits/)
[![GitHub watchers](https://badgen.net/github/watchers/abuna1985/sortable-table)](https://GitHub.com/abuna1985/sortable-tables/watchers/)
[![GitHub license](https://img.shields.io/github/license/abuna1985/sortable-table?color="blue")](https://github.com/abuna1985/sortable-tables/blob/main/LICENSE)
<br />

<div align="center">
  <a href="https://abuna1985.github.io/sortable-table/">
    <img src="assets/images/table-columns-icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Sortable Columns HTML Table</h3>

  <p align="center">
    <strong>
      <a href="https://abuna1985.github.io/sortable-table/">View Demo</a>
    </strong>
  </p>
</div>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Visual Examples](#visual-examples)
  - [Random User API](#random-user-api)
- [Requirements](#requirements)
  - [Bonus Requirements](#bonus-requirements)
- [My Process](#my-process)
  - [1. HTML](#1-html)
  - [2. JavaScript](#2-javascript)
  - [3. CSS](#3-css)
- [Built with](#built-with)
- [What I Learned](#what-i-learned)
  - [Web Accessability](#web-accessability)
    - [Semantic HTML & ARIA attributes](#semantic-html--aria-attributes)
  - [Performance Optimizations](#performance-optimizations)
    - [Caching API Data in `SessionStorage`](#caching-api-data-in-sessionstorage)
    - [Caching Sorted Tables in the Event Listener (Memoization)](#caching-sorted-tables-in-the-event-listener-memoization)
  - [Using Modern CSS](#using-modern-css)
    - [CSS Custom Properties](#css-custom-properties)
    - [BEM naming convention](#bem-naming-convention)
- [Additional Features](#additional-features)
- [Resources](#resources)
  - [Accessibility Links](#accessibility-links)
  - [HTML Links](#html-links)
  - [CSS Links](#css-links)
  - [JavaScript Links](#javascript-links)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## About The Project

![Desktop view of the sortable columns table](./assets/images/desktop-home.jpg)

This project is a simple single-page responsive design which takes data from the [Random User Generator API](https://randomuser.me/) and builds a table which can sorted by the column headers with a mouse and/or keyboard.

This project is a simple responsive web page which takes data from the Random User Generator API and builds an accessible table which can sorted by the column headers with a <code>click</code> of a mouse and/or <code>enter/space</code> key.

### Visual Examples

<details>
  <summary><strong>Click here</strong> to see what happens when the <em>columns are clicked on</em></summary>

  <img src="./assets/images/sortable-table-click.gif" alt="sortable table click demo gif" />

</details>
<br />

<details>
  <summary><strong>Click here</strong> to see what happens when the <code>tab key</code> and <code>shift+tab key</code> is pressed</summary>

  <img src="./assets/images/sortable-table-tab-enter.gif" alt="sortable table tab/enter demo gif" />

</details>
<br>

<details>
  <summary><strong>Click here</strong> to see the Web Accessibility Evaluation Tool (WAVE) report summary</summary>

  <img src="./assets/images/sortable-table-wave-report-summary.jpg" alt="Wave Report: 11 Features, 26 Structural Elements, 132 ARIA labels" />

</details>
<br>

<details>
  <summary><strong>Click here</strong> to see the mobile view of the page</summary>

<h3>Mobile View</h3>
<img src="assets/images/mobile-home.jpg" alt="mobile view of the sorted column table" />

</details>
<br>

### Random User API

Read the [API documentation](https://randomuser.me/documentation) to find out more about the response values and how to test the API. Notice the URL I am using for this project is requesting 10 users (`results=10`) from the United States (`nat=us`): `https://randomuser.me/api/?nat=us&results=10`

<details>
<summary><strong>Click Here</strong> to see the random user properties available</summary>

- `gender`: (string) gender (male/female),
- `name`: (object) contains name data
  - `title`: (string) title (Mr., Ms, etc)
  - `first`: (string) first name
  - `last`: (string) last name
- `location`: (object) contains location data
  - `street`: (string) street number and name
  - `city`: (string)city
  - `state`: (string) state
  - `postcode`: (string) zip/postal code
- `coordinates`: (object) contains coordinates data
  - `latitude`: (string) latitude
  - `longitude`: (string) longitude
- `timezone`: (object) contains time zone data
  - `offset`: (string) timezone offset
  - `description`: (string) time zone
- `email`: (string) email address
- `login`: (object) contains login data
  - `uuid`: (string) unique user id,
  - `username`: (string) username
  - `password`: (string) password
  - `salt`: (string) salt hash
  - `md5`: (string) md5 hash
  - `sha1`: (string) sha1 hash
  - `sha256`: (string) sha256 hash
- `dob`: (object) contains age data
  - `date`: (timestamp) date of birth
  - `age`: (number) age of person
- `registered`: (object) contains registration data
  - `date`: (timestamp) registration
  - `age`: (number) age of membership
- `phone`: (string) phone number
- `cell`: (string) cell phone number
- `id`: (object) contains id data
  - `name`: (string) id name
  - `value`: (string) id value
- `picture`: (object) contains picture data
  - `large`: (string) URL of large image
  - `medium`: (string) URL of medium image
  - `thumbnail`: (string) URL of thumbnail image
- `nat`: (string) nationality

</details>
<br>

[Back to Top](#table-of-contents)

## Requirements

1. Use the result a from the [Random User Generator API](https://randomuser.me/)
2. Use HTML, CSS and Javascript to show the data in a readable table (including mobile view)
3. All columns should have the ability to be sorted by mouse and/or keyboard

**As a user, I should:**

- [x] See a <code>loading</code> state when the page initially renders
- [x] See an HTML <code>table</code> when the data is successfully loaded
- [x] See all the HTML <code>table</code> data in `mobile` and `tablet` view
- [x] See an <code>error</code> message within the table body if it is not working
- [x] Be able to <code>click</code> on a column, see a visual cue that the column has been selected
- [x] Be able to use the following keyboard keys to control:
  - **Direction Keys**
    - [x] <code>tab</code>, <code>shift+tab</code>
    - [x] <code>&#8593;</code>, <code>&#8595;</code>, <code>&#8592;</code>, <code>&#8594;</code>
    - [x] <code>w</code>, <code>s</code>, <code>a</code>, <code>d</code>
    - [x] <code>home</code>, <code>end</code>
  - **Sorting**
    - [x] <code>enter</code>, <code>space</code></h2>

### Bonus Requirements

**As a developer, I should**

- [x] Implement 2 examples of caching in order to increase the overall performance of the page
- [x] Use the BEM (Block Element Modifier) naming convention for CSS class names
- [x] Use accessibility principles to ensure the page is accessible by the browser and any assistive technologies connected as well (i.e screen readers)

<br>

[Back to Top](#table-of-contents)

## My Process

Since the requirements were fetching API data and rendering a table, I approached it the following way:

### 1. HTML

Create an `index.html` file and fill it with the elements that were not going to be changing like the `<header>` and root `<table>` element. Add BEM (Block Element Modifier) naming convention for adding class names (i.e `c-header` and `c-table`).

### 2. JavaScript

Create a `script.js` and write out the following functions:

- fetch data from the Random User API
  - render the contents of the `<table>` element (`<th>`, `<tr>`, `<td>`, etc.) with the Random User API data
- Create Event Listeners:
  - **Click**
    - `<button>` in Column header (`<th>`)
    - when clicked, it sorts the table ascending/descending order and rerenders the page with the results
  - **Keydown**
    - `left arrow`, `up arrow`, `a`, `w`
      - Move the focus to the **previous** HTML element with a `tabindex` attribute
    - `right arrow`, `down arrow`, `d`, `s`
      - Move the focus to the **next** HTML element with a `tabindex` attribute
    - `home`
      - Move the focus to the **first** HTML element with a `tabindex` attribute
    - `end`
      - Move the focus to the **last** HTML element with a `tabindex` attribute

### 3. CSS

1. Add [Normalize.css](https://nicolasgallagher.com/about-normalize-css/) to reset the CSS browser defaults
2. Create a `style.css` and add styles to:

- Header - `.c-header`
  - Header Title - `.c-header__title`
  - Header Subtitle - `.c-header__subtitle`
- Table - `c-table`
  - table header - `c-table__head`
    - header cell (th) - `.c-table__th`
      - button - `.c-table__button`
  - table body  - `c-table__body`
    - table row (tr) `.c-table__tr`
      - table data (td) `.c-table__td`
- Loading Screen - `.l-loading-container` `.is-loading`
- Animations
  - `move` keyframe animation
  - `grow` keyframe animation
- Mobile view styling `@media screen and (max-width: 768px)`

[Back to Top](#table-of-contents)

## Built with

- Semantic HTML5
- CSS3
  - Normalize.css
  - CSS Animation (loading screen)
  - CSS custom properties
  - BEM naming convention
- ES6 JavaScript
  - Async/Await
  - Fetch
  - Closures/Memoization

[Back to Top](#table-of-contents)

## What I Learned

### Web Accessability

#### Semantic HTML & ARIA attributes

After reviewing the [Deque University Sortable Table Example](https://dequeuniversity.com/library/aria/table-sortable), it looks like making a `<table>` with the appropriate nested table elements (`<thead>`, `<tbody>` `<th>`, `<tr>`,`<td>`).

Here is a skeleton example with the recommended ARIA attributes:

```html
<table role="grid" aria-readonly="true">
  <thead>
    <tr role="row">
      <th role="columnheader" scope="col">col 1<th>
      <th role="columnheader" scope="col">col 2<th>
      <th role="columnheader" scope="col">col 3<th>
    </tr>
  </thead>
  <tbody>
    <tr role="row">
      <th scope="row" role="rowheader">data 1</th>
      <td role="gridcell">data 2</td>
      <td role="gridcell">data 3</td>
    <tr>
  </tbody>
</table>
```

For assistive technology, It is preferred that the selected `<th>` have the following attribute to let the reader know which order the column is sorted:
- `aria-sort="ascending"` 
- `aria-sort="descending"`

**NOTE:** some ARIA attributes may be built into the semantic table elements. I found conflicting information and decided to add the ARIA attributes to ensure they are available to any assistive technologies.

[Back to Top](#table-of-contents)

### Performance Optimizations

#### Caching API Data in `SessionStorage`

In most API fetching demos, the API call is made as the page is rendered. I decided to use `SessionStorage` to store the initial API call data. After the initial fetch, the table will pull the data directly from `SessionStorage`.

Once the user closes out the window tab, the data from session storage is removed. Below is the snippet where I added session storage logic:

https://github.com/abuna1985/sortable-table/blob/891f3f9ff801442ce190ac1c74e38e1c55fb42e1/assets/js/script.js#L342-L360

#### Caching Sorted Tables in the Event Listener (Memoization)

I had to demonstrate memoization for a few technical interviews recently. I wanted to implement memoization so that the table did not need to run a sort function every time the column button is clicked.

So I initially create a cache within the event listener function and return a function that will be used when the column button is clicked. 

https://github.com/abuna1985/sortable-table/blob/891f3f9ff801442ce190ac1c74e38e1c55fb42e1/assets/js/script.js#L71-L81

Win the return function, we will try to access the cache to see if `cache[`${order}${column}`]` (example `cache['ascending1']` for column 1 in ascending order). if it does not exist, we will perform the sort.

https://github.com/abuna1985/sortable-table/blob/891f3f9ff801442ce190ac1c74e38e1c55fb42e1/assets/js/script.js#L95-L149

After the sort is performed, we will store it in the `cache` object for future reference.

https://github.com/abuna1985/sortable-table/blob/891f3f9ff801442ce190ac1c74e38e1c55fb42e1/assets/js/script.js#L146

we will call `saveToCache` and name the returning function `sortByTableColumn`

https://github.com/abuna1985/sortable-table/blob/f95667b4f48b8214fe861fca0ee3b2abbc8efb6d/assets/js/script.js#L16

We then call `sortByTableColumn` in the click listener. Notice I create an event listener on the document and add a conditional for make sure the button with a class `js-column-button` is the only element that the sorting function will work.

https://github.com/abuna1985/sortable-table/blob/891f3f9ff801442ce190ac1c74e38e1c55fb42e1/assets/js/script.js#L327-L337

https://github.com/abuna1985/sortable-table/blob/891f3f9ff801442ce190ac1c74e38e1c55fb42e1/assets/js/script.js#L366-L367

[Back to Top](#table-of-contents)

### Using Modern CSS

#### CSS Custom Properties

This [Kevin Powell YouTube video on CSS custom properties](https://youtu.be/5QIiWIoCmsc) really helped me better understand how to use these properties. Here is an example. I created 5 custom properties in my `body` selector so I can use the custom properties within all nested elements

https://github.com/abuna1985/sortable-table/blob/3f0fa713d2c01c93a222c76782de04a291a5cade/assets/css/style.css#L2-L13

Now I have a custom property called `--main-text-color` that stores the hex code of black (`#111111`). But since my button is going to be blue, I would like my text color to be white (`#ffffff`). Rather than create another custom property, I can overwrite (or locally scope) the property within a selector and use the same property name like so:

https://github.com/abuna1985/sortable-table/blob/3f0fa713d2c01c93a222c76782de04a291a5cade/assets/css/style.css#L81-L87

Now the text color within my button will be white (`#ffffff`)

#### BEM naming convention

After reading the [namespace section of this Smashing Magazine article on mistakes to avoid using BEM (Block, Element, Modifier)](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/#2-should-i-be-namespacing), I decided to apply the same BEM prefix namespacing as in the <cite>Smashing Magazine</cite> article. Below is the table that shows the prefix description and examples from the article.

<blockquote cite="https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/#2-should-i-be-namespacing">
  <table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Prefix</th>
      <th>Examples</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Component</td>
      <td><em>c-</em></td>
      <td><em>c-card</em><br><em>c-checklist</em></td>
      <td>Form the backbone of an application and contain all of the cosmetics for a standalone component.</td>
    </tr>
    <tr>
      <td>Layout module</td>
      <td><em>l-</em></td>
      <td><em>l-grid</em><br><em>l-container</em></td>
      <td>These modules have no cosmetics and are purely used to position <em>c-</em> components and structure an application’s layout.</td>
    </tr>
    <tr>
      <td>Helpers</td>
      <td><em>h-</em></td>
      <td><em>h-show</em><br><em>h-hide</em></td>
      <td>These utility classes have a single function, often using <em>!important</em> to boost their specificity. (Commonly used for positioning or visibility.)</td>
    </tr>
    <tr>
      <td>States</td>
      <td><em>is-</em><br><em>has-</em></td>
      <td><em>is-visible</em><br><em>has-loaded</em></td>
      <td>Indicate different states that a c- component can have.</td>
    </tr>
    <tr>
      <td>JavaScript hooks</td>
      <td><em>js-</em></td>
      <td><em>js-tab-switcher</em></td>
      <td>These indicate that JavaScript behavior is attached to a component. No styles should be associated with them; they are purely used to enable easier manipulation with script.</td>
    </tr>
  </tbody>
  </table>
  <cite>&mdash; David Berner</cite>
</blockquote>

**Source of namespacing:** [Harry Robert - More Transparent UI Code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

As a result I used the following block class names:

- **Components** - `c-header`, `c-table`
- **Elements** - `c-header__title`, `c-table__td`
- **Layout** - `.l-table-container`, `.l-loading-container`
- **States** - `is-loading`, `has-error`

[Back to Top](#table-of-contents)

## Additional Features

1. Pagination for multiple pages of results
2. In tablet/mobile view, add tab functionality to focus on each card full of data
3. Add an input to search on the table and highlight

[Back to Top](#table-of-contents)

## Resources

### Accessibility Links

- [Web AIM - Creating accessible tables](https://webaim.org/techniques/tables/data)
- [MDN - HTML table advanced features and accessibility](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced)
- [Deque University - Sortable table example](https://dequeuniversity.com/library/aria/table-sortable)
- [W3 - Sortable table example](https://w3c.github.io/aria-practices/examples/table/sortable-table.html)
### HTML Links

- [HTML Symbols/Entity reference](https://www.toptal.com/designers/htmlarrows/)

### CSS Links

- [Codepen - David Miller - Responsive table example](https://codepen.io/Orangetronic/full/pJgpXw)
- [MDN Docs - table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)
- [LogRocket- CSS animated page loading](https://blog.logrocket.com/animated-page-loaders-css/)
- [Smashing Magazine - David Berner - Battling BEM CSS: 10 Common Problems And How To Avoid Them](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)
- [CSS Wizardry - Harry Robert - More Transparent UI Code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

### JavaScript Links

- [Go Make Things - JavaScript Event Delegation](https://gomakethings.com/listening-for-events-on-multiple-elements-using-javascript-event-delegation/) - This helped me better understand how event delegation works in JavaScript.
- [Go Make Things - Inject text and HTML with JavaScript](https://gomakethings.com/four-different-ways-to-inject-text-and-html-into-an-element-with-vanilla-javascript/) - This article helped me as a reference.
- [Random User API Documentation](https://randomuser.me/documentation#howto) Here is the documentation for the Random User API for reference.
- [JavaScript.info - Optional Chaining](https://javascript.info/optional-chaining)
- [MDN - switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [Go Make Things - Chris Ferndinandi - JavaScript format date helper function](https://vanillajstoolkit.com/helpers/formatdate/)
- [Mastering JS - Date object](https://masteringjs.io/tutorials/fundamentals/typeof-date)
- [freeCodeCamp - Understanding JavaScript Memoization](https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/)


[Back to Top](#table-of-contents)

## Author

- Website - [adamabundis.xyz](https://adamabundis.xyz/)
- GitHub - [@abuna1985](https://github.com/abuna1985)
- Twitter - [@adamabundis](https://twitter.com/adamabundis)

[Back to Top](#table-of-contents)

## Acknowledgments

- @sw-yx @techieEliot @rayning0 and @amhayslip pushing the dev community (including myself) to learn and grow in public. 
- @kevin-powell for making me smarter about CSS 
- @cferdinandi for making me smarter about JavaScript.


[Back to Top](#table-of-contents)

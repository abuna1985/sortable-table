# Sortable Columns Table

![Desktop view of the sortable columns table](./assets/images/desktop-home.jpg)

## Table Of Contents

- [Sortable Columns Table](#sortable-columns-table)
  - [Table Of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Requirements](#requirements)
    - [Bonus Requirements](#bonus-requirements)
  - [Random User API](#random-user-api)
  - [Demo](#demo)
  - [My Process](#my-process)
  - [Built with](#built-with)
  - [What I Learned](#what-i-learned)
    - [API Memoization](#api-memoization)
    - [Sorting Memoization](#sorting-memoization)
    - [Loading Screen](#loading-screen)
  - [Continued Development](#continued-development)
  - [Resources](#resources)
    - [HTML links](#html-links)
    - [CSS links](#css-links)
    - [JavaScript Links](#javascript-links)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

This project is a simple single-page responsive design which takes data from the [Random User Generator API](https://randomuser.me/) and builds a table which can sorted by the column headers with a mouse and/or keyboard.

## Requirements

1. Use the result a from the [Random User Generator API](https://randomuser.me/)
2. Use HTML, CSS and Javascript to show the data in a readable table (including mobile view)
3. All columns should have the ability to be sorted by mouse and/or keyboard

**As a user, I should:**

- [x] See a <code>loading</code> state when the page initially renders
- [x] See an HTML <code>table</code> when the data is successfully loaded
- [x] See an <code>error</code> message within the table body if it is not working
- [x] Be able to <code>click</code> on a column, see a visual cue that the column has been selected
- [x] Be able to use the following keyboard keys to control:
  - **Direction**
    - [x] <code>tab</code>, <code>shift+tab</code>
    - [x] <code>&#8593;</code>, <code>&#8595;</code>, <code>&#8592;</code>, <code>&#8594;</code>
  - **Sorting**
    - [x] <code>enter</code>, <code>space</code></h2>

### Bonus Requirements

**As a developer, I should**

- [x] Implement

## Random User API

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

## Demo

- Live Site URL: [GitHub Pages](https://abuna1985.github.io/sortable-columns-table/)
- Solution URL: [GitHub Repo](https://github.com/abuna1985/sortable-columns-table/)

## My Process

## Built with

- Semantic HTML5
- CSS3
  - Normalize.css
  - CSS Animation
  - CSS custom properties
- ES6 JavaScript
  - Async/Await
  - Fetch

## What I Learned

### API Memoization

### Sorting Memoization

### Loading Screen

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
	color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
	console.log('🎉');
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

## Continued Development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

## Resources

### HTML links

- [Web AIM - Creating accessible tables](https://webaim.org/techniques/tables/data)
- [MDN - HTML table advanced features and accessibility](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced)
- [Deque University - Sortable table example](https://dequeuniversity.com/library/aria/table-sortable)
- [W3 - Sortable table example](https://w3c.github.io/aria-practices/examples/table/sortable-table.html)
- [HTML Symbols/Entity reference](https://www.toptal.com/designers/htmlarrows/)
- [Codepen - David Miller - Responsive table example](https://codepen.io/Orangetronic/full/pJgpXw)

### CSS links

- [MDN Docs - table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)
- [LogRocket- CSS animated page loading](https://blog.logrocket.com/animated-page-loaders-css/)

### JavaScript Links

- [Go Make Things - JavaScript Event Delegation](https://gomakethings.com/listening-for-events-on-multiple-elements-using-javascript-event-delegation/) - This helped me better understand how event delegation works in JavaScript.
- [Go Make Things - Inject text and HTML with JavaScript](https://gomakethings.com/four-different-ways-to-inject-text-and-html-into-an-element-with-vanilla-javascript/) - This article helped me as a reference.
- [Random User API Documentation](https://randomuser.me/documentation#howto) Here is the documentation for the Random User API for reference.
- [JavaScript.info - Optional Chaining](https://javascript.info/optional-chaining)
- [MDN - switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [Go Make Things - Chris Ferndinandi - JavaScript format date helper function](https://vanillajstoolkit.com/helpers/formatdate/)
- [Mastering JS - Date object](https://masteringjs.io/tutorials/fundamentals/typeof-date)
- [freeCodeCamp - Understanding JavaScript Memoization](https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/)

## Author

- Website - [adamabundis.xyz](https://adamabundis.xyz/)
- GitHub - [@abuna1985](https://github.com/abuna1985)
- Twitter - [@adamabundis](https://twitter.com/adamabundis)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

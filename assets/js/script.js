// I felt it was a good practice to wrap all JavaScript logic into a function so global variables/functions are not accessible in the console
async function init() {

  // 1. VARIABLES
  const tableHeader = document.querySelector('.c-table__head');
  const tableBody = document.querySelector('.c-table__body');
  // Since the data being returned is an array, I can start with an empty array so I can handle edge cases when trying to render it in HTML
  let results = [];
  // 10 results allowed me to render a table that fit within the desktop/tablet screen
  // I may experiment with more results to see how scrolling has an effect on the page
  const endpointURL = `https://randomuser.me/api/?nat=us&results=10`;
  // Chose these 10 properties since they fit the 100% width of the table
  let headerColumns = ['ID', 'FIRST', 'LAST', 'IMAGE', 'PHONE', 'ADDRESS', 'CITY', 'STATE', 'ZIP', 'MEMBER SINCE'];
  // From now on we can use the function name sortTableByColumn and still access to store sorted arrays in the cache object
  let sortTableByColumn = memoizedCache();
  // For easy reference to the keyboard key numbers
  // I wanted to implement Object.freeze to ensure properties cannot be added to the KEYS constant (making it a true constant variable)
  const KEYS = Object.freeze({
    end: 35,
    home: 36,
    left: 37,
    right: 39,
  });
    // I wanted to implement Object.freeze to ensure properties cannot be added to the DIRECTION constant (making it a true constant variable)
  const DIRECTION = Object.freeze({
    37: -1,
    38: -1,
    39: 1,
    40: 1,
  });

  // 2. METHODS

  /**
  * Performs data fetching  and returns JSON response
  * @param  {String}  url            The desired URL where we will fetch data from 
  * @return {Array}   data.results   An array of objects containing users info
  */
  async function fetchUserData(url) {
    // A good practice to wrap await logic within a try/catch
    // This will ensure you get an error if something goes wrong with the asynchronous logic (like the fetch and what comes back from it)
    try {
      let response = await fetch(url);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      let data = await response.json();
      console.log({data});
      return data.results;
    } catch (err) {
      console.error(err)
      return err.message; 
    }
  }
  /**
  * Convert a timestamp into a date
  * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
  * @param  {String|Integer}  timestamp  The timestamp in unix of YYYY-MM-DD HH:MM:SS format
  * @return {String}                     A formatted date string
  */
  function formatDate (timestamp) {
    // Create a date object from the timestamp
    let date = new Date(timestamp);
    // return a formatted date - example: 03/10/2022
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  };
  /**
  * A function wrapper with a cache object where the sorted arrays will be stored
  */
  function memoizedCache() {
    let cache = {}
    /**
    * Sorts the table in ascending/descending order and updates the view of the table
    * 
    * @param {HTMLTableElement}  table   The desired table that needs to be sorted
    * @param {Number}            column  The index of the column to sort
    * @param {Boolean}           asc     Determines if the sorting will be in ascending/descending order
    * @return {Function}                 Returns the function that will be used to sort and memoize the 
    */ 
    return (table, column, asc = true) => {
      // initialize the array of sorted rows
      let sortedRows = [];
      // stringify order to identify in cache
      let order = asc ? 'asc' : 'desc';
      const directionModifier = asc ? 1 : -1;
      // get current table body HTML content
      const tableBody = table.tBodies[0];
      // Extract table row as an array value
      const rows = Array.from(tableBody.querySelectorAll("tr"));
      // check the cache first
      if (cache[`${order}${column}`]) {
        // console.log('cache has been used');
        // Since it is available, we will use the sorted array stored in cache
        sortedRows = cache[`${order}${column}`];
      } else {
        // Sort each row
        sortedRows = rows.sort((a, b) => {
          // Default will be HTML Content as a String
          let aColumnContent = a.querySelector(`td:nth-child(${column+1})`).textContent.trim();
          let bColumnContent = b.querySelector(`td:nth-child(${column+1})`).textContent.trim();
          // If it is 'IMAGES' column (4th), use the data-id attribute within the <img> element
          if (column === 3) {
            aColumnContent = a.querySelector(`td:nth-child(${column+1})`).getAttribute('data-id');
            bColumnContent = b.querySelector(`td:nth-child(${column+1})`).getAttribute('data-id');
            // console.log('sorted by last name');
          } 
          // In the 'Address' column (6th), only use the numbers from the address to sort
          if (column === 5) {
            aColumnContent = a.querySelector(`td:nth-child(${column+1})`).textContent.split(' ')[0];
            bColumnContent = b.querySelector(`td:nth-child(${column+1})`).textContent.split(' ')[0];
            // console.log({aColumnContent, bColumnContent})
            // console.log('sorted by street number');
          }
          // If both values can be converted into a Date value, convert it
          if(column === 9) {
            aColumnContent = new Date(aColumnContent);
            bColumnContent = new Date(bColumnContent);
            // console.log('sorted by date');
          }
          // If both values can be converted into a Number value, convert it
          if(!Number.isNaN(parseInt(aColumnContent)) && !Number.isNaN(parseInt(bColumnContent))) {
            aColumnContent = parseInt(aColumnContent);
            bColumnContent = parseInt(bColumnContent);
            // console.log('sorted by number');
          }
          return aColumnContent > bColumnContent ? (1 * directionModifier): bColumnContent > aColumnContent ? (-1 * directionModifier) : 0;
        });
        cache[`${order}${column}`] = sortedRows;
        // console.log({cache})
        // console.log({sortedRows});
      }
      // Remove all existing <tr> from the table
      while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
      // Remember how the column is currently sorted
      table.querySelectorAll(".c-table__button").forEach(button => button.classList.remove("c-table__button--asc", "c-table__button--desc"));
      table.querySelector(`th:nth-child(${column + 1})`).firstElementChild.classList.toggle("c-table__button--asc", asc);
      table.querySelector(`th:nth-child(${column + 1})`).firstElementChild.classList.toggle("c-table__button--desc", !asc);
      // Add newly sorted rows
      return tableBody.append(...sortedRows);
    }
  }
  /**
  * Converts Array of Object into an HTML string template of the table header
  * @param   {Array}   columns   The json we want to convert to HTML
  * @return  {String}  headerRow The HTML string template of the table header columns
  */
  function renderHeaderColumns(columns) {
      let headerRow = `<tr class="table_tr">${columns.map((column, index) => `<th scope="col" class="c-table__th"><button class="c-table__button js-column-button" data-id="${index}" tabindex="0">${column}</button></th>`).join("")}</tr>`;
      // console.log({headerRow});
      return headerRow;
  }
  /**
  * converts given JSON to HTML <table>
  * @param   {Array}   userData An array of objects that contain the users information
  * @return  {String}  rows.join('') The HTML string template with table row data
  */
  function renderTableBody(userData) {
    if (!userData.length) {
      // console.log({userData});
      return `<tr class="c-table__tr"><td colspan="10" class="has-error">No data available. Please try again later.</td></tr>`;
    }
    let rows = userData.map((user, index) => {
    return `
    <tr class="c-table__tr">
      <td class="c-table__td" data-label="ID">${(parseInt(index) + 1)}</td>
      <td class="c-table__td" data-label="FIRST">${user?.name?.first}</td>
      <td class="c-table__td" data-label="LAST">${user?.name?.last}</td>
      <td class="c-table__td" data-label="IMAGE" data-id=${(parseInt(index) + 1)}><img alt="Photo of ${user?.name?.first} ${user?.name?.last}" class="c-table__image" loading="eager" src="${user?.picture?.thumbnail}" /></td>
      <td class="c-table__td" data-label="PHONE">${user?.cell.replace('-', ' ')}</td>
      <td class="c-table__td" data-label="ADDRESS">${user?.location?.street?.number} ${user?.location?.street?.name}</td>
      <td class="c-table__td" data-label="CITY">${user?.location?.city}</td>
      <td class="c-table__td" data-label="STATE">${user?.location?.state}</td>
      <td class="c-table__td" data-label="ZIP">${user?.location?.postcode}</td>
      <td class="c-table__td" data-label="MEMBER SINCE">${formatDate(user?.registered?.date)}</td>
    </tr>
    `;
    });
    // console.log({rows});
    return rows.join('');
  }
  /**
  * Create HTML loading container
  * @return {String} the HTML loading screen template
  */
  function renderLoadingContainer() {
    return `
    <div class="l-loading-container">
      <div class="is-loading">
        <span class="is-loading__dot"></span>
        <span class="is-loading__dot"></span>
        <span class="is-loading__dot"></span>
        <span class="is-loading__dot"></span>
      </div>
    </div>
    `;
  }

  /**
   * Event handler for key press events
   * @param {Object} event where event information is stored
   */
  function keydownEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case KEYS.end:
        event.preventDefault();
        // Activate last tab
        console.log('end button pressed');
        // focusLastTab();
        break;
      case KEYS.home:
        event.preventDefault();
        // Activate first tab
        console.log('home button pressed');
        // focusFirstTab();
        break;
    }
  }

  // 3. INITS & EVENT LISTENERS

  // Initial loading State
  tableBody.innerHTML = renderLoadingContainer();
  if (sessionStorage.getItem('userdata')) {
    // Use the data from session storage
    results = JSON.parse(sessionStorage.getItem('userdata'));
    // console.log('session storage used');
    // console.log('--------------------');
  } else {
    // fetch the data from the random user API
    try {
      results = await fetchUserData(endpointURL);
      // console.log({results});
      sessionStorage.setItem('userdata', JSON.stringify(results));
      // console.log('fetch call made');
      // console.log('Session storage used');
      // console.log('--------------------');
    } catch(error) {
      console.log('Error:', error);
    }
  }
  // console.log({data});
  // Fill in HTML table header and body
  tableHeader.innerHTML = renderHeaderColumns(headerColumns);
  tableBody.innerHTML = renderTableBody(results);

  // Click Event Listener
  document.addEventListener("click", event => {
    // the function will only run when a <th> is clicked on
    if (event.target.closest(".js-column-button")) {
      const tableElement = event.target.parentNode.parentNode.parentNode.parentNode;
      const headerIndex = parseInt(event.target.getAttribute("data-id"));
      const currentIsAscending = event.target.classList.contains("c-table__button--asc");
      
      sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    }
    return false;
  })

  document.addEventListener('keydown', event => {
    keydownEventListener(event);
    return false;
  })

  document.addEventListener('keyup', event => {
    return false;
  })
}
  
init();
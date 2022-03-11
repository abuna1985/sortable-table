/**
 * performs data fetching  and returns JSON response
 * @param {String} url the desired URL where we will fetch data from 
 * @returns JSON returned from fetch call 
 */
async function getData(url) {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error(err)
  }
}

/*!
 * Convert a timestamp into a date
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {String|Integer}  timestamp  The timestamp in unix of YYYY-MM-DD HH:MM:SS format
 * @returns {String}                     A formatted date
 */
function formatDate (timestamp) {
	// Create a date object from the timestamp
	var date = new Date(timestamp);
	// return a formatted date - example: 03/10/2022
	return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
};

/**
 * A function wrapper with a cache object where the sorted arrays will be stored
 */
function memoizedCache() {
  let cache = {}
  /**
   * Returns a function that sorts the table in ascending/descending order and updates the view of the table
   * 
   * @param {HTMLTableElement} table the desired table that needs to be sorted
   * @param {Number} column The index of the column to sort
   * @param {Boolean} asc Determines if the sorting will be in ascending/descending order
   */ 
  return (table, column, asc = true) => {
    // initialize the array of sorted rows
    let sortedRows = [];
    // stringify order to identify in cache
    let order = asc ? 'asc' : 'desc'
    // 1 is ascending, -1 if descending
    const dirModifier = asc ? 1 : -1;
    // get current table body HTML content
    const tableBody = table.tBodies[0];
    // Extract table row as an array element
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    // if the column (asc/desc) sorted array is stored
    if (cache[`${order}${column}`]) {
      console.log('cache has been used');
      // use the cached array
      sortedRows = cache[`${order}${column}`]
    } else {
      // Sort each row
      sortedRows = rows.sort((a, b) => {
        // Default will be HTML Content as a String
        let aColumnContent = a.querySelector(`td:nth-child(${column+1})`).textContent.trim();
        let bColumnContent = b.querySelector(`td:nth-child(${column+1})`).textContent.trim();
        // If it is 'IMAGES' column (4th), use the values in 'LAST' (3rd column) to sort
        if (column === 3) {
          aColumnContent = a.querySelector(`td:nth-child(${column})`).textContent.trim();
          bColumnContent = b.querySelector(`td:nth-child(${column})`).textContent.trim();
        } 
        // In the 'Address' column (6th), only use the numbers to sort
        if (column === 5) {
          aColumnContent = a.querySelector(`td:nth-child(${column+1})`).textContent.split(' ')[0];
          bColumnContent = b.querySelector(`td:nth-child(${column+1})`).textContent.split(' ')[0];
          // console.log({aColumnContent, bColumnContent})
        }
        // If both values can be converted into a Date value, convert it
        if(column === 9) {
          aColumnContent = new Date(aColumnContent);
          bColumnContent = new Date(bColumnContent);
          console.log('sorted by date');
        }
        // If both values can be converted into a Number value, convert it
        if(!Number.isNaN(parseInt(aColumnContent)) && !Number.isNaN(parseInt(bColumnContent))) {
          aColumnContent = parseInt(aColumnContent);
          bColumnContent = parseInt(bColumnContent);
        }
        return aColumnContent > bColumnContent ? (1 * dirModifier): bColumnContent > aColumnContent ? (-1 * dirModifier) : 0;
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
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc)
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc)

    // Add newly sorted rows
    return tableBody.append(...sortedRows);;
  }
}

/**
 * converts given JSON to HTML <table>
 * @param {Array} columns the json we want to convert to HTML
 * @returns String
 */
function makeHeaderColumns(columns) {
    let headerRow = `<tr class="table_tr">${columns.map(column => `<th scope="col" class="table__th">${column}</th>`).join("")}</tr>`
    // console.log({headerRow});
    return headerRow;
 }

 /**
 * converts given JSON to HTML <table>
 * @param {JSON} json the json we want to convert to HTML
 * @returns String bodyData
 */
function makeTableBody(userData) {
  if (!userData) return `<tr class="table__tr"><td colspan="10" class="error">No data available. Please try again later.</td></tr>`
  return userData.map((user, index) => {
    return `
    <tr class="table__tr">
      <td class="table__td" data-label="ID">${(parseInt(index) + 1)}</td>
      <td class="table__td" data-label="FIRST">${user?.name?.first}</td>
      <td class="table__td" data-label="LAST">${user?.name?.last}</td>
      <td class="table__td" data-label="IMAGE" data-id=${(parseInt(index) + 1)}><img class="table__td--img" loading="eager" src="${user?.picture?.thumbnail}" /></td>
      <td class="table__td" data-label="PHONE">${user?.cell.replace('-', ' ')}</td>
      <td class="table__td" data-label="ADDRESS">${user?.location?.street?.number} ${user?.location?.street?.name}</td>
      <td class="table__td" data-label="CITY">${user?.location?.city}</td>
      <td class="table__td" data-label="STATE">${user?.location?.state}</td>
      <td class="table__td" data-label="ZIP">${user?.location?.postcode}</td>
      <td class="table__td" data-label="MEMBER SINCE">${formatDate(user?.registered?.date)}</td>
    </tr>
    `;
  }).join("")
}

/**
 * Create HTML loading container
 * @returns String
 */
function makeLoadingContainer() {
  return `
  <div class="table__container">
    <div class="loading">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  `;
 }

/**
 * The initial function is called when the JavaScript is loaded
 */
async function init() {
  const tableHeader = document.querySelector('.table__head');
  const tableBody = document.querySelector('.table__body');
  const endpointURL = `https://randomuser.me/api/?nat=us&results=9`;
  let headerColumns = ['ID', 'FIRST', 'LAST', 'IMAGE', 'PHONE', 'ADDRESS', 'CITY', 'STATE', 'ZIP', 'MEMBER SINCE'];
  // Initialize the cache to store sorted arrays
  let sortTableByColumn = memoizedCache();
  let data;

  // Loading Screen
  tableBody.innerHTML = makeLoadingContainer();

  if (sessionStorage.getItem("userdata")) {
    // Restore the contents of the text field
    data = JSON.parse(sessionStorage.getItem('userdata'));
    // console.log('session storage used');
    // console.log('--------------------')
  }
  try {
    if (!data) {
      let initialData = await getData(endpointURL);
      data = initialData.results;
      sessionStorage.setItem('userdata', JSON.stringify(data));
      // console.log('fetch call made');
      // console.log('Session storage used');
      // console.log('--------------------')
    }

    // Click Event Listener
    document.addEventListener("click", event => {
      // the function will only run when a <th> is clicked on
      if (event.target.closest(".table__th")) {
        const tableElement = event.target.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(event.target.parentElement.children, event.target);
        const currentIsAscending = event.target.classList.contains("th-sort-asc");
        
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
      }
      return false
    })
  } catch (err) {
    console.error(err)
  }
  
  // console.log({data});
  tableHeader.innerHTML = makeHeaderColumns(headerColumns);
  tableBody.innerHTML = makeTableBody(data);
}
  
init();
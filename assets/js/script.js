/**
 * 
 * TODO Refactor sortTableByColumn to sort with String, Number, and Date values
 * TODO Loading Screen
 * 
 * 
 */

/**
 * makes fetch call and returns JSON data
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


	// return a formatted date
	return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

};

/**
 * Sorts an HTML table
 * 
 * @param {HTMLTableElement} table the desired table that needs to be sorted
 * @param {Number} column The index of the column to sort
 * @param {Boolean} asc Determines if the sorting will be in ascending/descending order
 */
 function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  // get current Table Body
  const tableBody = table.tBodies[0];
  // Extract row as an array element
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    let aColumnText;
    let bColumnText;
    if (column === 3) {
      aColumnText = a.querySelector(`td:nth-child(${column})`).textContent.trim();
      bColumnText = b.querySelector(`td:nth-child(${column})`).textContent.trim();
    } else {
      aColumnText = a.querySelector(`td:nth-child(${column+1})`).textContent.trim();
      bColumnText = b.querySelector(`td:nth-child(${column+1})`).textContent.trim();
    }
    
    // if a and b are numbers, sort as number
    if (!Number.isNaN(parseInt(aColumnText)) && !Number.isNaN(parseInt(bColumnText))) return parseInt(aColumnText) > parseInt(bColumnText) ? (1 * dirModifier) : (-1 * dirModifier);
    // else sort as a string
    return aColumnText > bColumnText ? (1 * dirModifier) : (-1 * dirModifier);
  });
  console.log({sortedRows});

  // Remove all existing <tr> from the table
  while(tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Add newly sorted rows
  tableBody.append(...sortedRows);

  // Remember how the column is currently sorted
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc)
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc)
}


/**
 * converts given JSON to HTML <table>
 * @param {Array} columns the json we want to convert to HTML
 * @returns String
 */
 function makeHeaderColumns(columns) {
    let tableHeader = document.querySelector('.table__head');
    let headerRow = `<tr class="table_tr">${columns.map(column => `<th scope="col" class="table__th">${column}</th>`).join("")}</tr>`
    tableHeader.innerHTML = headerRow;
    // console.log(headerRow)
    return true;
 }

 /**
 * converts given JSON to HTML <table>
 * @param {JSON} json the json we want to convert to HTML
 * @returns String
 */
  function makeTableBody(userData) {
    let tableBody = document.querySelector('.table__body');
    let bodyData = userData.map((user, index) => {
      return `
      <tr class="table__tr">
          <td class="table__td" data-label="ID">${(parseInt(index) + 1)}</td>
          <td class="table__td" data-label="FIRST">${user?.name?.first}</td>
          <td class="table__td" data-label="LAST">${user?.name?.last}</td>
          <td class="table__td" data-label="IMAGE" data-id=${(parseInt(index) + 1)}><img class="table__td--img" src="${user?.picture?.thumbnail}" /></td>
          <td class="table__td" data-label="PHONE">${user?.cell.replace('-', ' ')}</td>
          <td class="table__td" data-label="ADDRESS">${user?.location?.street?.number} ${user?.location?.street?.name}</td>
          <td class="table__td" data-label="CITY">${user?.location?.city}</td>
          <td class="table__td" data-label="STATE">${user?.location?.state}</td>
          <td class="table__td" data-label="ZIP">${user?.location?.postcode}</td>
          <td class="table__td" data-label="MEMBER SINCE">${formatDate(user?.registered?.date)}</td>
        </tr>
      `;
    }).join("")
    tableBody.innerHTML = bodyData;
    return true;
 }

/**
 * The initial function called when the JavaScript is loaded
 */
 async function init() {
  const endpointURL = `https://randomuser.me/api/?nat=us&results=9`;
  let headerColumns = ['ID', 'FIRST', 'LAST', 'IMAGE', 'PHONE', 'ADDRESS', 'CITY', 'STATE', 'ZIP', 'MEMBER SINCE'];
  let data;
  if (sessionStorage.getItem("userdata")) {
    // Restore the contents of the text field
    data = JSON.parse(sessionStorage.getItem('userdata'));
    console.log('session storage used');
    console.log('----------------------------')
  }
  try {
    if (!data) {
      data = await getData(endpointURL);
      data = data.results;
      sessionStorage.setItem('userdata', JSON.stringify(data));
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
  console.log({data});
  makeHeaderColumns(headerColumns);
  makeTableBody(data);
}
  
init();
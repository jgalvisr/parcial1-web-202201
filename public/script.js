const enterButton = document.getElementById('enter');
const input = document.getElementById('inputText');
const table = document.getElementById('table');
const tbody = document.getElementById('body-table');
const message = document.getElementById('message');
const card = document.getElementById('card');

enterButton.addEventListener('click', (event) => {
  removeAllChildNodes(card);
  removeAllChildNodes(tbody);
  message.innerText = "";

  const username = input.value;
  getUser(username);
  event.preventDefault();
});

/**
 * Llamado al backend con queryParam
 * @param {*} username
 */
async function getUser(username) {
  const resp = await fetch(`http://localhost:3000/api/users/${username}`);
  const data = await resp.json();
  //console.log('data from back', data);
  printValues(data);
  return data;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function printValues(user) {
  try {
    const row = document.createElement('div');
    row.className = 'row';
  
    const colTitle = document.createElement('div');
    colTitle.className = 'col-10';
  
    const colBadges = document.createElement('div');
    colBadges.className = 'col-2';
  
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = user.username;
  
    colTitle.appendChild(cardTitle);
  
    const rowFriends = document.createElement('div');
    rowFriends.className = 'row';
    const rowPlays = document.createElement('div');
    rowPlays.className = 'row';
  
    const friendsBadge = document.createElement('span')
    friendsBadge.className = 'badge bg-warning';
    friendsBadge.style.marginBottom = 3;
    friendsBadge.textContent = "Friends: " + user.friends;
    rowFriends.appendChild(friendsBadge);
  
    const playsBadge = document.createElement('span')
    playsBadge.className = 'badge bg-success';
    playsBadge.textContent = "Plays: " + user.plays;
    rowPlays.appendChild(playsBadge);
  
    colBadges.appendChild(rowFriends);
    colBadges.appendChild(rowPlays);
  
    row.appendChild(colTitle);
    row.appendChild(colBadges);
  
    card.appendChild(row);
  
    user.tracks.map((track) => {
      const tableRow = document.createElement('tr');
      const tableTrack = document.createElement('td');
      tableTrack.textContent = track;
      tableRow.appendChild(tableTrack);
      tbody.appendChild(tableRow);
    });
  } catch (error) {
    message.innerText = "User does not exist";
  }
}

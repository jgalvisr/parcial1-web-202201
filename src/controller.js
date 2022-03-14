const axios = require("axios");

const FRIENDS_ALL = 'https://mauvelous-leopard-5257.twil.io/friends';
const FRIENDS_ONE = 'https://mauvelous-leopard-5257.twil.io/friend-detail?username=';
const PLAYS_ONE = 'https://mauvelous-leopard-5257.twil.io/plays-detail?username='

const getUser = async (username) => {
  try {
    const allFriendsRaw = await axios(FRIENDS_ALL);
    const allFriends = allFriendsRaw.data.friends;
    const friend = allFriends.filter(f => f.username == username);
    if (friend.length == 0)
      throw new Error('Username not found');

    const friendsOneRaw = await axios(FRIENDS_ONE + username);
    const friendsOne = friendsOneRaw.data;

    const playsOneRaw = await axios(PLAYS_ONE + username);
    const allPlays = playsOneRaw.data.plays;
    const uniquePlays = allPlays.filter((element, index, array) => array.indexOf(element) === index);

    let resp = {};
    resp['username'] = username;
    resp['plays'] = allPlays.length;
    resp['friends'] = friendsOne.friends.length;
    resp['tracks'] = uniquePlays;
    resp['uri'] = "/users/" + username;

    return resp;
  } catch (error) {
    return { error: error.message, status: 404 }
  }
};

module.exports = { getUser };

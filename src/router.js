const { response, request } = require('express');
const express = require('express');
const { getUser } = require('./controller');
const router = express.Router();

router.get('/:username', async (req = request, resp = response, next) => {
  const username = req.params.username;
  const result = await getUser(username);
  resp.json(result);
});

module.exports = router;

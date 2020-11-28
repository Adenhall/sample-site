import axios from 'axios';
import { get } from 'lodash';
// create "middleware"

const express = require('express');

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date().toUTCString());
  next();
});

// define the home page route
router.get('/', (req, res) => {
  console.log('api --------------------');

  res.send('Birds home page');
});

// define the about route
router.get('/users', async (req, res) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  res.json(data);
});

router.get('/users/:id', async (req, res) => {
  const {
    params: { id }
  } = req;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  res.json(data);
});
router.get('/login', async (req, res) => {
  let result = {};
  try {
    result = await axios.post(
      'https://stgadmin-expenso.paxanimi.ai/server/api/api/login',
      {
        email: 'admin-sa@terralogic.com',
        password: '12345678@Tc'
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.json({ data: get(result, 'data', '') });
});
// https://stgadmin-expenso.paxanimi.ai/server/api
module.exports = router;

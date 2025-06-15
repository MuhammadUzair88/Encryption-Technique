
const express = require('express');
const {EncryptUserDataAndStore, decryptUserPassword} = require('./controller/EncryptData');

const router = express.Router(); 


router.post('/user',EncryptUserDataAndStore);
router.post('/decrypt',decryptUserPassword);

router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route working');
  });
module.exports = router;
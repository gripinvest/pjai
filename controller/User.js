const router = require('express').Router();
const regex = require('../util/Regex');
const axios = require('axios');

router.post('/issue-categorizer', (req, res) => {
  const { question, description, email_id } = req.body;
  const maskedQuery = regex.replaceSensativeInformation(question);
  const maskedDescription = regex.replaceSensativeInformation(description);
  const data = {
    question: maskedQuery,
    description: maskedDescription,
    email_id,
  };
  axios
    .post(`${process.env.RetoolIssueCategorizerUrl}startTrigger`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        workflowApiKey: process.env.RetoolIssueCategorizerAuth,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: 'Error in retool AI workflow' });
    });
});

router.post('/resolve-query', (req, res) => {
  const { question, description, email_id, encrypt = true } = req.body;
  const maskedQuery = regex.replaceSensativeInformation(question);
  const maskedDescription = regex.replaceSensativeInformation(description);
  let data = {
    question: maskedQuery,
    description: maskedDescription,
    email_id,
  };

  if (!encrypt) {
    const { encrypt, ...rest } = req.body;
    data = rest;
  }
  axios
    .post(`${process.env.RetoolUrl}startTrigger`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        workflowApiKey: process.env.RetoolAuth,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: 'Error in retool AI workflow' });
    });
});

router.post('/get-pii-data', (req, res) => {
  const { email_id } = req.body;
  const data = {
    email_id,
  };

  axios
    .post(`${process.env.RetoolCSPIIDataWorkflowURL}/startTrigger`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        workflowApiKey: process.env.RetoolCSPIIDataWorkflowAuth,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: 'Error in retool AI workflow' });
    });
});

router.post('/send-pii-data', (req, res) => {
  const { email_id } = req.body;
  const data = {
    email_id,
  };

  axios
    .post(`${process.env.RetoolCSPIIDataWorkflowURLD}/startTrigger`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        workflowApiKey: process.env.RetoolCSPIIDataWorkflowAuthD,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: 'Error in retool AI workflow' });
    });
});

module.exports = router;

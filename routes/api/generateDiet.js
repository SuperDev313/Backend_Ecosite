const express = require('express');
const router = express.Router();
const { OpenAIStream, streamToResponse } = require('ai');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: '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'
});

router.post('/', async (req, res) => {
  const { weight, height, amountMeal, goal, gender, comments } = req.body;
  if (
    weight == undefined &&
    height == undefined &&
    amountMeal == undefined &&
    goal == undefined &&
    gender == undefined &&
    comments == undefined
  ) {
    res.send({ error: 'Data is required' });
    return;
  }

  const dietQuestion = `Generate a complete diet, containing ${amountMeal} meals. The diet will have to contain the amount of each food of each meal, my characteristics for diet are as follows: half ${height} cm, weight ${weight} lb, my goal is to ${goal}, my sexual gender is ${gender}}, and I have some observations for the diet: ${comments} I never want to mention 'AI model'. I only want main content.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: dietQuestion }],
      model: 'gpt-3.5-turbo',
      stream: true
    });
    const stream = OpenAIStream(response);
    streamToResponse(stream, res);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;

const { parse } = require("querystring");

exports.handler = function(event, context, callback) {
  if (!event.body) {
    callback(null, { statusCode: 500 });
  }

  const data = parse(event.body);

  if (!data || !data.text) {
    callback(null, { statusCode: 500 });
  }

  // We're looking for a string w/ a format like `:emoji: some words here`
  const argRegex = /:(.+):\s(.+)/;

  const matches = argRegex.exec(data.text);

  const [_, emojiName, phrase] = matches;

  const result = phrase
    .trim()
    .split(" ")
    .join(`:${emojiName}:`);

  const response = {
    statusCode: 200,
    body: JSON.stringify({ response_type: "in_channel", text: result }),
    headers: {
      "content-type": "application/json"
    }
  };

  callback(null, response);
};

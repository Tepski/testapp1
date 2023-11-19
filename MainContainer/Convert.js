// const Convert = (text) => {
//   const questionAnswerPairs = text.split(/\d+\.\s+/).filter(Boolean);

//   const result = [];

//   let questionID = 1;

//   for (let i = 0; i < questionAnswerPairs.length; i += 1) {
//     let questionLines = questionAnswerPairs[i].trim();

//     // Move "Choice A." to a new line
//     questionLines = questionLines.replace(/ (A\.[^\n]+)/g, "\n$1");

//     // Move "ANSWER" to a new line
//     questionLines = questionLines.replace(/ANSWER: ([A-D])/, "\nANSWER: $1");

//     const lines = questionLines.split("\n").map((line) => line.trim());
//     const questionText = lines[0].trim();
//     const answerMatch = lines.find((line) => line.startsWith("ANSWER: "));
//     const answer = answerMatch ? answerMatch.split(" ")[1] : "";

//     const answerChoices = [];

//     for (let j = 1; j < 5; j++) {
//       const label = String.fromCharCode(64 + j); // Convert number to letter (A, B, C, D)
//       const choiceText = lines.find((line) => line.startsWith(`${label}.`));
//       if (choiceText) {
//         const choiceString = choiceText.substring(2);
//         answerChoices.push({ Label: label, String: choiceString });
//       }
//     }

//     result.push({
//       ID: questionID,
//       Question: questionText,
//       Choices: answerChoices,
//       Answer: answer,
//     });
//     questionID++;
//   }

//   // Convert the result to a JSON string
//   const jsonResult = JSON.stringify(result, null, 2);

//   // You can save the JSON data to a file or use it as needed
//   return jsonResult;
// };

// export default Convert;

const extractTextUntilA = (text) => {
  // Find the index of "A. "
  const index = text.indexOf("A. ");

  // Extract the text until "A. "
  const slicedText = index !== -1 ? text.slice(0, index) : text;

  return slicedText.trim(); // Trim any leading or trailing whitespaces
};

const Convert = (text) => {
  const questionAnswerPairs = text.split(/\d+\.\s+/).filter(Boolean);

  const result = [];

  let questionID = 1;

  for (let i = 0; i < questionAnswerPairs.length; i += 1) {
    let questionLines = questionAnswerPairs[i].trim();

    // Move "Choice A." to a new line
    questionLines = questionLines.replace(/ (A\.[^\n]+)/g, "\n$1");

    // Move "ANSWER" to a new line and remove it from the question text
    questionLines = questionLines.replace(/(ANSWER: [A-D])/, "\n$1");
    const lines = questionLines.split("\n").map((line) => line.trim());
    const questionText = lines.join(" "); // Join all lines for the question text
    const answerMatch = lines.find((line) => line.startsWith("ANSWER: "));
    const answer = answerMatch ? answerMatch.split(" ")[1] : "";

    const answerChoices = [];

    for (let j = 1; j < 5; j++) {
      const label = String.fromCharCode(64 + j); // Convert number to letter (A, B, C, D)
      const choiceText = lines.find((line) => line.startsWith(`${label}.`));
      if (choiceText) {
        const choiceString = choiceText.substring(2);
        answerChoices.push({ Label: label, String: choiceString });
      }
    }

    result.push({
      ID: questionID,
      Question: extractTextUntilA(questionText),
      Choices: answerChoices,
      Answer: answer,
    });
    questionID++;
  }

  // Convert the result to a JSON string
  const jsonResult = JSON.stringify(result, null, 2);

  // You can save the JSON data to a file or use it as needed
  return jsonResult;
};

export default Convert;

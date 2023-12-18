const Convert = (text) => {
  const regex =
    /(\d+)\.\s([\s\S]*?)(A\.\s.*?B\.\s.*?C\.\s.*?D\.\s.*?)(?:\s*ANSWER:\s*([A-D])|$)/gs;
  const matches = [...text.matchAll(regex)];

  return matches.map((match) => {
    // Replace multiple spaces with a single space for the question text
    const questionText = match[2].replace(/\s+/g, " ").trim();

    const choices = match[3]
      .split(/\s*(A\.\s|B\.\s|C\.\s|D\.\s)\s*/)
      .filter(Boolean)
      .slice(1);

    // Separate choices into objects with keys "Label" and "Text"
    const formattedChoices = [];
    const labelKeys = ["A", " ", "B", "", "C", "", "D"];
    for (let i = 0; i < choices.length; i += 2) {
      const label = choices[i].trim();
      const text = labelKeys[i];

      formattedChoices.push({
        Label: label,
        Text: text,
      });
    }

    return {
      ID: match[1],
      Question: questionText,
      Choices: formattedChoices,
      Answer: match[4],
    };
  });
};

export default Convert;

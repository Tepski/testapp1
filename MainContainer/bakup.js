const text = `82. What do you think is the output or sales at which income is insufficient to equal operating cost? 
A. Break even point 	 
B. Depreciation 
C. Investment 
D. Cash flow 
ANSWER: A 
83. Which statement about a charge placed on a dielectric material is true? 
A. The charge increases the conductivity of the material B. The charge is confined to the region in which the charge was placed. 
C. The charge is immediately lost to the atmosphere 
D. The charge is instantly carried to the material's surface 
ANSWER: B 
84. How do you call the axis of the hyperbola that passes through the center, the foci and vertices? 
A. Transverse axis 
B. Conjugate Axis 
C. Asymptotic axis 
D. Major Axis 
ANSWER: A 
85. A polygon with ten sides is said to be: 
A. Dodecagon 
B. Decagon 
C. Decahedron 
D. Dodecahedron 
ANSWER: B 
86. What is the reason why an ivory soap floats in water? 
A. All matter has mass 
B. The specific gravity of ivory soap is greater than that of water 
C. The density of ivory soap is unity 
D. The specific gravity of ivory soap is less than that of water 
ANSWER: D 
87. This law in electrical circuits state, "The algebraic sum of all voltages around a closed path (or loop) is zero". How do you call this law? A. Kirchhoff's current law B. Ohm's current law 
C. Kirchhoff's voltage law 
D. Ohm's voltage law 
ANSWER: C 
88. How do you call the formula used to compute the value of n factorial, which is in symbolic form (n!), where n is large number? A. Matheson formula 
B. Diophantine formula 
C. Richardson-Duchman formula 
D. Stirling's Approximation 
ANSWER: D `;

const questionAnswerPairs = text.split(/\d+\.\s+/).filter(Boolean);

const result = [];

let questionID = 1;

for (let i = 0; i < questionAnswerPairs.length; i += 2) {
  let questionLines = questionAnswerPairs[i].trim();

  // Move "Choice A." to a new line
  questionLines = questionLines.replace(/ A\./g, "\nA.");

  // Move "ANSWER" to a new line
  questionLines = questionLines.replace(/ANSWER: ([A-D])/, "\nANSWER: $1");

  // Separate choices that are on the same line
  questionLines = questionLines.replace(/([A-D]\..+?)\s+(?=[A-D]\.)/g, "$1\n");

  const lines = questionLines.split("\n").map((line) => line.trim());
  const questionText = lines[0].trim();
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
    Question: questionText,
    Choices: answerChoices,
    Answer: answer,
  });
  questionID++;
}

const jsonResult = JSON.stringify(result, null, 2);

console.log(jsonResult);

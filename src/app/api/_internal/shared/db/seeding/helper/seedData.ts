import { Tag } from "@prisma/client";

function createCard(
  question: string,
  questionText: string,
  answer: string,
  tags: Tag[]
) {
  return {
    id: 0,
    question: question,
    questionText: questionText,
    answer: answer,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: tags,
  };
}

export function getFlashcardData() {
  const values = createCard(
    "What are the Values of Clean Code?",
    "There are four values at the core of Clean Code. What are they?",
    "Evolvability: Considering evolvability from the start you can steadily enhance and adopt software products over long periods. Cost may increase slightly. But never exponentially.\n\nCorrectness: Software must work correctly. Also non-functional requirements have to be fulfilled.\n\nProduction Efficiency: Naturally finally development time and the software’s price are important. And that is higher if the production is not done efficiently.\n\nContinuous Improvement: Improvement requires reflection. By reflecting you recap if solving a certain task was easy or cumbersome. These insights base on reflection.",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const embraceUncertainty = createCard(
    "Virtue: Embrace Uncertainty",
    "There are some virtues Clean Code focuses on. What comes to mind for Embracing Uncertainty?",
    "Values: Evolvability, Continuous Improvement\n\n* Version Control\n\n* Automatized Integration Tests\n\n* Automatized Unit Tests\n\n* Mockups (test dummies)\n\n* Continuous Integration (CI)\n\n* Inversion of Control Container (IoC)",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Virtues", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const focus = createCard(
    "Virtue: Focus",
    "There are some virtues Clean Code focuses on. What comes to mind for Focus?",
    "Values: Production Efficiency\n\n* Component Orientation\n\n* Test First\n\n* Limit WIP",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Virtues", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const valueQuality = createCard(
    "Virtue: Value Quality",
    "There are some virtues Clean Code focuses on. What comes to mind for Value Quality?",
    "Values: Production Efficiency\n\n* Accept High Quality Only\n\n* Automatized Unit Tests\n\n* Reviews",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Virtues", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const getThingsDone = createCard(
    "Virtue: Get Things Done",
    "There are some virtues Clean Code focuses on. What comes to mind for Value Quality?",
    "Values: Production Efficiency\n\n* Iterative Development\n\n* Continuous Delivery\n\n* Limit WIP",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Virtues", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const stayClean = createCard(
    "Virtue: Stay Clean",
    "There are some virtues Clean Code focuses on. What comes to mind for Stay Clean?",
    "Values: Evolvability, Correctness, Production Efficiency\n\n* Path Finder Rule\n\n* Complex Refactorings\n\n* Simple Refactoring Patterns\n\n* Static Code Analysis (Metrics)\n\n* Code Coverage Analysis\n\n* Source Code Conventions",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Virtues", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const keepMoving = createCard(
    "Virtue: Keep Moving",
    "There are some virtues Clean Code focuses on. What comes to mind for Keep Moving?",
    "Values: Evolvability, Continuous Improvement\n\n* Read, Read, Read\n\n* Professional Event Participation\n\n* Knowledge Transfer\n\n* Reflect Every Day\n\n* Root Cause Analysis\n\n* Error Measurement\n\n* Issue Tracking\n\n* Regular Retrospectives",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Virtues", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  const solid = createCard(
    "What does SOLID mean?",
    "Every character of SOLID means one principle to follow when writing clean code.\nWhat is the meaning behind those characters?",
    "**S** - Single Responsibility Principle\n\n**O** - Open Closed Principle\n\n**L** - Liskov substitution principle\n\n**I** - Interface segregation principle\n\n**D** - Dependency inversion principle",
    [
      { id: 0, name: "Clean Code", createdAt: new Date() },
      { id: 0, name: "Principles", createdAt: new Date() },
      { id: 0, name: "Software Development", createdAt: new Date() },
    ]
  );

  return [
    values,
    embraceUncertainty,
    focus,
    valueQuality,
    getThingsDone,
    stayClean,
    keepMoving,
    solid,
  ];
}

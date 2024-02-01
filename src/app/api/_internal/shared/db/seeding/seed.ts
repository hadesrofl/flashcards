import FlashCardRepository from "@app/api/_internal/flashcards/db/FlashcardRepository";
import { getFlashcardData } from "./helper/seedData";

export async function seed(seedRepository: FlashCardRepository) {
  console.log("Seeding...");
  const seedData = getFlashcardData();
  let dataCount = 0;
  for (let i = 0; i < seedData.length; i += 1) {
    const card = seedData[i];
    const flashcards = await seedRepository.list({
      question: card.question,
      questionText: card.questionText,
      answer: card.answer,
    });
    if (flashcards.length === 0) {
      await seedRepository.create(card);
      dataCount++;
    }
  }
  console.log(`Cards inserted: ${dataCount}`);
}

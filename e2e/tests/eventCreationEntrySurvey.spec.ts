import {
  eventSuccessfulMessage,
  shareURLMessage,
} from "@pages/eventCreationDetailsPage";
import {
  QuestionTypeEnum,
  chooseFreeTextQuestion,
  chooseMultipleChoiceQuestion,
  chooseNPSQuestion,
  chooseRankingQuestion,
  chooseSingleChoiceQuestion,
  chooseSliderQuestion,
  createEventWithQuestionType,
  questionTypeFieldValidationMessage,
  verifyQuestionFieldForQuestionType,
  verifyQuestionValidation,
} from "@pages/eventCreationEntrySurveyPage";
import { expect, test } from "@playwright/test";

test.describe("Event creation for entry survey page test scenarios ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/event-wizard");
  });

  test("Create a new event with an entry survey question type - Free Text Question - Mandatory", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseFreeTextQuestion, true);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Free Text Question - Optional", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseFreeTextQuestion, false);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Verify the question type field validation works for entry survey question type - Free Text Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseFreeTextQuestion, true);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Verify the question field validation works for entry survey question type - Free Text Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseFreeTextQuestion, false);
    await verifyQuestionFieldForQuestionType(page, QuestionTypeEnum.FreeText);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Single Choice Question - Mandatory", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseSingleChoiceQuestion, true);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Single Choice Question - Optional", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseSingleChoiceQuestion, false);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Verify the question type field validation works for entry survey question type - Single Choice Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseSingleChoiceQuestion, true);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Verify the question field validation works for entry survey question type - Single Choice Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseSingleChoiceQuestion, false);
    await verifyQuestionFieldForQuestionType(
      page,
      QuestionTypeEnum.SingleChoice
    );
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Multiple Choice Question - Mandatory", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseMultipleChoiceQuestion, true);
    page;
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Multiple Choice Question - Optional", async ({
    page,
  }) => {
    await createEventWithQuestionType(
      page,
      chooseMultipleChoiceQuestion,
      false
    );
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Verify the question type field validation works for entry survey question type - Multiple Choice Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseMultipleChoiceQuestion, true);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Verify the question field validation works for entry survey question type - Multiple Choice Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseMultipleChoiceQuestion, false);
    await verifyQuestionFieldForQuestionType(
      page,
      QuestionTypeEnum.MultipleChoice
    );
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Ranking Question - Mandatory", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseRankingQuestion, true);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Ranking Question - Optional", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseRankingQuestion, false);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Verify the question type field validation works for entry survey question type - Ranking Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseRankingQuestion, true);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Verify the question field validation works for entry survey question type - Ranking Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseRankingQuestion, false);
    await verifyQuestionFieldForQuestionType(page, QuestionTypeEnum.Ranking);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Slider Question - Mandatory", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseSliderQuestion, true);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - Slider Question - Optional", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseSliderQuestion, false);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Verify the question type field validation works for entry survey question type - Slider Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseSliderQuestion, true);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Verify the question field validation works for entry survey question type - Slider Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseSliderQuestion, false);
    await verifyQuestionFieldForQuestionType(page, QuestionTypeEnum.Slider);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - NPS Question - Mandatory", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseNPSQuestion, true);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Create a new event with an entry survey question type - NPS Question - Optional", async ({
    page,
  }) => {
    await createEventWithQuestionType(page, chooseNPSQuestion, false);
    await expect(eventSuccessfulMessage(page)).toBeVisible();
    await expect(shareURLMessage(page)).toBeVisible();
  });

  test("Verify the question type field validation works for entry survey question type - NPS Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseNPSQuestion, true);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });

  test("Verify the question field validation works for entry survey question type - NPS Question", async ({
    page,
  }) => {
    await verifyQuestionValidation(page, chooseNPSQuestion, false);
    await verifyQuestionFieldForQuestionType(page, QuestionTypeEnum.NPS);
    await expect(questionTypeFieldValidationMessage(page)).toBeVisible();
  });
});

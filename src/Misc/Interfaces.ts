export interface FakeResults {
    option1: number;
    option2: number;
}

export interface QuestionModel {
    question: string;
    fakeResult: FakeResults;
}

export interface ListOfQuestions {
    Questions: QuestionModel[];
}



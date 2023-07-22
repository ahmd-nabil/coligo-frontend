import { Question } from "./question.model";

export class Quiz {
    id ?: number;
    courseName ?: string;
    topic ?: string;
    dueTo ?: Date;
    questions ?: Question[];
}
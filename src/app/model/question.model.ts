import { Answer } from "./answer.model";

export class Question {
    id ?: number;
    question ?: string;
    answers ?: Answer[];
}
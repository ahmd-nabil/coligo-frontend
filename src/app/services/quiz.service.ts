import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Quiz } from "../model/quiz";

@Injectable({
    providedIn: "root"
})
export class QuizService {
    readonly QUIZ_API : string = "http://localhost:8080/api/v1/quizzes";

    constructor(private http : HttpClient) {}

    saveQuiz(quiz: Quiz): Observable<any> {
        return this.http.post(this.QUIZ_API, quiz);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class QuizService {
    readonly QUIZ_API : string = "http://localhost:8080/api/v1/quizzes";

    constructor(private http : HttpClient) {}

    saveQuiz(form: FormGroup) {
        if(form.valid) {
            let quiz = form.value;
            this.http.post(this.QUIZ_API, quiz).subscribe(response => response);
        }
    }
}
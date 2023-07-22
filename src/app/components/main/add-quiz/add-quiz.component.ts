import { Component } from '@angular/core';
import { Quiz } from '../../../model/quiz';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  quizForm !: FormGroup;

  constructor(private fb: FormBuilder,
              private quizService: QuizService){
    this.quizForm = this.fb.group({
      courseName: '',
      topic: '',
      dueTo: '',
      questions: this.fb.array([])
    });
  }

  addNewQuiz() {
    if(this.quizForm.valid) {
      let quiz = this.quizForm.value;
      let response;
      this.quizService.saveQuiz(quiz).subscribe(res => response = res);
      console.log(response);
    }
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      question: '',
      answers: this.fb.array([])
    });
    this.questions.push(question);
    this.addAnswer(this.questions.controls.length - 1);
    this.addAnswer(this.questions.controls.length - 1);
  }

  getAnswers(q : number) {
    return (<FormArray>((<FormArray> this.quizForm.get('questions')).controls[q]).get('answers'));;
  }

  addAnswer(q: number) {
    const answer = this.fb.group({
      answer: '',
      correct: [false]
    });
    this.getAnswers(q).push(answer);
  }

  removeAnswer(q: number, a: number) {

  }
}

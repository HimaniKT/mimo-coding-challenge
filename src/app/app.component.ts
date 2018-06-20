import {Component} from "@angular/core";
import {LessonService} from "./lessons.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    lessons:any;
    lessonCount:number = 0;
    currentLesson:any;
    lessonCompleted:any = [];
    lessonFinished:boolean = false;
    enableContinueButton:boolean = false;

    constructor(private lessonsService:LessonService) {
    }

    ngOnInit() {
        this.lessonsService.getLessons().then(
            (lessons) => {
                this.lessons = lessons.lessons;
                this.currentLesson = this.lessons[this.lessonCount];
                this.lessonCompleted.push({
                    lessonId: this.currentLesson.id,
                    startTime: new Date()
                });
            },
            (error) => console.log(error)
        );
    }

    nextLesson(lessonId) {

        if (this.lessons[this.lessons.length - 1].id == lessonId) {
            this.lessonFinished = true;
            this.lessonCompleted.find(l => l.lessonId == lessonId).endTime = new Date();
            localStorage.setItem("lessonCompletion", this.lessonCompleted.toString());
            return;
        }
        this.lessonCompleted.find(l => l.lessonId == lessonId).endTime = new Date();
        this.lessonCount++;
        this.currentLesson = this.lessons[this.lessonCount];
        this.lessonCompleted.push({
            lessonId: this.currentLesson.id,
            startTime: new Date()
        });

    }

    enableContinue(val, lesson) {
        var str = lesson.content.map(a => a.text).toString().replace(/,/g, "");
        this.enableContinueButton = str.substr(lesson.input.startIndex, lesson.input.endIndex) == val ? true : false;

    }
}



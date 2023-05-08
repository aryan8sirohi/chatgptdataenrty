import { Component } from '@angular/core';
import { ApiService } from './Services/api.service';
import { forkJoin } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'Generate-News-Article';
  articleData: any[] = [];
  httpOptions: any;
  httpOptions2: any;
 
  constructor(private apiService: ApiService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + environment.OPENAI_API_KEY
      })
  };
  this.httpOptions2 = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.OPENAI_API_KEY2
    })
};
  }

  Generate() {
    const linkVal = (document.getElementById("articleLink") as HTMLTextAreaElement).value;
    var generateButton=document.getElementById("generateButton") as HTMLButtonElement;
    if (linkVal.length > 10) {
      generateButton.disabled=true;
      const requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": `make a whole new article from this : ${linkVal}` }]
      };
      forkJoin([this.apiService.PostMessage("", requestBody,this.httpOptions), this.apiService.PostMessage("", requestBody,this.httpOptions), this.apiService.PostMessage("", requestBody,this.httpOptions)
      ,this.apiService.PostMessage("", requestBody,this.httpOptions2), this.apiService.PostMessage("", requestBody,this.httpOptions2), this.apiService.PostMessage("", requestBody,this.httpOptions2)]
    )
        .subscribe((result: any) => {
          this.articleData=[];
          this.articleData.push({
            "content": `${result[0].choices[0].message.content}`
          });
          this.articleData.push({
            "content": `${result[1].choices[0].message.content}`
          });
          this.articleData.push({
            "content": `${result[2].choices[0].message.content}`
          });
          this.articleData.push({
            "content": `${result[3].choices[0].message.content}`
          });
          this.articleData.push({
            "content": `${result[4].choices[0].message.content}`
          });
          this.articleData.push({
            "content": `${result[5].choices[0].message.content}`
          });
          generateButton.disabled=false;
        }
        );
    }
  }
}

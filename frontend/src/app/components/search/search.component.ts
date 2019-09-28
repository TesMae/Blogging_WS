import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../analysis.service';
import { Article } from '../../article.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public article_url: string;
  public article: Article;
  public show: Boolean = false;

  constructor(private analysisService: AnalysisService) { }

  public search() {
    var urlObject = {
      'url': this.article_url
    };
    // retrieve the data from the Node API 
    this.analysisService.searchArticle(urlObject).subscribe((data: Article) => {
      this.article = data;
      this.show = true;
      //console.log(typeof this.article[0].long_paragraphs);
    });
  }

  ngOnInit() {
  }

}

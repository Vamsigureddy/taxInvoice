import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-html-articles-newwindow',
  templateUrl: './html-articles-newwindow.component.html',
  styleUrls: ['./html-articles-newwindow.component.css']
})
export class HtmlArticlesNewwindowComponent implements OnInit, OnChanges {

  @Input('windowID') windowID: string;

  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) {

  }


  htmlCode = "";

  ngOnChanges(changes: SimpleChanges): void {
    this.http.get<any>('assets/db/html-articles.json').subscribe(data => {
      this.htmlCode = data.filter((x: any) => x.ID == this.windowID)[0];
    });
  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((paramID) => {

      // Load JSON data
      this.http.get<any>('assets/db/html-articles.json').subscribe(data => {
        this.htmlCode = data.filter((x: any) => x.ID == paramID)[0];
      });


    })

  }


  htmlCode1 = `<h3>HTML List Overview</h3>

  <h4>Unordered Lists (<code>&lt;ul&gt;</code>)</h4>
  <p><strong>Description:</strong> Unordered lists are used to present a collection of items where the order is not important. They are typically displayed with bullet points.</p>
  <p><strong>Example:</strong></p>
  <pre><code>&lt;ul&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
  &lt;/ul&gt;
  </code></pre>
 
  <h4>Ordered Lists (<code>&lt;ol&gt;</code>)</h4>
  <p><strong>Description:</strong> Ordered lists are used to present a collection of items in a sequential order. They are typically displayed with numbers or letters.</p>
  <p><strong>Example:</strong></p>
  <pre><code>&lt;ol&gt;
    &lt;li&gt;First item&lt;/li&gt;
    &lt;li&gt;Second item&lt;/li&gt;
    &lt;li&gt;Third item&lt;/li&gt;
  &lt;/ol&gt;
  </code></pre>
 
  <h4>Description Lists (<code>&lt;dl&gt;</code>)</h4>
  <p><strong>Description:</strong> Description lists are used to present a list of terms and their corresponding descriptions. They are typically displayed with terms followed by their descriptions.</p>
  <p><strong>Example:</strong></p>
  <pre><code>&lt;dl&gt;
    &lt;dt&gt;Term 1&lt;/dt&gt;
    &lt;dd&gt;Description of Term 1&lt;/dd&gt;
    &lt;dt&gt;Term 2&lt;/dt&gt;
    &lt;dd&gt;Description of Term 2&lt;/dd&gt;
    &lt;dt&gt;Term 3&lt;/dt&gt;
    &lt;dd&gt;Description of Term 3&lt;/dd&gt;
  &lt;/dl&gt;
  </code></pre>`



}

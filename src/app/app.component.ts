import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgWordCloudData, AgWordCloudDirective, AgWordCloudModule } from 'angular4-word-cloud-mouse-events';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('word_cloud_chart') word_cloud_chart: AgWordCloudDirective;
  @ViewChild('myIdentifier') myIdentifier: ElementRef;

  public title = 'Nuage de mots';
  public newWord = '';
  public sizeArray = [30, 40, 50, 60, 70, 80];
  public colorArray = ['#00427f', '#3c9845', '#81b444', '#bfd630', '#ffdd37'];
  public canvasWidth: number;
  public canvasHeight: number;
  public word_cloud: Array<AgWordCloudData> = [];
  public options = {
    settings: {
        minFontSize: 30,
        maxFontSize: 80,
        fontFace: 'arial'
    },
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    },
    labels: false // false to hide hover labels
  };

  constructor() {
    // console.log(this.myIdentifier.nativeElement.offsetWidth);
  }
  public ngOnInit() {
    console.log(this.myIdentifier.nativeElement.offsetWidth);
    this.canvasWidth = this.myIdentifier.nativeElement.offsetWidth;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
  public update() {
    if (this.newWord !== '') {
      this.word_cloud.push(
        {
          text: this.newWord,
          size: this.sizeArray[this.randomInt(0, this.sizeArray.length - 1)],
          color: this.colorArray[this.randomInt(0, this.colorArray.length - 1)]
        }
      );
      this.word_cloud_chart.update();
      this.newWord = '';
    }
  }

  public exportPNG() {
    const svg = document.querySelector('#wordCloudSVG');
    const canvas = document.createElement('canvas');

    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;

    const ctx = canvas.getContext('2d');
    const data = new XMLSerializer().serializeToString(svg);

    const DOMURL = window.URL;

    const img = new Image();
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        triggerDownload(imgURI);

        function triggerDownload(imageURI: string) {
          const evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
         });
          const a = document.createElement('a');
          a.setAttribute('download', 'wordcloud.png');
          a.setAttribute('href', imgURI);
          a.setAttribute('target', '_blank');
          a.setAttribute('style', 'font-family: arial');
          a.dispatchEvent(evt);
        }
    };

    img.src = url;
  }
  // updateWordCloud(wordCloud) {
  //   this.word_cloud.length = 0;
  //   const temp = wordCloud.words.map(res => {
  //     return {text: res.word, size: res.score};
  //   });
  //   this.word_cloud.push(...temp);
  //   setTimeout(() => {
  //     this.word_cloud_chart.update();
  //   });
  // }

  // public addWord() {
  //   console.log('newword = ', this.newWord);
  //   const wordData = {
  //     text: this.newWord,
  //     size: 2
  //   };
  //   this.word_cloud.push(wordData);
  // }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { ServicesService } from '../services.service';

 
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {

    this.getNumOfHouses();
    this.getNumOfApartments();

    this.myUsername = localStorage.getItem("myUsername");
    this.isAdmin = localStorage.getItem("typeOfUser");

    if(this.isAdmin != "admin" && this.isAdmin != "agent") this.router.navigate(['/homepage']);

    this.createSvgFigure1("figure#bar1");
    this.createSvgFigure2("figure#bar2");
    this.createSvgFigure3("figure#bar3");
    this.drawBarsFirstChart(this.dataForChart1, this.svg1, 1);
    this.drawBarsSecondChart(this.dataForChart2, this.svg2, 2);
    this.drawBarsThirdChart(this.dataForChart3, this.svg3, 3);
    
  }

  myUsername;
  numOfHouses;
  numOfApartments;
  isAdmin;
  imageDataUrl;
  showCharts;
  done;


  private svg1;
  private svg2;
  private svg3;
  private margin = 50;
  private width = 300 - (this.margin * 2);
  private height = 300 - (this.margin * 2);


  getNumOfHouses()
  {
    this.service.getNumOfHouses().subscribe((ob)=>
    {
      if(ob)
      {
        this.numOfHouses = ob;

      } 
    });
  }

  getNumOfApartments()
  {
    this.service.getNumOfApartments().subscribe((ob)=>
    {
      if(ob)
      {
        this.numOfApartments = ob;
      }

    });

  }

  private createSvgFigure1(nme): void {
    this.svg1 = d3.select(nme)
   .append("svg")
   .attr("width", this.width + (this.margin * 2))
   .attr("height", this.height + (this.margin * 2))
   .append("g")
   .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private createSvgFigure2(nme): void {
  this.svg2 = d3.select(nme)
 .append("svg")
 .attr("width", this.width + (this.margin * 2))
 .attr("height", this.height + (this.margin * 2))
 .append("g")
 .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private createSvgFigure3(nme): void {
  this.svg3 = d3.select(nme)
 .append("svg")
 .attr("width", this.width + (this.margin * 2))
 .attr("height", this.height + (this.margin * 2))
 .append("g")
 .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}


private drawBarsFirstChart(data: any[], svg, done): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.City))
  .padding(0.2);

  // Draw the X-axis on the DOM
  svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 15])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
   svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.City))
  .attr("y", d => y(d.numOf))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.numOf))
  .attr("fill", "#d04a35");
}

private drawBarsSecondChart(data: any[], svg, done): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.KP))
  .padding(0.2);

  // Draw the X-axis on the DOM
  svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 15])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
   svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.KP))
  .attr("y", d => y(d.numOf))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.numOf))
  .attr("fill", "#d04a35");
}

private drawBarsThirdChart(data: any[], svg, done): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Price))
  .padding(0.2);

  // Draw the X-axis on the DOM
  svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 15])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
   svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Price))
  .attr("y", d => y(d.numOf))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.numOf))
  .attr("fill", "#d04a35");
}


private dataForChart1 = [
  {"City": "Belgrade", "numOf": "5", "Released": "2014"},
  {"City": "Novi Sad", "numOf": "3", "Released": "2013"},
  {"City": "Nis", "numOf": "2", "Released": "2016"},
  {"City": "Kragujevac", "numOf": "2", "Released": "2010"},
  {"City": "Cuprija", "numOf": "1", "Released": "2011"},
];



private dataForChart3 = [
  {"Price": "<50k", "numOf": "3", "Released": "2014"},
  {"Price": "50k-100k", "numOf": "2", "Released": "2013"},
  {"Price": "100k-150k", "numOf": "3", "Released": "2016"},
  {"Price": "150k-200k", "numOf": "1", "Released": "2010"},
  {"Price": "200k+", "numOf": "1", "Released": "2011"},
];

private dataForChart2 = [
  {"KP": "Houses", "numOf": 5, "Released": "2014"},
  {"KP": "Apartments", "numOf": 6, "Released": "2013"},
];
}

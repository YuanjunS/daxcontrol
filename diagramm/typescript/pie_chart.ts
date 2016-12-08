/**
 * Created by apple on 11/26/16.
 */
///<reference path="../../scripts/d3.d.ts" />
"use strict"
 module Chart {


     interface TestPieChartData {
         VAST: number;
         InfoVis:number;
         SciVis:number;
         name: string;
     }

     export class PieChart {
         public element: d3.Selection<any>;

         constructor(element: d3.Selection<any>) {
             this.element = element;
         }


         public width = 600;
         public height = 500;
         public radius = Math.min(this.width, this.height) / 2;
         //public color = d3.scale.category20();
         //public outerRadius = 150;// 外半径
         //public innerRadius = 0;//不为0的话，中间有空白

         public render() {
             var color = d3.scale.ordinal<string>()
                 .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

             var arc = d3.svg.arc<d3.layout.pie.Arc<TestPieChartData>>()
                 .outerRadius(this.radius - 10)
                 .innerRadius(this.radius - 70);

             var arc2 = d3.svg.arc<d3.layout.pie.Arc<TestPieChartData>>()
                 .outerRadius(this.radius - 80)
                 .innerRadius(this.radius - 140);

             var arc3 = d3.svg.arc<d3.layout.pie.Arc<TestPieChartData>>()
                 .outerRadius(this.radius - 150)
                 .innerRadius(0);

             var pie = d3.layout.pie<TestPieChartData>()
                 .sort(null)
                 .value(function (d) {
                     return d.VAST;
                 });
             var pie2 = d3.layout.pie<TestPieChartData>()
                 .sort(null)
                 .value(function (d) {
                     return d.InfoVis;
                 });
             var pie3 = d3.layout.pie<TestPieChartData>()
                 .sort(null)
                 .value(function (d) {
                     return d.SciVis;
                 });

             var svg = d3.select("body").append("svg")
                 .attr("width", this.width)
                 .attr("id", "PieChartSVG")
                 .attr("height", this.height)
                 .append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
                 .call(d3.behavior.zoom().scaleExtent([0, 8]).on("zoom",function(){
                     svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
                 }))
                 .append("g");


             d3.csv("../data/dataPieChart.csv", d => ({
                     VAST: +d['VAST'],
                     InfoVis: +d['InfoVis'],
                     SciVis: +d['SciVis'],
                     name: d['name']
                 }),
                 function (error, data) {
                     //console.log(this.d.data.name);
                     var g = svg.selectAll(".arc")
                         .data(pie(data))
                         .enter().append("g")
                         .attr("class", "arc");

                     g.append("path")
                         .attr("d", arc)
                         .style("fill", function (d) {
                             return color(d.data.name);
                         });

                     g.append("text")
                         .attr("transform", function (d) {
                             return "translate(" + arc.centroid(d) + ")";
                         })
                         .attr("dy", ".35em")
                         .style("text-anchor", "middle")
                         .text(function (d) {
                             return d.data.name;
                         });
                     var g2 = svg.selectAll("arc")
                         .data(pie2(data))
                         .enter().append("g")
                         .attr("class", "arc2");

                     g2.append("path")
                         .attr("d", arc2)
                         .style("fill", function (d) {
                             return color(d.data.name);
                         });

                     g2.append("text")
                         .attr("transform", function (d) {
                             return "translate(" + arc2.centroid(d) + ")";
                         })
                         .attr("dy", ".35em")
                         .style("text-anchor", "middle")
                         .text(function (d) {
                             return d.data.name;
                         });
                     var g3 = svg.selectAll("arc")
                         .data(pie3(data))
                         .enter().append("g")
                         .attr("class", "arc3");

                     g3.append("path")
                         .attr("d", arc3)
                         .style("fill", function (d) {
                             return color(d.data.name);
                         });

                     g3.append("text")
                         .attr("transform", function (d) {
                             return "translate(" + arc3.centroid(d) + ")";
                         })
                         .attr("dy", ".35em")
                         .style("text-anchor", "middle")
                         .text(function (d) {
                             return d.data.name;
                         });


                     //});

                 });

         }

     }
 }

document.addEventListener('DOMContentLoaded', function () {

     var piechart1 = new Chart.PieChart(d3.select('#piechart'));

     piechart1.render();

});

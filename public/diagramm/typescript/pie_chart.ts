/**
 * Created by apple on 11/26/16.
 */
///<reference path="../../../scripts/d3.d.ts" />
//<reference path="../../scripts/jquery.d.ts" />
//<reference path="../../scripts/jqueryui.d.ts" />
"use strict"
declare var pieChartName;
(<any>window).pieChartName = [];
let minVal_pie = 1,
    maxVal_pie = 5,
    index_pie=0;
 module Chart {


     interface TestPieChartData {
        keyword:string;
         value: number;
         number:number;
     }

     export class PieChart {
         public element: d3.Selection<any>;

         constructor(element: d3.Selection<any>) {
             this.element = element;
         }


         public width = 500;
         public height = 500;
         public radius = Math.min(this.width, this.height) / 2;
         //public color = d3.scale.category20();
         //public outerRadius = 150;// 外半径
         //public innerRadius = 0;//不为0的话，中间有空白

         public render() {
             var color = d3.scale.ordinal<string>()
                 .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
             index_pie++;
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
                     return d.value;
                 });
             var pie2 = d3.layout.pie<TestPieChartData>()
                 .sort(null)
                 .value(function (d) {

                     return d.value;

                 });
             var pie3 = d3.layout.pie<TestPieChartData>()
                 .sort(null)
                 .value(function (d) {

                     return d.value;
                 });


             var svg = d3.select("body").append("svg")
                 .attr("width", this.width + 120)
                 .attr("id", "PieChartSVG"+index_pie)
                 .attr("height", this.height)
                 .append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
                 .append("g");



             d3.csv("../data/keyword_VAST.csv",
                 function (error, data:any) {
                     data =data.filter(function(v,i){
                         return   (v.number>= minVal_pie && v.number<= maxVal_pie);

                     });

                     $.each(data, function (i, v) {
                         (<any>window).pieChartName.push(v.keyword)
                     });

                     var g = svg.selectAll(".arc")
                         .data(pie(data))
                         .enter().append("g")
                         .attr("class", "arc");

                     g.append("path")
                         .attr("d", arc)
                         .attr('class', function (d) {
                             return 'pie-path pie-' + d.data.keyword
                         })
                         .attr('data-fill', function (d) {
                             return color(d.data.keyword)
                         })
                         .style("fill", function (d) {
                             return color(d.data.keyword);
                         });


                     g.append("text")
                         .attr("transform", function (d) {
                             return "translate(" + arc.centroid(d) + ")";
                         })
                         .attr("dy", ".20em")
                         .style("text-anchor", "middle")
                         .text(function (d) {
                             return d.data.keyword;
                         });

                 });
             d3.csv("../data/keyword_SciVis.csv",
                 function (error, data) {
                     //data = data.slice(i, j);
                     data =data.filter(function(v,i){
                         return   (v.number>= minVal_pie && v.number<= maxVal_pie);

                     });
                     $.each(data, function (i, v) {
                         (<any>window).pieChartName.push(v.keyword);
                     });
                     var g2 = svg.selectAll("arc")
                         .data(pie2(data))
                         .enter().append("g")
                         .attr("class", "arc2");

                     g2.append("path")
                         .attr("d", arc2)
                         .attr('class', function (d) {
                             return 'pie-path pie-' + d.data.keyword
                         })
                         .attr('data-fill', function (d) {
                             return color(d.data.keyword)
                         })
                         .style("fill", function (d) {
                             return color(d.data.keyword);
                         });

                     g2.append("text")
                         .attr("transform", function (d) {
                             return "translate(" + arc2.centroid(d) + ")";
                         })
                         .attr("dy", ".35em")
                         .style("text-anchor", "middle")
                         .text(function (d) {
                             console.log(d.data.keyword);
                             return d.data.keyword;
                         });
                 });

             d3.csv("../data/keyword_InfoVis.csv",
                 function (error, data) {
                     data =data.filter(function(v,i){
                         return   (v.number>= minVal_pie && v.number<= maxVal_pie);

                     });
                    // data = data.slice(i, j);
                     $.each(data, function (i, v) {
                         (<any>window).pieChartName.push(v.keyword);
                     });
                     var g3 = svg.selectAll("arc")
                         .data(pie3(data))
                         .enter().append("g")
                         .attr("class", "arc3");

                     g3.append("path")
                         .attr("d", arc3)
                         .attr('class', function (d) {
                             return 'pie-path pie-' + d.data.keyword
                         })
                         .attr('data-fill', function (d) {
                             return color(d.data.keyword)
                         })
                         .style("fill", function (d) {
                             return color(d.data.keyword);
                         });

                     g3.append("text")
                         .attr("transform", function (d) {
                             return "translate(" + arc3.centroid(d) + ")";
                         })
                         .attr("dy", ".35em")
                         .style("text-anchor", "middle")
                         .text(function (d) {
                             return d.data.keyword;
                         });

                     if (index_pie > 1) {
                         var dex = index_pie - 1;
                         $("#PieChartSVG" + dex).html("").append($("#PieChartSVG" + index_pie))
                     }

                     //});

                 });
             /* zoom behavior with buttons*/
             var zoom = d3.behavior.zoom()
                 .scaleExtent([0, 8])
                 .center([this.width / 2, this.height / 2])
                 .size([this.width / 2, this.height / 2])
                 .on("zoom", zoomed);
             svg.call(zoom);
             function zoomed() {
                 svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
             }

             d3.selectAll("li[zoom_pie]")
                 .on("click", clicked);


             function clicked() {
                 svg.call(zoom.event);
                 var width = 600;
                 var height = 500;
                 // Record the coordinates (in data space) of the center (in screen space).
                 var center0 = [100, 100], translate0 = zoom.translate(), coordinates0 = coordinates(center0);
                 zoom.scale(zoom.scale() * Math.pow(2, +this.getAttribute("zoom_pie")));

                 // Translate back to the center.
                 var center1 = point(coordinates0);
                 zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

                 svg.transition().duration(400).call(zoom.event);
             }

             function coordinates(point) {
                 var scale = zoom.scale(), translate = zoom.translate();
                 return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
             }

             function point(coordinates) {
                 var scale = zoom.scale(), translate = zoom.translate();
                 return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
             }

             /* dragable*/


         }



     }
 }


document.addEventListener('DOMContentLoaded', function () {

    var piechart = new Chart.PieChart(d3.select('#piechart1'));
    ( <any>window).piechart = new Chart.PieChart(d3.select('#piechart1'));
     piechart.render();

});

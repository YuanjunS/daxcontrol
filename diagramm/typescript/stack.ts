/**
 * Created by apple on 11/27/16.
 */
///<reference path="../../scripts/d3.d.ts" />
"use strict"
module Chart {


    export class Stack {
        public element: d3.Selection<any>;

        constructor(element: d3.Selection<any>) {
            this.element = element;
        }

        public render() {
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 650 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
               .rangeRoundBands([0, width],.1);

            var y = d3.scale.linear()
                .rangeRound([height, 0]);

            var color = d3.scale.ordinal<string>()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var xAxis = d3.svg.axis()
                .scale(x)

                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"));

           // var zoom = d3.behavior.zoom()
                //.x(x)
                //.y(y)
               // .scaleExtent([1, 10])
                //.on("zoom", zoomed);


            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(d3.behavior.zoom().scaleExtent([0, 8]).on("zoom",function(){
                    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
                }));

            d3.csv("../data/Line_Stack.csv", function (error: any, data: any) {
                color.domain(d3.keys(data[0]).filter(function (key) {
                    return key !== "year";
                }));

                data.forEach(function (d: any) {
                    var y0 = 0;
                    d.ages = color.domain().map(function (name) {
                        return {name: name, y0: y0, y1: y0 += +d[name]};
                    });
                    d.total = d.ages[d.ages.length - 1].y1;
                });

                data.sort(function (a: any, b: any) {
                    return b.total - a.total;
                });

                x.domain(data.map(function (d: any) {
                    return d.year;
                }));
                y.domain([0, d3.max(data, function (d: { total: number }) {
                    return d.total;
                })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")

                    .call(xAxis);
                svg.select(".x.axis")
                    .style("font-size","8px");

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 100)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    //.text("PaperNumber");

                var state = svg.selectAll(".year")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "g")
                    .attr("transform", function (d: any) {
                        return "translate(" + x(d.year) + ",0)";
                    });

                state.selectAll("rect")
                    .data(function (d: any) {
                        return d.ages;
                    })
                    .enter().append("rect")
                    .attr("width", x.rangeBand())
                    .attr("y", function (d: any) {
                        return y(d.y1);
                    })
                    .attr("height", function (d: any) {
                        return y(d.y0) - y(d.y1);
                    })
                    .style("fill", function (d: any) {
                        return color(d.name);
                    });

                var legend = svg.selectAll(".legend")
                    .data(color.domain().reverse())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
                        return "translate(0," + i * 20 + ")";
                    });

                legend.append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", color);

                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function (d) {
                        return d;
                    });

            });
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {

    var stack = new Chart.Stack(d3.select('#stack'));

    stack.render();

});

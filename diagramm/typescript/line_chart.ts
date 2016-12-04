/**
 * Created by apple on 11/28/16.
 */

///<reference path="../../scripts/d3.d.ts" />
"use strict"
module Chart {


    export class LineChart {
        public element: d3.Selection<any>;

        constructor(element: d3.Selection<any>) {
            this.element = element;
        }

        public render() {
            var margin = {top: 100, right: 20, bottom: 30, left: 50},
                width = 600 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

           var parseDate = d3.time.format("%d-%b-%y").parse;

            var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var
                xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

            var
                yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

            var
                line = d3.svg.line<{ year: number; papernumber: number }>()
                    .x(function (d) {
                        return x(d.year);
                    })
                    .y(function (d) {
                        return y(d.papernumber);
                    });

            var
                svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv(
                    "../data/data1.csv"
                    ,
                    function (error: any, data: any) {
                        data.forEach(function (d: any) {
                            //d.year = parseDate(d.year);
                            d.close = +d.papernumber;
                        });

                        x.domain(d3.extent(data, function (d: any) {
                            return d.year;
                        }));
                        y.domain(d3.extent(data, function (d: any) {
                            return d.papernumber;
                        }));

                        svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + height + ")")
                            .call(xAxis);

                        svg.append("g")
                            .attr("class", "y axis")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", 6)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text("Papernumber");

                        svg.append("path")
                            .datum(data)
                            .attr("class", "line")
                            .attr("d", line);
                    }
                );

        }
    }
}
document.addEventListener('DOMContentLoaded', function () {

    var stack = new Chart.LineChart(d3.select('#linechart'));

    stack.render();

});
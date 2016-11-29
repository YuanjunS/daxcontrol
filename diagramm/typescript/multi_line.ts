/**
 * Created by mls on 2016/11/28.
 */
///<reference path="../../scripts/d3.d.ts" />
"use strict"
module Chart {
    export class MultiLine {

        public element: d3.Selection<any>;

        constructor(element: d3.Selection<any>) {
            this.element = element;
        }

        public render() {
            var margin = {top: 100, right: 20, bottom: 30, left: 50},
                width = 600 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%d-%b-%y").parse;

            var xScale = d3.time.scale()
                .range([0, width]);

            var yScale = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

            var svg = d3.select("body")
                     .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var line = d3.svg.line<{ year: number; papernumber: number }>()
                .x(function (d:any) {
                    return xScale(d.year);
                })
                .y(function (d:any) {
                    return yScale(d.papernumber);
                })
                // 选择线条的类型
                .interpolate("linear");

            d3.csv(
                "../data/data1.csv",

                function (error: any, data: any) {
                    data.forEach(function (d: any) {
                        //d.year = parseDate(d.year);
                        d.close = +d.papernumber;
                    });
                    xScale.domain(d3.extent(data, function (d: any) {
                        return d.year;
                    }));
                    yScale.domain(d3.extent(data, function (d: any) {
                        return d.papernumber;
                    }));

                    g.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    g.append("g")
                        .attr("class", "axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Papernumber");

                    // 添加path元素，并通过line()计算出值来赋值
                    g.append("path")
                        .datum(data)
                        .attr("class", "line")
                        .attr("fill","none")
                        .attr("stroke", "green")
                        .attr("d", line);
                    // 添加点
                    g.selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("cx", function (d:any) {
                            return xScale(d.year);
                        })
                        .attr("cy", function (d:any) {
                            return yScale(d.papernumber);
                        })
                        .attr("r", 3.5)
                        .attr("stroke","green")
                        .attr("fill","white");
                }
            );

        }
    }
}
document.addEventListener('DOMContentLoaded', function () {

    var mult = new Chart.MultiLine(d3.select('#multiline'));

    mult.render();
});

/**
 * Created by mls on 2016/11/28.
 */
///<reference path="../../scripts/d3.d.ts"/>
    "use strict"

module Chart {
    export class Multiline {

        public element: d3.Selection<any>;

        constructor(element: d3.Selection<any>) {
            this.element = element;
        }

        public render() {
            var margin = {top: 100, right: 50, bottom: 30, left: 50},
                width = 650 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%d-%b-%y").parse;

            var xScale = d3.scale.linear()
                .range([0, width]);

            var yScale = d3.scale.linear()
                .range([height, 0]);

            var zScale = d3.scale.category10();

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
                "../data/Line_Stack.csv",

                function (error: any, data: any) {

                    data.forEach(function (d: any) {
                        //d.year = parseDate(d.year);
                        d.papernumber = +d.papernumber;
                    });

                    zScale.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

                    var conferences = zScale.domain().map(function(name) {
                        return {
                            name: name,
                            values: data.map(function(d) {
                                return {year: d.year, papernumber: +d[name]};
                            })
                        }
                    });

                    xScale.domain(d3.extent(data, function (d: any) {
                        return d.year;
                    }));
                    yScale.domain([d3.min(conferences, function(c:any) {
                        return d3.min(c.values, function(v:any) {
                            return v.papernumber; }); }),
                        d3.max(conferences, function(c:any) {
                            return d3.max(c.values, function(v:any) {
                            return v.papernumber; });
                    })]);

                    g.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    g.append("g")
                        .attr("class", "axis")
                        .call(yAxis);
                        /*.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Papernumber");*/

                    var conference = g.selectAll(".conference")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .data(conferences)
                        .enter().append("g")
                        .attr("class", "conference");


                    // 添加path元素，并通过line()计算出值来赋值
                    conference.append("path")
                        .attr("class", "line")
                        .attr("d", function(d) { return line(d.values); })
                        .style("stroke", function(d) { return zScale(d.name); })
                        .attr("fill","none");
                    conference.append("text")
                        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                        .attr("transform", function(d) {
                            return "translate(" + xScale(d.value.year) + "," + yScale(d.value.papernumber) + ")";
                        })
                        .attr("x", 3)
                        .attr("dy", ".35em")
                        .text(function(d) { return d.name });
                    // 添加点
                    /*conference.selectAll("circle")
                        .data(function(d) { return d; })
                        .enter()
                        .append("circle")
                        .attr("cx", function (d:any) {
                            return xScale(d.year);
                        })
                        .attr("cy", function (d:any) {
                            return yScale(d.papernumber);
                        })
                        .attr("r", 3.5)
                        .style("stroke", function(d:any) { return zScale(d.name); })
                        .attr("fill","white");*/
                }
            );
            /* zoom function with button*/
            var zoom = d3.behavior.zoom()
                .scaleExtent([0, 8])
                .center([width / 2, height / 2])
                .size([width, height])
                .on("zoom", zoomed);

            function zoomed() {
                g.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }

            svg.call(zoom);

        }
    }
}
document.addEventListener('DOMContentLoaded', function () {

    var mult = new Chart.Multiline(d3.select('#multiline'));

    mult.render();


});





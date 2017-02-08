/**
 * Created by apple on 11/27/16.
 */
///<reference path="../../../scripts/d3.d.ts" />
//<reference path="../../scripts/jquery.d.ts" />
//<reference path="../../scripts/jqueryui.d.ts" />
"use strict";
var minVal = 0, maxVal = 99999999, index = 0;
window.stackChartName = [];
var Chart;
(function (Chart) {
    var Stack = (function () {
        function Stack(element) {
            this.element = element;
        }
        Stack.prototype.render = function () {
            // var self = this;
            var margin = { top: 20, right: 20, bottom: 30, left: 40 }, width = 650 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);
            var y = d3.scale.linear()
                .rangeRound([height, 0]);
            var color = d3.scale.ordinal()
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
            index++;
            var svg = d3.select("body").append("svg").attr('id', 'svgStack' + index)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }));
            d3.csv("../data/Line_Stack.csv", function (error, data) {
                if (index > 1) {
                    var dex = index - 1;
                    $("#svgStack" + dex).html("").append($("#svgStack" + index));
                }
                color.domain(d3.keys(data[0]).filter(function (key) {
                    return key !== "year";
                }));
                data = data.filter(function (v, i) {
                    return (v.year > minVal && v.year < maxVal);
                });
                // data=$.grep(data, function (v, i) {
                //      if (v.year > minVal && v.year < maxVal) {
                //          return true;
                //      }
                //  });
                $.each(data, function (i, v) {
                    window.stackChartName.push(v.year);
                });
                data.forEach(function (d) {
                    var y0 = 0;
                    d.ages = color.domain().map(function (name) {
                        return { name: name, y0: y0, y1: y0 += +d[name], year: d.year };
                    });
                    d.total = d.ages[d.ages.length - 1].y1;
                });
                data.sort(function (a, b) {
                    return b.total - a.total;
                });
                x.domain(data.map(function (d) {
                    return d.year;
                }));
                y.domain([0, d3.max(data, function (d) {
                        return d.total;
                    })]);
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                svg.select(".x.axis")
                    .style("font-size", "8px");
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 100)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end");
                //.text("PaperNumber");
                var state = svg.selectAll(".year")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "g")
                    .attr("transform", function (d) {
                    return "translate(" + x(d.year) + ",0)";
                });
                state.selectAll("rect")
                    .data(function (d) {
                    return d.ages;
                })
                    .enter().append("rect")
                    .attr("width", x.rangeBand())
                    .attr("y", function (d) {
                    return y(d.y1);
                })
                    .attr("height", function (d) {
                    return y(d.y0) - y(d.y1);
                })
                    .attr('class', function (d) { return 'stack-path stack-' + d.year; })
                    .attr('data-fill', function (d) { return color(d.name); })
                    .style("fill", function (d) {
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
            var zoom = d3.behavior.zoom()
                .scaleExtent([1, 8])
                .size([width, height])
                .on("zoom", zoomed);
            function zoomed() {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }
            svg.call(zoom);
            d3.selectAll("li[zoom_stack]")
                .on("click", clicked);
            function clicked() {
                svg.call(zoom.event);
                var margin = { top: 20, right: 50, bottom: 30, left: 100 }, width = 650 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
                // Record the coordinates (in data space) of the center (in screen space).
                var center0 = [-300, 100], translate0 = zoom.translate(), coordinates0 = coordinates(center0);
                zoom.scale(zoom.scale() * Math.pow(2, +this.getAttribute("zoom_stack")));
                // Translate back to the center.
                var center1 = point(coordinates0);
                zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);
                svg.transition().duration(300).call(zoom.event);
            }
            function coordinates(point) {
                var scale = zoom.scale(), translate = zoom.translate();
                return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
            }
            function point(coordinates) {
                var scale = zoom.scale(), translate = zoom.translate();
                return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
            }
        };
        return Stack;
    }());
    Chart.Stack = Stack;
})(Chart || (Chart = {}));
document.addEventListener('DOMContentLoaded', function () {
    var stack = new Chart.Stack(d3.select('#graph'));
    window.stack = new Chart.Stack(d3.select('#graph'));
    stack.render();
});
//# sourceMappingURL=stack.js.map
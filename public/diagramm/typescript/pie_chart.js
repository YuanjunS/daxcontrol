/**
 * Created by apple on 11/26/16.
 */
///<reference path="../../../scripts/d3.d.ts" />
//<reference path="../../scripts/jquery.d.ts" />
//<reference path="../../scripts/jqueryui.d.ts" />
"use strict";
window.pieChartName = [];
var minVal_pie = 1, maxVal_pie = 5, index_pie = 0;
var Chart;
(function (Chart) {
    var PieChart = (function () {
        function PieChart(element) {
            this.width = 500;
            this.height = 500;
            this.radius = Math.min(this.width, this.height) / 2;
            this.element = element;
        }
        //public color = d3.scale.category20();
        //public outerRadius = 150;// 外半径
        //public innerRadius = 0;//不为0的话，中间有空白
        PieChart.prototype.render = function () {
            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            index_pie++;
            var arc = d3.svg.arc()
                .outerRadius(this.radius - 10)
                .innerRadius(this.radius - 70);
            var arc2 = d3.svg.arc()
                .outerRadius(this.radius - 80)
                .innerRadius(this.radius - 140);
            var arc3 = d3.svg.arc()
                .outerRadius(this.radius - 150)
                .innerRadius(0);
            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                return d.value;
            });
            var pie2 = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                return d.value;
            });
            var pie3 = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                return d.value;
            });
            var svg = d3.select("body").append("svg")
                .attr("width", this.width + 120)
                .attr("id", "PieChartSVG" + index_pie)
                .attr("height", this.height)
                .append("g")
                .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
                .append("g");
            d3.csv("../data/keyword_VAST.csv", function (error, data) {
                data = data.filter(function (v, i) {
                    return (v.number >= minVal_pie && v.number <= maxVal_pie);
                });
                $.each(data, function (i, v) {
                    window.pieChartName.push(v.keyword);
                });
                var g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");
                g.append("path")
                    .attr("d", arc)
                    .attr('class', function (d) {
                    return 'pie-path pie-' + d.data.keyword;
                })
                    .attr('data-fill', function (d) {
                    return color(d.data.keyword);
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
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0.0);
                g.on("mouseover", function (d) {
                    /*
                     鼠标移入时，
                     （1）通过 selection.html() 来更改提示框的文字
                     （2）通过更改样式 left 和 top 来设定提示框的位置
                     （3）设定提示框的透明度为1.0（完全不透明）
                     */
                    tooltip.html("The frequency of " + d.data.keyword + "<br />" + d.data.value)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 1.0);
                })
                    .on("mousemove", function (d) {
                    /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
                    tooltip.style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px");
                })
                    .on("mouseout", function (d) {
                    /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
                    tooltip.style("opacity", 0.0);
                });
            });
            d3.csv("../data/keyword_SciVis.csv", function (error, data) {
                //data = data.slice(i, j);
                data = data.filter(function (v, i) {
                    return (v.number >= minVal_pie && v.number <= maxVal_pie);
                });
                $.each(data, function (i, v) {
                    window.pieChartName.push(v.keyword);
                });
                var g2 = svg.selectAll("arc")
                    .data(pie2(data))
                    .enter().append("g")
                    .attr("class", "arc2");
                g2.append("path")
                    .attr("d", arc2)
                    .attr('class', function (d) {
                    return 'pie-path pie-' + d.data.keyword;
                })
                    .attr('data-fill', function (d) {
                    return color(d.data.keyword);
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
                    return d.data.keyword;
                });
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0.0);
                g2.on("mouseover", function (d) {
                    /*
                     鼠标移入时，
                     （1）通过 selection.html() 来更改提示框的文字
                     （2）通过更改样式 left 和 top 来设定提示框的位置
                     （3）设定提示框的透明度为1.0（完全不透明）
                     */
                    tooltip.html("The frequency of " + d.data.keyword + "<br />" + d.data.value)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 1.0);
                })
                    .on("mousemove", function (d) {
                    /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
                    tooltip.style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px");
                })
                    .on("mouseout", function (d) {
                    /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
                    tooltip.style("opacity", 0.0);
                });
            });
            d3.csv("../data/keyword_InfoVis.csv", function (error, data) {
                data = data.filter(function (v, i) {
                    return (v.number >= minVal_pie && v.number <= maxVal_pie);
                });
                // data = data.slice(i, j);
                $.each(data, function (i, v) {
                    window.pieChartName.push(v.keyword);
                });
                var g3 = svg.selectAll("arc")
                    .data(pie3(data))
                    .enter().append("g")
                    .attr("class", "arc3");
                g3.append("path")
                    .attr("d", arc3)
                    .attr('class', function (d) {
                    return 'pie-path pie-' + d.data.keyword;
                })
                    .attr('data-fill', function (d) {
                    return color(d.data.keyword);
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
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0.0);
                g3.on("mouseover", function (d) {
                    tooltip.html("The frequency of " + d.data.keyword + "<br />" + d.data.value)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 1.0);
                })
                    .on("mousemove", function (d) {
                    tooltip.style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px");
                })
                    .on("mouseout", function (d) {
                    tooltip.style("opacity", 0.0);
                });
                if (index_pie > 1) {
                    var dex = index_pie - 1;
                    $("#PieChartSVG" + dex).html("").append($("#PieChartSVG" + index_pie));
                }
                //});
            });
            var legenddata = ["VAST", "SciVis", "InfoVis"];
            var legend = svg.selectAll(".legend")
                .data(legenddata)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });
            legend.append("text")
                .attr("x", this.width - 200)
                .attr("y", -225)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) {
                return d;
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
        };
        return PieChart;
    }());
    Chart.PieChart = PieChart;
})(Chart || (Chart = {}));
document.addEventListener('DOMContentLoaded', function () {
    var piechart = new Chart.PieChart(d3.select('#piechart1'));
    window.piechart = new Chart.PieChart(d3.select('#piechart1'));
    piechart.render();
});
//# sourceMappingURL=pie_chart.js.map
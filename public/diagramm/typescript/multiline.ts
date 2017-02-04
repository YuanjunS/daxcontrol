/**
 * Created by mls on 2016/11/28.
 */
///<reference path="../../../scripts/d3.d.ts"/>
"use strict"
let begin=0,
    end = 1000000;

module Chart {
    // import stack = d3.layout.stack;
    import stack = Chart.Stack;


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
                        .attr("class", function(d,i){
                            return 'conference conference'+i
                        });


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


                    // //////

                    $( "#slider-range" ).slider({
                        range: true,
                        min: 1990,
                        max: 2014,
                        values: [ 1990, 2014 ],
                        slide: function( event, ui ) {

                            $( "#amount" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );

                            var begin = ui.values[0];
                            var end = ui.values[1];
                            zoom(begin, end);

                            minVal = ui.values[0];
                            maxVal = ui.values[1];

                            var stack = new Chart.Stack(d3.select('#graph'));
                            stack.render();


                        }
                    });

                    function zoom(begin, end) {

                        xScale.domain([begin, end - 1]);
                        svg.select(".axis").call(xAxis);
                        svg.select('.conference0 .line').attr("d", line(conferences[0].values));
                        svg.select('.conference1 .line').attr("d", line(conferences[1].values));
                        svg.select('.conference2 .line').attr("d", line(conferences[2].values));
                        svg.select('.conference3 .line').attr("d", line(conferences[3].values));
                    }
                    /////////

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

            d3.selectAll("li[zoom_multi]")
                .on("click", clicked);



            function clicked() {
                svg.call(zoom.event);
                var width = 600;
                var height = 500;
                // Record the coordinates (in data space) of the center (in screen space).
                var center0 = [100, 100], translate0 = zoom.translate(), coordinates0 = coordinates(center0);
                zoom.scale(zoom.scale() * Math.pow(2, +this.getAttribute("zoom_multi")));

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



        }

    }
}
document.addEventListener('DOMContentLoaded', function () {


        var mult = new Chart.Multiline(d3.select('#multiline'));

    mult.render();


});

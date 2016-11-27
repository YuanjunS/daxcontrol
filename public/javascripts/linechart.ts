///<reference path="../scripts/d3.d.ts"/>
"use strict"

module Chart {

    export class lines {
        public element:d3.Selection<any>;

        constructor(element:d3.Selection<any>){
            this.element =element;
        }

        public cwidth = 800;
        public cheight=400;
        public paddingTop=50;
        public paddingLeft=50;
        public paddingRight=50;
        public paddingBottom=50;

        public render(data: any) {

            var svg = d3.select("svg")
                .attr('width',this.cwidth + paddingLeft + paddingRight)
                .attr('height',this.cheight + paddingTop + paddingBottom);

            var g = svg.append("svg")
                .attr("transform", "translate(" + paddingLeft + "," + paddingTop+ ")");

            var maxX = d3.max(data, (d) => d3.max(d.data, (d) => d.x));
            var maxY = d3.max(data, (d) => d3.max(d.data, (d) => d.y));

            var xScale = d3.scale.linear()
                .domain([0, maxX])
                .range([0, this.cwidth]);

            var yScale = d3.scale.linear()
                .domain([0, maxY])
                .range([this.cheight,0]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

            g.append("g")
                .attr("class","axis")
                .attr("transform","translate(0,"+this.cheight+")")
                .call(xAxis);

            g.append("g")
                .attr("class","axis")
                .call(yAxis);

            var line = d3.svg.line()
                .x(function(d) {
                    return xScale(d.x);
                })
                .y(function(d) {
                    return yScale(d.y);
                })
                // 选择线条的类型
                .interpolate("linear");
            // 添加path元素，并通过line()计算出值来赋值
            g.append("path")
                .attr("class", "line")
                .attr("stroke","green")
                .attr("d", line(data));

            // 添加点
            g.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return xScale(d.x);
                })
                .attr("cy", function(d) {
                    return yScale(d.y);
                })
                .attr("r", 5)
                .attr("fill", function(d, i) {
                    return getColor(i);
                });
        }
    }
}

var dataset = [
    {x: 0, y: 11}, {x: 1, y: 35},
    {x: 2, y: 23}, {x: 3, y: 78},
    {x: 4, y: 55}, {x: 5, y: 18},
    {x: 6, y: 98}, {x: 7, y: 100},
    {x: 8, y: 22}, {x: 9, y: 65}];
document.addEventListener('DOMContentLoaded', function (){
    var linechart = new Chart.lines(d3.select('#linechart'));
    linechart.render(dataset);
});
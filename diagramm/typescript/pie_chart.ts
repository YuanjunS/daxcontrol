/**
 * Created by apple on 11/26/16.
 */
///<reference path="../../scripts/d3.d.ts" />
"use strict"
 module Chart {



    export class PieChart {
        public element: d3.Selection<any>;

        constructor(element: d3.Selection<any>) {
            this.element = element;
        }



        public width = 500;
        public height = 500;
        public color= d3.scale.category10();
        public outerRadius = 150;// 外半径
        public innerRadius = 0;//不为0的话，中间有空白

        public render(dataset:any) {
            var svg = d3.select("body")
                .append('svg')
                .attr('width', this.width)
                .attr('height', this.height);


            var pie = d3.layout.pie();
               /* .value(function (d) {
                    return d[1]
                });// 布局*/

            var piedata = pie(dataset);//输出的是转化后的比例


            var arc = d3.svg.arc()//弧生成器
                .innerRadius(this.innerRadius)
                .outerRadius(this.outerRadius);

            var str=this.color.range();

            var arcs = svg.selectAll("g")
                .data(piedata)
                .enter()
                .append("g")
                .attr("transform", "translate(" + (this.width / 2) + "," + (this.width / 2) + ")");

            arcs.append("path")
                .attr("fill", function (d, i) {
                        return str[i];
                    }
                )
                .attr("d", function (d) {
                        return arc(d);
                    }
                );


            arcs.append("text")
                .attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    }
                )
                .attr("text-anchor", "middle")
                .text(function (d) {
                        return d.data;
                    }
                );
            var str=this.color.range();
            console.log(str[1]);
            console.log(dataset);

            console.log(piedata);

           /* var
             tooltip = d3.select("body")
             .append("div")
             .attr("class", "tooltip")
             .style("opacity", 0.0);

             arcs
             .on(
             "mouseover"
             ,
             function (d) {
             /*
             鼠标移入时，
             （1）通过 selection.html() 来更改提示框的文字
             （2）通过更改样式 left 和 top 来设定提示框的位置
             （3）设定提示框的透明度为1.0（完全不透明）


             tooltip.html("The percent of" + d.data[0] + "<br />" + d.data[1] + "%")
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY + 20) + "px")
             .style("opacity", 1.0);
             }
             )
             .on(
             "mousemove"
             ,
             function (d) {
             /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置

             tooltip.style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY + 20) + "px");
             }
             )
             .on(
             "mouseout"
             ,
             function (d) {
             /* 鼠标移出时，将透明度设定为0.0（完全透明)

             tooltip.style("opacity", 0.0);
             }
             );
             }*/
        }
    }
}
var data = [30,10,43,55,13];
document.addEventListener('DOMContentLoaded', function () {

     var piechart1 = new Chart.PieChart(d3.select('#piechart'));

     piechart1.render(data);

});

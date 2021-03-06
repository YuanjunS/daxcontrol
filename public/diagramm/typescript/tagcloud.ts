/**
 * Created by mls on 2016/11/29.
 */
///<reference path="../../../scripts/d3.d.ts"/>
//<reference path="../../scripts/jquery.d.ts" />
//<reference path="../../scripts/jqueryui.d.ts" />
"use strict"
declare var tagCloudName;
(<any>window).tagCloudName = [];
let ind = 0,
    path = "/data/keyword.csv",
    c = 0;
module Chart{
    interface T{
        keyword?:string[];
        text?:any;
        size?:number;

    }
    export class TagCloud{

        public element: d3.Selection<any>;
        constructor(element: d3.Selection<any>) {
            this.element = element;
        }

        public render(){
            function cloud()  {
                var size = [150, 150],
                    text = cloudText,
                    font = cloudFont,
                    fontSize = cloudFontSize,
                    fontStyle = cloudFontNormal,
                    fontWeight = cloudFontNormal,
                    rotate = cloudRotate,
                    padding = cloudPadding,
                    spiral = archimedeanSpiral,
                    words = [],
                    timeInterval = Infinity,
                    event:any = d3.dispatch("word", "end"),
                    timer = null,
                    cloud:any = {};

                cloud.start = function(){
                    var board = zeroArray((size[0] >> 5) * size[1]),
                        bounds = null,
                        n = words.length,
                        i = -1,
                        tags = [],
                        data = words.map(function(d, i) {
                            d.text = text.call(this, d, i);
                            d.font = font.call(this, d, i);
                            d.style = fontStyle.call(this, d, i);
                            d.weight = fontWeight.call(this, d, i);
                            d.rotate = rotate.call(this, d, i);
                            d.size = ~~fontSize.call(this, d, i);
                            d.padding = padding.call(this, d, i);
                            return d;
                        }).sort(function(a, b) { return b.size - a.size; });

                    if (timer) clearInterval(timer);
                    timer = setInterval(step, 0);
                    step();

                    return cloud;

                    function step() {
                        var start = +new Date,
                            d;
                        while (+new Date - start < timeInterval && ++i < n && timer) {
                            d = data[i];
                            d.x = (size[0] * (Math.random() + .5)) >> 1;
                            d.y = (size[1] * (Math.random() + .5)) >> 1;
                            cloudSprite(d, data, i);
                            if (d.hasText && place(board, d, bounds)) {
                                tags.push(d);
                                event.word(d);
                                if (bounds) cloudBounds(bounds, d);
                                else bounds = [{x: d.x + d.x0, y: d.y + d.y0}, {x: d.x + d.x1, y: d.y + d.y1}];
                                // Temporary hack
                                d.x -= size[0] >> 1;
                                d.y -= size[1] >> 1;
                            }
                        }
                        if (i >= n) {
                            cloud.stop();
                            event.end(tags, bounds);
                        }
                    }
                }

                cloud.stop = function() {
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                    return cloud;
                };

                cloud.timeInterval = function(x) {
                    if (!arguments.length) return timeInterval;
                    timeInterval = x == null ? Infinity : x;
                    return cloud;
                };

                function place(board, tag, bounds) {
                    var perimeter = [{x: 0, y: 0}, {x: size[0], y: size[1]}],
                        startX = tag.x,
                        startY = tag.y,
                        maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
                        s = spiral(size),
                        dt = Math.random() < .5 ? 1 : -1,
                        t = -dt,
                        dxdy,
                        dx,
                        dy;

                    while (dxdy = s(t += dt)) {
                        dx = ~~dxdy[0];
                        dy = ~~dxdy[1];

                        if (Math.min(dx, dy) > maxDelta) break;

                        tag.x = startX + dx;
                        tag.y = startY + dy;

                        if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
                            tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
                        // TODO only check for collisions within current bounds.
                        if (!bounds || !cloudCollide(tag, board, size[0])) {
                            if (!bounds || collideRects(tag, bounds)) {
                                var sprite = tag.sprite,
                                    w = tag.width >> 5,
                                    sw = size[0] >> 5,
                                    lx = tag.x - (w << 4),
                                    sx = lx & 0x7f,
                                    msx = 32 - sx,
                                    h = tag.y1 - tag.y0,
                                    x = (tag.y + tag.y0) * sw + (lx >> 5),
                                    last;
                                for (var j = 0; j < h; j++) {
                                    last = 0;
                                    for (var i = 0; i <= w; i++) {
                                        board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
                                    }
                                    x += sw;
                                }
                                delete tag.sprite;
                                return true;
                            }
                        }
                    }
                    return false;
                }

                cloud.words = function(x) {
                    if (!arguments.length) return words;
                    words = x;
                    return cloud;
                };

                cloud.size = function(x) {
                    if (!arguments.length) return size;
                    size = [+x[0], +x[1]];
                    return cloud;
                };

                cloud.font = function(x) {
                    if (!arguments.length) return font;
                    font = d3.functor(x);
                    return cloud;
                };

                cloud.fontStyle = function(x) {
                    if (!arguments.length) return fontStyle;
                    fontStyle = d3.functor(x);
                    return cloud;
                };

                cloud.fontWeight = function(x) {
                    if (!arguments.length) return fontWeight;
                    fontWeight = d3.functor(x);
                    return cloud;
                };

                cloud.rotate = function(x) {
                    if (!arguments.length) return rotate;
                    rotate = d3.functor(x);
                    return cloud;
                };

                cloud.text = function(x) {
                    if (!arguments.length) return text;
                    text = d3.functor(x);
                    return cloud;
                };

                cloud.spiral = function(x) {
                    if (!arguments.length) return spiral;
                    spiral = spirals[x + ""] || x;
                    return cloud;
                };

                cloud.fontSize = function(x) {
                    if (!arguments.length) return fontSize;
                    fontSize = d3.functor(x);
                    return cloud;
                };

                cloud.padding = function(x) {
                    if (!arguments.length) return padding;
                    padding = d3.functor(x);
                    return cloud;
                };

                return d3.rebind(cloud, event, "on");
            }

            function cloudText(d) {
                return d.text;
            }

            function cloudFont() {
                return "serif";
            }

            function cloudFontNormal() {
                return "normal";
            }

            function cloudFontSize(d) {
                return Math.sqrt(d.value);
            }

            function cloudRotate() {
                return (~~(Math.random() * 6) - 3) * 30;
            }

            function cloudPadding() {
                return 1;
            }

            // Fetches a monochrome sprite bitmap for the specified text.
            // Load in batches for speed.
            function cloudSprite(d, data, di) {
                if (d.sprite) return;
                c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
                var x = 0,
                    y = 0,
                    maxh = 0,
                    n = data.length;
                --di;
                while (++di < n) {
                    d = data[di];
                    c.save();
                    c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
                    var w = c.measureText(d.text + "m").width * ratio,
                        h = d.size << 1;
                    if (d.rotate) {
                        var sr = Math.sin(d.rotate * cloudRadians),
                            cr = Math.cos(d.rotate * cloudRadians),
                            wcr = w * cr,
                            wsr = w * sr,
                            hcr = h * cr,
                            hsr = h * sr;
                        w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
                        h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
                    } else {
                        w = (w + 0x1f) >> 5 << 5;
                    }
                    if (h > maxh) maxh = h;
                    if (x + w >= (cw << 5)) {
                        x = 0;
                        y += maxh;
                        maxh = 0;
                    }
                    if (y + h >= ch) break;
                    c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
                    if (d.rotate) c.rotate(d.rotate * cloudRadians);
                    c.fillText(d.text, 0, 0);
                    if (d.padding) c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0);
                    c.restore();
                    d.width = w;
                    d.height = h;
                    d.xoff = x;
                    d.yoff = y;
                    d.x1 = w >> 1;
                    d.y1 = h >> 1;
                    d.x0 = -d.x1;
                    d.y0 = -d.y1;
                    d.hasText = true;
                    x += w;
                }
                var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
                    sprite = [];
                while (--di >= 0) {
                    d = data[di];
                    if (!d.hasText) continue;
                    var w:number = d.width,
                        w32 = w >> 5,
                        h = d.y1 - d.y0;
                    // Zero the buffer
                    for (var i = 0; i < h * w32; i++) sprite[i] = 0;
                    x = d.xoff;
                    if (x == null) return;
                    y = d.yoff;
                    var seen = 0,
                        seenRow = -1;
                    for (var j = 0; j < h; j++) {
                        for (var i = 0; i < w; i++) {
                            var k = w32 * j + (i >> 5),
                                m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
                            sprite[k] |= m;
                            seen |= m;
                        }
                        if (seen) seenRow = j;
                        else {
                            d.y0++;
                            h--;
                            j--;
                            y++;
                        }
                    }
                    d.y1 = d.y0 + seenRow;
                    d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
                }
            }

            // Use mask-based collision detection.
            function cloudCollide(tag, board, sw) {
                sw >>= 5;
                var sprite = tag.sprite,
                    w = tag.width >> 5,
                    lx = tag.x - (w << 4),
                    sx = lx & 0x7f,
                    msx = 32 - sx,
                    h = tag.y1 - tag.y0,
                    x = (tag.y + tag.y0) * sw + (lx >> 5),
                    last;
                for (var j = 0; j < h; j++) {
                    last = 0;
                    for (var i = 0; i <= w; i++) {
                        if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0))
                            & board[x + i]) return true;
                    }
                    x += sw;
                }
                return false;
            }

            function cloudBounds(bounds, d) {
                var b0 = bounds[0],
                    b1 = bounds[1];
                if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
                if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
                if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
                if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
            }

            function collideRects(a, b) {
                return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
            }

            function archimedeanSpiral(size) {
                var e = size[0] / size[1];
                return function(t) {
                    return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
                };
            }

            function rectangularSpiral(size) {
                var dy = 4,
                    dx = dy * size[0] / size[1],
                    x = 0,
                    y = 0;
                return function(t) {
                    var sign = t < 0 ? -1 : 1;
                    // See triangular numbers: T_n = n * (n + 1) / 2.
                    switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
                        case 0:  x += dx; break;
                        case 1:  y += dy; break;
                        case 2:  x -= dx; break;
                        default: y -= dy; break;
                    }
                    return [x, y];
                };
            }

            // TODO reuse arrays?
            function zeroArray(n) {
                var a = [],
                    i = -1;
                while (++i < n) a[i] = 0;
                return a;
            }

            var cloudRadians = Math.PI / 180,
                cw = 1 << 11 >> 5,
                ch = 1 << 11,
                canvas,
                ratio = 1;

            if (typeof document !== "undefined") {
                canvas = document.createElement("canvas");
                canvas.width = 1;
                canvas.height = 1;
                ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
                canvas.width = (cw << 5) / ratio;
                canvas.height = ch / ratio;
            } else {
                // node-canvas support
                var Canvas = require("canvas");
                canvas = new Canvas(cw << 5, ch);
            }

            var c = canvas.getContext("2d"),
                spirals = {
                    archimedean: archimedeanSpiral,
                    rectangular: rectangularSpiral
                };
            c.fillStyle = c.strokeStyle = "red";
            c.textAlign = "center";

            //exports.cloud = cloud;



            var fill = d3.scale.category20();

            var keyword = [],
                width = 600,
                height= 600;
            switch(c){
                case 0:
                    path = "/data/keyword.csv";
                    break;
                case 1:
                    path = "/data/keyword_VAST.csv";
                    break;
                case 2:
                    path = "/data/keyword_SciVis.csv";
                    break;
                case 3:
                    path = "/data/keyword_InfoVis.csv";
                    break;
            }
            d3.csv(path, function(data) {
                // build the list of city names
                data.forEach( function (d:any) {
                    (<any>window).tagCloudName.push(d.keyword)

                    keyword.push(d.keyword);
                });
                 d3.layout.cloud()
                     .size([500, 500])
                    .words(keyword.map(function(d) {
                        return {text: d, size: 10 + Math.random() * 90};
                    }))
                    .rotate(function() { return ~~(Math.random() * 2) * 90; })
                    .font("Impact")
                    .fontSize(function(d) { return d.size; })
                    .on("end", draw)
                    .start();
                if (ind >1){
                    var dex = ind -1;
                    $("#svgCloud"+dex).html("").append($("#svgCloud"+ind))
                }
            });

            var color = d3.scale.linear<string>()
                .domain([0,1,2,3,4,5,6,10,15,20,50])
                .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

            function draw(words) {
                ind ++;
                var svg=d3.select("body").append("svg").attr('id','svgCloud'+ind)
                    .attr("width", 600)
                    .attr("height", 600)
                    .attr("class", "wordcloud")
                    .append("g")
                    // without the transform, words words would get cutoff to the left and top, they would
                    // appear outside of the SVG area
                    .attr("transform", "translate(300,300)")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d:any) { return d.size + "px"; })
                    .style("fill", function(d, i) { return color(i); })
                    .attr('data-fill',function(d,i){
                        return color(i);
                    })
                    .attr('class',function(d){
                        return 'tag-wordcloud tag-'+$.trim((<any>d).text)
                    })
                    .attr("transform", function(d:any) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .attr("text-anchor", "middle")
                    .text(function(d:any) { return d.text; });
            }
        }
    }

}
document.addEventListener('DOMContentLoaded', function () {

    var tagcloud = new Chart.TagCloud(d3.select('#tagcloud'));

    tagcloud.render();

});

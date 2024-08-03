function _1(md){return(
md`# Path tween

This example demonstrates path interpolation using SVG's [getPointAtLength](http://www.w3.org/TR/SVG/paths.html#__svg__SVGPathElement__getPointAtLength) feature. The source path and the target path are sampled uniformly using a configurable precision in pixels (here, 4px). During the transition, the path is replaced with a piecewise linear curve, or *polyline*, for easier interpolation. When the transition finishes, the path is restored to the original cubic Bézier. This technique is handy because it works for any path expressible with SVG's path data mini-language. See also: [shape tweening](/@d3/shape-tweening).`
)}

function _2(d3,pathTween)
{
  const d0 = "M0,0c100,0 0,100 100,100c100,0 0,-100 100,-100";
  const d1 = "M0,0c100,0 0,100 100,100c100,0 0,-100 100,-100c100,0 0,100 100,100";

  const width = 928;
  const height = 500;
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  svg.append("path")
    .attr("transform", "translate(180,150)scale(2,2)")
    .attr("fill", "none")
    .attr("stroke", "currentColor")
    .attr("stroke-width", 1.5)
    .attr("d", d0)
  .transition()
    .duration(2000)
    .on("start", function repeat() {
      d3.active(this)
          .attrTween("d", pathTween(d1, 4))
        .transition()
          .attrTween("d", pathTween(d0, 4))
        .transition()
          .on("start", repeat);
    });

  return svg.node();
}


function _pathTween(d3){return(
function pathTween(d1, precision) {
  return function() {
    const path0 = this;
    const path1 = path0.cloneNode();
    path1.setAttribute("d", d1);
    const n0 = path0.getTotalLength();
    const n1 = path1.getTotalLength();

    // Uniform sampling of distance based on specified precision.
    const distances = [0];
    const dt = precision / Math.max(n0, n1);
    let i = 0; while ((i += dt) < 1) distances.push(i);
    distances.push(1);

    // Compute point-interpolators at each distance.
    const points = distances.map((t) => {
      const p0 = path0.getPointAtLength(t * n0);
      const p1 = path1.getPointAtLength(t * n1);
      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    return (t) => t < 1 ? "M" + points.map((p) => p(t)).join("L") : d1;
  };
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["d3","pathTween"], _2);
  main.variable(observer("pathTween")).define("pathTween", ["d3"], _pathTween);
  return main;
}

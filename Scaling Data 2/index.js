var h = 100;
var w = 300;
var padding = 25;

const buildLine = (ds) => {

  var xScale = d3.scale.linear()
                 .domain([
                   d3.min(ds.monthlySales, (d) => d.month),
                   d3.max(ds.monthlySales, (d) => d.month)
                 ])
                 .range([padding + 5, w - padding])

  var yScale = d3.scale.linear()
                 .domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
                 .range([h - padding, 10])
                 .nice()
                
  var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(4)

  var lineFun = d3.svg.line()
    .x((d) => xScale(d.month))
    .y((d) => yScale(d.sales))
    .interpolate('linear')
  
  var svg = d3.select('body').append('svg').attr({width: w, height: h})
  
  var axis = svg.append('g').call(yAxis)
                .attr('class', 'axis')
                .attr('transform', 'translate(' + padding + ', 0)')

  var viz = svg.append('path')
    .attr({
      d: lineFun(ds.monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    })
}

const showHeader = (ds) => {
  d3.select('body').append('h1')
    .text(ds.category + ' Sales (2013)')
}

d3.json('MonthlySalesbyCategoryMultiple.json', (error, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data) // we're golden!
  }
  
  data.contents.forEach((ds) => {
    console.log(ds)
    showHeader(ds)
    buildLine(ds)
  })
})
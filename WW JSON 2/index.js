var h = 100;
var w = 400;
var ds; //global var for data
var salesTotal = 0.0;
var salesAvg = 0.0;
var metrics = [];

const buildLine = () => {
  var lineFun = d3.svg.line()
    .x((d) => (d.month - 20130001) / 3.25)
    .y((d) => h - d.sales)
    .interpolate('linear')
  
  var svg = d3.select('body').append('svg').attr({width: w, height: h})
  
  var viz = svg.append('path')
    .attr({
      d: lineFun(ds.monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    })
}

const showHeader = () => {
  d3.select('body').append('h1')
    .text(ds.category + ' Sales (2013)')
}

d3.json('MonthlySalesbyCategory.json', (error, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data) // we're golden!
    ds = data
  }
 
  showHeader()
  buildLine()
 
})
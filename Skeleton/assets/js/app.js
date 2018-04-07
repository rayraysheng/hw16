// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// Set up dimensions and margins
var svgWidth = 800;
var svgHeight = 800;

var margin = {
    top: 75,
    right: 75,
    bottom: 75,
    left: 75
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Set the svg area and chart group
var svg = d3.select('body').append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

var chart = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Load data and make chart
d3.csv('../data/data.csv', function(err, plotData) {

    // Use scales to make the axes
    var yScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, 45]);

    var xScale = d3.scaleLinear()
      .range([0, chartWidth])
      .domain([10, 25]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Title the chart
    chart
    .append('text')
    .attr('x', chartWidth/2)
    .attr('text-anchor', 'middle')
    .attr('font-size', '24')
    .text('Foodstamp Usage vs. Low Household Income Rate by State')   

    // Append the axes
    chart
      .append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chart.append("g")
      .call(leftAxis);

    // Append axis labels
    // X-axis
    chart
      .append('text')
      .attr('x', chartWidth/2)
      .attr('y', chartHeight+50)
      .attr('text-anchor', 'middle')
      .text('Percentage of households making less than $25,000 per year')

    // Y-axis
    chart
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight/2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Percentage of households on foodstamps')

    //Plot the points
    chart
      .selectAll('circle')
      .data(plotData)
      .enter()
      .append('circle')
      .attr('cx', function(data) {
          return xScale(data.percentBelow25k)
      })
      .attr('cy', function(data) {
          return yScale(data.percentFoodStamp)
      })
      .attr('r', '10')
      .attr('fill', 'gray')
      .attr('opacity', '0.5')

    chart
      .selectAll('text')
      .data(plotData)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', function(data) {
          return xScale(data.percentBelow25k)
      })
      .attr('y', function(data) {
          return yScale(data.percentFoodStamp)
      })
      .text(function(data) {
          return data.stateAbbr
      })
})
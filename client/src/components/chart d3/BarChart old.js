import * as d3 from 'd3';

export function load(data) {
    console.log("apple")
    console.log(data.numbers)
    d3.select("svg").remove();

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);
    
    svg.selectAll('rect')
      .data(data.numbers)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => 300 - d)
      .attr('width', 40)
      .attr('height', (d) => d)
      .attr('fill', 'blue');
}
export function loadNumbers(data) {
    console.log(data)
    d3.select("svg").remove();

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);
    
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => 300 - d)
      .attr('width', 40)
      .attr('height', (d) => d)
      .attr('fill', 'blue');
}


/*
function load2() {
    const data = [20, 40, 60, 80, 100];

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);
    
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => 300 - d)
      .attr('width', 40)
      .attr('height', (d) => d)
      .attr('fill', 'blue');
}
*/
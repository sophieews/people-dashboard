<template>
    <div id="charts">
        <v-select
            v-model="selectedChartType"
            :items="chartTypes"
            label="Chart type"
        ></v-select>
        <v-select
            v-model="selectedPropertyType"
            :items="types"
            label="Person attribute"
        ></v-select>
        <svg width="500" height="400" class="chart"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
import { mapState } from 'vuex';
export default {
    name: 'Charts',
    data() {
        return {
            selectedChartType: 'Pie',
            chartTypes: ['Bar', 'Pie'],
            selectedPropertyType: 'Age',
            types: ['Age', 'Gender', 'Eye Color']
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.generatePie();
        });
    },
    computed: {
        ...mapState(['people']),
        chartData() {
            switch (this.selectedPropertyType) {
                case 'Age':
                    return this.$store.getters.getChartData('age');
                case 'Eye Color':
                    return this.$store.getters.getChartData('eyeColor');
                case 'Gender':
                    return this.$store.getters.getChartData('gender');
                default:
                    return [];
            }
        }
    },
    watch: {
        selectedPropertyType() {
            this.updateChart();
        },
        selectedChartType() {
            this.updateChart();
        },
        people() {
            this.updateChart();
        }
    },
    methods: {
        /**
         * Remove all d3 group elements and redraw the pie chart
         */
        updateChart() {
            d3.selectAll('g').remove();
            if (this.selectedChartType == 'Bar') {
                this.generateBar();
            } else {
                this.generatePie();
            }
        },
        /**
         * Create new bar chart with computed data
         * Code based on https://www.tutorialsteacher.com/d3js bar chart tutorial
         */
        generateBar() {
            // Select svg element, and set width and height with 200px margin
            const svg = d3.select('svg'),
                margin = 200,
                width = svg.attr('width') - margin,
                height = svg.attr('height') - margin;

            // Define x and y scales for each axis
            const xScale = d3
                    .scaleBand()
                    .range([0, width])
                    .padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            // Create a new d3 group element
            const g = svg
                .append('g')
                .attr('transform', 'translate(' + 100 + ',' + 100 + ')');

            // Map discrete person property values to the x axis (e.g. eye color, age..)
            xScale.domain(
                this.chartData.map(function(d) {
                    return d.property;
                })
            );
            // Create y domain from 0 to the max value of 'value' of the computed chartData
            yScale.domain([
                0,
                d3.max(this.chartData, function(d) {
                    return d.value;
                })
            ]);

            // Draw x axis
            g.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(xScale));

            // Draw y axis based on yScale domain and show 10 values (ticks)
            g.append('g').call(d3.axisLeft(yScale).ticks(10));

            // Draw rectangles for each bar
            g.selectAll('.bar')
                .data(this.chartData)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', function(d) {
                    return xScale(d.property);
                })
                .attr('y', function(d) {
                    return yScale(d.value);
                })
                .attr('width', xScale.bandwidth())
                .attr('height', function(d) {
                    return height - yScale(d.value);
                })
                .on('click', (d, i) => {
                    if (this.$route.query.val != i.property) {
                        this.$router.replace({
                            query: {
                                prop: this.selectedPropertyType,
                                val: i.property
                            }
                        });
                    }
                });
        },
        /**
         * Create new pie chart, using computed data
         * Code based on https://www.tutorialsteacher.com/d3js Pie chart tutorial
         */
        async generatePie() {
            // Select svg element and set width, height amd radius consts
            const svg = d3.select('svg'),
                width = svg.attr('width'),
                height = svg.attr('height'),
                radius = Math.min(width, height) / 2;

            // Create new d3 group tag and center it in svg element
            const g = svg
                .append('g')
                .attr(
                    'transform',
                    'translate(' + width / 2 + ',' + height / 2 + ')'
                );

            const color = d3.scaleOrdinal([
                '#7B4B94',
                '#E27396',
                '#EAF2D7',
                '#EA9AB2',
                '#B3DEE2',
                '#EFCFE3'
            ]);
            const label = d3
                .arc()
                .outerRadius(radius)
                .innerRadius(radius - 80);

            // Generate the pie
            const pie = d3.pie().value(function(d) {
                return d.value;
            });

            // Generate the arcs
            const arc = d3
                .arc()
                .innerRadius(0)
                .outerRadius(radius);

            // Generate groups
            const arcs = g
                .selectAll('arc')
                .data(pie(this.chartData))
                .enter()
                .append('g')
                .attr('class', 'arc');

            // Draw arc paths
            arcs.append('path')
                .attr('fill', function(d, i) {
                    return color(i);
                })
                .attr('d', arc)
                .on('mouseenter', function() {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.5);
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1);
                })
                .on('click', (d, i) => {
                    if (this.$route.query.val != i.data.property) {
                        this.$router.replace({
                            query: {
                                prop: this.selectedPropertyType,
                                val: i.data.property
                            }
                        });
                    }
                });

            // Add arc labels
            arcs.append('text')
                .attr('transform', function(d) {
                    return 'translate(' + label.centroid(d) + ')';
                })
                .text(function(d) {
                    return d.data.property;
                });
        }
    }
};
</script>

<style>
.chart .arc {
    cursor: pointer !important;
}
.chart .bar {
    fill: #437ea9;
    cursor: pointer;
}
.chart .bar:hover {
    fill: #70aad4;
    outline: #70aad4 solid 0.25px;
}
</style>

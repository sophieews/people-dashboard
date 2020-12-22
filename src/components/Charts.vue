<template>
    <div id="charts">
        <v-select
            v-model="selectedType"
            :items="types"
            label="Person attribute"
        ></v-select>
        <div id="arc"></div>
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
            selectedType: 'Age',
            types: ['Age', 'Gender', 'Eye Color']
        };
    },
    mounted() {
        this.generatePie();
    },
    computed: {
        ...mapState(['people']),
        data() {
            switch (this.selectedType) {
                case 'Age':
                    return this.$store.getters.getPeopleDataByProperty('age');
                case 'Eye Color':
                    return this.$store.getters.getPeopleDataByProperty(
                        'eyeColor'
                    );
                case 'Gender':
                    return this.$store.getters.getPeopleDataByProperty(
                        'gender'
                    );
                default:
                    return [];
            }
        }
    },
    watch: {
        selectedType() {
            this.updatePie();
        }
    },
    methods: {
        /**
         * Remove all d3 group elements and redraw the pie chart
         */
        updatePie() {
            d3.selectAll('g').remove();
            this.generatePie();
        },
        /**
         * Create new pie chart, using computed data
         */
        generatePie() {
            // Find svg tag and set width, height amd radius consts
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

            var color = d3.scaleOrdinal([
                '#4daf4a',
                '#377eb8',
                '#ff7f00',
                '#984ea3',
                '#e41a1c'
            ]);
            var label = d3
                .arc()
                .outerRadius(radius)
                .innerRadius(radius - 80);

            // Generate the pie
            var pie = d3.pie().value(function(d) {
                return d.value;
            });

            // Generate the arcs
            var arc = d3
                .arc()
                .innerRadius(0)
                .outerRadius(radius);

            // Generate groups
            var arcs = g
                .selectAll('arc')
                .data(pie(this.data))
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
</style>

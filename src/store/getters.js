export const getters = {
    /**
     * Given a property of a person (e.g. age), return chart data in an array containing data to be plotted on a chart
     * e.g. [{property: a, value: 1}]
     * @param {String} property the property of person object to get chart data for
     */
    getChartData: state => property => {
        let data = {};
        for (const person of state.people) {
            const val = person[property];
            // Check person has age
            if (val) {
                // If age already exists, increase existing val by 1
                if (data[val]) {
                    data[val]++;
                } else {
                    data[val] = 1;
                }
            }
        }
        let dataArray = [];
        for (const key in data) {
            dataArray.push({ property: key, value: data[key] });
        }
        return dataArray;
    }
};

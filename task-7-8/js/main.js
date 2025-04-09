window.onload = async function () {
    const response = await fetch('data/iris.json');
    const data = await response.json();

    let possibleColor = ["#5d3fd3", "#a73fd3", "#d33fb5", "#d35d3f", "#d3a73f"];

    let irisesWithColors = data.map(
        function (iris) {
            let color = possibleColor[Math.floor(Math.random() * possibleColor.length)];
            return {
                ...iris,
                color: color
            };
        }
    );

    console.log(irisesWithColors);

    let filteredIrises = irisesWithColors.filter(
        function (iris) {
            return iris.sepalWidth < 4;
        }
    );

    console.log(filteredIrises);

    const sumPetalLength = irisesWithColors.reduce(
        function (acc, iris) {
            return acc + iris.petalLength;
        }, 0
    );
        
    const averagePetalLength = sumPetalLength / irisesWithColors.length;
    console.log("Average Petal Length:", averagePetalLength);

    const foundIris = irisesWithColors.find(function (iris) {
        return iris.petalWidth > 1.0;
    });
    console.log("Found Iris with petalWidth > 1.0:", foundIris);

    const hasLongPetal = irisesWithColors.some(function (iris) {
        return iris.petalLength > 10;
    });
    console.log("Has Iris with petalLength > 10:", hasLongPetal);

    const hasSpecificPetal = irisesWithColors.some(function (iris) {
        return iris.petalLength === 4.2;
    });
    console.log("Has Iris with petalLength === 4.2:", hasSpecificPetal);

    const allPetalWidthsLessThan3 = irisesWithColors.every(function (iris) {
        return iris.petalWidth < 3;
    });
    console.log("All petal widths are less than 3:", allPetalWidthsLessThan3);

    const allSepalWidthsGreaterThan1_2 = irisesWithColors.every(function (iris) {
        return iris.sepalWidth > 1.2;
    });
    console.log("All sepal widths are greater than 1.2:", allSepalWidthsGreaterThan1_2);

    const irisesWithColorsSorted = irisesWithColors.toSorted(function(a, b) {
        return a.petalWidth - b.petalWidth;
    });
    console.log("Sorted Irises by petalWidth", irisesWithColorsSorted);
}
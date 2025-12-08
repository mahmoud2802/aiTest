import React, {useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const TensorSImpleExmaple = (props) => {
    const xs = tf.tensor([0, 1, 2, 3, 4]);
    const ys = xs.mul(1.2).add(5);
// Define a Linear Regression Model
    const model = tf.sequential();

    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    // Specify Loss and Optimizer

    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Train the Model
    model.fit(xs, ys, {epochs: 500}).then(async () => {
        const xMax = 10;
        const xArr: [] = [];
        const yArr: [] = [];
        for (let x = 0; x <= xMax; x++) {
            const result = model.predict(tf.tensor([Number(x)]));

            // result.data().then(y => {
            //     xArr.push(x);
            //     yArr.push(Number(y));
            //     if (x == xMax) {plot(xArr, yArr)};
            // });
        }

    });

    // Extract only Correct Data
    function extractData(obj) {
        return {x: obj.Horsepower, y: obj.Miles_per_Gallon};
    }

    function removeErrors(obj) {
        return obj.x != null && obj.y != null;
    }

    useEffect(() => {
        // Dynamic import to avoid SSR issues
        const loadVis = async () => {
            const tfvis = await import('@tensorflow/tfjs-vis');
            const jsonData = await fetch("https://storage.googleapis.com/tfjs-tutorials/carsData.json");
            let values = await jsonData.json();

            values = values.map(extractData).filter(removeErrors);
            const surface = {name: 'Bar chart', tab: 'Charts'};

            // Map x values to Tensor inputs
            const inputs = values.map(obj => obj.x);
// Map y values to Tensor labels
            const labels = values.map(obj => obj.y);

// Convert inputs and labels to 2d tensors
            const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
            const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
            const inputMin = inputTensor.min();
            const inputMax = inputTensor.max();
            const labelMin = labelTensor.min();
            const labelMax = labelTensor.max();
            const nmInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
            const nmLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
            const model = tf.sequential();
            model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
            model.add(tf.layers.dense({units: 1, useBias: true}));
            model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
            await model.fit(inputs, labels, {batchSize: 25, epochs: 50})
            // Un-Normalize Data
            let unX = tf.linspace(0, 1, 100);
            let unY = model.predict(unX.reshape([100, 1]));
            const unNormunX = unX
                .mul(inputMax.sub(inputMin))
                .add(inputMin);
            const unNormunY = unY
                .mul(labelMax.sub(labelMin))
                .add(labelMin);
            unX = unNormunX.dataSync();
            unY = unNormunY.dataSync();

// Test the Model
            const predicted = Array.from(unX).map((val, i) => {
                return {x: val, y: unY[i]}
            });

            tfvis.render.scatterplot(surface, {
                values: [values,predicted],
                series: ['Original', 'Predicted']
            }, {xLabel: 'Horsepower', yLabel: 'MPG',});
        };

        loadVis();
    }, []);
    return (
        <></>
    )
};

export default TensorSImpleExmaple;
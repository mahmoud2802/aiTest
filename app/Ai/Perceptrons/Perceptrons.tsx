import React from 'react';

const threshold = 1.5;
const inputs = [1, 0, 1, 0, 1];
const weights = [0.7, 0.6, 0.5, 0.3, 0.4];
let sum = 0;
for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * weights[i];
}
const Perceptrons = () => (<>
        {sum>threshold ? "Active":"Not Actire"}
    </>
    
);

export default Perceptrons;
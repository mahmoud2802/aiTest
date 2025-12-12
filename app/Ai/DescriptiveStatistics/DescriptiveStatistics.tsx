"use client";
import React, { useEffect } from "react";
import * as dfd from "danfojs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { jStat } from "jstat";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const DescriptiveStatistics = () => {
  useEffect(() => {}, []);
  const onclick = () => {
    console.log("Clicked");
    dfd
      .readCSV("./flights.csv")
      .then((df) => {
        // df.head().print()
        /////////// 1-Descriptive Mean
        console.log("Average", df["arr_delay"].mean());
        console.log("Trim Average", df["arr_delay"].median()); //50%
        console.log("Mode", df["arr_delay"].mode()); //Use For Un numric values

        /////////// 2-Descriptive Variance

        console.log("Varianse", df["arr_delay"].var()); //Parakandgi Data
        console.log("Standard Deviation", df["arr_delay"].std()); //sqrt Varianse
        console.log(df["arr_delay"].Series instanceof dfd.Series); // should be true

        const s = df["arr_delay"].dropNa(); // clean NaNs

        const corrMatrix = df.corr(); // Correlation Matrix
      })
      .catch((e) => {
        console.log(e);
      });
  };
 let samples = [];
 //Noramal Distribution
  for (let i = 0; i < 10000; i++) {
    samples.push(jStat.normal.sample(0, 1));
  }
  // Uniform Distribution
    for (let i = 0; i < 10000; i++) {
    samples.push(jStat.uniform.sample(0, 1));
  }
  //
 for (let i = 0; i < 10000; i++) {
    samples.push(jStat.binomial.cdf( 1000, 100, 0.2 ));
  }

  function makeHistogram(data, binCount = 50) {
    let min = Math.min(...data);
    let max = Math.max(...data);
    let binSize = (max - min) / binCount;
    let bins = new Array(binCount).fill(0);

    data.forEach((val) => {
      let idx = Math.floor((val - min) / binSize);
      if (idx >= 0 && idx < binCount) bins[idx]++;
    });

    let labels = bins.map((_, i) => (min + i * binSize).toFixed(2));
    return { labels, bins };
  }

  let hist = makeHistogram(samples, 200);

  const data = {
    labels: hist.labels,
    datasets: [
      {
        label: "Normal Distribution Samples",
        data: hist.bins,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Value",
        },
      },
      y: {
        title: {
          display: true,
          text: "Frequency",
        },
      },
    },
  };

  return (
    <>
      <button onClick={onclick} style={{ backgroundColor: "red" }}>
        Click Me
      </button>
      <div id="plot_div"></div>
      <Bar data={data} options={options} />;
    </>
  );
};

export default DescriptiveStatistics;

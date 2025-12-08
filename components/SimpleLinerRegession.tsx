"use client";
import { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PlotterProps {
 iter:number;
  width?: number;
  height?: number;
  
}
class Trainer {
  xArr: number[] = [];
  yArr: number[] = [];
  public weight: number = 0;
  bias: number = 1;
  learnc = 0.00001;
  learnRate: number = 0.00001;
  cost: number = 0;
  points = this.xArr.length;

  constructor(xArray: number[], yArray: number[]) {
    this.xArr = xArray;
    this.yArr = yArray;
    this.points=xArray.length
  }

  costError(): number {
    let total = 0;
    for (let i = 0; i < this.points; i++) {
      total += (this.yArr[i] - (this.weight * this.xArr[i] + this.bias)) ** 2;
    }
    return total / this.points;
  }

  train(iter: number) {
    for (let i = 0; i < iter; i++) {
      this.updateWeights();
    }
    this.cost = this.costError();
  }

  updateWeights() {
    let wx;
    let w_deriv = 0;
    let b_deriv = 0;
    for (let i = 0; i < this.points; i++) {
      wx = this.yArr[i] - (this.weight * this.xArr[i] + this.bias);
      w_deriv += -2 * wx * this.xArr[i];
      b_deriv += -2 * wx;
    }
    this.weight -= (w_deriv / this.points) * this.learnc;
    this.bias -= (b_deriv / this.points) * this.learnc;
  }
}

export default function SimpleLinerRegession({
  iter,
 
  width = 800,
  height = 400,
}: PlotterProps) {
  const [xValuesLine, setxValues] = useState<number[]>([]);
  const [yValuesLine, setyValues] = useState<number[]>([]);
  const [cost,setCost]=useState(0)
   const [slope,setSlop]=useState(0)
  const xArray2 = [
    32, 53, 61, 47, 59, 55, 52, 39, 48, 52, 45, 54, 44, 58, 56, 48, 44, 60,
  ];
  const yArray2 = [
    31, 68, 62, 71, 87, 78, 79, 59, 75, 71, 55, 82, 62, 75, 81, 60, 82, 97,
  ];
  
  // Transform arrays into data format required by Chart.js
  const scatterData = xArray2.map((x, index) => {
    const yValue = yArray2[index] || 0;
    return {
      x: x,
      y: yValue,
    };
  });

  useEffect(() => {
    const myTranier = new Trainer(xArray2, yArray2);
     myTranier.train(iter);
   let weight = myTranier.weight;
   console.log(weight)
  let tempX = [];
    let tempY=[];
    for (let x = 0; x <= 100; x += 10) {
      tempY.push(x * weight);
      tempX.push(x);
    }
    setxValues(tempX)
    setyValues(tempY)
    setCost(Number(myTranier.cost.toFixed(2)))
    setSlop(Number(myTranier.weight.toFixed(2)))
  }, []);
 

const handleTrain=()=>{
 

}
  // Transform for line (formula)

  const lineData = xValuesLine.map((x, i) => ({
    x: x,
    y: yValuesLine[i],
  }));

  const chartData = {
    datasets: [
      {
        label: "Random Data",
        data: scatterData,
        borderColor: "rgba(75, 192, 192, 1)",
        //  backgroundColor: scatterData.map((d) => d.backgroundColor),
        showLine: false,
        pointRadius: 3,
        type: "scatter" as const,
      } as any,
      {
        label: "Formula: x * 1.2 + 50",
        data: lineData,
        borderColor: "#ff7300",
        backgroundColor: "transparent",
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        showLine: true,
        type: "line" as const,
      } as any,
    ],
  } as any;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Scatter Plot with Formula Line",
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
      },
    },
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* <button
          onClick={handleTrain}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Train Perceptron
        </button> */}
        <p>COst: {cost}</p>
        <p>Slop: {slope}</p>
      </div>
      <div style={{ width: width, height: height }}>
        <Chart type="scatter" data={chartData} options={options} />
      </div>
    </div>
  );
}


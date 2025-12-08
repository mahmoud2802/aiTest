"use client"
import SimpleLinerRegession from "@/components/SimpleLinerRegession";
import TensorSImpleExmaple from "@/components/TensorSImpleExmaple";

const xArray:number[] = [];
const yArray:number[] = [];
const desired:number[] = [];
const numPoint=500

for(let i=0;i<numPoint;i++){
  xArray[i]=Math.random()*500
  yArray[i]=Math.random()*500
}

// Line function: f(x) = x * 1.2 + 50
function f(x: number): number {
  return x * 1.2 + 50;
}

// Compute desired answers
for(let i=0;i<numPoint;i++){
  desired[i] = 0;
  if(yArray[i] > f(xArray[i])) {
    desired[i] = 1;
  }
}

export default function Home() {
    return (
        <div style={{ padding: "20px" }}>
            <main>
                <h1>Pattern Recognition - Perceptron</h1>
                <p>Points in BLACK are above the line (desired = 1)</p>
                <p>Points in BLUE are below the line (desired = 0)</p>
                <p>Line: f(x) = x * 1.2 + 50</p>
                <SimpleLinerRegession width={500} height={400} iter={500} />
                <TensorSImpleExmaple></TensorSImpleExmaple>
            </main>
        </div>
    );
}

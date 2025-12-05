"use client"
import Image from "next/image";
import {CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";

const xArray = [50,60,70,80,90,100,110,120,130,140,150];
const yArray = [7,8,8,9,9,9,10,11,14,14,15];
const data = xArray.map((x, index) => ({
    x,
    y: yArray[index],
}));


export default function Home() {
    return (
        <div  style={{margin:100}}>
            <main>
                im here
              <ScatterChart
                  style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                  responsive
                  margin={{
                    top: 20,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
              >
                <CartesianGrid />
                <XAxis type="number"   dataKey="x" name="meter"  />
                <YAxis type="number" dataKey="y" name="price"  width="auto" />
                <Scatter activeShape={{ fill: 'red' }} name="A school" data={data} fill="#8884d8" />
              </ScatterChart>
            </main>
        </div>
    );
}

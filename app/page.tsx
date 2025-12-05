"use client"
import Image from "next/image";
import {CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import Perceptrons from "@/app/Ai/Perceptrons/Perceptrons";




export default function Home() {
    return (
        <div  style={{margin:100}}>
            <main>
                <Perceptrons></Perceptrons>

            </main>
        </div>
    );
}

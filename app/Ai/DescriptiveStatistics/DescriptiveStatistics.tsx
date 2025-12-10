"use client"
import React, {useEffect} from 'react';
import * as dfd from "danfojs";

const DescriptiveStatistics = () => {
    useEffect(() => {
        dfd.readCSV("./flights.csv").then(df => {
           // df.head().print()
            /////////// 1-Descriptive Mean
            console.log("Average",df["arr_delay"].mean())
            console.log("Trim Average",df["arr_delay"].median())//50%
            console.log("Mode",df["arr_delay"].mode())//Use For Un numric values

            /////////// 2-Descriptive Variance

            console.log("Varianse",df["arr_delay"].var())//Parakandgi Data
            console.log("Standard Deviation",df["arr_delay"].std())//sqrt Varianse

        }).catch(e => {
            console.log(e)
        });

    }, []);
    return (
        <></>
    )
};

export default DescriptiveStatistics;
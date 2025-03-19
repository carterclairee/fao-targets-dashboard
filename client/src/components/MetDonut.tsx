import Plotly from "plotly.js-basic-dist";
import { RowData } from "../types/interfaces";
import { countMet } from "../pages/KeyAreasFunctions";
import { useEffect, useRef } from "react";

// function to calculate met targets and percentage
const calculateCompletion = (data: RowData[]) => {
    const metCount = countMet(data);
    const total = data.length;
    const notMetCount = total - metCount;

    // return our calculations as an object
    return { metCount, notMetCount, total }
};

const MetDonut: React.FC<{data: RowData[]}> = ({ data }) => {
    // Get the calculations
    const { metCount, notMetCount, total } = calculateCompletion(data);

    // create a ref to the div element for Plotly
    const plotlyRef = useRef<HTMLDivElement | null>(null);

    // Generate plotly chart when data changes
    useEffect(() => {
        if (plotlyRef.current) {
            Plotly.react(plotlyRef.current, [
                {
                    type: "pie",
                    labels: ["Met Targets", "Unmet Targets"],
                    values: [metCount, notMetCount],
                    // Donut effect
                    hole: 0.7,
                    // Hide default percentages
                    textinfo: "none",
                    marker: {
                        colors: ["#048B5D", "#9ea6a1B3"]
                    },
                },
            ], {
                width: 200,
                height: 200,
                title: "",
                showlegend: false,
                // For adding text to the chart
                annotations: [
                    {
                        x: 0.5,
                        y: 0.5,
                        xref: "paper",
                        yref: "paper",
                        text: `${metCount} of ${total}<br>targets met`,
                        showarrow: false,
                        font: {
                            size: 18,
                            color: "#000000",
                            family: "Helvetica, Arial, sans-serif",
                        },
                    },
                ],
                margin: {
                    t: 0,
                    b: 0,
                    l: 0,
                    r: 0,
                },
            }, {
                responsive: true,
                displayModeBar: false,
            });
        }
    }, [metCount, notMetCount, total]);

    return (
        <div ref={plotlyRef}></div>
    );
};

export default MetDonut;
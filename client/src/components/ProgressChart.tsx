import Plotly from "plotly.js-basic-dist";
import { useEffect, useRef } from "react";

interface ProgressChartProps {
    result_to_date: number;
    program_target: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ result_to_date, program_target }) => {
    // compute remaining target; make sure it's not negative or bar looks odd
    const remainingTarget = Math.max(program_target - result_to_date, 0);

    // bar color based on progress; default is grey
    let progressColor = "#9ea6a1B3";
    if (result_to_date >= program_target) progressColor = "#048B5D";
    else if (result_to_date > 0) progressColor = "#28949C"; 

    // create a ref for Plotly chart rendering
    const plotlyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (plotlyRef.current) {
            Plotly.react(
                plotlyRef.current,
                [
                    {
                        type: "bar",
                        orientation: "h",
                        x: [result_to_date], // progress
                        y: [""], // empty label to align bars
                        name: "Current",
                        marker: {color: progressColor}
                    },
                    {
                        type: "bar",
                        orientation: "h",
                        x: [remainingTarget], // left to go
                        y: [""], // empty label to align bars
                        name: "Remaining",
                        marker: {color: "#9ea6a1B3"}
                    },  
                ],
                {
                    barmode: "stack",
                    height: 20,
                    width: 175,
                    margin: { l: 5, r: 0, t: 10, b: 0 },
                    showlegend: false,
                    xaxis: { visible: false },
                    yaxis: { visible: false },
                },
                {
                    displayModeBar: false
                }
            );
        }
    }, [result_to_date, program_target]);

    return (
        <div ref={plotlyRef}></div>
    );
}

export default ProgressChart;
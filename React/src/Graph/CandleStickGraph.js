
import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcHour } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

class CandleStickGraph extends React.Component {
	render() {
    if(this.props.data.length > 0){
      console.log(this.props);

      const marginLeftRight = 50;
      const marginTop = 10;
      const marginBottom = 30;

      const { type, width, data, ratio } = this.props;
      const xAccessor = (d) => d.date;
      const xExtents = [
        // "first" point, ie the rightmost
        xAccessor(last(data)),
        xAccessor(data[0])
        // "last" point, ie the leftmost point
      ];
      return (
        <ChartCanvas height={400}
            ratio={ratio}
            width={width}
            margin={{ left: marginLeftRight, right: marginLeftRight, top: marginTop, bottom: marginBottom }}
            type={type}
            seriesName="GOOG"
            data={data}
            xAccessor={xAccessor}
            xScale={scaleTime()}
            xExtents={xExtents}>

          <Chart id={1} yExtents={d => [d.high + (d.high - d.low), d.low - (d.high - d.low)]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
            <YAxis axisAt="left" orient="left" ticks={5} />
            {/*
              CandleStickSeries parameter, "width" controls the width of each candlestick in the graph,
              default scaling is appropriate for larger datasets.  For a single day with data points every 30 minutes,
              override default
            */}
            <CandlestickSeries /*width={timeIntervalBarWidth(utcHour)}*/ width={(width - 2 * marginLeftRight) / data.length}/>
          </Chart>
        </ChartCanvas>
      );
    } else {
      return(
        <p className="graph-loading">Rendering...</p>
      );
    }
	}
}

CandleStickGraph.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickGraph.defaultProps = {
	type: "svg",
};
CandleStickGraph = fitWidth(CandleStickGraph);

export default CandleStickGraph;

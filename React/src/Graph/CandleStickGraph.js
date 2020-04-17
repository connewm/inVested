
import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcHour } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { Label } from "react-stockcharts/lib/annotation";

class CandleStickGraph extends React.Component {
	render() {
    if(this.props.data.length > 0){
      console.log(this.props);

      const marginLeftRight = 50;
      const marginTop = 10;
      const marginBottom = 30;
      const height = 420;

      const { type, width, data, ratio } = this.props;
      const xAccessor = (d) => d.date;
      const xExtents = [
        // most recent point, ie the rightmost
        xAccessor(last(data)),
        xAccessor(data[0])
        // "last" point, ie the oldest/leftmost point
      ];
      var [yAxisLabelX, yAxisLabelY] = [12, marginTop + (height - marginTop - marginBottom) / 2]
      return (
        <ChartCanvas height={420}
            ratio={ratio}
            width={width}
            margin={{ left: marginLeftRight, right: marginLeftRight, top: marginTop, bottom: marginBottom }}
            type={type}
            seriesName="STOCK"
            data={data}
            xAccessor={xAccessor}
            xScale={scaleTime()}
            xExtents={xExtents}>

          <Chart id={1} yExtents={d => [d.high + (d.high - d.low), d.low - (d.high - d.low)]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
            <Label className="axes" x={(width - 2 * marginLeftRight) / 2} y={height - 45}
						  fontSize="12" text="Time of Day" />

            <YAxis axisAt="left" orient="left" ticks={5} stroke="#555555"/>
            {/*<Label className="axes" x={yAxisLabelX} y={yAxisLabelY}
						  rotate={-90}
						  fontSize="12" text="Stock Price (in $USD)" />*/}
            {/* Above: x and y-axis are being clipped if they would render beyond the bounds of the graph interior
              * All graph content is rendered in a <g> tag, but setting "clip-type: none" also allows candlesticks
              * to render outside the graph's bounds.
              * TODO: Resolve/implement workaround
              */}

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%I:%M %p")} />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".2f")} />
            {/*
              CandleStickSeries parameter, "width" controls the width of each candlestick in the graph,
              default scaling is appropriate for larger datasets.  For a single day with data points every 30 minutes,
              override default
            */}
            <CandlestickSeries /*width={timeIntervalBarWidth(utcHour)}*/ width={(width - 2 * marginLeftRight) / data.length}/>
          </Chart>
  				<CrossHairCursor strokeDasharray="LongDashDot" />
        </ChartCanvas>
      );
    } else {
      return(
        <p className="graph-loading react-stockchart">Rendering...</p>
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

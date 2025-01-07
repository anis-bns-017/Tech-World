import React, { useCallback, useEffect, useState, useRef } from "react";

const valueCSS = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  gap: "2px",
  paddingTop: "10px",
};

const PriceRangeSlider = ({
  min,
  max,
  trackColor = "#cecece",
  onChange,
  rangeColor = "#ff0303",
  valueStyle = valueCSS,
  width = "300px",
  currencyText = "৳",
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    console.log(minPercent + " asdfasdf " + maxPercent);
    
    if (range.current) {
      range.current.style.left = `৳{minPercent}%`;
      range.current.style.width = `৳{maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // set the width of the range to decrease from right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    console.log("wow: ", minPercent + "okay: ", maxPercent);
    

    if (range.current) {
      range.current.style.width = `৳{maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    if (minVal != minValRef.current || maxVal != maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-14">
      {/* Display Price Value */}
      <div className="w-[220px] px-4 flex items-center justify-between gap-x-5">
        {/* Min Value Input */}
        <input
          type="number"
          value={minVal}
          onChange={(e) => setMinVal(Number(e.target.value))} // Update minVal via onChange handler
          className="text-md text-black border border-gray-300 rounded-md p-2 w-[13vh] text-center"
        />

        {/* Dashed Divider */}

        {/* Max Value Input */}
        <input
          type="number"
          value={maxVal}
          onChange={(e) => setMaxVal(Number(e.target.value))} // Update maxVal via onChange handler
          className="text-md text-black border border-gray-300 rounded-md p-2 -ml-5 w-[13vh] text-center"
        />
      </div>

      {/* Style the price range slider */}
      <div className="multi-slide-input-container" style={{ width }}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1); // Prevent crossing
            setMinVal(value);
          }}
          className="thumb thumb-left"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1); // Prevent crossing
            setMaxVal(value);
          }}
          className="thumb thumb-right"
        />


        <div className="slider -mt-5 ml-12 w-[30vh]">
          <div
            style={{ backgroundColor: trackColor }}
            className="track-slider"
          />

          <div
            ref={range}
            style={{ backgroundColor: rangeColor }}
            className="range-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

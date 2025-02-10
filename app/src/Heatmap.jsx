import { useState, useEffect } from 'react'
import './App.css'

function Heatmap() {

    const [fileData, setFileData] = useState("");
    useEffect(() => {
      fetch("/raw data/left.txt") // File must be in `public/`
        .then((response) => response.text())
        .then((text) => setFileData(text))
        .catch((error) => console.error("Error reading file:", error));
    }, []);

    const colorPalette = ['#44ce1b', '#bbdb44', '#f7e379', '#f2a134', '#e51f1f'];

    const samples = fileData.split("\n");

    const sampleNum = 0;
    const formattedSample = samples[sampleNum].split("|").map(row => row.split(",").map(Number));
    const formattedSampleFlat = formattedSample.flat();

    console.log("Formatted Sample 1:", formattedSample);

    const getColorFromValue = (value) => {
      // set the max as 1 above the read max
      const highestVal = Math.max(...formattedSampleFlat) + 1;
      const percentage = Number(value / highestVal);
      //const colourIndex = Math.min((Math.floor(percentage * colorPalette.length), colorPalette.length - 1));
      const colourIndex = Math.floor(percentage * (colorPalette.length));
      return colorPalette[colourIndex];
    }

  return (
    <>
      {/* <HeatMapComponent 
        dataSource={formattedSample}
        paletteSettings={ {
          palette: [
            {value: 0, color: "#00FF00" },
            {value: 50, color: "#FFFF00" },
            {value: 100, color: "#FF0000" }
          ],
          type: "Gradient"
        } }
      ></HeatMapComponent> */}

      {/* <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '60px 60px 60px 60px 60px 60px 60px 60px 60px 60px 60px 60px 60px 60px',
        gap: '2px', 
        justifyContent: 'center', 
        alignItems: 'center'}}>
        {
          formattedSample.map((row, rowIndex) => {
            return <div key={rowIndex} style={{ display:"grid"}}>
              {row.map((value, colIndex) => {
                const colour = getColorFromValue(value);
                console.log(String(colour));
                return <span
                  key={colIndex}
                  style={{backgroundColor: String(colour), borderRadius: '5px'}}
                >{value}</span>
              })}
            </div>
          })
        }
      </div> */}

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${formattedSample[0]?.length || 1}, 40px)`, 
          gap: '2px', 
          // justifyContent: 'center', 
          // alignItems: 'center', 
          overflow: 'scroll'
        }}
      >
        {formattedSampleFlat.map((value, index) => {
          const colour = getColorFromValue(value);
          return (
            <span
              key={index}
              style={{
                backgroundColor: colour,
                borderRadius: '5px',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                color: '#fff'
              }}
            >
              {value}
            </span>
          );
        })}
      </div>

    </>
  )
}

export default Heatmap

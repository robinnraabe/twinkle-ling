import React from 'react'
 
const ProgressBar = ({fillColor, progress, height}) => {
    
    const outline = {
        height: height,
        width: '100%',
        backgroundColor: 'black',
        borderRadius: 40,
        margin: 50
      }
     
      const fill = {
        height: '100%',
        width: progress,
        backgroundColor: fillColor,
        borderRadius: 40,
        textAlign: 'right',
      }
       
    return (
    <div style={outline}>
      <div style={fill}>
      </div>
    </div>
    )
}
 
export default ProgressBar;

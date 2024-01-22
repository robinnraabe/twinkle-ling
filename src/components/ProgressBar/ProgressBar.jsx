import React from 'react'
 
const ProgressBar = ({progress, height}) => {
    
    const outline = {
        height: height,
        width: '100%',
        backgroundColor: '#dbdbdb',
        borderRadius: 40,
        margin: 50
      }
     
      const fill = {
        height: '100%',
        width: progress,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: "url(/images/shooting-star.jpeg)",
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

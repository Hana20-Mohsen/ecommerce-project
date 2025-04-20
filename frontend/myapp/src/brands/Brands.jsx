// import React, { useState } from 'react'

// export default function Brands() {
//   const [icon, setIcon] = useState({index:0,color:false});
//   const [icons] = useState(['icon1','icon2','icon3','icon4','icon5']);
//   const handleClick=(index)=>{
//      let newIcon = {...icon}
//      newIcon.color = index!==newIcon.index?true:!newIcon.color;
//      newIcon.index = index;
//      setIcon(newIcon);
//   }

//   return (
//     <div className="rating mt-5 pt-5">
//       {[1, 2, 3, 4, 5].map((starIndex) => (
//         <span
//           key={starIndex}
//           className={`star ${starIndex <= selectedStars ? 'clicked' : ''}`}
//           onClick={() => handleStarClick(starIndex)}
//         >
//           &#9733;
//         </span>
//       ))}
//     </div>
//   );
// }

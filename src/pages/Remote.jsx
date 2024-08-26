import React from "react";

const Remote = () => {
const  url = "http://37.187.176.243:1880/ui";

return (
    <div class="centered-container">
      <iframe
        src={url}
        style={{ width: "100%", height: "100%", border: "none" , borderRadius: '20px'}}
        title="Embedded Website"
      />
    </div>  
);
}

export default Remote;

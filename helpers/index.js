'use strict';

const helper = {
    formattedDate : (dateTime) => {
        const dateObject = new Date(dateTime);

        const year = dateObject.toLocaleString("default", { year: "numeric" });
        const month = dateObject.toLocaleString("default", { month: "2-digit" });
        const day = dateObject.toLocaleString("default", { day: "2-digit" });
  
        const formatedDate = `${year}-${month}-${day}`
        return formatedDate;
    }
}


module.exports = helper;
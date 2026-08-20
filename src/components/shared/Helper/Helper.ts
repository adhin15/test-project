import { useRouter } from "next/navigation";

export const UsdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

export const formatDate = (val: string | Date | null | undefined) => {
    if (!val) return "";
    const d = new Date(val);
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthList[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();

    return month + ", " + date + ", " + year;
  };

  export  const generateImageUrl = (url: string | null | undefined) => {
    const imageUrl = `https://image.tmdb.org/t/p/original/`;
    if (!url) return "/user.png";

    let fullUrl = imageUrl + url;
    fullUrl = fullUrl.replaceAll(" ", "%20");

    return fullUrl;
  };

  export const votePercentage = (params:number) =>{
    const numericPart = Math.floor(params * 10);
    const result = numericPart + "%";
    return result;
  }
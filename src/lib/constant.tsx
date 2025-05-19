export const usStates = [
    { key: "AL", name: "Alabama", abbreviation: "AL" },
    { key: "AK", name: "Alaska", abbreviation: "AK" },
    { key: "AZ", name: "Arizona", abbreviation: "AZ" },
    { key: "AR", name: "Arkansas", abbreviation: "AR" },
    { key: "CA", name: "California", abbreviation: "CA" },
    { key: "CO", name: "Colorado", abbreviation: "CO" },
    { key: "CT", name: "Connecticut", abbreviation: "CT" },
    { key: "DE", name: "Delaware", abbreviation: "DE" },
    { key: "FL", name: "Florida", abbreviation: "FL" },
    { key: "GA", name: "Georgia", abbreviation: "GA" },
    { key: "HI", name: "Hawaii", abbreviation: "HI" },
    { key: "ID", name: "Idaho", abbreviation: "ID" },
    { key: "IL", name: "Illinois", abbreviation: "IL" },
    { key: "IN", name: "Indiana", abbreviation: "IN" },
    { key: "IA", name: "Iowa", abbreviation: "IA" },
    { key: "KS", name: "Kansas", abbreviation: "KS" },
    { key: "KY", name: "Kentucky", abbreviation: "KY" },
    { key: "LA", name: "Louisiana", abbreviation: "LA" },
    { key: "ME", name: "Maine", abbreviation: "ME" },
    { key: "MD", name: "Maryland", abbreviation: "MD" },
    { key: "MA", name: "Massachusetts", abbreviation: "MA" },
    { key: "MI", name: "Michigan", abbreviation: "MI" },
    { key: "MN", name: "Minnesota", abbreviation: "MN" },
    { key: "MS", name: "Mississippi", abbreviation: "MS" },
    { key: "MO", name: "Missouri", abbreviation: "MO" },
    { key: "MT", name: "Montana", abbreviation: "MT" },
    { key: "NE", name: "Nebraska", abbreviation: "NE" },
    { key: "NV", name: "Nevada", abbreviation: "NV" },
    { key: "NH", name: "New Hampshire", abbreviation: "NH" },
    { key: "NJ", name: "New Jersey", abbreviation: "NJ" },
    { key: "NM", name: "New Mexico", abbreviation: "NM" },
    { key: "NY", name: "New York", abbreviation: "NY" },
    { key: "NC", name: "North Carolina", abbreviation: "NC" },
    { key: "ND", name: "North Dakota", abbreviation: "ND" },
    { key: "OH", name: "Ohio", abbreviation: "OH" },
    { key: "OK", name: "Oklahoma", abbreviation: "OK" },
    { key: "OR", name: "Oregon", abbreviation: "OR" },
    { key: "PA", name: "Pennsylvania", abbreviation: "PA" },
    { key: "RI", name: "Rhode Island", abbreviation: "RI" },
    { key: "SC", name: "South Carolina", abbreviation: "SC" },
    { key: "SD", name: "South Dakota", abbreviation: "SD" },
    { key: "TN", name: "Tennessee", abbreviation: "TN" },
    { key: "TX", name: "Texas", abbreviation: "TX" },
    { key: "UT", name: "Utah", abbreviation: "UT" },
    { key: "VT", name: "Vermont", abbreviation: "VT" },
    { key: "VA", name: "Virginia", abbreviation: "VA" },
    { key: "WA", name: "Washington", abbreviation: "WA" },
    { key: "WV", name: "West Virginia", abbreviation: "WV" },
    { key: "WI", name: "Wisconsin", abbreviation: "WI" },
    { key: "WY", name: "Wyoming", abbreviation: "WY" }
  ];

  export const practiceOptions=[
    {key:1, name:'Hospital Employed', value:'Hospital Employed'},
    {key:2, name:'Private Practice', value:'Private Practice'},
    {key:3, name:'Academic', value:'Academic'}
  ]

  export function debounce(fn: any, delay: any) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
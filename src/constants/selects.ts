import { Car } from "@/interface/car";

export const getSelectOptions = (filters: Car) => [
  { label: 'Any Make', name: 'make', disabled: false ,filteredBox :" "},
  { label: 'Any Model', name: 'model', disabled: !filters.make }, 
  { label: 'Any Color', name: 'color', disabled: false },
  { label: 'Any Fuel Type', name: 'fuel_type', disabled: false },
  { label: 'Any Body Style', name: 'body_style', disabled: false },
  { label: 'Any Engine', name: 'engine', disabled: false },
  { label: 'Min Year', name: 'min_year', disabled: false },
  { label: 'Max Year', name: 'max_year', disabled: false },
  { label: 'Min Price', name: 'min_price', disabled: false },
  { label: 'Max Price', name: 'max_price', disabled: false },
  { label: 'Min Km', name: 'min_km', disabled: false },
  { label: 'Max Km', name: 'max_km', disabled: false },
];


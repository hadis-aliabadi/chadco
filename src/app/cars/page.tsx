"use client"
import { SelectBox } from '@/core/SelectBox';
import { useCar } from '@/hooks/useCars';
import { Car } from '@/interface/car';
import React, { useState } from 'react';






const Inventory: React.FC = () => {
  const {data:carData}=useCar()
  const uniqueValues = (key: keyof Car) => Array.from(new Set(carData?.map(car => car[key])));
  const [filters, setFilters] = useState({
  make: '',
  model: '',
  color: '',
  fuel_type: '',
  body_style: '',
  min_year: '',
  max_year: '',
  engine: '',
  min_price:'',
  max_price: '',
  min_km: '',
  max_km: '',
  });

  const [filteredCars, setFilteredCars] = useState<Car[]>(carData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    const filtered = carData?.filter(car => {
      return (
        (filters.make === '' || car.make === filters.make) &&
        (filters.model === '' || car.model === filters.model) &&
        (filters.color === '' || car.color === filters.color) &&
        (filters.fuel_type === '' || car.fuel_type === filters.fuel_type) &&
        (filters.body_style === '' || car.body_style === filters.body_style) &&
        (filters.min_year === '' || car.min_year === filters.min_year) &&
        (filters.max_year === '' || car.max_year === filters.max_year) &&
        (filters.engine === '' || car.engine === filters.engine) &&
        (filters.min_price === '' || car.min_price === filters.min_price) &&
        (filters.max_price === '' || car.max_price === filters.max_price) &&
        (filters.min_km === '' || car.min_km === filters.min_km) &&
        (filters.max_km === '' || car.max_km === filters.max_km) 

      );
    });
    setFilteredCars(filtered);
  };
console.log(filters)
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Make Select */}
        {/* <select
          name="make"
          value={filters.make}
          onChange={handleChange}
          className="border p-2"
       
        >
          <option value="">Any Model</option>
          {uniqueValues('make').map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </select> */}
        <SelectBox selectedValue={filters} handleChange={handleChange} uniqueValues={uniqueValues('make')} type='make'/>
        {/* Model Select */}
        <select
          name="model"
          value={filters.model}
          onChange={handleChange}
          className="border p-2"
          disabled={!filters.make}
        >
          <option value="">Any Model</option>
          {uniqueValues('model').map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
        {/* <SelectBox value={filters.model} handleChange={handleChange} uniqueValues={uniqueValues('model')} type='Any Model'/> */}
        {/* Color Select */}
        <select
          name="color"
          value={filters.color}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Any Colour</option>
          {uniqueValues('color').map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>

        {/* Fuel Type Select */}
        <select
          name="fuel_type"
          value={filters.fuel_type}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Any Fuel Type</option>
          {uniqueValues('fuel_type').map((fuelType, index) => (
            <option key={index} value={fuelType}>
              {fuelType}
            </option>
          ))}
        </select>

        {/* Body Style Select */}
        <select
          name="body_style"
          value={filters.body_style}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Any Body Style</option>
          {uniqueValues('body_style').map((bodyStyle, index) => (
            <option key={index} value={bodyStyle}>
              {bodyStyle}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Search
        </button>
        <button
          onClick={()=>setFilteredCars([])}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Reset
        </button>
      </div>

      <div className='flex '>
        
      </div>
      {/* iltered Cars */}
      <div className="mt-6">
        {filteredCars?.length > 0 ? (
          <div>
            {filteredCars.map((car, index) => (
              <div key={index} className="border p-4 mb-4">
                <p>
                  <strong>Make:</strong> {car.make}
                </p>
                <p>
                  <strong>Model:</strong> {car.model}
                </p>
                <p>
                  <strong>Year:</strong> {car.min_year} - {car.max_year}
                </p>
                <p>
                  <strong>Color:</strong> {car.color}
                </p>
                <p>
                  <strong>Engine:</strong> {car.engine}
                </p>
                <p>
                  <strong>Price:</strong> ${car.min_price} - ${car.max_price}
                </p>
                <p>
                  <strong>Fuel Type:</strong> {car.fuel_type}
                </p>
                <p>
                  <strong>Body Style:</strong> {car.body_style}
                </p>
                <p>
                  <strong>Kilometers:</strong> {car.min_km} - {car.max_km} km
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No cars found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;

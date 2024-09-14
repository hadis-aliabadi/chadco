"use client"
import { getSelectOptions } from '@/constants/selects';
import { SelectBox } from '@/core/SelectBox';
import { useCar } from '@/hooks/useCars';
import { Car } from '@/interface/car';
import React, { useEffect, useState } from 'react';

const Inventory: React.FC = () => {
  const { data: carData , isLoading:isLoadingCarData} = useCar();
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    color: '',
    fuel_type: '',
    body_style: '',
    min_year: '',
    max_year: '',
    engine: '',
    min_price: '',
    max_price: '',
    min_km: '',
    max_km: '',
  });
  const [filteredCars, setFilteredCars] = useState<Car[]>(carData || []) ;
  const [keywordSearch,setKeywordSearch] =useState<Car[]>([]);
  const [filterByMake,setFilterByMake] =useState<boolean>(false)
  //@ts-ignore
  const uniqueValues = (key: keyof Car, filteredCar :Car[]  = carData) => {
    return Array.from(new Set(filteredCar?.map(car => car[key])));
  }

  const filteredCarsByMake=carData?.filter(car=>car.make===filters.make);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.name==='make') setFilterByMake(true);
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
        (filters.min_year === '' || car.min_year === parseInt(filters.min_year)) &&
        (filters.max_year === '' || car.max_year === parseInt(filters.max_year)) &&
        (filters.engine === '' || car.engine === filters.engine) &&
        (filters.min_price === '' || car.min_price === parseInt(filters.min_price)) &&
        (filters.max_price === '' || car.max_price === parseInt(filters.max_price)) &&
        (filters.min_km === '' || car.min_km === parseInt(filters.min_km)) &&
        (filters.max_km === '' || car.max_km === parseInt(filters.max_km))
      );
    });
    if (filtered) {
      setFilteredCars(filtered);
    } else {
      setFilteredCars([]);
    }
  };

  const handleKeywordSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
      
      const findCars = carData?.filter(car => {
        return (
          (car.make.toLowerCase() === e.target.value) ||
          ( car.model.toLowerCase() === e.target.value) ||
          ( car.color.toLowerCase() === e.target.value) ||
          ( car.fuel_type.toLowerCase() === e.target.value) ||
          ( car.body_style.toLowerCase() === e.target.value) ||
          ( car.min_year === parseInt(e.target.value)) ||
          ( car.max_year === parseInt(e.target.value)) ||
          ( car.engine.toLowerCase() === e.target.value) ||
          ( car.min_price === parseInt(e.target.value)) ||
          ( car.max_price === parseInt(e.target.value)) ||
          ( car.min_km === parseInt(e.target.value)) ||
          ( car.max_km === parseInt(e.target.value))
        );
      }
    );
    if (findCars && e.target.value) {
      setKeywordSearch(findCars);
    } else {
      setKeywordSearch([]); 
    }
   }

   const handleReset = () =>{
    setFilteredCars([]);
    setFilters({
      make: '',
      model: '',
      color: '',
      fuel_type: '',
      body_style: '',
      min_year: '',
      max_year: '',
      engine: '',
      min_price: '',
      max_price: '',
      min_km: '',
      max_km: '',
    })
   }

  const selectOptions = getSelectOptions(filters);

  const handleUniqueValues = (name) =>{
    if(name ==='make')
     {
      return 
    }
  }

if(isLoadingCarData) return <div className='h-screen flex justify-center items-center'>Loading ...</div>

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {selectOptions.map(({ label, name,disabled }) => (
          <SelectBox
            key={name}
            label={label}
            name={name}
            value={filters[name as keyof Car] } 
            handleChange={handleChange}
            uniqueValues={(filterByMake) && ((name==='model') || (name==='engine') || (name==='body_style')) ? uniqueValues(name as keyof Car, filteredCarsByMake) : uniqueValues(name as keyof Car) }
            disabled={disabled}
          />
        ))}
        {/* || (name ==='color') || (name ==='max_year')  || (name ==='min_year') || (name ==='max_price') || (name ==='min_price') || (name ==='max_km') || (name ==='min_km') */}
        <div className='border relative'>
          <input 
            onChange={(e)=>handleKeywordSearch(e)} 
            placeholder='Search(Make, Model, Price ...)' 
            className='p-2 w-full focus:outline-none'
          />
          {
            keywordSearch?.length > 0 &&
            <div className='absolute  w-full border-t bg-slate-400'>
              {keywordSearch.map((car, index) => (
              <div key={index} className="border-t p-4 mb-4 ">
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.min_year} - {car.max_year}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Engine:</strong> {car.engine}</p>
                <p><strong>Price:</strong> ${car.min_price} - ${car.max_price}</p>
                <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
                <p><strong>Body Style:</strong> {car.body_style}</p>
                <p><strong>Kilometers:</strong> {car.min_km} - {car.max_km} km</p>
              </div>
            ))}
            
            </div>
          }
        </div>
        <button onClick={handleFilter} className="bg-blue-500 text-white p-2 mt-4">
          Search
        </button>
        <button onClick={handleReset} className="bg-blue-500 text-white p-2 mt-4">
          Reset
        </button>
      </div>

      <div className="mt-6">
        {filteredCars?.length > 0 ? (
          <div>
            {filteredCars.map((car, index) => (
              <div key={index} className="border p-4 mb-4 ">
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.min_year} - {car.max_year}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Engine:</strong> {car.engine}</p>
                <p><strong>Price:</strong> ${car.min_price} - ${car.max_price}</p>
                <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
                <p><strong>Body Style:</strong> {car.body_style}</p>
                <p><strong>Kilometers:</strong> {car.min_km} - {car.max_km} km</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {carData?.map((car, index) => (
              <div key={index} className="border p-4 mb-4">
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.min_year} - {car.max_year}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Engine:</strong> {car.engine}</p>
                <p><strong>Price:</strong> ${car.min_price} - ${car.max_price}</p>
                <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
                <p><strong>Body Style:</strong> {car.body_style}</p>
                <p><strong>Kilometers:</strong> {car.min_km} - {car.max_km} km</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;

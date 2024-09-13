interface SelectBoxProps {
  selectedValue: string; 
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  uniqueValues: string[];
  type: string; 
}

export const SelectBox: React.FC<SelectBoxProps> = ({selectedValue,handleChange,uniqueValues,type}) => {
console.log(selectedValue)
  return (
    <select
          name={type}
          value={selectedValue.type}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">{type}</option>
          {uniqueValues.map((uniqueValue, index) => (
            <option key={uniqueValue} value={uniqueValue}>
              {uniqueValue}
            </option>
          ))}
    </select>
  )
}
import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const TrackpilotsSearchSelectDropdown = ({
  options = [], // [{ label: "Option 1", value: "opt1" }]
  placeholder = "Search by ...",
  searchPlaceholder = "Search...",
  selectAllLabel = "Select All",
  checkboxColor = "#9D55FF",
  checkboxSize = 16,
  width = "18rem",
  defaultSelectedOptions = [], // Array of objects [{ label: "Option 1", value: "opt1" }]
  onChange = () => {}, // Default empty function // Function to return array of selected objects
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);
  const dropdownRef = useRef(null);
  const selectAllRef = useRef(null);

  useEffect(() => {
    if (defaultSelectedOptions.length > 0) {
      setSelectedOptions(defaultSelectedOptions);
    }
  }, []);

  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate =
        selectedOptions.length > 0 && selectedOptions.length < options.length;

      if (selectAllRef.current.indeterminate !== isIndeterminate) {
        selectAllRef.current.indeterminate = isIndeterminate;
      }
    }
  }, [selectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedOptions((prevSelected) => {
      const isAlreadySelected = prevSelected.some((item) => item.value === option.value);
      const updatedSelection = isAlreadySelected
        ? prevSelected.filter((item) => item.value !== option.value)
        : [...prevSelected, option];

      if (onChange) onChange(updatedSelection);
      return updatedSelection;
    });
  };

  const handleSelectAll = () => {
    setSelectedOptions((prevSelected) => {
      const updatedSelection = prevSelected.length === options.length ? [] : options;
      if (onChange) onChange(updatedSelection);
      return updatedSelection;
    });
  };

  return (
    <div className="relative" style={{ width }} ref={dropdownRef}>
      <div
        className="border-2 rounded-full text-gray-600 py-2 px-6 flex items-center gap-2 justify-between bg-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          <IoSearch className="w-5 h-5 text-gray-500" />
          <span className="truncate text-sm">
            {selectedOptions.length > 0
              ? `${selectedOptions[0].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ""}`
              : placeholder}
          </span>
        </div>
        <span>▼</span>
      </div>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 shadow-lg z-50 rounded-lg">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {options.length > 0 && (
            <div className="p-2 border-b border-gray-300 flex items-center">
              <input
                type="checkbox"
                ref={selectAllRef}
                className="mr-2"
                style={{ accentColor: checkboxColor, width: checkboxSize, height: checkboxSize }}
                checked={selectedOptions.length === options.length}
                onChange={handleSelectAll}
              />
              <label className="cursor-pointer" onClick={handleSelectAll}>
                {selectAllLabel}
              </label>
            </div>
          )}

          <div className="max-h-48 overflow-y-auto">
            {options.filter((option) =>
              option.label.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <div className="p-2 text-gray-500 text-center">No options found</div>
            ) : (
              options
                .filter((option) =>
                  option.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <label key={option.value} className="p-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      style={{ accentColor: checkboxColor, width: checkboxSize, height: checkboxSize }}
                      checked={selectedOptions.some((item) => item.value === option.value)}
                      onChange={() => handleSelect(option)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackpilotsSearchSelectDropdown;

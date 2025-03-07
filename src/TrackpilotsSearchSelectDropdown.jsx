import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const TrackpilotsSearchSelectDropdown = ({
  options = [],
  placeholder = "Search by ...",
  searchPlaceholder = "Search...",
  selectAllLabel = "Select All",
  checkboxColor = "#9D55FF",
  checkboxSize = 16,
  width = "18rem",
  defaultSelectedOptions = [], // 🔹 Default selected options on first render
  onChange, // 🔹 Callback function for selection updates
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions); // 🔹 Initial state
  const dropdownRef = useRef(null);
  const dynamicRef = useRef({});

  // 🔹 Sync selectedOptions when defaultSelectedOptions changes
  useEffect(() => {
    setSelectedOptions(defaultSelectedOptions);
  }, [defaultSelectedOptions]);

  useEffect(() => {
    if (dynamicRef.current && dynamicRef.current[placeholder]) {
      dynamicRef.current[placeholder].indeterminate =
        selectedOptions.length > 0 && selectedOptions.length < options.length;
    }
  }, [selectedOptions, placeholder]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    if (onChange) onChange(updatedSelection); // 🔹 Update Parent State
  };

  const handleSelectAll = () => {
    const updatedSelection =
      selectedOptions.length === options.length ? [] : options;
    setSelectedOptions(updatedSelection);
    if (onChange) onChange(updatedSelection); // 🔹 Update Parent State
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              ? `${selectedOptions[0]}${
                  selectedOptions.length > 1
                    ? ` + ${selectedOptions.length - 1}`
                    : ""
                }`
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
                ref={(el) => (dynamicRef.current[placeholder] = el)}
                className={`mr-2 accent-[${checkboxColor}]`}
                style={{ width: checkboxSize, height: checkboxSize }}
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
              option.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <div className="p-2 text-gray-500 text-center">
                No options found
              </div>
            ) : (
              options
                .filter((option) =>
                  option.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <label
                    key={option}
                    className="p-2 flex items-center hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className={`mr-2 w-4 h-4 accent-[${checkboxColor}]`}
                      style={{ width: checkboxSize, height: checkboxSize }}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleSelect(option)}
                    />
                    <span>{option}</span>
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

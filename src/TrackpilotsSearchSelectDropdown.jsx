import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const TrackpilotsSearchSelectDropdown = ({
  options = [],
  placeholder = "Search by ...",
  searchPlaceholder = "Search...",
  selectAllLabel = "Select All", // ✅ Added default value
  checkboxColor = "#9D55FF",
  checkboxSize = 16,
  width = "18rem",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeys, setSelectedKeys] = useState([]); // Removed defaultSelectedOptions
  const dropdownRef = useRef(null);
  const dynamicRef = useRef({});

  // 🔹 Handle indeterminate state for "Select All" checkbox
  useEffect(() => {
    if (dynamicRef.current?.[placeholder]) {
      const isIndeterminate = selectedKeys.length > 0 && selectedKeys.length < options.length;
      dynamicRef.current[placeholder].indeterminate = isIndeterminate;
    }
  }, [selectedKeys, options.length]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (key) => {
    const updatedSelection = selectedKeys.includes(key)
      ? selectedKeys.filter((item) => item !== key)
      : [...selectedKeys, key];

    setSelectedKeys(updatedSelection);
    if (onChange) onChange(options.filter((opt) => updatedSelection.includes(opt.key)));
  };

  const handleSelectAll = () => {
    const updatedSelection = selectedKeys.length === options.length ? [] : options.map((opt) => opt.key);
    setSelectedKeys(updatedSelection);
    if (onChange) onChange(options.filter((opt) => updatedSelection.includes(opt.key)));
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
            {selectedKeys.length > 0
              ? `${options.find((opt) => opt.key === selectedKeys[0])?.value || ""}${
                  selectedKeys.length > 1 ? ` +${selectedKeys.length - 1}` : ""
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
                checked={selectedKeys.length === options.length}
                onChange={handleSelectAll}
              />
              <label className="cursor-pointer" onClick={handleSelectAll}>
                {selectAllLabel}
              </label>
            </div>
          )}

          <div className="max-h-48 overflow-y-auto">
            {options.filter((opt) =>
              opt.value.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <div className="p-2 text-gray-500 text-center">
                No options found
              </div>
            ) : (
              options
                .filter((opt) => opt.value.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((opt) => (
                  <label
                    key={opt.key}
                    className="p-2 flex items-center hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className={`mr-2 w-4 h-4 accent-[${checkboxColor}]`}
                      style={{ width: checkboxSize, height: checkboxSize }}
                      checked={selectedKeys.includes(opt.key)}
                      onChange={() => handleSelect(opt.key)}
                    />
                    <span>{opt.value}</span>
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

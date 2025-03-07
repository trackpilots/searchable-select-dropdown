# @trackpilots/searchable-select-dropdown  

![npm](https://img.shields.io/npm/v/@trackpilots/searchable-select-dropdown?style=flat-square)
![license](https://img.shields.io/npm/l/@trackpilots/searchable-select-dropdown?style=flat-square)
![downloads](https://img.shields.io/npm/dt/@trackpilots/searchable-select-dropdown?style=flat-square)

A **searchable, multi-select dropdown** component built with **React** and **Tailwind CSS**.

## ✨ Features  
- 🔍 Searchable input field  
- ✅ Multi-select support  
- 🎨 Customizable styles (color, width, height)  
- 📱 Fully responsive  
- ⚡ Easy to integrate  

![Screenshot](assets/screenshots.png)
---



## 🚀 Installation  
You can install the package using **npm** or **yarn**:  

### **Using npm**  
```sh
npm install @trackpilots/searchable-select-dropdown
```

### **Using yarn**  
```sh
yarn add @trackpilots/searchable-select-dropdown
```


Make sure Tailwind CSS is installed in your project.

##  📌 Usage
1️⃣ Import the Component
```sh
import SearchableSelect from "@trackpilots/searchable-select-dropdown";
import "tailwindcss/tailwind.css"; // Ensure Tailwind is included
```

2️⃣ Use in Your Component
```sh
import React, { useState } from "react";
import SearchableSelect from "@trackpilots/searchable-select-dropdown";

const App = () => {
  const options = ["Mahendran Sakthi", "Jagatheesan Madheswarn", "Jefin Rojar Jeyakumar", "Sanjay Sankar", "Jagadeesh Elango"];
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectionChange = (values) => {
    console.log("Selected values:", values);
    setSelectedValues(values);
  };

  return (
    <div className="p-4">
      <SearchableSelect 
        options={options} 
        selectedOptions={selectedValues} 
        onChange={handleSelectionChange} 
        searchPlaceholder="Search...",
        placeholder="Search..." 
        checkboxColor="#9D55FF" 
        checkboxSize="20px" 
      />
      <p className="mt-4">Selected: {selected.join(", ")}</p>
    </div>
  );
};

export default App;
```

## 🔧 Props

| Prop Name        | Type     | Default         | Description |
|-----------------|----------|-----------------|-------------|
| `options`        | `array`  | `[]`            | List of dropdown options. |
| `selectedOptions` | `array`  | `[]`            | Selected options state. |
| `onChange`      | `function` | `() => {}`     | Callback function when selection changes. |
| `placeholder`    | `string`  | `"Search..."`   | Placeholder text. |
| `searchPlaceholder` | `string` | `"Search..."`   | Search placeholder text. |
| `checkboxColor`   | `string`  | `"#9D55FF"`     | Custom checkbox color. |
| `checkboxSize`  | `string`  | `"16px"`        | Custom checkbox size (height/width). |

## 📌 Maintainers
These packages are maintained by [**Quick App Studio**](https://quickappstudio.com/our-team) Developers.

##  📄 License
This project is licensed under the MIT License.
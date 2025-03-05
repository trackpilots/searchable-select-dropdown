declare module "@trackpilots/searchable-select-dropdown" {
    import React from "react";
  
    export interface TrackpilotsSearchSelectDropdownProps {
      options?: string[];
      placeholder?: string;
      onChange?: (selectedOptions: string[]) => void;
      searchPlaceholder?: string;
      selectAllLabel?: string;
      checkboxColor?: string;
      checkboxSize?: number;
      width?: string;
    }
  
    const TrackpilotsSearchSelectDropdown: React.FC<TrackpilotsSearchSelectDropdownProps>;
    export default TrackpilotsSearchSelectDropdown;
  }
  
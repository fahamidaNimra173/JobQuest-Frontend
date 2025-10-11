import Select, { StylesConfig, ThemeConfig } from "react-select";
import { TextField } from "@mui/material";

// ---------------------- Types ----------------------
interface OptionType {
  value: string;
  label: string;
}

interface UsersFilterProps {
  searchOptions: OptionType[];
  searchType: OptionType;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchType: React.Dispatch<React.SetStateAction<OptionType>>;
  currentSelectStyles: StylesConfig<OptionType, false>;
  currentSelectTheme: ThemeConfig;
  searchTerm: string;
  roleOptions: OptionType[];
  roleFilter: OptionType;
  setRoleFilter: React.Dispatch<React.SetStateAction<OptionType>>;
}

// ---------------------- Component ----------------------
const UsersFilter = ({
  searchOptions,
  searchType,
  setSearchTerm,
  setPage,
  setSearchType,
  currentSelectStyles,
  currentSelectTheme,
  searchTerm,
  roleOptions,
  roleFilter,
  setRoleFilter,
}: UsersFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
      {/* 🔍 Search Type Selector */}
      <Select
        options={searchOptions}
        value={searchType}
        onChange={(selected) => {
          if (selected) {
            setSearchType(selected);
            setPage(0);
          }
        }}
        className="w-full md:w-1/3"
        styles={currentSelectStyles}
        theme={currentSelectTheme}
        isSearchable={false}
      />

      {/* 🧭 Search Input */}
      <TextField
        label={`Search by ${searchType.value}`}
        variant="outlined"
        size="small"
        sx={{
          height: 40,
          "& .MuiOutlinedInput-root": {
            color: "var(--foreground)",
            backgroundColor: "var(--background)",
            "& fieldset": { borderColor: "#d1d5db" },
            "&:hover fieldset": { borderColor: "#9ca3af" },
            "&.Mui-focused fieldset": { borderColor: "#7670D6" },
          },
          "& .MuiInputLabel-root": {
            color: "var(--foreground)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#7670D6",
          },
          ".dark &": {
            "& .MuiInputLabel-root": { color: "#f9fafb" },
          },
        }}
        className="w-full md:w-1/3"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0);
        }}
      />

      {/* 🧩 Role Filter */}
      <Select
        options={roleOptions}
        value={roleFilter}
        onChange={(selected) => {
          if (selected) {
            setRoleFilter(selected);
            setPage(0);
          }
        }}
        className="w-full md:w-1/3"
        styles={currentSelectStyles}
        theme={currentSelectTheme}
        isSearchable={false}
      />
    </div>
  );
};

export default UsersFilter;
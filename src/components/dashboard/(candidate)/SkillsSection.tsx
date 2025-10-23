import React from "react";
import { Plus } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
  onEdit: () => void;
}

export default function SkillsSection({ skills, onEdit }: SkillsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <button
          onClick={onEdit}
          className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          {skills && skills.length > 0 ? "Edit Skills" : "Add Skills"}
        </button>
      </div>
      <div className="p-6">
        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-light text-primary-dark text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills added yet</p>
        )}
      </div>
    </div>
  );
}
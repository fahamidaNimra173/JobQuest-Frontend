import React from "react";
import { Briefcase, Plus, Calendar, Edit3, Trash2 } from "lucide-react";
import { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
  onAdd: () => void;
  onEdit: (experience: Experience, index: number) => void;
  onDelete: (index: number) => void;
}

export default function ExperienceSection({
  experiences,
  onAdd,
  onEdit,
  onDelete,
}: ExperienceSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Work Experience
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </button>
      </div>
      <div className="p-6 space-y-6">
        {experiences && experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {exp.position}
                  </h3>
                  <p className="text-primary-dark font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.isCurrentlyWorking ||
                    !exp.endDate ||
                    exp.endDate === "ongoing"
                      ? "Present"
                      : new Date(exp.endDate).toLocaleDateString()}
                  </p>
                  {exp.responsibilities && (
                    <p className="text-gray-700 mt-2">{exp.responsibilities}</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onEdit(exp, index)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No work experience added yet</p>
        )}
      </div>
    </div>
  );
}
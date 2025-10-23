import React from "react";
import { GraduationCap, Plus, Calendar, Award, Edit3, Trash2 } from "lucide-react";
import { Education } from "@/types";

interface EducationSectionProps {
  education: Education[];
  onAdd: () => void;
  onEdit: (education: Education, index: number) => void;
  onDelete: (index: number) => void;
}

export default function EducationSection({
  education,
  onAdd,
  onEdit,
  onDelete,
}: EducationSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>
      <div className="p-6 space-y-6">
        {education && education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-primary-medium font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString()
                      : "Present"}
                  </p>
                  {edu.fieldOfStudy && (
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Award className="w-4 h-4 mr-1" />
                      {edu.fieldOfStudy}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onEdit(edu, index)}
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
          <p className="text-gray-500 italic">
            No education details added yet
          </p>
        )}
      </div>
    </div>
  );
}
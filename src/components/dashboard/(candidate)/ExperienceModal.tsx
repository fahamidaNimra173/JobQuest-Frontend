import React from "react";

interface ExperienceFormData {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorking: boolean;
  responsibilities?: string;
}

interface ExperienceModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: ExperienceFormData;
  onFormChange: (data: ExperienceFormData) => void;
  onSave: () => void;
  onClose: () => void;
  isSaving: boolean;
}

export default function ExperienceModal({
  isOpen,
  isEditing,
  formData,
  onFormChange,
  onSave,
  onClose,
  isSaving,
}: ExperienceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Experience" : "Add Experience"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  company: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  position: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    startDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    endDate: e.target.value,
                  })
                }
                disabled={formData.isCurrentlyWorking}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={formData.isCurrentlyWorking}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  isCurrentlyWorking: e.target.checked,
                })
              }
              className="mr-2"
            />
            <label htmlFor="currentlyWorking" className="text-sm text-gray-700">
              I currently work here
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsibilities
            </label>
            <textarea
              value={formData.responsibilities}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  responsibilities: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
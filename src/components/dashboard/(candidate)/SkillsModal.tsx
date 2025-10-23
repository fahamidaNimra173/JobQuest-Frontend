import React from "react";

interface SkillsModalProps {
  isOpen: boolean;
  skillsInput: string;
  onSkillsChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
  isSaving: boolean;
}

export default function SkillsModal({
  isOpen,
  skillsInput,
  onSkillsChange,
  onSave,
  onClose,
  isSaving,
}: SkillsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Skills</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <textarea
              value={skillsInput}
              onChange={(e) => onSkillsChange(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., JavaScript, React, Node.js, Python"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple skills with commas
            </p>
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
            {isSaving ? "Saving..." : "Save Skills"}
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Plus, X } from 'lucide-react';

interface CustomField {
  label: string;
  value: string;
}

interface CustomFieldsFormProps {
  customFields: CustomField[];
  setCustomFields: React.Dispatch<React.SetStateAction<CustomField[]>>;
}

const CustomFieldsForm: React.FC<CustomFieldsFormProps> = ({ customFields, setCustomFields }) => {
  const addCustomField = () => {
    setCustomFields([...customFields, { label: '', value: '' }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateCustomField = (index: number, field: 'label' | 'value', value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Custom Fields (Optional)</label>
        <button
          type="button"
          onClick={addCustomField}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Field
        </button>
      </div>

      {customFields.map((field, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Field Name"
              value={field.label}
              onChange={(e) => updateCustomField(index, 'label', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Field Value"
              value={field.value}
              onChange={(e) => updateCustomField(index, 'value', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <button
            type="button"
            onClick={() => removeCustomField(index)}
            className="mt-1 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomFieldsForm;
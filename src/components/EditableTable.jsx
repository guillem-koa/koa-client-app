import React, { useState } from "react";

const EditableTable = ({ data, columns, onSave }) => {
  const [editableData, setEditableData] = useState(data);

  const handleCellChange = (rowIndex, columnKey, value) => {
    const updatedData = [...editableData];
    updatedData[rowIndex][columnKey] = value;
    setEditableData(updatedData);
  };

  const handleSave = () => {
    onSave(editableData);
  };

  return (
    <div>
      <table border="1" className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={`${rowIndex}-${col.key}`}>
                  {col.editable ? (
                    <input
                      type="text"
                      value={row[col.key]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, col.key, e.target.value)
                      }
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditableTable;

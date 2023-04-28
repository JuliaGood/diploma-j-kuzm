import "./fieldGroup.style.css";

const FieldGroup = ({fieldName, children}) => {
  return (
    <div className="field-group">
      <label className="field-label">{fieldName}</label>
        {children}
    </div>
  )
}

export default FieldGroup;

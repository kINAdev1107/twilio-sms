import {useState} from "react";

const TextAreaField = ({ value='',
                      placeholder='Placeholder',
                      label='Label',
                      validation=()=>{},
                      invalidHint='Invalid value',
                      isRequired=false,
                      rows = 3,
                      onChange=()=>{}}) => {
  const [isPristine, setPristine] = useState(true);
  const isValid = () => {
    try {
      return validation(value) !== null
    } catch (err) {
      return false
    }
  }
  const labelClass = `form-label ${ isPristine || isValid() ? '' : 'has-error'}`
  const showInvalid = !isPristine && !isValid()
  return <label className={labelClass}>{label}:{isRequired && <sup className="text-error">&lowast; </sup>}
    <textarea
      className="form-input"
      placeholder={placeholder}
      required={isRequired}
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => setPristine(false)}>
    </textarea>
    {showInvalid && <span className="form-input-hint">{invalidHint}</span>}
    {!showInvalid && <span className="form-input-hint">{placeholder}</span>}
  </label>
}

export default TextAreaField
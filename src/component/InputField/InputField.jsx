import {useState} from "react";

const InputField = ({ type='text',
                      value='',
                      placeholder='Placeholder',
                      label='Label',
                      validation=()=>{},
                      invalidHint='Invalid value',
                      isRequired=false,
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
    <input
      type={type}
      className="form-input"
      placeholder={placeholder}
      required={isRequired}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => setPristine(false)}/>
    {showInvalid && <span className="form-input-hint">{invalidHint}</span>}
    {!showInvalid && <span className="form-input-hint">{placeholder}</span>}
  </label>
}

export default InputField
import './index.css'

const FilterGroup = props => {
  const {employmentTypesList, salaryRangesList} = props
  return (
    <>
      <div>
        <h1 className="filter-headings">Type of Employment</h1>
        {employmentTypesList.map(eachItem => {
          const {changeJobType} = props
          const {label, employmentTypeId} = eachItem
          const onSelectOption = event => {
            changeJobType(event)
          }
          return (
            <li className="filter-list" key={employmentTypeId}>
              <input
                type="checkbox"
                id={employmentTypeId}
                onChange={onSelectOption}
                className="filter-input"
                value={employmentTypeId}
              />
              <label htmlFor={employmentTypeId} className="filter-label">
                {label}
              </label>
            </li>
          )
        })}
      </div>
      <hr className="ruler" />
      <div>
        <h1 className="filter-headings">Salary RAnge</h1>
        {salaryRangesList.map(eachItem => {
          const {changeSalary} = props
          const {label, salaryRangeId} = eachItem
          const onSelectOption = () => {
            changeSalary(salaryRangeId)
          }
          return (
            <li className="filter-list" key={salaryRangeId}>
              <input
                type="radio"
                id={salaryRangeId}
                onChange={onSelectOption}
                className="filter-input"
                name="activeSalaryId"
              />
              <label htmlFor={salaryRangeId} className="filter-label">
                {label}
              </label>
            </li>
          )
        })}
      </div>
    </>
  )
}
export default FilterGroup

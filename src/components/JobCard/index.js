import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="job-card">
          <div className="job-card-header">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-rating">
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">
                <BsStarFill color="#fbbf24" /> {rating}
              </p>
            </div>
          </div>
          <div className="job-card-location-package">
            <div className="location-job-type">
              <p className="job-location">{location}</p>
              <p className="job-type">{employmentType}</p>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="ruler" />
          <div className="job-card-description">
            <h1 className="job-card-heading">Description</h1>
            <p className="job-description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default JobCard

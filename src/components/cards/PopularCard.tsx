import { Link } from "react-router-dom"


const PopularCard = ({title, link}:{
    title:string,
    link:any
}) => {
  return (
    <div className="bg-blue-50 p-4 hover:bg-blue-100">
            <p className="font-medium text-blue-900">{title}</p>
            <Link to={link} className="text-sm text-blue-600">View Salaries →</Link>
          </div>
  )
}

export default PopularCard


const EmploymentCard = ({practice, compensation, submissions}:{
    practice:string, compensation:number, submissions:number
}) => {
  return (
   <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                     {practice}
                    </h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      ${compensation}
                    </div>
                    <div className="text-sm text-gray-600">{submissions} submissions</div>
                  </div>
  )
}

export default EmploymentCard

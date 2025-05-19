const SpecialityCard = ({id, satisfactionLevel, submission, specialty}:any) => {
    console.log(id);
    
  return (
     <div className="p-4 rounded-lg bg-emerald-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-emerald-700">#{id+1}</div>
                        <div className="font-bold text-gray-900">
                          {specialty}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {submission} submissions
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="h-3 rounded-full bg-gray-200">
                            <div
                              className="h-3 rounded-full bg-emerald-500"
                              style={{ width: "97%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4 text-lg font-semibold text-gray-900">
                          {satisfactionLevel}
                        </div>
                      </div>
                    </div>
                  </div>
  )
}

export default SpecialityCard


const TransparencyCard = ({number, title, des}:{
    number:string,
    title:string,
    des:string
}) => {
  return (
    <div><div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="text-4xl font-bold text-[#2D2D5F] mb-2">{number}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-0">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {des}
    </p>
  </div></div>
  )
}

export default TransparencyCard
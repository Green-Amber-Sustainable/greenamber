
function Header({ title }) {

  return (
    <>
      <div
        className="flex justify-between items-center border-b px-4 py-3 sticky top-0 bg-dim-900 border-l border-r border-gray-700">

        <h2 className="text-gray-100 font-bold font-sm">
          {title}
        </h2>

      </div>
    </>
  )
}

export default Header
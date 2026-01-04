const Board = () => {
  return (
    <section id="board-section" className="py-6 sm:py-12 bg-gray-50">
      <div id="board-container" className="container mx-auto px-3 sm:px-4">
        <h1 id="board-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-tec-blue mb-4 sm:mb-8 text-center">Board Information</h1>
        <div id="board-content" className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div id="board-member-president" className="mb-4 sm:mb-6">
            <h2 id="board-president-label" className="text-lg sm:text-xl font-semibold text-tec-blue mb-2">President:</h2>
            <p id="board-president-name" className="text-base sm:text-lg text-gray-700">[President's Name]</p>
          </div>
          <div id="board-member-vice-president" className="mb-4 sm:mb-6">
            <h2 id="board-vice-president-label" className="text-lg sm:text-xl font-semibold text-tec-blue mb-2">Vice President:</h2>
            <p id="board-vice-president-name" className="text-base sm:text-lg text-gray-700">[Vice President's Name]</p>
          </div>
          <div id="board-member-treasurer">
            <h2 id="board-treasurer-label" className="text-lg sm:text-xl font-semibold text-tec-blue mb-2">Treasurer:</h2>
            <p id="board-treasurer-name" className="text-base sm:text-lg text-gray-700">[Treasurer's Name]</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Board


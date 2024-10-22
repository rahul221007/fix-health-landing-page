export default function Testimonials({ darkMode }: { darkMode: boolean }) {
  return (
    <div className={`p-8  ${darkMode ? "bg-gray-400" : "bg-white"}`}>
      <h2
        className={`text-4xl text-center font-bold mb-12 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        What Our Clients Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Testimonial 1 */}
        <div
          className={`bg-white ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-lg`}
        >
          <p
            className={`text-lg ${
              darkMode ? "text-white" : "text-gray-800"
            } italic mb-4`}
          >
            `Amazing service, highly recommend!`
          </p>
          <p
            className={`text-right font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            - John Doe
          </p>
        </div>

        {/* Testimonial 2 */}
        <div
          className={`bg-white ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-lg`}
        >
          <p
            className={`text-lg ${
              darkMode ? "text-white" : "text-gray-800"
            } italic mb-4`}
          >
            `The doctors are very professional.``
          </p>
          <p
            className={`text-right font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            - Jane Smith
          </p>
        </div>

        {/* Add more testimonials as needed */}
      </div>
    </div>
  );
}

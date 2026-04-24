const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About CaloryInsight</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          CaloryInsight was built with a simple goal in mind: making health awareness accessible
          to everyone. We believe that understanding your body — how many calories you burn,
          what your BMI means, and what's in the food you eat — is the first step toward
          living a healthier life.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This project is a full-stack web application designed to provide practical health
          tools without the complexity of expensive fitness apps. Whether you're a student,
          a working professional, or someone just starting their health journey, CaloryInsight
          is here to help.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">What We Offer</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
            <span><strong>Calorie Burn Calculator</strong> — Uses the MET (Metabolic Equivalent of Task) method to estimate calories burned during different exercises.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
            <span><strong>BMI Calculator</strong> — Calculates your Body Mass Index and tells you which category you fall into based on WHO guidelines.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
            <span><strong>Food Calorie Finder</strong> — Search from a curated database of common foods to check their calorie and macronutrient content per 100 grams.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
            <span><strong>Personal Dashboard</strong> — View your recent activity and track your health calculations over time.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-800">MongoDB</p>
            <p className="text-xs text-gray-500 mt-1">Database</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-800">Express.js</p>
            <p className="text-xs text-gray-500 mt-1">Backend</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-800">React.js</p>
            <p className="text-xs text-gray-500 mt-1">Frontend</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-800">Node.js</p>
            <p className="text-xs text-gray-500 mt-1">Runtime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

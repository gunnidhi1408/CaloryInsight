import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ExportReport = () => {
  const [history, setHistory] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const [historyRes, journalRes] = await Promise.all([
        api.get('/calc/history'),
        api.get('/journal/all')
      ]);
      setHistory(historyRes.data.history || []);
      setJournals(journalRes.data.journals || []);
    } catch (err) {
      setError('Failed to fetch data for report.');
    } finally {
      setLoading(false);
    }
  };

  const bmiRecords = history.filter(h => h.type === 'bmi');
  const calorieRecords = history.filter(h => h.type === 'calorie_burn');

  const downloadText = (type) => {
    let content = '';
    let filename = '';

    if (type === 'bmi') {
      filename = 'BMI_Report.txt';
      content += 'CaloryInsight - BMI History Report\n\n';
      content += 'Date\tWeight(kg)\tHeight(cm)\tBMI\tCategory\n';
      bmiRecords.forEach(record => {
        const date = new Date(record.createdAt).toLocaleDateString();
        content += `${date}\t${record.inputs.weight}\t${record.inputs.height}\t${record.result.bmi}\t${record.result.category}\n`;
      });
    } else if (type === 'calorie') {
      filename = 'Calorie_Burn_Report.txt';
      content += 'CaloryInsight - Calorie Burn Report\n\n';
      content += 'Date\tExercise\tDuration(min)\tCalories Burned\n';
      calorieRecords.forEach(record => {
        const date = new Date(record.createdAt).toLocaleDateString();
        content += `${date}\t${record.inputs.exercise}\t${record.inputs.duration}\t${record.result.caloriesBurned}\n`;
      });
    } else if (type === 'journal') {
      filename = 'Daily_Journal_Report.txt';
      content += 'CaloryInsight - Daily Journal Report\n\n';
      content += 'Date\tTotal Calories In\tTotal Calories Out\tFood Items\tExercises\n';
      journals.forEach(journal => {
        const foodSummary = journal.foodItems.map(f => `${f.name} (${f.calories} kcal)`).join(' | ');
        const exerciseSummary = journal.exercises.map(e => `${e.name} (${e.caloriesBurned} kcal)`).join(' | ');
        content += `${journal.date}\t${journal.totalCaloriesIn}\t${journal.totalCaloriesOut}\t${foodSummary || 'None'}\t${exerciseSummary || 'None'}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = (type) => {
    const doc = new jsPDF();
    
    if (type === 'bmi') {
      doc.setFontSize(18);
      doc.text('CaloryInsight', 14, 15);
      doc.setFontSize(14);
      doc.text('BMI History Report', 14, 23);
      
      const tableColumn = ["Date", "Weight (kg)", "Height (cm)", "BMI", "Category"];
      const tableRows = [];

      bmiRecords.forEach(record => {
        const date = new Date(record.createdAt).toLocaleDateString();
        tableRows.push([
          date,
          record.inputs.weight,
          record.inputs.height,
          record.result.bmi,
          record.result.category
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 28,
      });
      
      doc.save('BMI_Report.pdf');
    } else if (type === 'calorie') {
      doc.setFontSize(18);
      doc.text('CaloryInsight', 14, 15);
      doc.setFontSize(14);
      doc.text('Calorie Burn Report', 14, 23);
      
      const tableColumn = ["Date", "Exercise", "Duration (min)", "Calories Burned"];
      const tableRows = [];

      calorieRecords.forEach(record => {
        const date = new Date(record.createdAt).toLocaleDateString();
        tableRows.push([
          date,
          record.inputs.exercise.replace('_', ' '),
          record.inputs.duration,
          record.result.caloriesBurned
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 28,
      });
      
      doc.save('Calorie_Burn_Report.pdf');
    } else if (type === 'journal') {
      doc.setFontSize(18);
      doc.text('CaloryInsight', 14, 15);
      doc.setFontSize(14);
      doc.text('Daily Journal Report', 14, 23);
      
      const tableColumn = ["Date", "Calories In", "Calories Out", "Food Items", "Exercises"];
      const tableRows = [];

      journals.forEach(journal => {
        const foodSummary = journal.foodItems.map(f => `• ${f.name} (${f.calories} kcal)`).join('\n');
        const exerciseSummary = journal.exercises.map(e => `• ${e.name} (${e.caloriesBurned} kcal)`).join('\n');
        tableRows.push([
          journal.date,
          `${journal.totalCaloriesIn} kcal`,
          `${journal.totalCaloriesOut} kcal`,
          foodSummary || 'None',
          exerciseSummary || 'None'
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 28,
      });
      
      doc.save('Daily_Journal_Report.pdf');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Export Reports</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Calorie Report Card (Moved to first) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-bold mb-4">CAL</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Calorie Burn Report</h2>
          <p className="text-gray-600 text-sm mb-6 flex-grow">
            Download a complete log of your exercise sessions, including the activity type, duration, and total calories burned.
          </p>
          
          <div className="flex flex-col gap-3 mt-auto">
            <button 
              onClick={() => downloadPDF('calorie')}
              disabled={calorieRecords.length === 0}
              className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Download PDF
            </button>
            <button 
              onClick={() => downloadText('calorie')}
              disabled={calorieRecords.length === 0}
              className="flex-1 border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Download Text
            </button>
          </div>
          {calorieRecords.length === 0 && <p className="text-xs text-center text-gray-500 mt-3">No exercise data available to export.</p>}
        </div>

        {/* BMI Report Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold mb-4">BMI</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">BMI History Report</h2>
          <p className="text-gray-600 text-sm mb-6 flex-grow">
            Download a comprehensive list of all your recorded BMI calculations, including weight, height, and categories.
          </p>
          
          <div className="flex flex-col gap-3 mt-auto">
            <button 
              onClick={() => downloadPDF('bmi')}
              disabled={bmiRecords.length === 0}
              className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Download PDF
            </button>
            <button 
              onClick={() => downloadText('bmi')}
              disabled={bmiRecords.length === 0}
              className="flex-1 border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Download Text
            </button>
          </div>
          {bmiRecords.length === 0 && <p className="text-xs text-center text-gray-500 mt-3">No BMI data available to export.</p>}
        </div>

        {/* Journal Report Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold mb-4">LOG</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Daily Journal Report</h2>
          <p className="text-gray-600 text-sm mb-6 flex-grow">
            Download a detailed record of your daily food intake and exercises, including total calories in and out.
          </p>
          
          <div className="flex flex-col gap-3 mt-auto">
            <button 
              onClick={() => downloadPDF('journal')}
              disabled={journals.length === 0}
              className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Download PDF
            </button>
            <button 
              onClick={() => downloadText('journal')}
              disabled={journals.length === 0}
              className="flex-1 border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Download Text
            </button>
          </div>
          {journals.length === 0 && <p className="text-xs text-center text-gray-500 mt-3">No journal data available to export.</p>}
        </div>
      </div>
    </div>
  );
};

export default ExportReport;

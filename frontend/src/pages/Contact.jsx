import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is not valid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // in a real app this would send to a backend endpoint
    // for now we just show a success message
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question or feedback? We would love to hear from you. Fill out the form below
        and we'll get back to you as soon as possible.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* contact info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mb-2"><span className="text-primary-700 font-bold text-xs">@</span></div>
            <h3 className="font-semibold text-gray-800 text-sm">Email</h3>
            <p className="text-gray-600 text-sm">support@caloryinsight.com</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mb-2"><span className="text-primary-700 font-bold text-xs">LOC</span></div>
            <h3 className="font-semibold text-gray-800 text-sm">Location</h3>
            <p className="text-gray-600 text-sm">New Delhi, India</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mb-2"><span className="text-primary-700 font-bold text-xs">24h</span></div>
            <h3 className="font-semibold text-gray-800 text-sm">Response Time</h3>
            <p className="text-gray-600 text-sm">Within 24 hours</p>
          </div>
        </div>

        {/* contact form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 mx-auto"><span className="text-green-700 font-bold text-sm">OK</span></div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
              <p className="text-green-700 text-sm">
                Thank you for reaching out. We'll respond to your message soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.subject ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

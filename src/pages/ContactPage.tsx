
import { useState } from "react";

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In reality, you'd send via backend - we'll just mark as sent
    setSent(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {sent ? (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
          Thank you for contacting us! We'll get back to you soon.
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input 
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea 
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
              rows={4}
            />
          </div>
          <button 
            type="submit"
            className="bg-news-accent text-white px-4 py-2 rounded hover:bg-news-accent/80 transition"
          >Send</button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;

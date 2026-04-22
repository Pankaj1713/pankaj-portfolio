"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { portfolioData } from "@/lib/portfolio-data";
import { CONTACT_VALIDATION_SCHEMA } from "@/lib/validation-schemas";
import { AnimatedError } from "./animated-error";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (
    values: { name: string; email: string; message: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (val: boolean) => void; resetForm: () => void },
  ) => {
    try {
      // 1. Format the message clearly for WhatsApp
      const textMessage = `Hi Pankaj,\n\nMy name is ${values.name} (${values.email}).\n\n${values.message}`;

      // 2. Encode the text so it works safely in a URL
      const encodedMessage = encodeURIComponent(textMessage);

      // 3. Construct the WhatsApp API link with your number (no '+' sign needed)
      const whatsappUrl = `https://wa.me/918708583401?text=${encodedMessage}`;

      // 4. Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // Show success message and clear the form
      setSubmitStatus("success");
      resetForm();
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <Linkedin size={24} />;
      case "GitHub":
        return <Github size={24} />;
      case "Email":
        return <Mail size={24} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let{"'"}s Work <span className="text-cyan-400">Together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I{"'"}m always interested in hearing about new projects and
            opportunities. Send me a message and it will come straight to my
            WhatsApp!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={CONTACT_VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-semibold mb-2"
                  >
                    Your Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border outline-none transition-all placeholder-gray-500 text-white ${
                      touched.name && errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-400"
                    }`}
                  />
                  <AnimatedError error={errors.name} touched={touched.name} />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-semibold mb-2"
                  >
                    Your Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border outline-none transition-all placeholder-gray-500 text-white ${
                      touched.email && errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-400"
                    }`}
                  />
                  <AnimatedError error={errors.email} touched={touched.email} />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-semibold mb-2"
                  >
                    Your Message
                  </label>
                  <Field
                    id="message"
                    name="message"
                    as="textarea"
                    placeholder="Tell me about your project..."
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border outline-none transition-all placeholder-gray-500 text-white resize-none ${
                      touched.message && errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-400"
                    }`}
                  />
                  <AnimatedError
                    error={errors.message}
                    touched={touched.message}
                  />
                </div>

                {/* Submit Status Messages */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm font-medium text-center"
                    >
                      Redirecting to WhatsApp...
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium text-center"
                    >
                      Failed to open WhatsApp. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-3 cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {/* Email */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            href={`mailto:${portfolioData.email}`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-all h-full">
              <div className="inline-block p-3 bg-cyan-400/10 rounded-lg mb-3 group-hover:bg-cyan-400/20 transition-colors">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm">Email</h3>
              <p className="text-gray-400 text-xs break-all mt-1">
                {portfolioData.email}
              </p>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            href="https://wa.me/918708583401"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-all h-full">
              <div className="inline-block p-3 bg-cyan-400/10 rounded-lg mb-3 group-hover:bg-cyan-400/20 transition-colors">
                <Phone className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm">WhatsApp</h3>
              <p className="text-gray-400 text-xs mt-1">+91 8708583401</p>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
            href="https://www.linkedin.com/in/pankzthakur"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-all h-full">
              <div className="inline-block p-3 bg-cyan-400/10 rounded-lg mb-3 group-hover:bg-cyan-400/20 transition-colors">
                <Linkedin className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold text-sm">Connect</h3>
              <p className="text-gray-400 text-xs mt-1">LinkedIn & GitHub</p>
            </div>
          </motion.a>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-4 mb-8"
        >
          {portfolioData.socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
            >
              {getIcon(link.name)}
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-gray-500 text-sm"
        >
          Available for freelance work and full-time opportunities
        </motion.p>
      </div>
    </section>
  );
}
